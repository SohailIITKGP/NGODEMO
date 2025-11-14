import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
}

const mockMembers: Member[] = [
  { id: "1", name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 98765 43210", status: "pending", appliedDate: "2024-01-15" },
  { id: "2", name: "Priya Singh", email: "priya@example.com", phone: "+91 98765 43211", status: "pending", appliedDate: "2024-01-14" },
  { id: "3", name: "Amit Kumar", email: "amit@example.com", phone: "+91 98765 43212", status: "approved", appliedDate: "2024-01-13" },
  { id: "4", name: "Sneha Patel", email: "sneha@example.com", phone: "+91 98765 43213", status: "pending", appliedDate: "2024-01-12" },
];

interface Props {
  language: "en" | "hi";
}

const MemberApproval = ({ language }: Props) => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const { toast } = useToast();

  const text = {
    en: {
      title: "Member Approval",
      subtitle: "Review and approve membership applications",
      name: "Name",
      email: "Email",
      phone: "Phone",
      status: "Status",
      appliedDate: "Applied Date",
      actions: "Actions",
      approve: "Approve",
      reject: "Reject",
      view: "View",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected"
    },
    hi: {
      title: "सदस्य अनुमोदन",
      subtitle: "सदस्यता आवेदनों की समीक्षा और अनुमोदन करें",
      name: "नाम",
      email: "ईमेल",
      phone: "फोन",
      status: "स्थिति",
      appliedDate: "आवेदन तिथि",
      actions: "कार्रवाई",
      approve: "स्वीकृत करें",
      reject: "अस्वीकृत करें",
      view: "देखें",
      pending: "लंबित",
      approved: "स्वीकृत",
      rejected: "अस्वीकृत"
    }
  };

  const handleApprove = (id: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, status: "approved" as const } : m));
    toast({
      title: language === "en" ? "Member Approved" : "सदस्य स्वीकृत",
      description: language === "en" ? "Membership card sent via email & WhatsApp" : "सदस्यता कार्ड ईमेल और व्हाट्सएप पर भेजा गया",
    });
  };

  const handleReject = (id: string) => {
    setMembers(members.map(m => m.id === id ? { ...m, status: "rejected" as const } : m));
    toast({
      title: language === "en" ? "Member Rejected" : "सदस्य अस्वीकृत",
      description: language === "en" ? "Rejection notification sent" : "अस्वीकृति सूचना भेजी गई",
    });
  };

  const getStatusBadge = (status: Member["status"]) => {
    const variants = {
      pending: "secondary" as const,
      approved: "default" as const,
      rejected: "destructive" as const,
    };
    return (
      <Badge variant={variants[status]}>
        {text[language][status]}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text[language].title}</CardTitle>
        <CardDescription>{text[language].subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{text[language].name}</TableHead>
                <TableHead>{text[language].email}</TableHead>
                <TableHead>{text[language].phone}</TableHead>
                <TableHead>{text[language].appliedDate}</TableHead>
                <TableHead>{text[language].status}</TableHead>
                <TableHead className="text-right">{text[language].actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.appliedDate}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {member.status === "pending" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(member.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReject(member.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberApproval;
