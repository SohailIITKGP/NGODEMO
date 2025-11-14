import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  language: 'en' | 'hi';
}

export const Footer = ({ language }: FooterProps) => {
  const content = {
    en: {
      about: "About",
      aboutText: "Transforming lives through transparent, secure digital social impact initiatives.",
      quickLinks: "Quick Links",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Membership", href: "#membership" },
        { label: "Contact", href: "#contact" }
      ],
      contact: "Contact Us",
      contactInfo: [
        { icon: Mail, text: "contact@socialimpact.org" },
        { icon: Phone, text: "+91 1234567890" },
        { icon: MapPin, text: "New Delhi, India" }
      ],
      social: "Follow Us",
      rights: "© 2024 Social Impact Platform. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    hi: {
      about: "हमारे बारे में",
      aboutText: "पारदर्शी, सुरक्षित डिजिटल सामाजिक प्रभाव पहल के माध्यम से जीवन को बदलना।",
      quickLinks: "त्वरित लिंक",
      links: [
        { label: "हमारे बारे में", href: "#about" },
        { label: "परियोजनाएं", href: "#projects" },
        { label: "सदस्यता", href: "#membership" },
        { label: "संपर्क करें", href: "#contact" }
      ],
      contact: "संपर्क करें",
      contactInfo: [
        { icon: Mail, text: "contact@socialimpact.org" },
        { icon: Phone, text: "+91 1234567890" },
        { icon: MapPin, text: "नई दिल्ली, भारत" }
      ],
      social: "हमें फॉलो करें",
      rights: "© 2024 सोशल इम्पैक्ट प्लेटफॉर्म। सर्वाधिकार सुरक्षित।",
      privacy: "गोपनीयता नीति",
      terms: "सेवा की शर्तें"
    }
  };

  const t = content[language];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">SI</span>
              </div>
              <span className="font-bold text-xl text-primary">
                Social Impact
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.aboutText}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">{t.quickLinks}</h3>
            <ul className="space-y-2">
              {t.links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">{t.contact}</h3>
            <ul className="space-y-3">
              {t.contactInfo.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">{t.social}</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg border border-border hover:border-primary hover:bg-muted transition-all duration-200"
                >
                  <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">{t.rights}</p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              {t.privacy}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
