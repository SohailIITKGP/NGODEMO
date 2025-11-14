import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const navigate = useNavigate();
  const { toast } = useToast();

  const text = {
    en: {
      title: "Admin Login",
      subtitle: "Access the admin dashboard",
      email: "Email",
      password: "Password",
      login: "Login",
      demo: "Demo: admin@example.com / admin123"
    },
    hi: {
      title: "एडमिन लॉगिन",
      subtitle: "एडमिन डैशबोर्ड एक्सेस करें",
      email: "ईमेल",
      password: "पासवर्ड",
      login: "लॉगिन करें",
      demo: "डेमो: admin@example.com / admin123"
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo authentication (frontend only)
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      toast({
        title: language === "en" ? "Login Successful" : "लॉगिन सफल",
        description: language === "en" ? "Welcome to admin dashboard" : "एडमिन डैशबोर्ड में आपका स्वागत है",
      });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: language === "en" ? "Login Failed" : "लॉगिन विफल",
        description: language === "en" ? "Invalid credentials" : "गलत क्रेडेंशियल",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            >
              {language === "en" ? "हिंदी" : "English"}
            </Button>
          </div>
          <CardTitle className="text-2xl">{text[language].title}</CardTitle>
          <CardDescription>{text[language].subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{text[language].email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{text[language].password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {text[language].login}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              {text[language].demo}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
