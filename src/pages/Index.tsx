import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen">
      <Navigation language={language} onLanguageToggle={toggleLanguage} />
      <main className="pt-16">
        <Hero language={language} />
        <Features language={language} />
        <Projects language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Index;
