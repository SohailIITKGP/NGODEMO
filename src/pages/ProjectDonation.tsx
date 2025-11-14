import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/Navigation";
import { ArrowLeft, Heart, Users, Calendar, CheckCircle, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProjectDonation = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [receiptId, setReceiptId] = useState("");

  const [donationData, setDonationData] = useState({
    amount: "",
    name: "",
    email: "",
    phone: "",
    pan: "",
    message: "",
  });

  const content = {
    en: {
      backToHome: "Back to Home",
      donate: "Make a Donation",
      donateNow: "Donate Now",
      amount: "Donation Amount",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      pan: "PAN Number (for 80G receipt)",
      message: "Message (Optional)",
      raised: "Raised",
      goal: "Goal",
      donors: "Donors",
      daysLeft: "days left",
      paymentSecure: "Secure payment via Razorpay",
      successTitle: "Donation Successful!",
      successDesc: "Thank you for your generous contribution. Your receipt has been sent to your email and WhatsApp.",
      receiptId: "Receipt ID",
      downloadReceipt: "Download Receipt",
      shareReceipt: "Share on WhatsApp",
      predefinedAmounts: "Quick Select",
    },
    hi: {
      backToHome: "होम पर वापस",
      donate: "दान करें",
      donateNow: "अभी दान करें",
      amount: "दान राशि",
      name: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर",
      pan: "पैन नंबर (80G रसीद के लिए)",
      message: "संदेश (वैकल्पिक)",
      raised: "एकत्रित",
      goal: "लक्ष्य",
      donors: "दाताओं",
      daysLeft: "दिन शेष",
      paymentSecure: "Razorpay के माध्यम से सुरक्षित भुगतान",
      successTitle: "दान सफल!",
      successDesc: "आपके उदार योगदान के लिए धन्यवाद। आपकी रसीद आपके ईमेल और व्हाट्सएप पर भेज दी गई है।",
      receiptId: "रसीद आईडी",
      downloadReceipt: "रसीद डाउनलोड करें",
      shareReceipt: "व्हाट्सएप पर शेयर करें",
      predefinedAmounts: "त्वरित चयन",
    },
  };

  const t = content[language];

  // Mock project data (in real app, fetch from backend)
  const projects = {
    "1": {
      title: language === "en" ? "Rural Education Initiative" : "ग्रामीण शिक्षा पहल",
      description: language === "en" 
        ? "Providing quality education and learning resources to children in rural areas. Your donation will help purchase books, stationery, and digital learning tools."
        : "ग्रामीण क्षेत्रों में बच्चों को गुणवत्तापूर्ण शिक्षा और सीखने के संसाधन प्रदान करना। आपका दान किताबें, स्टेशनरी और डिजिटल लर्निंग टूल खरीदने में मदद करेगा।",
      raised: 450000,
      goal: 1000000,
      donors: 234,
      daysLeft: 45,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    },
    "2": {
      title: language === "en" ? "Women Empowerment Program" : "महिला सशक्तिकरण कार्यक्रम",
      description: language === "en"
        ? "Skill development and entrepreneurship training for rural women. Help us empower women with financial independence."
        : "ग्रामीण महिलाओं के लिए कौशल विकास और उद्यमिता प्रशिक्षण। महिलाओं को वित्तीय स्वतंत्रता के साथ सशक्त बनाने में हमारी मदद करें।",
      raised: 320000,
      goal: 750000,
      donors: 156,
      daysLeft: 60,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    },
    "3": {
      title: language === "en" ? "Clean Water Access" : "स्वच्छ जल की पहुंच",
      description: language === "en"
        ? "Installing water purification systems in underserved communities. Every rupee counts towards providing clean drinking water."
        : "अल्प सेवा वाले समुदायों में जल शुद्धिकरण प्रणाली स्थापित करना। स्वच्छ पेयजल प्रदान करने में हर रुपया मायने रखता है।",
      raised: 680000,
      goal: 800000,
      donors: 389,
      daysLeft: 30,
      image: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=800",
    },
  };

  const project = projects[projectId as keyof typeof projects] || projects["1"];
  const progress = (project.raised / project.goal) * 100;

  const predefinedAmounts = [500, 1000, 2500, 5000];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDonationData({ ...donationData, [e.target.name]: e.target.value });
  };

  const handleAmountSelect = (amount: number) => {
    setDonationData({ ...donationData, amount: amount.toString() });
  };

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!donationData.amount || parseFloat(donationData.amount) < 1) {
      toast({
        title: language === "en" ? "Invalid Amount" : "अवैध राशि",
        description: language === "en" ? "Please enter a valid donation amount" : "कृपया एक वैध दान राशि दर्ज करें",
        variant: "destructive",
      });
      return;
    }

    // In real app, integrate Razorpay here
    // For demo, simulate success
    const receipt = "RCP" + Date.now().toString().slice(-8);
    setReceiptId(receipt);

    // Store donation
    const donations = JSON.parse(localStorage.getItem("donations") || "[]");
    donations.push({
      id: receipt,
      projectId,
      projectTitle: project.title,
      ...donationData,
      date: new Date().toISOString(),
      status: "success",
    });
    localStorage.setItem("donations", JSON.stringify(donations));

    setDonationSuccess(true);
    toast({
      title: t.successTitle,
      description: t.successDesc,
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 1000).toFixed(0)}k`;
  };

  if (donationSuccess) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation language={language} onLanguageToggle={() => setLanguage(language === "en" ? "hi" : "en")} />
        <div className="container mx-auto px-4 py-20 mt-16">
          <Card className="max-w-2xl mx-auto text-center shadow-xl">
            <CardContent className="pt-12 pb-8">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">{t.successTitle}</h2>
              <p className="text-muted-foreground mb-6">{t.successDesc}</p>
              <div className="bg-muted p-4 rounded-lg mb-8">
                <p className="text-sm text-muted-foreground mb-2">{t.receiptId}</p>
                <p className="text-2xl font-bold text-primary">{receiptId}</p>
              </div>
              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => toast({ title: language === "en" ? "Receipt downloaded" : "रसीद डाउनलोड की गई" })} size="lg">
                  {t.downloadReceipt}
                </Button>
                <Button onClick={() => window.open(`https://wa.me/?text=I just donated to ${project.title}! Receipt: ${receiptId}`, '_blank')} variant="outline" size="lg">
                  {t.shareReceipt}
                </Button>
              </div> */}
              <Button onClick={() => navigate("/")} variant="ghost" className="mt-6">
                {t.backToHome}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation language={language} onLanguageToggle={() => setLanguage(language === "en" ? "hi" : "en")} />
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="max-w-5xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToHome}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Details */}
            <div>
              <Card className="shadow-xl">
                <div className="relative h-64 overflow-hidden rounded-t-lg bg-muted">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-card-foreground">
                        {formatCurrency(project.raised)} {t.raised}
                      </span>
                      <span className="text-muted-foreground">
                        {t.goal}: {formatCurrency(project.goal)}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-5 w-5" />
                      <div>
                        <p className="text-2xl font-bold text-foreground">{project.donors}</p>
                        <p className="text-sm">{t.donors}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <div>
                        <p className="text-2xl font-bold text-foreground">{project.daysLeft}</p>
                        <p className="text-sm">{t.daysLeft}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation Form */}
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Heart className="h-6 w-6 text-primary" />
                    {t.donate}
                  </CardTitle>
                  <CardDescription>{t.paymentSecure}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonation} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">{t.amount} (₹) *</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        value={donationData.amount}
                        onChange={handleInputChange}
                        placeholder="1000"
                        required
                      />
                      <div className="flex gap-2 flex-wrap mt-2">
                        <p className="text-sm text-muted-foreground w-full mb-1">{t.predefinedAmounts}:</p>
                        {predefinedAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleAmountSelect(amount)}
                            className={donationData.amount === amount.toString() ? "border-primary bg-primary/10" : ""}
                          >
                            ₹{amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">{t.name} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={donationData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t.email} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={donationData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.phone} *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={donationData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pan">{t.pan}</Label>
                      <Input
                        id="pan"
                        name="pan"
                        value={donationData.pan}
                        onChange={handleInputChange}
                        placeholder="ABCDE1234F"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t.message}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={donationData.message}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary-light shadow-lg" size="lg">
                      <CreditCard className="h-5 w-5 mr-2" />
                      {t.donateNow}
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        {language === "en" 
                          ? "Your donation is secure and tax-deductible under 80G"
                          : "आपका दान सुरक्षित है और 80G के तहत कर कटौती योग्य है"}
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDonation;
