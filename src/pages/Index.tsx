import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ContentConverter } from "@/components/ContentConverter";
import { AssessmentPreview } from "@/components/AssessmentPreview";
import { CreatorShowcase } from "@/components/CreatorShowcase";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <ContentConverter />
      <AssessmentPreview />
      <CreatorShowcase />
      
      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">LearnPictorial</h3>
          <p className="text-muted-foreground mb-4">
            Democratizing accessible education through AI-powered learning tools
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 LearnPictorial. Empowering dyslexic learners worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
