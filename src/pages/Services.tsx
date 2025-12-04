import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Cloud, Database, Lock, Cpu, Network, BarChart, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import serviceCloudDashboard from "@/assets/service-cloud-dashboard.png";
import serviceDatabase from "@/assets/service-database.png";
import serviceSecurity from "@/assets/service-security.png";
import serviceAnalytics from "@/assets/service-analytics.png";

interface ServiceSectionProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ElementType;
  reversed?: boolean;
  index: number;
}

const ServiceSection = ({ title, description, features, image, icon: Icon, reversed, index }: ServiceSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`py-24 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'} overflow-hidden`}
    >
      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reversed ? 50 : -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={reversed ? 'lg:order-2' : ''}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Service</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <Button size="lg" className="group" asChild>
              <Link to="/contact">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Image with Parallax */}
          <div className={`relative ${reversed ? 'lg:order-1' : ''}`}>
            <motion.div
              style={{ y, scale, opacity }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 pointer-events-none" />
                <motion.img
                  src={image}
                  alt={title}
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
            {/* Floating decoration with parallax */}
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
              className="absolute -top-6 -right-6 h-24 w-24 rounded-2xl bg-primary/10 -z-10"
            />
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 70]) }}
              className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-accent/30 -z-10"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Services = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const services = [
    {
      icon: Cloud,
      title: "Infrastructure Cloud",
      description: "Déployez vos applications sur une infrastructure cloud de pointe. Bénéficiez d'une évolutivité automatique, d'une haute disponibilité et de sauvegardes automatisées pour assurer la continuité de vos services.",
      features: [
        "Déploiement en un clic",
        "Évolutivité automatique illimitée",
        "Haute disponibilité garantie 99.99%",
        "Sauvegarde automatique quotidienne",
        "Support technique 24/7"
      ],
      image: serviceCloudDashboard
    },
    {
      icon: Database,
      title: "Gestion de Données",
      description: "Stockez, gérez et analysez vos données avec nos solutions de bases de données managées. Profitez de performances optimales et d'une sécurité renforcée pour vos données critiques.",
      features: [
        "Bases de données PostgreSQL, MySQL, MongoDB",
        "Réplication automatique multi-zones",
        "Backups automatiques avec rétention configurable",
        "Monitoring en temps réel",
        "Migration assistée gratuite"
      ],
      image: serviceDatabase
    },
    {
      icon: Lock,
      title: "Sécurité & Conformité",
      description: "Protégez votre entreprise avec nos solutions de sécurité avancées. Conformité RGPD garantie, chiffrement de bout en bout et surveillance proactive des menaces.",
      features: [
        "Chiffrement AES-256 au repos et en transit",
        "Pare-feu applicatif WAF intégré",
        "Détection des intrusions en temps réel",
        "Conformité RGPD, ISO 27001, SOC 2",
        "Audit de sécurité trimestriel"
      ],
      image: serviceSecurity
    },
    {
      icon: BarChart,
      title: "Business Intelligence",
      description: "Transformez vos données en décisions stratégiques. Nos outils d'analyse avancés vous permettent de visualiser, comprendre et prédire les tendances de votre activité.",
      features: [
        "Tableaux de bord personnalisables",
        "Rapports automatisés par email",
        "Intégration de sources multiples",
        "Machine Learning prédictif",
        "Alertes intelligentes configurables"
      ],
      image: serviceAnalytics
    }
  ];

  const stats = [
    { value: "99.99%", label: "Disponibilité garantie" },
    { value: "50+", label: "Datacenters mondiaux" },
    { value: "10M+", label: "Requêtes/seconde" },
    { value: "24/7", label: "Support technique" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border border-primary/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full border border-accent/20"
          />
          <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-primary/30" />
          <div className="absolute bottom-1/3 left-1/3 w-6 h-6 rounded-full bg-accent/40" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            >
              Services Cloud Professionnels
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              L'infrastructure cloud qui
              <span className="text-primary"> propulse </span>
              votre business
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Des solutions cloud évolutives, sécurisées et performantes pour accompagner la croissance de votre entreprise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/auth">Commencer gratuitement</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/contact">Contacter un expert</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => (
        <ServiceSection
          key={service.title}
          {...service}
          reversed={index % 2 !== 0}
          index={index}
        />
      ))}

      {/* Additional Services Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Services Complémentaires
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des solutions additionnelles pour couvrir tous vos besoins
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Cpu, title: "Calcul Haute Performance", desc: "Instances optimisées GPU pour vos charges de travail intensives" },
              { icon: Network, title: "Réseau & CDN", desc: "CDN mondial pour des temps de réponse ultra-rapides" },
              { icon: Cloud, title: "Kubernetes Managé", desc: "Orchestration de conteneurs simplifiée et automatisée" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <Link to="/contact" className="text-primary font-medium inline-flex items-center group/link">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-primary rounded-3xl p-12 md:p-20 text-center overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full bg-primary-foreground/10" />
              <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] rounded-full bg-primary-foreground/5" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Prêt à transformer votre infrastructure ?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                Rejoignez les milliers d'entreprises qui font confiance à Cloud Industrie pour leur infrastructure cloud
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                  <Link to="/auth">Démarrer maintenant</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/contact">Planifier une démo</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
