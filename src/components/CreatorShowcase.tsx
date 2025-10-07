import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Star, TrendingUp } from "lucide-react";

const creators = [
  {
    name: "Sarah Chen",
    specialty: "Visual Learning Designer",
    rating: 4.9,
    sales: 1250,
    badge: "Top Creator",
  },
  {
    name: "Marcus Williams",
    specialty: "Dyslexic Author",
    rating: 4.8,
    sales: 980,
    badge: "Rising Star",
  },
  {
    name: "Emma Rodriguez",
    specialty: "Educational Illustrator",
    rating: 5.0,
    sales: 2100,
    badge: "Best Seller",
  },
];

export const CreatorShowcase = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Creator Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Empowering{" "}
            <span className="gradient-warm bg-clip-text text-transparent">
              Dyslexic Creators
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our marketplace where dyslexic artists, writers, and educators earn from their creations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {creators.map((creator, index) => (
            <Card key={index} className="p-6 shadow-soft hover:shadow-medium transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
                  {creator.name.charAt(0)}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {creator.badge}
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold mb-1">{creator.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{creator.specialty}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{creator.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>{creator.sales.toLocaleString()} sales</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 text-center shadow-medium">
          <h3 className="text-2xl font-bold mb-3">Join Our Creator Community</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Showcase your dyslexic-friendly content, collaborate with others, and earn through our commission-based marketplace
          </p>
          <Button size="lg" variant="outline">
            <Users className="mr-2 w-5 h-5" />
            Become a Creator
          </Button>
        </Card>
      </div>
    </section>
  );
};
