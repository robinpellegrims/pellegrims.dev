import type { NextRequest } from 'next/server';
import { contactFieldNames } from '@/components/ui/organisms/contact-form/contact-form.constants';
import { sendEmailViaSmtp, getCloudflareEnv } from '@/utils/cloudflare';

export const runtime = 'edge';


export interface ContactApiResponseBody {
  error?: string;
}

export type ContactApiRequestBody = Partial<
  Record<(typeof contactFieldNames)[number], string>
>;

const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

export default async function contact(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  const body = (await req.json()) as ContactApiRequestBody;

  if (body.a991396704f746f4ba5d4f88aa13e524?.length) {
    return new Response(null, { status: HTTP_NO_CONTENT });
  }

  if (!body.email || !body.name || !body.message) {
    return new Response(JSON.stringify({ error: 'Name, e-mail and message are mandatory.' }), {
      status: HTTP_BAD_REQUEST,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const env = getCloudflareEnv();

  if (!env.SMTP_PORT || !env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !env.CONTACT_MAIL_TO) {
    return new Response(JSON.stringify({ error: 'Missing environment variables' }), {
      status: HTTP_INTERNAL_SERVER_ERROR,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await sendEmailViaSmtp({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    }, {
      from: env.SMTP_USER, // Ensure From matches the authenticated user
      replyTo: body.email,
      to: env.CONTACT_MAIL_TO,
      subject: `[pellegrims.dev] Message from ${body.name}`,
      text: body.message,
    });

    return new Response(null, { status: HTTP_NO_CONTENT });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error while sending e-mail' }), {
      status: HTTP_INTERNAL_SERVER_ERROR,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
