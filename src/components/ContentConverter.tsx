import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Wand2, Image as ImageIcon, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContentConverter = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [result, setResult] = useState<{
    summary: string;
    imagePrompt: string;
    generatedImage?: string;
    audioContent?: string;
  } | null>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Please enter some text",
        description: "Add the educational content you want to convert",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("convert-content", {
        body: { text: inputText },
      });

      if (error) throw error;

      setResult(data);
      toast({
        title: "Content converted successfully!",
        description: "Your learning materials are ready",
      });
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: "Conversion failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="converter" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI Content{" "}
            <span className="gradient-warm bg-clip-text text-transparent">Converter</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform any educational text into visual learning materials
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6 shadow-medium">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-primary" />
              Enter Your Text
            </h3>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type educational content here... For example: 'Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to create oxygen and energy in the form of sugar.'"
              className="min-h-[300px] text-base resize-none"
            />
            <Button
              onClick={handleConvert}
              disabled={isLoading}
              className="w-full mt-4"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 w-5 h-5" />
                  Convert to Visual Learning
                </>
              )}
            </Button>
          </Card>

          {/* Output Section */}
          <div className="space-y-4">
            {result ? (
              <>
                <Card className="p-6 shadow-medium">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-secondary" />
                    Visual Summary
                  </h3>
                  <p className="text-base leading-relaxed">{result.summary}</p>
                </Card>

                {result.generatedImage && (
                  <Card className="p-6 shadow-medium">
                    <h3 className="text-xl font-semibold mb-3">Generated Visual</h3>
                    <img
                      src={result.generatedImage}
                      alt="AI generated visual learning aid"
                      className="w-full rounded-lg"
                    />
                  </Card>
                )}

                <Card className="p-6 shadow-medium">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-accent" />
                    Audio Narration
                  </h3>
                  {result.audioContent ? (
                    <audio controls className="w-full">
                      <source src={`data:audio/mpeg;base64,${result.audioContent}`} type="audio/mpeg" />
                      Your browser does not support audio playback.
                    </audio>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={async () => {
                          setIsGeneratingAudio(true);
                          try {
                            const { data, error } = await supabase.functions.invoke("generate-audio", {
                              body: { text: result.summary },
                            });

                            if (error) throw error;

                            setResult({ ...result, audioContent: data.audioContent });
                            toast({
                              title: "Audio generated!",
                              description: "You can now listen to the summary",
                            });
                          } catch (error: any) {
                            console.error("Audio generation error:", error);
                            toast({
                              title: "Audio generation failed",
                              description: error.message || "Please add ELEVENLABS_API_KEY in backend secrets",
                              variant: "destructive",
                            });
                          } finally {
                            setIsGeneratingAudio(false);
                          }
                        }}
                        disabled={isGeneratingAudio}
                      >
                        {isGeneratingAudio ? (
                          <>
                            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                            Generating Audio...
                          </>
                        ) : (
                          <>
                            <Volume2 className="mr-2 w-5 h-5" />
                            Generate Audio
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-muted-foreground mt-3">
                        Click to generate audio narration
                      </p>
                    </>
                  )}
                </Card>
              </>
            ) : (
              <Card className="p-12 shadow-soft border-dashed flex flex-col items-center justify-center text-center min-h-[300px]">
                <ImageIcon className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  Your converted content will appear here
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
