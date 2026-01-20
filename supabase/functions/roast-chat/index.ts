import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const fallbackResponses: Record<string, string[]> = {
  roast: [
    "Tu itna smart hai ki WiFi bhi tujhse door bhagta hai 📶",
    "Teri profile pic dekh ke lagta hai filter bhi haar maan gaya 📸",
    "Tu gym jaata hai ya bas selfie lene? 💪🤳",
    "Tera future bright hai... kyunki andhera toh ab hai 🔦",
  ],
  joke: [
    "Ek tha raja, ek thi rani, dono mar gaye... khatam kahani 💀",
    "Doctor: Aapko hasna chahiye. Patient: Kyun? Doctor: Bill dekh loge toh rone lagoge 😂",
    "Monday ko date kyun nahi milti? Kyunki woh week ka ex hai 📅",
    "Alarm clock inventor ke paas alarm nahi tha... woh naturally uthta tha 😴",
  ],
  advice: [
    "Phone band kar aur so ja 📵",
    "Paani pi, touch grass, chill kar 🌿",
    "Jo hona hai hoga, tu kya karega tension lekar? 🤷",
    "Kal ki tension kal dekhi jayegi, aaj mast reh 😎",
  ],
  default: [
    "Kaam bol 😏",
    "Hmm... interesting 🧐",
    "Yeh toh mujhe bhi nahi pata 🤷",
    "Tu serious hai ya mazak kar raha hai? 🤡",
    "Okay... aur? 🙃",
    "Main bot hoon, dil nahi dukhaunga... zyada 😈",
  ]
};

function getResponse(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('roast') || lowerMsg.includes('insult')) {
    return fallbackResponses.roast[Math.floor(Math.random() * fallbackResponses.roast.length)];
  }
  if (lowerMsg.includes('joke') || lowerMsg.includes('funny') || lowerMsg.includes('hasa')) {
    return fallbackResponses.joke[Math.floor(Math.random() * fallbackResponses.joke.length)];
  }
  if (lowerMsg.includes('advice') || lowerMsg.includes('help') || lowerMsg.includes('life')) {
    return fallbackResponses.advice[Math.floor(Math.random() * fallbackResponses.advice.length)];
  }
  
  return fallbackResponses.default[Math.floor(Math.random() * fallbackResponses.default.length)];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const response = getResponse(message || '');
    
    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ response: "Kuch technical problem hai 😅" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
