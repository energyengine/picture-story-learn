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
      <footer className="bg-card border-t py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3 gradient-hero bg-clip-text text-transparent">LexiVisual AI</h3>
            <p className="text-muted-foreground text-lg mb-2">
              Democratizing accessible education through AI-powered learning tools
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 LexiVisual AI. Empowering dyslexic learners worldwide.
            </p>
          </div>
          
          {/* Team Section */}
          <div className="border-t pt-8">
            <h4 className="text-xl font-bold text-center mb-6">Meet Our Team</h4>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <h5 className="font-semibold text-lg mb-1">Prince Yadav</h5>
                <p className="text-sm text-muted-foreground">Developer & AI Integration Lead</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <h5 className="font-semibold text-lg mb-1">Pushkar Saini</h5>
                <p className="text-sm text-muted-foreground">Manager & Researcher</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <h5 className="font-semibold text-lg mb-1">Vihaan Jain</h5>
                <p className="text-sm text-muted-foreground">UI/UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
