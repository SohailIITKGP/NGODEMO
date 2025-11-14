import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
}

export const Navigation = ({ language, onLanguageToggle }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // <-- For navigation

  const content = {
    en: {
      home: "Home",
      about: "About Us",
      projects: "Projects",
      membership: "Membership",
      contact: "Contact",
      donate: "Donate Now",
      login: "Login"
    },
    hi: {
      home: "होम",
      about: "हमारे बारे में",
      projects: "परियोजनाएं",
      membership: "सदस्यता",
      contact: "संपर्क करें",
      donate: "अभी दान करें",
      login: "लॉगिन"
    }
  };

  const t = content[language];

  const navItems = [
    { label: t.home, href: "/" },
    { label: t.about, href: "/#about" },
    { label: t.projects, href: "/#projects" },
    { label: t.membership, href: "/member-registration" },
    { label: t.contact, href: "/#contact" },
  ];

  // Handle navigation with mobile menu close
  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      // Smooth scroll for same-page anchors
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(href);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">SI</span>
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">
              Social Impact
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onLanguageToggle}
              className="hover:bg-primary/10"
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            {/* Desktop Login Button */}
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
              onClick={() => navigate('/admin/login')}
            >
              {t.login}
            </Button>

            {/* Desktop Donate Button */}
            <Button
              className="hidden sm:inline-flex bg-primary hover:bg-primary-light shadow-md transition-all duration-300"
              onClick={() => navigate('/project/1/donate')}
            >
              {t.donate}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/50 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-md transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-4 space-y-2">
              {/* Mobile Login Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  navigate('/admin/login');
                  setMobileMenuOpen(false);
                }}
              >
                {t.login}
              </Button>

              {/* Mobile Donate Button */}
              <Button
                className="w-full bg-primary hover:bg-primary-light shadow-md"
                onClick={() => {
                  navigate('/project/1/donate');
                  setMobileMenuOpen(false);
                }}
              >
                {t.donate}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};