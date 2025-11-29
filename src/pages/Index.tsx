import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { CustomerTable } from "@/components/CustomerTable";
import { RecentActivity } from "@/components/RecentActivity";
import { Users, TrendingUp, DollarSign, Target } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble de vos activités CRM</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Clients"
            value="2,543"
            icon={Users}
            trend={{ value: "12.5%", isPositive: true }}
          />
          <MetricCard
            title="Opportunités Actives"
            value="87"
            icon={Target}
            trend={{ value: "8.3%", isPositive: true }}
          />
          <MetricCard
            title="Revenus du Mois"
            value="245K €"
            icon={DollarSign}
            trend={{ value: "23.1%", isPositive: true }}
          />
          <MetricCard
            title="Taux de Conversion"
            value="68%"
            icon={TrendingUp}
            trend={{ value: "3.2%", isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CustomerTable />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
