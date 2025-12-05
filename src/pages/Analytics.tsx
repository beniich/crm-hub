import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, DollarSign, Target, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Analytics = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalDeals: 0,
    totalCustomers: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch sales data for revenue by month
      const { data: salesData, error: salesError } = await supabase
        .from("sales")
        .select("sale_date, total_price");

      if (salesError) throw salesError;

      // Group sales by month
      const monthlyRevenue = salesData?.reduce((acc: any, sale) => {
        const month = new Date(sale.sale_date).toLocaleDateString("fr-FR", {
          month: "short",
        });
        if (!acc[month]) {
          acc[month] = { month, revenue: 0, deals: 0 };
        }
        acc[month].revenue += Number(sale.total_price);
        acc[month].deals += 1;
        return acc;
      }, {});

      setRevenueData(Object.values(monthlyRevenue || {}));

      // Fetch top products
      const { data: productSales, error: productError } = await supabase
        .from("sales")
        .select(`
          product_id,
          total_price,
          quantity,
          products(name, category)
        `);

      if (productError) throw productError;

      // Group by product
      const productStats = productSales?.reduce((acc: any, sale) => {
        const productName = sale.products?.name || "Unknown";
        if (!acc[productName]) {
          acc[productName] = { name: productName, value: 0, quantity: 0 };
        }
        acc[productName].value += Number(sale.total_price);
        acc[productName].quantity += sale.quantity;
        return acc;
      }, {});

      const topProductsList = Object.values(productStats || {})
        .sort((a: any, b: any) => b.value - a.value)
        .slice(0, 5);

      setTopProducts(topProductsList);

      // Group by category
      const categoryStats = productSales?.reduce((acc: any, sale) => {
        const category = sale.products?.category || "Autre";
        if (!acc[category]) {
          acc[category] = { name: category, value: 0 };
        }
        acc[category].value += Number(sale.total_price);
        return acc;
      }, {});

      const categoryList = Object.values(categoryStats || {}).map((item: any, index) => ({
        ...item,
        color: ["#8B5CF6", "#F59E0B", "#3B82F6", "#10B981", "#22C55E"][index % 5],
      }));

      setCategoryData(categoryList);

      // Calculate overall stats
      const totalRevenue = salesData?.reduce((sum, sale) => sum + Number(sale.total_price), 0) || 0;
      
      const { data: dealsData } = await supabase
        .from("deals")
        .select("id, stage");
      
      const { data: customersData } = await supabase
        .from("customers")
        .select("id");

      const totalDeals = dealsData?.length || 0;
      const wonDeals = dealsData?.filter(d => d.stage === "gagne").length || 0;
      const conversionRate = totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0;

      setStats({
        totalRevenue,
        totalDeals,
        totalCustomers: customersData?.length || 0,
        conversionRate,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les analytics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    toast({
      title: "Export en cours",
      description: "Fonctionnalité à venir",
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Rapports</h1>
            <p className="text-muted-foreground mt-2">
              Visualisez vos performances et tendances
            </p>
          </div>
          <Button onClick={exportToPDF} variant="neumorphismPrimary" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter PDF
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card variant="neumorphism" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenu Total</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalRevenue.toLocaleString("fr-FR")}€
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card variant="neumorphism" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Opportunités</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalDeals}</p>
              </div>
              <Target className="h-8 w-8 text-info" />
            </div>
          </Card>

          <Card variant="neumorphism" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clients</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card variant="neumorphism" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux de conversion</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.conversionRate.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="shadow-neu bg-background rounded-xl p-1">
            <TabsTrigger value="revenue">Revenus</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <Card variant="neumorphismFlat" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Évolution du Revenu</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenu (€)" />
                  <Line type="monotone" dataKey="deals" stroke="hsl(var(--success))" strokeWidth={2} name="Deals" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline">
            <Card variant="neumorphismFlat" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance par Catégorie</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toLocaleString("fr-FR")}€`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card variant="neumorphismFlat" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top 5 Produits les Plus Vendus</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--success))" name="Revenu (€)" />
                  <Bar dataKey="quantity" fill="hsl(var(--primary))" name="Quantité" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="conversion">
            <Card variant="neumorphismFlat" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Évolution du Revenu Mensuel</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="hsl(var(--success))" name="Revenu (€)" />
                  <Bar dataKey="deals" fill="hsl(var(--primary))" name="Nombre de ventes" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
