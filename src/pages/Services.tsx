import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Database, Lock, Cpu, Network, BarChart, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      id: "cloud-infrastructure",
      icon: Cloud,
      title: "Infrastructure Cloud",
      description: "Solutions d'infrastructure cloud évolutives et sécurisées pour héberger vos applications et données",
      features: ["Haute disponibilité", "Évolutivité automatique", "Sauvegarde automatique"]
    },
    {
      id: "data-management",
      icon: Database,
      title: "Gestion de Données",
      description: "Stockage, traitement et analyse de vos données avec les dernières technologies",
      features: ["Base de données managée", "Big Data", "Analytics en temps réel"]
    },
    {
      id: "security",
      icon: Lock,
      title: "Sécurité & Conformité",
      description: "Protection avancée de vos systèmes et conformité réglementaire garantie",
      features: ["Chiffrement end-to-end", "Audit de sécurité", "Conformité RGPD"]
    },
    {
      id: "computing",
      icon: Cpu,
      title: "Calcul Haute Performance",
      description: "Puissance de calcul pour vos charges de travail les plus exigeantes",
      features: ["Instances optimisées", "GPU disponibles", "Auto-scaling"]
    },
    {
      id: "networking",
      icon: Network,
      title: "Réseau & CDN",
      description: "Infrastructure réseau globale pour des performances optimales partout",
      features: ["CDN mondial", "Load balancing", "VPN sécurisé"]
    },
    {
      id: "analytics",
      icon: BarChart,
      title: "Business Intelligence",
      description: "Transformez vos données en insights actionnables avec nos outils d'analyse",
      features: ["Tableaux de bord", "Rapports automatisés", "Machine Learning"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nos Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez notre gamme complète de solutions cloud pour votre entreprise
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-xl transition-all border-border/50">
                <CardHeader>
                  <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/contact">Demander un devis</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Besoin d'une solution personnalisée ?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Notre équipe d'experts est prête à concevoir une solution sur mesure pour vos besoins spécifiques
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Contactez-nous</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
