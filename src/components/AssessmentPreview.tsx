import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ClipboardCheck, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const assessmentQuestions = [
  {
    id: 1,
    question: "When reading, do letters or words seem to move, blur, or jump around?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 2,
    question: "Do you find it easier to understand information when it's presented with pictures or diagrams?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 3,
    question: "How comfortable are you with reading long paragraphs of text?",
    options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"],
  },
  {
    id: 4,
    question: "Do you mix up similar-looking letters like 'b' and 'd' or 'p' and 'q'?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 5,
    question: "How often do you need to re-read sentences or paragraphs to understand them?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 6,
    question: "Do you prefer learning through hands-on activities rather than reading instructions?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 7,
    question: "How difficult is it for you to remember what you've read after finishing a page?",
    options: ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
  },
  {
    id: 8,
    question: "Do you find it challenging to sound out unfamiliar words?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 9,
    question: "How often do you use your finger or a ruler to keep your place while reading?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 10,
    question: "Do you understand concepts better when someone explains them verbally rather than in writing?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 11,
    question: "How comfortable are you with spelling words correctly?",
    options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"],
  },
  {
    id: 12,
    question: "Do you find it difficult to organize your thoughts when writing?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 13,
    question: "How often do you skip words or lines while reading?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 14,
    question: "Do you prefer learning with colorful, visually engaging materials?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 15,
    question: "How challenging is it for you to follow written multi-step instructions?",
    options: ["Very easy", "Easy", "Neutral", "Difficult", "Very difficult"],
  },
];

export const AssessmentPreview = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const allQuestionsAnswered = Object.keys(answers).length === assessmentQuestions.length;

  const handleCompleteAssessment = async () => {
    if (!allQuestionsAnswered) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Format answers with question text for better AI analysis
      const formattedAnswers = assessmentQuestions.reduce((acc, q) => {
        acc[q.question] = answers[q.id];
        return acc;
      }, {} as Record<string, string>);

      const { data, error } = await supabase.functions.invoke('analyze-assessment', {
        body: { answers: formattedAnswers }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete!",
        description: "Your personalized learning profile is ready.",
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById('analysis-results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      console.error('Assessment analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze your assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAssessment = () => {
    setAnswers({});
    setAnalysis(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="assessment" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <ClipboardCheck className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Assessment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Dyslexia{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              Screening Quiz
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete this comprehensive assessment to receive personalized learning recommendations
          </p>
        </div>

        <Card className="p-8 shadow-large mb-8">
          <div className="space-y-8">
            {assessmentQuestions.map((q) => (
              <div key={q.id} className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {q.id}. {q.question}
                </h3>
                <RadioGroup
                  value={answers[q.id] || ""}
                  onValueChange={(value) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: value }))
                  }
                  disabled={analysis !== null}
                >
                  <div className="grid grid-cols-1 gap-3">
                    {q.options.map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                        <Label
                          htmlFor={`${q.id}-${option}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {Object.keys(answers).length} of {assessmentQuestions.length} questions answered
              </p>
              {!allQuestionsAnswered && (
                <p className="text-sm font-medium text-primary">
                  {assessmentQuestions.length - Object.keys(answers).length} remaining
                </p>
              )}
            </div>
            {!analysis ? (
              <Button 
                size="lg" 
                className="w-full" 
                onClick={handleCompleteAssessment}
                disabled={!allQuestionsAnswered || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Analyzing Your Responses...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 w-5 h-5" />
                    Complete Assessment & Get AI Analysis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            ) : (
              <Button 
                size="lg" 
                variant="outline"
                className="w-full" 
                onClick={resetAssessment}
              >
                Take Assessment Again
              </Button>
            )}
          </div>
        </Card>

        {analysis && (
          <Card id="analysis-results" className="p-8 shadow-large bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Your Personalized Learning Profile</h3>
            </div>
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {analysis}
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};
