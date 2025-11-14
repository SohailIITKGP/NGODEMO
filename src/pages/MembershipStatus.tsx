import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { ArrowLeft, Download, CheckCircle, Clock, XCircle, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MembershipStatus = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [applicationId, setApplicationId] = useState("");
  const [applicationData, setApplicationData] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const content = {
    en: {
      title: "Check Membership Status",
      subtitle: "Enter your application ID to check status",
      applicationId: "Application ID",
      search: "Check Status",
      backToHome: "Back to Home",
      notFound: "Application not found",
      notFoundDesc: "Please check your application ID and try again",
      status: "Status",
      submittedOn: "Submitted On",
      personalInfo: "Personal Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      downloadCard: "Download Membership Card",
      membershipCard: "Membership Card",
      memberId: "Member ID",
      pending: "Pending Approval",
      approved: "Approved",
      rejected: "Rejected",
      cardGenerated: "Membership card generated successfully!",
    },
    hi: {
      title: "सदस्यता स्थिति जांचें",
      subtitle: "स्थिति जांचने के लिए अपनी आवेदन आईडी दर्ज करें",
      applicationId: "आवेदन आईडी",
      search: "स्थिति जांचें",
      backToHome: "होम पर वापस",
      notFound: "आवेदन नहीं मिला",
      notFoundDesc: "कृपया अपनी आवेदन आईडी जांचें और पुनः प्रयास करें",
      status: "स्थिति",
      submittedOn: "जमा किया गया",
      personalInfo: "व्यक्तिगत जानकारी",
      name: "नाम",
      email: "ईमेल",
      phone: "फोन",
      address: "पता",
      downloadCard: "सदस्यता कार्ड डाउनलोड करें",
      membershipCard: "सदस्यता कार्ड",
      memberId: "सदस्य आईडी",
      pending: "अनुमोदन लंबित",
      approved: "अनुमोदित",
      rejected: "अस्वीकृत",
      cardGenerated: "सदस्यता कार्ड सफलतापूर्वक बनाया गया!",
    },
  };

  const t = content[language];

  const handleSearch = () => {
    const applications = JSON.parse(localStorage.getItem("memberApplications") || "[]");
    const found = applications.find((app: any) => app.id === applicationId);
    
    if (found) {
      setApplicationData(found);
    } else {
      setApplicationData(null);
      toast({
        title: t.notFound,
        description: t.notFoundDesc,
        variant: "destructive",
      });
    }
  };

  const generateMembershipCard = () => {
    // In real app, this would generate a PDF with QR code
    // For demo, we'll just show success message
    toast({
      title: t.cardGenerated,
      description: language === "en" ? "Check your email for the download link" : "डाउनलोड लिंक के लिए अपना ईमेल चेक करें",
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === "approved") {
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          <CheckCircle className="h-4 w-4 mr-1" />
          {t.approved}
        </Badge>
      );
    } else if (status === "pending") {
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">
          <Clock className="h-4 w-4 mr-1" />
          {t.pending}
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive">
          <XCircle className="h-4 w-4 mr-1" />
          {t.rejected}
        </Badge>
      );
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation language={language} onLanguageToggle={() => setLanguage(language === "en" ? "hi" : "en")} />
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToHome}
          </Button>

          <Card className="shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">{t.title}</CardTitle>
              <CardDescription>{t.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="applicationId">{t.applicationId}</Label>
                  <Input
                    id="applicationId"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    placeholder="APP12345678"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} className="bg-primary hover:bg-primary-light">
                    {t.search}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {applicationData && (
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{applicationData.fullName}</CardTitle>
                    <CardDescription>
                      {t.applicationId}: {applicationData.id}
                    </CardDescription>
                  </div>
                  {getStatusBadge(applicationData.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.submittedOn}</p>
                    <p className="font-semibold">
                      {new Date(applicationData.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.status}</p>
                    <p className="font-semibold capitalize">{applicationData.status}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">{t.personalInfo}</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{t.email}</p>
                        <p className="font-medium">{applicationData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.phone}</p>
                        <p className="font-medium">{applicationData.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.address}</p>
                      <p className="font-medium">
                        {applicationData.address}, {applicationData.city}, {applicationData.state} - {applicationData.pincode}
                      </p>
                    </div>
                  </div>
                </div>

                {applicationData.status === "approved" && (
                  <div className="pt-4 border-t">
                    <div className="bg-primary/10 p-6 rounded-lg text-center space-y-4">
                      <CreditCard className="h-16 w-16 text-primary mx-auto" />
                      <div>
                        <h4 className="text-xl font-bold text-primary mb-2">{t.membershipCard}</h4>
                        <p className="text-sm text-muted-foreground mb-1">{t.memberId}</p>
                        <p className="text-lg font-bold">{applicationData.id}</p>
                      </div>
                      <Button
                        onClick={generateMembershipCard}
                        className="bg-primary hover:bg-primary-light shadow-lg"
                        size="lg"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        {t.downloadCard}
                      </Button>
                    </div>
                  </div>
                )}

                {applicationData.status === "pending" && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      {language === "en" 
                        ? "Your application is under review. You will be notified via email once it's approved."
                        : "आपका आवेदन समीक्षाधीन है। अनुमोदन के बाद आपको ईमेल के माध्यम से सूचित किया जाएगा।"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipStatus;
