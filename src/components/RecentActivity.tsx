import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Mail, Phone, FileText, CheckCircle2 } from "lucide-react";

interface Activity {
  id: string;
  type: "user" | "email" | "call" | "document" | "deal";
  title: string;
  description: string;
  time: string;
  user: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "user",
    title: "Nouveau client ajouté",
    description: "Sophie Martin a été ajoutée au CRM",
    time: "Il y a 5 minutes",
    user: "SM",
  },
  {
    id: "2",
    type: "email",
    title: "Email envoyé",
    description: "Proposition commerciale envoyée à TechCorp",
    time: "Il y a 1 heure",
    user: "TD",
  },
  {
    id: "3",
    type: "call",
    title: "Appel effectué",
    description: "Appel de suivi avec InnoSolutions",
    time: "Il y a 2 heures",
    user: "ML",
  },
  {
    id: "4",
    type: "deal",
    title: "Opportunité conclue",
    description: "Contrat signé avec Digital Plus - 45 000 €",
    time: "Il y a 3 heures",
    user: "JB",
  },
  {
    id: "5",
    type: "document",
    title: "Document partagé",
    description: "Présentation produit partagée avec WebAgency",
    time: "Il y a 5 heures",
    user: "CP",
  },
];

const activityIcons = {
  user: UserPlus,
  email: Mail,
  call: Phone,
  document: FileText,
  deal: CheckCircle2,
};

const activityColors = {
  user: "bg-primary/10 text-primary",
  email: "bg-info/10 text-info",
  call: "bg-accent/10 text-accent",
  document: "bg-warning/10 text-warning",
  deal: "bg-success/10 text-success",
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${activityColors[activity.type]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                    {activity.user}
                  </AvatarFallback>
                </Avatar>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
