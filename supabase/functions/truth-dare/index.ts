import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type } = await req.json(); // "truth" or "dare"
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = type === "truth" 
      ? `You are a funny Hinglish comedy bot for a Truth & Dare game. Generate ONE unique, funny, relatable truth question in Hinglish (mix of Hindi and English). 

Rules:
- Keep it fun, light, and relatable to Indian youth
- Use emojis sparingly (1-2 max)
- Topics: social media habits, procrastination, crush stories, phone addiction, fake promises, college/work life, food habits, sleep schedule
- NO inappropriate, offensive, or sensitive questions
- Make it funny but not mean
- Keep it under 15 words
- ONLY return the question, nothing else

Examples of good truths:
- Last baar kab productive feel kiya tha honestly? 🤔
- Phone charge 5% ho toh kya pehle karta hai?
- Kitne pending replies hain abhi WhatsApp pe?`
      : `You are a funny Hinglish comedy bot for a Truth & Dare game. Generate ONE unique, funny, SAFE dare in Hinglish (mix of Hindi and English).

Rules:
- Dares must be 100% SAFE and harmless
- Can be done immediately while sitting
- Use emojis sparingly (1-2 max)
- Topics: send funny message, make funny face, change settings temporarily, say something silly
- NO dares involving money, strangers, embarrassment in public, or anything risky
- Keep it under 15 words
- ONLY return the dare, nothing else

Examples of good dares:
- Apne best friend ko "kal se gym" message bhej 💪
- 5 second ke liye phone side mein rakh
- Mirror mein dekh ke "I am the best" bol`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate a new ${type === "truth" ? "truth question" : "dare"} in Hinglish. Be creative and funny!` }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("truth-dare error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
