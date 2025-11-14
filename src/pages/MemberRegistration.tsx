import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, ArrowLeft, CheckCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const MemberRegistration = () => {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    aadharNumber: "",
    occupation: "",
    photo: null as File | null,
    aadharDoc: null as File | null,
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Member Registration",
      subtitle: "Join our community and make an impact",
      step1: "Personal Information",
      step2: "Address Details",
      step3: "Documents Upload",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      dateOfBirth: "Date of Birth",
      address: "Address",
      city: "City",
      state: "State",
      pincode: "PIN Code",
      aadharNumber: "Aadhaar Number",
      occupation: "Occupation",
      photo: "Upload Photo",
      aadharDoc: "Upload Aadhaar Card",
      next: "Next",
      previous: "Previous",
      submit: "Submit Application",
      backToHome: "Back to Home",
      successTitle: "Application Submitted Successfully!",
      successDesc: "Your membership application has been submitted. You will receive an email once it's approved.",
      applicationId: "Application ID",
      checkStatus: "Check Application Status",
    },
    hi: {
      title: "सदस्य पंजीकरण",
      subtitle: "हमारे समुदाय में शामिल हों और प्रभाव बनाएं",
      step1: "व्यक्तिगत जानकारी",
      step2: "पता विवरण",
      step3: "दस्तावेज़ अपलोड",
      fullName: "पूरा नाम",
      email: "ईमेल पता",
      phone: "फोन नंबर",
      dateOfBirth: "जन्म तिथि",
      address: "पता",
      city: "शहर",
      state: "राज्य",
      pincode: "पिन कोड",
      aadharNumber: "आधार नंबर",
      occupation: "पेशा",
      photo: "फोटो अपलोड करें",
      aadharDoc: "आधार कार्ड अपलोड करें",
      next: "अगला",
      previous: "पिछला",
      submit: "आवेदन जमा करें",
      backToHome: "होम पर वापस",
      successTitle: "आवेदन सफलतापूर्वक जमा किया गया!",
      successDesc: "आपका सदस्यता आवेदन जमा कर दिया गया है। अनुमोदन के बाद आपको एक ईमेल मिलेगा।",
      applicationId: "आवेदन आईडी",
      checkStatus: "आवेदन स्थिति जांचें",
    },
  };

  const t = content[language];
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "photo" | "aadharDoc") => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.dateOfBirth) {
      toast({
        title: language === "en" ? "Missing Information" : "जानकारी गुम है",
        description: language === "en" ? "Please fill all required fields" : "कृपया सभी आवश्यक फ़ील्ड भरें",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast({
        title: language === "en" ? "Missing Information" : "जानकारी गुम है",
        description: language === "en" ? "Please fill all address fields" : "कृपया सभी पता फ़ील्ड भरें",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.photo || !formData.aadharDoc) {
      toast({
        title: language === "en" ? "Missing Documents" : "दस्तावेज़ गुम हैं",
        description: language === "en" ? "Please upload all required documents" : "कृपया सभी आवश्यक दस्तावेज़ अपलोड करें",
        variant: "destructive",
      });
      return;
    }

    // Generate application ID
    const appId = "APP" + Date.now().toString().slice(-8);
    setApplicationId(appId);
    
    // Store in localStorage (in real app, send to backend)
    const applications = JSON.parse(localStorage.getItem("memberApplications") || "[]");
    applications.push({
      id: appId,
      ...formData,
      status: "pending",
      submittedAt: new Date().toISOString(),
      photo: formData.photo?.name,
      aadharDoc: formData.aadharDoc?.name,
    });
    localStorage.setItem("memberApplications", JSON.stringify(applications));

    setSubmitted(true);
    toast({
      title: t.successTitle,
      description: t.successDesc,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Navigation language={language} onLanguageToggle={() => setLanguage(language === "en" ? "hi" : "en")} />
        <div className="container mx-auto px-4 py-20 mt-16">
          <Card className="max-w-2xl mx-auto text-center shadow-xl">
            <CardContent className="pt-12 pb-8">
              <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">{t.successTitle}</h2>
              <p className="text-muted-foreground mb-6">{t.successDesc}</p>
              <div className="bg-muted p-4 rounded-lg mb-8">
                <p className="text-sm text-muted-foreground mb-2">{t.applicationId}</p>
                <p className="text-2xl font-bold text-primary">{applicationId}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate("/membership-status")} size="lg">
                  {t.checkStatus}
                </Button>
                <Button onClick={() => navigate("/")} variant="outline" size="lg">
                  {t.backToHome}
                </Button>
              </div>
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
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t.backToHome}
          </Button>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl">{t.title}</CardTitle>
              <CardDescription>{t.subtitle}</CardDescription>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-6">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-colors ${
                          step > s ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">{t.step1}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{t.fullName} *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">{t.dateOfBirth} *</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
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
                          value={formData.email}
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
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="occupation">{t.occupation}</Label>
                        <Input
                          id="occupation"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Address Details */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">{t.step2}</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">{t.address} *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">{t.city} *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">{t.state} *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">{t.pincode} *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aadharNumber">{t.aadharNumber}</Label>
                      <Input
                        id="aadharNumber"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleInputChange}
                        maxLength={12}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Documents Upload */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">{t.step3}</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="photo">{t.photo} *</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "photo")}
                            className="flex-1"
                          />
                          {formData.photo && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formData.photo?.name || (language === "en" ? "No file selected" : "कोई फ़ाइल नहीं चुनी गई")}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aadharDoc">{t.aadharDoc} *</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id="aadharDoc"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange(e, "aadharDoc")}
                            className="flex-1"
                          />
                          {formData.aadharDoc && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formData.aadharDoc?.name || (language === "en" ? "No file selected" : "कोई फ़ाइल नहीं चुनी गई")}
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg mt-6">
                      <h4 className="font-semibold mb-2">
                        {language === "en" ? "Review Your Information" : "अपनी जानकारी की समीक्षा करें"}
                      </h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><strong>{t.fullName}:</strong> {formData.fullName}</p>
                        <p><strong>{t.email}:</strong> {formData.email}</p>
                        <p><strong>{t.phone}:</strong> {formData.phone}</p>
                        <p><strong>{t.city}:</strong> {formData.city}, {formData.state}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                    >
                      {t.previous}
                    </Button>
                  )}
                  
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto bg-primary hover:bg-primary-light"
                    >
                      {t.next}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto bg-primary hover:bg-primary-light"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {t.submit}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemberRegistration;
