import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet et service que nous délivrons"
    },
    {
      icon: Heart,
      title: "Engagement",
      description: "Nous nous engageons pleinement auprès de nos clients pour leur réussite"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Nous innovons constamment pour offrir les meilleures solutions technologiques"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Nous travaillons en étroite collaboration avec nos clients comme partenaires"
    }
  ];

  const timeline = [
    { year: "2018", event: "Création de Cloud Industrie" },
    { year: "2019", event: "Lancement de nos premières solutions cloud" },
    { year: "2020", event: "Expansion nationale et 50+ clients" },
    { year: "2022", event: "Certification ISO 27001" },
    { year: "2024", event: "200+ clients et présence internationale" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              À Propos de Cloud Industrie
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Votre partenaire de confiance pour la transformation numérique
            </p>
          </div>

          {/* Mission */}
          <section className="mb-20">
            <Card className="border-border/50">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-foreground mb-6">Notre Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Cloud Industrie accompagne les entreprises dans leur transformation numérique en proposant 
                  des solutions cloud innovantes, sécurisées et performantes.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nous croyons que chaque entreprise mérite d'avoir accès aux meilleures technologies 
                  cloud pour se développer et prospérer dans l'économie numérique.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Values */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Nos Valeurs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Notre Histoire
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className="w-1/2" />
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <Card className="w-1/2 mx-8 border-border/50">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary mb-2">
                          {item.year}
                        </div>
                        <p className="text-muted-foreground">{item.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          <section>
            <Card className="border-border/50 bg-primary/5">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Notre Équipe
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Cloud Industrie, c'est une équipe de 50+ experts passionnés par la technologie cloud, 
                  dédiés à votre succès. Ingénieurs, consultants et support technique travaillent ensemble 
                  pour vous offrir la meilleure expérience.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
