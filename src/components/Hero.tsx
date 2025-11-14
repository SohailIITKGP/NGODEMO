import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Target } from "lucide-react";

interface HeroProps {
  language: 'en' | 'hi';
}

export const Hero = ({ language }: HeroProps) => {
  const content = {
    en: {
      title: "Transform Lives Through",
      titleHighlight: "Digital Impact",
      subtitle: "Join our mission to create transparent, secure, and scalable social development initiatives across India",
      ctaPrimary: "Become a Member",
      ctaSecondary: "View Projects",
      stats: [
        { icon: Users, value: "1000+", label: "Active Members" },
        { icon: Heart, value: "50+", label: "Projects Funded" },
        { icon: Target, value: "₹10L+", label: "Impact Created" },
      ]
    },
    hi: {
      title: "डिजिटल प्रभाव के माध्यम से",
      titleHighlight: "जीवन बदलें",
      subtitle: "भारत भर में पारदर्शी, सुरक्षित और स्केलेबल सामाजिक विकास पहल बनाने के हमारे मिशन में शामिल हों",
      ctaPrimary: "सदस्य बनें",
      ctaSecondary: "परियोजनाएं देखें",
      stats: [
        { icon: Users, value: "1000+", label: "सक्रिय सदस्य" },
        { icon: Heart, value: "50+", label: "वित्तपोषित परियोजनाएं" },
        { icon: Target, value: "₹10L+", label: "प्रभाव निर्मित" },
      ]
    }
  };

  const t = content[language];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Text */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              {t.title}
              <span className="block text-primary mt-2">
                {t.titleHighlight}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-light shadow-lg transition-all duration-300 group"
              onClick={() => window.location.href = '/member-registration'}
            >
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-border hover:bg-muted transition-all duration-300"
              onClick={() => window.location.href = '/#projects'}
            >
              {t.ctaSecondary}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            {t.stats.map((stat, index) => (
              <div 
                key={index}
                className="flex flex-col items-center space-y-2 p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <stat.icon className="h-8 w-8 text-primary" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
