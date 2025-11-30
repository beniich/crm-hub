import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Conditions d'utilisation
          </h1>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>1. Acceptation des conditions</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                En accédant et en utilisant les services de Cloud Industrie, vous acceptez d'être lié 
                par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas 
                utiliser nos services.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>2. Utilisation des services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Vous vous engagez à utiliser nos services de manière responsable et conformément aux lois 
                applicables. Vous ne devez pas :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Utiliser nos services à des fins illégales</li>
                <li>Tenter d'accéder aux systèmes de manière non autorisée</li>
                <li>Perturber ou interférer avec nos services</li>
                <li>Violer les droits de propriété intellectuelle</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>3. Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tous les contenus, marques, logos et autres éléments présents sur notre plateforme 
                sont la propriété de Cloud Industrie et sont protégés par les lois sur la propriété 
                intellectuelle.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>4. Limitation de responsabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cloud Industrie met tout en œuvre pour fournir des services fiables et sécurisés. 
                Cependant, nous ne pouvons garantir une disponibilité ininterrompue et ne serons pas 
                tenus responsables des dommages indirects résultant de l'utilisation de nos services.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>5. Modification des conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. 
                Les modifications entrent en vigueur dès leur publication sur notre site.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>6. Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter 
                à contact@cloudindustrie.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
