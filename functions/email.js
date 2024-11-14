import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export default {
  async fetch(request, env) {
    const { subject, body } = await request.json();
    
    const msg = createMimeMessage();
    msg.setSender({ name: "Portfolio Site", addr: "noreply@saurabhn.com" });
    msg.setRecipient("me@saurabhn.com");
    msg.setSubject(subject);
    msg.addMessage({
      contentType: 'text/plain',
      data: body
    });

    const message = new EmailMessage(
      "noreply@saurabhn.com",
      "me@saurabhn.com",
      msg.asRaw()
    );

    try {
      await env.SEB.send(message);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      return new Response(JSON.stringify({ success: false, error: e.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
};
