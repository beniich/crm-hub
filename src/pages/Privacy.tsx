import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Politique de confidentialité
          </h1>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>1. Collecte des données</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cloud Industrie collecte les données personnelles nécessaires à la fourniture de ses 
                services, notamment : nom, email, informations de compte et données d'utilisation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>2. Utilisation des données</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Nous utilisons vos données personnelles pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience</li>
                <li>Communiquer avec vous sur nos services</li>
                <li>Assurer la sécurité de notre plateforme</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>3. Protection des données</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
                appropriées pour protéger vos données contre tout accès non autorisé, modification, 
                divulgation ou destruction.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>4. Partage des données</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous ne vendons pas vos données personnelles. Nous pouvons partager vos données avec 
                des prestataires de services tiers uniquement dans le cadre de la fourniture de nos 
                services, conformément aux réglementations en vigueur.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>5. Vos droits RGPD</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>6. Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer 
                vos préférences de cookies via les paramètres de votre navigateur.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 mt-6">
            <CardHeader>
              <CardTitle>7. Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos 
                droits, contactez-nous à privacy@cloudindustrie.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
