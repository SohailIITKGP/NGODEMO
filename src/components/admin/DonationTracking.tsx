import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  project: string;
  date: string;
  status: "completed" | "pending" | "failed";
  paymentId: string;
}

const mockDonations: Donation[] = [
  { id: "1", donorName: "Rajesh Kumar", email: "rajesh@example.com", amount: 5000, project: "Education for All", date: "2024-01-15", status: "completed", paymentId: "PAY_123456" },
  { id: "2", donorName: "Sunita Sharma", email: "sunita@example.com", amount: 10000, project: "Clean Water Initiative", date: "2024-01-14", status: "completed", paymentId: "PAY_123457" },
  { id: "3", donorName: "Vikram Singh", email: "vikram@example.com", amount: 2500, project: "Healthcare Access", date: "2024-01-13", status: "pending", paymentId: "PAY_123458" },
  { id: "4", donorName: "Meena Patel", email: "meena@example.com", amount: 7500, project: "Women Empowerment", date: "2024-01-12", status: "completed", paymentId: "PAY_123459" },
  { id: "5", donorName: "Arjun Reddy", email: "arjun@example.com", amount: 15000, project: "Skill Development", date: "2024-01-11", status: "completed", paymentId: "PAY_123460" },
];

interface Props {
  language: "en" | "hi";
}

const DonationTracking = ({ language }: Props) => {
  const [donations] = useState<Donation[]>(mockDonations);
  const [searchTerm, setSearchTerm] = useState("");

  const text = {
    en: {
      title: "Donation Tracking",
      subtitle: "Monitor and manage all donations",
      search: "Search by name, email, or project...",
      donorName: "Donor Name",
      email: "Email",
      amount: "Amount",
      project: "Project",
      date: "Date",
      status: "Status",
      paymentId: "Payment ID",
      total: "Total Donations",
      completed: "Completed",
      pending: "Pending",
      failed: "Failed"
    },
    hi: {
      title: "दान ट्रैकिंग",
      subtitle: "सभी दानों की निगरानी और प्रबंधन करें",
      search: "नाम, ईमेल, या प्रोजेक्ट से खोजें...",
      donorName: "दाता का नाम",
      email: "ईमेल",
      amount: "राशि",
      project: "प्रोजेक्ट",
      date: "तिथि",
      status: "स्थिति",
      paymentId: "भुगतान आईडी",
      total: "कुल दान",
      completed: "पूर्ण",
      pending: "लंबित",
      failed: "विफल"
    }
  };

  const filteredDonations = donations.filter(
    d =>
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0);

  const getStatusBadge = (status: Donation["status"]) => {
    const variants = {
      completed: "default" as const,
      pending: "secondary" as const,
      failed: "destructive" as const,
    };
    return (
      <Badge variant={variants[status]}>
        {text[language][status]}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{text[language].title}</CardTitle>
          <CardDescription>{text[language].subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={text[language].search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Card className="flex-shrink-0">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-muted-foreground">{text[language].total}</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{text[language].donorName}</TableHead>
                  <TableHead>{text[language].email}</TableHead>
                  <TableHead>{text[language].project}</TableHead>
                  <TableHead>{text[language].amount}</TableHead>
                  <TableHead>{text[language].date}</TableHead>
                  <TableHead>{text[language].status}</TableHead>
                  <TableHead>{text[language].paymentId}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.donorName}</TableCell>
                    <TableCell>{donation.email}</TableCell>
                    <TableCell>{donation.project}</TableCell>
                    <TableCell>₹{donation.amount.toLocaleString('en-IN')}</TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    <TableCell className="font-mono text-xs">{donation.paymentId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationTracking;
