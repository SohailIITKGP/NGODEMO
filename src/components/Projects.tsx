import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Calendar, Target, Users } from "lucide-react";

interface ProjectsProps {
  language: 'en' | 'hi';
}

export const Projects = ({ language }: ProjectsProps) => {
  const content = {
    en: {
      title: "Active Projects",
      subtitle: "Support our initiatives for social development and community empowerment",
      viewAll: "View All Projects",
      donate: "Donate Now",
      raised: "Raised",
      goal: "Goal",
      donors: "Donors",
      daysLeft: "days left",
      projects: [
        {
          title: "Rural Education Initiative",
          description: "Providing quality education and learning resources to children in rural areas",
          raised: 450000,
          goal: 1000000,
          donors: 234,
          daysLeft: 45,
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
        },
        {
          title: "Women Empowerment Program",
          description: "Skill development and entrepreneurship training for rural women",
          raised: 320000,
          goal: 750000,
          donors: 156,
          daysLeft: 60,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800"
        },
        {
          title: "Clean Water Access",
          description: "Installing water purification systems in underserved communities",
          raised: 680000,
          goal: 800000,
          donors: 389,
          daysLeft: 30,
          image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=800"
        }
      ]
    },
    hi: {
      title: "सक्रिय परियोजनाएं",
      subtitle: "सामाजिक विकास और सामुदायिक सशक्तिकरण के लिए हमारी पहल का समर्थन करें",
      viewAll: "सभी परियोजनाएं देखें",
      donate: "अभी दान करें",
      raised: "एकत्रित",
      goal: "लक्ष्य",
      donors: "दाताओं",
      daysLeft: "दिन शेष",
      projects: [
        {
          title: "ग्रामीण शिक्षा पहल",
          description: "ग्रामीण क्षेत्रों में बच्चों को गुणवत्तापूर्ण शिक्षा और सीखने के संसाधन प्रदान करना",
          raised: 450000,
          goal: 1000000,
          donors: 234,
          daysLeft: 45,
          image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
        },
        {
          title: "महिला सशक्तिकरण कार्यक्रम",
          description: "ग्रामीण महिलाओं के लिए कौशल विकास और उद्यमिता प्रशिक्षण",
          raised: 320000,
          goal: 750000,
          donors: 156,
          daysLeft: 60,
          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800"
        },
        {
          title: "स्वच्छ जल की पहुंच",
          description: "अल्प सेवा वाले समुदायों में जल शुद्धिकरण प्रणाली स्थापित करना",
          raised: 680000,
          goal: 800000,
          donors: 389,
          daysLeft: 30,
          image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=800"
        }
      ]
    }
  };

  const t = content[language];

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 1000).toFixed(0)}k`;
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {t.projects.map((project, index) => {
            const progress = (project.raised / project.goal) * 100;
            
            return (
              <Card key={index} className="overflow-hidden border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-card-foreground">
                        {formatCurrency(project.raised)} {t.raised}
                      </span>
                      <span className="text-muted-foreground">
                        {t.goal}: {formatCurrency(project.goal)}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.donors} {t.donors}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{project.daysLeft} {t.daysLeft}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary-light shadow-md transition-all duration-300"
                    onClick={() => window.location.href = `/project/${index + 1}/donate`}
                  >
                    {t.donate}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-border hover:bg-muted">
            {t.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};
