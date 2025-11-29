import { DashboardLayout } from "@/components/DashboardLayout";
import { DealsPipeline } from "@/components/DealsPipeline";

const Deals = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pipeline des Ventes</h1>
          <p className="text-muted-foreground mt-2">
            Suivez l'avancement de vos opportunités commerciales
          </p>
        </div>
        <DealsPipeline />
      </div>
    </DashboardLayout>
  );
};

export default Deals;
