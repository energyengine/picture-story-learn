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
    const { text } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    if (!OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const systemPromptSummary = 'You are an expert educational content adapter for dyslexic learners. Create clear, concise summaries using simple words, short sentences, and concrete examples. Use visual language and break complex ideas into digestible chunks.';
    const userPromptSummary = `Adapt this educational content for dyslexic learners. Make it visual, concrete, and easy to understand:\n\n${text}`;

    // First, create a dyslexia-friendly summary with fallback
    let summaryResponse;
    let usedFreeModelForSummary = false;

    try {
      summaryResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1',
          messages: [
            { role: 'system', content: systemPromptSummary },
            { role: 'user', content: userPromptSummary },
          ],
        }),
      });

      if (!summaryResponse.ok) {
        throw new Error('Paid model failed for summary');
      }
    } catch (error) {
      console.log('Paid model failed for summary, retrying with free model:', error);
      usedFreeModelForSummary = true;

      summaryResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [
            { role: 'system', content: systemPromptSummary },
            { role: 'user', content: userPromptSummary },
          ],
        }),
      });
    }

    if (!summaryResponse.ok) {
      const errorText = await summaryResponse.text();
      console.error('Summary API error:', errorText);
      
      let errorMessage = 'Failed to generate summary';
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // Use default error message
      }
      
      throw new Error(errorMessage);
    }

    const summaryData = await summaryResponse.json();
    const summary = summaryData.choices[0].message.content;

    const systemPromptImage = 'You are an expert at creating visual learning prompts. Create detailed, educational image prompts that help dyslexic learners understand concepts through visual metaphors.';
    const userPromptImage = `Create a detailed image generation prompt for an educational illustration that helps explain this concept:\n\n${summary}\n\nThe image should be clear, colorful, and visually explain the key ideas.`;

    // Create an image prompt based on the summary with fallback
    let imagePromptResponse;
    let usedFreeModelForImagePrompt = false;

    try {
      imagePromptResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1',
          messages: [
            { role: 'system', content: systemPromptImage },
            { role: 'user', content: userPromptImage },
          ],
        }),
      });

      if (!imagePromptResponse.ok) {
        throw new Error('Paid model failed for image prompt');
      }
    } catch (error) {
      console.log('Paid model failed for image prompt, retrying with free model:', error);
      usedFreeModelForImagePrompt = true;

      imagePromptResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [
            { role: 'system', content: systemPromptImage },
            { role: 'user', content: userPromptImage },
          ],
        }),
      });
    }

    if (!imagePromptResponse.ok) {
      console.error('Image prompt API error:', await imagePromptResponse.text());
      throw new Error('Failed to generate image prompt');
    }

    const imagePromptData = await imagePromptResponse.json();
    const imagePrompt = imagePromptData.choices[0].message.content;

    // Note: DeepSeek doesn't support image generation, keeping this as null
    // Users will need a separate image generation service for this feature
    const generatedImage = null;

    return new Response(
      JSON.stringify({
        summary,
        imagePrompt,
        generatedImage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in convert-content:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
