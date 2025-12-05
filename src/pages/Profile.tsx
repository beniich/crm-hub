import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Phone, Building2, Calendar, FileText, TrendingUp, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  company: string | null;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDeals: 0,
    revenue: 0,
    documents: 0,
    lastActivity: ""
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    // Mock stats for now
    setStats({
      totalDeals: 12,
      revenue: 145000,
      documents: 8,
      lastActivity: new Date().toLocaleDateString('fr-FR')
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-lg text-muted-foreground">Chargement...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-lg text-muted-foreground">Profil introuvable</div>
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card variant="neumorphismFlat" className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 shadow-neu">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback className="text-2xl bg-background">
                {profile.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{profile.full_name}</h1>
                  <Badge className="bg-primary/10 text-primary">
                    Utilisateur
                  </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.company && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>{profile.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Membre depuis {new Date(profile.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card variant="neumorphism" className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stats.totalDeals}</div>
                <div className="text-sm text-muted-foreground">Opportunités</div>
              </Card>
              <Card variant="neumorphism" className="p-4 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold">{stats.revenue.toLocaleString()}€</div>
                <div className="text-sm text-muted-foreground">Revenu</div>
              </Card>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="shadow-neu bg-background rounded-xl p-1">
            <TabsTrigger value="activity">Activité</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <Card variant="neumorphismFlat" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Activité Récente</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-border/50">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="font-medium">Opportunité créée</p>
                    <p className="text-sm text-muted-foreground">Migration Cloud - 45,000€</p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-border/50">
                  <div className="h-2 w-2 rounded-full bg-success mt-2" />
                  <div className="flex-1">
                    <p className="font-medium">Document ajouté</p>
                    <p className="text-sm text-muted-foreground">Contrat signé</p>
                    <p className="text-xs text-muted-foreground mt-1">Hier</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card variant="neumorphismFlat" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Documents</h3>
                <Badge>{stats.documents} fichiers</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Aucun document pour le moment
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <Card variant="neumorphismFlat" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Statistiques Détaillées</h3>
              <div className="grid grid-cols-3 gap-4">
                <Card variant="neumorphismInset" className="p-4">
                  <div className="text-2xl font-bold text-primary">{stats.totalDeals}</div>
                  <div className="text-sm text-muted-foreground">Opportunités totales</div>
                </Card>
                <Card variant="neumorphismInset" className="p-4">
                  <div className="text-2xl font-bold text-success">{stats.revenue.toLocaleString()}€</div>
                  <div className="text-sm text-muted-foreground">Revenu généré</div>
                </Card>
                <Card variant="neumorphismInset" className="p-4">
                  <div className="text-2xl font-bold text-info">{stats.documents}</div>
                  <div className="text-sm text-muted-foreground">Documents</div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
