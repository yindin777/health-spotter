interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  if (request.method === "POST") {
    const data = await request.json();
    const { phone } = data;
    
    // Here we would integrate with a phone verification service
    // For now, we'll just store the phone number
    try {
      await env.DB.prepare(
        "INSERT INTO users (phone, verified) VALUES (?, ?)"
      ).bind(phone, false).run();
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Verification code sent" 
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Failed to process request" 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
  return new Response("Method not allowed", { status: 405 });
};