export async function onRequest(context) {
  const { request, env } = context;
  const { subject, body, userEmail } = await request.json();

  try {
    const email = {
      from: env.send_email.fromAddress,
      to: "me@saurabhn.com",
      subject: subject,
      text: `From: ${userEmail}\n\n${body}`,
      headers: {
        "Reply-To": userEmail
      }
    };

    await env.send_email.send(email);

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
