import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ClipboardCheck, ArrowRight } from "lucide-react";

const sampleQuestions = [
  {
    id: 1,
    question: "When reading, do letters or words seem to move, blur, or jump around?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    id: 2,
    question: "Do you find it easier to understand information when it's presented with pictures?",
    options: ["Never", "Sometimes", "Often", "Always"],
  },
  {
    id: 3,
    question: "How comfortable are you with reading long paragraphs of text?",
    options: ["Very comfortable", "Somewhat comfortable", "Uncomfortable", "Very uncomfortable"],
  },
];

export const AssessmentPreview = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <section id="assessment" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <ClipboardCheck className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Early Assessment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Dyslexia{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              Screening Quiz
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take our AI-powered assessment to understand your learning profile
          </p>
        </div>

        <Card className="p-8 shadow-large">
          <div className="space-y-8">
            {sampleQuestions.map((q) => (
              <div key={q.id} className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {q.id}. {q.question}
                </h3>
                <RadioGroup
                  value={answers[q.id] || ""}
                  onValueChange={(value) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: value }))
                  }
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <p className="text-sm text-muted-foreground mb-4 text-center">
              This is a preview of our assessment. The full version includes 20+ questions
              with AI-powered analysis.
            </p>
            <Button size="lg" className="w-full" disabled>
              <ClipboardCheck className="mr-2 w-5 h-5" />
              Complete Full Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              Full assessment requires account creation
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
