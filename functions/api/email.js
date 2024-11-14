import { EmailMessage } from "cloudflare:email";

export async function onRequest(context) {
  const { request } = context;
  const { subject, body, userEmail } = await request.json();
  
  const emailContent = `
From: ${userEmail}
Reply-To: ${userEmail}
Content-Type: text/plain

${body}
`;

  const message = new EmailMessage(
    "noreply@saurabhn.com",
    "me@saurabhn.com",
    emailContent
  );

  try {
    await context.env.SEB.send(message);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
