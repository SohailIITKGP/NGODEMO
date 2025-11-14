import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Users, DollarSign, FileText } from "lucide-react";
import MemberApproval from "@/components/admin/MemberApproval";
import DonationTracking from "@/components/admin/DonationTracking";
import Reports from "@/components/admin/Reports";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "hi">("en");

  useEffect(() => {
    // Check authentication (frontend only demo)
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const text = {
    en: {
      title: "Admin Dashboard",
      members: "Members",
      donations: "Donations",
      reports: "Reports",
      logout: "Logout"
    },
    hi: {
      title: "एडमिन डैशबोर्ड",
      members: "सदस्य",
      donations: "दान",
      reports: "रिपोर्ट",
      logout: "लॉगआउट"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">{text[language].title}</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            >
              {language === "en" ? "हिंदी" : "English"}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {text[language].logout}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="members">
              <Users className="mr-2 h-4 w-4" />
              {text[language].members}
            </TabsTrigger>
            <TabsTrigger value="donations">
              <DollarSign className="mr-2 h-4 w-4" />
              {text[language].donations}
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="mr-2 h-4 w-4" />
              {text[language].reports}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <MemberApproval language={language} />
          </TabsContent>

          <TabsContent value="donations">
            <DonationTracking language={language} />
          </TabsContent>

          <TabsContent value="reports">
            <Reports language={language} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
