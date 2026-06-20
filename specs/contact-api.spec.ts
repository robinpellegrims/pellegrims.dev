import contact, { ContactApiRequestBody } from '../pages/api/contact';
import { sendEmailViaSmtp } from '../utils/cloudflare';

class MockResponse {
  status: number;
  constructor(public body: any, public init: any) {
    this.status = init?.status || 200;
  }
}
global.Response = MockResponse as any;

class MockNextRequest {
  method: string;
  constructor(public url: string, public options: any) {
    this.method = options?.method || 'GET';
  }
  async json() {
    return JSON.parse(this.options.body);
  }
}
jest.mock('next/server', () => ({
  NextRequest: MockNextRequest
}));
import { getCloudflareEnv } from '../utils/cloudflare';

jest.mock('../utils/cloudflare', () => ({
  sendEmailViaSmtp: jest.fn(),
  getCloudflareEnv: () => process.env
}));

const sendEmailViaSmtpMock = sendEmailViaSmtp as jest.Mock;

const defaultRequestBody: ContactApiRequestBody = {
  email: 'name@domain.com',
  message: 'Message',
  name: 'name',
};

const defaultEnv = {
  SMTP_PORT: '1234',
  SMTP_HOST: 'Host',
  SMTP_USER: 'User',
  SMTP_PASS: 'Password',
  CONTACT_MAIL_TO: 'to@domain.com'
};

const createRequest = (body: any) => {
  return new MockNextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }) as any;
};

describe('/api/contact', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
    for (const envVar of Object.keys(defaultEnv)) {
      delete process.env[envVar];
    }
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('should respond with 405 for non-POST requests', async () => {
    const req = new MockNextRequest('http://localhost/api/contact', { method: 'GET' }) as any;
    const res = await contact(req);
    expect(res.status).toBe(405);
  });

  test('should respond with 204 when hidden field is added ', async () => {
    const req = createRequest({ a991396704f746f4ba5d4f88aa13e524: 'true' });
    const res = await contact(req);
    expect(res.status).toBe(204);
  });

  describe('should respond with 400 when fields are missing', () => {
    test.each(['name', 'email', 'message'] as string[])('%s', async (field) => {
      const { [field as keyof ContactApiRequestBody]: removedProperty, ...requestBody } = defaultRequestBody;
      const req = createRequest(requestBody);
      const res = await contact(req);
      expect(res.status).toBe(400);
    });
  });

  describe('should respond with 500 when env vars are missing', () => {
    test.each([
      'SMTP_PORT',
      'SMTP_HOST',
      'SMTP_USER',
      'SMTP_PASS',
      'CONTACT_MAIL_TO',
    ] as string[])('%s', async (missingVar) => {
      const { [missingVar as keyof typeof defaultEnv]: removedProperty, ...processEnv } = defaultEnv;
      process.env = { ...process.env, ...processEnv };
      const req = createRequest(defaultRequestBody);
      const res = await contact(req);
      expect(res.status).toBe(500);
    });
  });

  test('should send the mail', async () => {
    process.env = { ...OLD_ENV, ...defaultEnv };
    const req = createRequest(defaultRequestBody);
    const res = await contact(req);
    expect(sendEmailViaSmtpMock).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(204);
  });
});
