import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "inactive" | "lead";
  value: string;
}

const mockCustomers: Customer[] = [
  { id: "1", name: "Sophie Martin", email: "sophie.martin@email.com", phone: "+33 6 12 34 56 78", company: "TechCorp", status: "active", value: "45 000 €" },
  { id: "2", name: "Thomas Dubois", email: "thomas.dubois@email.com", phone: "+33 6 98 76 54 32", company: "InnoSolutions", status: "active", value: "32 000 €" },
  { id: "3", name: "Marie Laurent", email: "marie.laurent@email.com", phone: "+33 6 45 67 89 01", company: "Digital Plus", status: "lead", value: "18 000 €" },
  { id: "4", name: "Jean Bernard", email: "jean.bernard@email.com", phone: "+33 6 23 45 67 89", company: "WebAgency", status: "active", value: "56 000 €" },
  { id: "5", name: "Claire Petit", email: "claire.petit@email.com", phone: "+33 6 87 65 43 21", company: "StartupHub", status: "inactive", value: "12 000 €" },
];

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  inactive: "bg-muted text-muted-foreground border-border",
  lead: "bg-info/10 text-info border-info/20",
};

const statusLabels = {
  active: "Actif",
  inactive: "Inactif",
  lead: "Prospect",
};

export const CustomerTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Clients récents</CardTitle>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau client
          </Button>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Valeur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[customer.status]}>
                    {statusLabels[customer.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">{customer.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
