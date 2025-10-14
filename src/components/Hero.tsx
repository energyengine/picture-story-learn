import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-warm.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Diverse students learning with visual aids"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/75" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Accessible Learning</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            <span className="gradient-hero bg-clip-text text-transparent">
              LexiVisual AI
            </span>
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-foreground/90 mt-4">
            Learning Made Visual & Accessible
          </p>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Transform educational content into pictorial, auditory, and multimodal formats tailored for dyslexic learners
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="text-lg px-8 group shadow-medium hover:shadow-large transition-all">
              Try Content Converter
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Take Assessment Quiz
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500K+</div>
              <div className="text-sm text-muted-foreground mt-1">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
