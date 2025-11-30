import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Shield, Zap, Users, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Home = () => {
  const services = [
    {
      icon: Cloud,
      title: "Solutions Cloud",
      description: "Infrastructure cloud sécurisée et évolutive pour votre entreprise"
    },
    {
      icon: Shield,
      title: "Sécurité Avancée",
      description: "Protection de vos données avec les dernières technologies de cybersécurité"
    },
    {
      icon: Zap,
      title: "Performance Optimale",
      description: "Des services rapides et fiables pour votre productivité"
    },
    {
      icon: Users,
      title: "Support Dédié",
      description: "Une équipe d'experts à votre écoute 24/7"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dupont",
      company: "TechCorp",
      content: "Une solution cloud exceptionnelle qui a transformé notre infrastructure IT.",
      rating: 5
    },
    {
      name: "Jean Martin",
      company: "InnovateSAS",
      content: "Service client remarquable et performances au rendez-vous.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Cloud Industrie – Solutions Cloud et Services Numériques
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transformez votre entreprise avec nos solutions cloud innovantes et sécurisées
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/services">
                  Découvrir <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/auth">Créer un compte</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des solutions adaptées à tous vos besoins numériques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-border/50">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/services">Voir tous les services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Témoignages Clients
            </h2>
            <p className="text-muted-foreground">
              Ce que nos clients disent de nous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
