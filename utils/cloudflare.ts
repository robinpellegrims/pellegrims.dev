import { getRequestContext } from '@cloudflare/next-on-pages';
// @ts-ignore
import { connect } from 'cloudflare:sockets';

export function getCloudflareEnv(): any {
  return getRequestContext().env;
}

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

export interface EmailMessage {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export async function sendEmailViaSmtp(config: SmtpConfig, email: EmailMessage): Promise<void> {


  // Use implicit TLS since the user originally set `secure: true` in nodemailer
  const socket = connect(`${config.host}:${config.port}`, {
    secureTransport: 'on',
    allowHalfOpen: false,
  });

  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  const decoder = new TextDecoder();
  
  let buffer = '';

  // Helper to read until a specific response code
  const expectCode = async (expectedPrefix: string) => {
    while (true) {
      const { value, done } = await reader.read();
      if (value) {
        buffer += decoder.decode(value, { stream: true });
      }
      
      const lines = buffer.split('\r\n');
      if (lines.length > 1) {
        buffer = lines.pop() || ''; // Keep the last incomplete part
        for (const line of lines) {
          // SMTP multi-line responses look like "250-..." and the last line is "250 ..."
          // We break only if it's the final line of the expected code.
          if (line.startsWith(expectedPrefix + ' ') || line.startsWith(expectedPrefix + '\r') || line === expectedPrefix) {
            return line;
          } else if (/^[45]\d{2}/.test(line)) {
            throw new Error(`SMTP Error: ${line}`);
          }
        }
      }
      if (done) break;
    }
    throw new Error('Connection closed before expected response');
  };

  const send = async (cmd: string) => {
    await writer.write(new TextEncoder().encode(cmd + '\r\n'));
  };

  try {
    // 1. Initial Greeting
    await expectCode('220');

    // 2. EHLO
    await send('EHLO pellegrims.dev');
    await expectCode('250');

    // 3. AUTH LOGIN
    await send('AUTH LOGIN');
    await expectCode('334'); 
    
    await send(btoa(config.user));
    await expectCode('334'); 
    
    await send(btoa(config.pass));
    await expectCode('235'); // Authentication successful

    // 4. MAIL FROM
    await send(`MAIL FROM:<${config.user}>`);
    await expectCode('250');

    // 5. RCPT TO
    await send(`RCPT TO:<${email.to}>`);
    await expectCode('250');

    // 6. DATA
    await send('DATA');
    await expectCode('354');

    // Construct standard MIME
    const mimeMessage = [
      `From: ${email.from}`,
      `To: ${email.to}`,
      ...(email.replyTo ? [`Reply-To: ${email.replyTo}`] : []),
      `Subject: ${email.subject}`,
      `Content-Type: text/plain; charset="utf-8"`,
      ``,
      email.text,
      `.`
    ].join('\r\n');

    await send(mimeMessage);
    await expectCode('250'); // Message accepted for delivery

    // 7. QUIT
    await send('QUIT');
    
  } finally {
    writer.releaseLock();
    reader.releaseLock();
    socket.close();
  }
}
