import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();

    if (!answers || Object.keys(answers).length === 0) {
      throw new Error('Assessment answers are required');
    }

    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    // Format answers for analysis
    const formattedAnswers = Object.entries(answers)
      .map(([question, answer]) => `Q: ${question}\nA: ${answer}`)
      .join('\n\n');

    const systemPrompt = `You are an educational psychologist specializing in dyslexia and learning differences. 
Analyze assessment responses and provide a clear, actionable report with a numerical score.
Be supportive, specific, and use simple language.`;

    const userPrompt = `Analyze these dyslexia screening responses and provide a report in this EXACT format:

**DYSLEXIA RISK SCORE: [0-100]/100**
(0-30: Low risk, 31-60: Moderate risk, 61-100: High risk - may benefit from professional assessment)

**LEARNING PROFILE:**
[2-3 sentences describing the person's learning style in simple terms]

**KEY STRENGTHS:**
• [Strength 1]
• [Strength 2]
• [Strength 3]

**AREAS FOR SUPPORT:**
• [Area 1]
• [Area 2]
• [Area 3]

**RECOMMENDED STRATEGIES:**
1. [Simple, actionable strategy]
2. [Simple, actionable strategy]
3. [Simple, actionable strategy]

**NEXT STEPS:**
[Clear guidance on what to do next - 2-3 sentences]

Assessment responses:
${formattedAnswers}`;

    // Use free model only
    const analysisResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!analysisResponse.ok) {
      if (analysisResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (analysisResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      console.error('AI analysis error:', await analysisResponse.text());
      throw new Error('Failed to analyze assessment');
    }

    const analysisData = await analysisResponse.json();
    const analysis = analysisData.choices[0].message.content;

    return new Response(
      JSON.stringify({ analysis }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in analyze-assessment:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
