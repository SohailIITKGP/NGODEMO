import { Shield, Users, Heart, TrendingUp, FileText, Bell } from "lucide-react";

interface FeaturesProps {
  language: 'en' | 'hi';
}

export const Features = ({ language }: FeaturesProps) => {
  const content = {
    en: {
      title: "Why Choose Our Platform?",
      subtitle: "Built on modern technology for transparency, security, and scalability",
      features: [
        {
          icon: Users,
          title: "Digital Membership",
          description: "Easy online registration with auto-generated membership cards and QR codes"
        },
        {
          icon: Heart,
          title: "Secure Donations",
          description: "Transparent crowdfunding with instant receipts via Email and WhatsApp"
        },
        {
          icon: Shield,
          title: "Bank-Level Security",
          description: "Encrypted data, HTTPS SSL, OTP verification, and complete audit trails"
        },
        {
          icon: TrendingUp,
          title: "Real-Time Tracking",
          description: "Track project progress and donation impact with live updates"
        },
        {
          icon: FileText,
          title: "Smart Reporting",
          description: "Generate detailed reports in CSV/Excel format for CSR compliance"
        },
        {
          icon: Bell,
          title: "Auto Notifications",
          description: "Instant updates on approvals, donations, and project milestones"
        }
      ]
    },
    hi: {
      title: "हमारा प्लेटफ़ॉर्म क्यों चुनें?",
      subtitle: "पारदर्शिता, सुरक्षा और स्केलेबिलिटी के लिए आधुनिक तकनीक पर निर्मित",
      features: [
        {
          icon: Users,
          title: "डिजिटल सदस्यता",
          description: "ऑटो-जनरेटेड मेम्बरशिप कार्ड और QR कोड के साथ आसान ऑनलाइन पंजीकरण"
        },
        {
          icon: Heart,
          title: "सुरक्षित दान",
          description: "ईमेल और व्हाट्सएप के माध्यम से तत्काल रसीद के साथ पारदर्शी क्राउडफंडिंग"
        },
        {
          icon: Shield,
          title: "बैंक-स्तरीय सुरक्षा",
          description: "एन्क्रिप्टेड डेटा, HTTPS SSL, OTP सत्यापन और पूर्ण ऑडिट ट्रेल"
        },
        {
          icon: TrendingUp,
          title: "रियल-टाइम ट्रैकिंग",
          description: "लाइव अपडेट के साथ परियोजना की प्रगति और दान के प्रभाव को ट्रैक करें"
        },
        {
          icon: FileText,
          title: "स्मार्ट रिपोर्टिंग",
          description: "CSR अनुपालन के लिए CSV/Excel प्रारूप में विस्तृत रिपोर्ट बनाएं"
        },
        {
          icon: Bell,
          title: "ऑटो नोटिफिकेशन",
          description: "अनुमोदन, दान और परियोजना मील के पत्थर पर तत्काल अपडेट"
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-start space-y-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
