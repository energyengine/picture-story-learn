import { Card } from "@/components/ui/card";
import { Brain, Image, Volume2, Users, Award, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Dyslexia Assessment",
    description: "Early screening powered by advanced NLP pattern detection to identify learning profiles",
    color: "text-primary",
  },
  {
    icon: Image,
    title: "Pictorial Conversion",
    description: "Transform text into contextual images and visual metaphors using generative AI",
    color: "text-secondary",
  },
  {
    icon: Volume2,
    title: "Audio Narration",
    description: "Convert content to speech with customizable voices and reading speeds",
    color: "text-accent",
  },
  {
    icon: Users,
    title: "Creator Community",
    description: "Showcase and sell dyslexic-friendly content in our inclusive marketplace",
    color: "text-primary",
  },
  {
    icon: Award,
    title: "Adaptive Learning",
    description: "Personalized learning paths that adjust to each student's progress",
    color: "text-secondary",
  },
  {
    icon: Zap,
    title: "Offline Access",
    description: "Download content for learning anywhere, anytime without internet",
    color: "text-accent",
  },
];

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              Every Learner
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to make education accessible and engaging
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${feature.color}/10 to-${feature.color}/5 flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
