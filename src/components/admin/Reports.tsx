import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  language: "en" | "hi";
}

const Reports = ({ language }: Props) => {
  const { toast } = useToast();

  const text = {
    en: {
      title: "Reports & Export",
      subtitle: "Generate and download reports in various formats",
      memberReport: "Member Report",
      memberDesc: "Export all member data with status and details",
      donationReport: "Donation Report",
      donationDesc: "Export complete donation history and analytics",
      financialReport: "Financial Report",
      financialDesc: "Download comprehensive financial summary",
      exportCSV: "Export as CSV",
      exportExcel: "Export as Excel",
      exportPDF: "Export as PDF"
    },
    hi: {
      title: "रिपोर्ट और निर्यात",
      subtitle: "विभिन्न प्रारूपों में रिपोर्ट बनाएं और डाउनलोड करें",
      memberReport: "सदस्य रिपोर्ट",
      memberDesc: "स्थिति और विवरण के साथ सभी सदस्य डेटा निर्यात करें",
      donationReport: "दान रिपोर्ट",
      donationDesc: "पूर्ण दान इतिहास और विश्लेषण निर्यात करें",
      financialReport: "वित्तीय रिपोर्ट",
      financialDesc: "व्यापक वित्तीय सारांश डाउनलोड करें",
      exportCSV: "CSV में निर्यात करें",
      exportExcel: "Excel में निर्यात करें",
      exportPDF: "PDF में निर्यात करें"
    }
  };

  const exportToCSV = (reportType: string) => {
    // Sample CSV generation
    let csvContent = "";
    
    if (reportType === "members") {
      csvContent = "Name,Email,Phone,Status,Applied Date\n";
      csvContent += "Rahul Sharma,rahul@example.com,+91 98765 43210,Pending,2024-01-15\n";
      csvContent += "Priya Singh,priya@example.com,+91 98765 43211,Pending,2024-01-14\n";
    } else if (reportType === "donations") {
      csvContent = "Donor Name,Email,Amount,Project,Date,Status,Payment ID\n";
      csvContent += "Rajesh Kumar,rajesh@example.com,5000,Education for All,2024-01-15,Completed,PAY_123456\n";
      csvContent += "Sunita Sharma,sunita@example.com,10000,Clean Water Initiative,2024-01-14,Completed,PAY_123457\n";
    } else {
      csvContent = "Period,Total Donations,Total Members,Active Projects\n";
      csvContent += "January 2024,₹40000,15,5\n";
    }

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast({
      title: language === "en" ? "Export Successful" : "निर्यात सफल",
      description: language === "en" ? "CSV file downloaded" : "CSV फ़ाइल डाउनलोड की गई",
    });
  };

  const exportToExcel = (reportType: string) => {
    toast({
      title: language === "en" ? "Export Started" : "निर्यात शुरू हुआ",
      description: language === "en" ? "Excel file will be downloaded shortly" : "Excel फ़ाइल शीघ्र ही डाउनलोड होगी",
    });
  };

  const exportToPDF = (reportType: string) => {
    toast({
      title: language === "en" ? "Export Started" : "निर्यात शुरू हुआ",
      description: language === "en" ? "PDF file will be downloaded shortly" : "PDF फ़ाइल शीघ्र ही डाउनलोड होगी",
    });
  };

  const reportCards = [
    {
      id: "members",
      title: text[language].memberReport,
      description: text[language].memberDesc,
      icon: FileText,
    },
    {
      id: "donations",
      title: text[language].donationReport,
      description: text[language].donationDesc,
      icon: FileSpreadsheet,
    },
    {
      id: "financial",
      title: text[language].financialReport,
      description: text[language].financialDesc,
      icon: Download,
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{text[language].title}</CardTitle>
          <CardDescription>{text[language].subtitle}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </div>
                <report.icon className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => exportToCSV(report.id)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {text[language].exportCSV}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => exportToExcel(report.id)}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  {text[language].exportExcel}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => exportToPDF(report.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {text[language].exportPDF}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
