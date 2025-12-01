import { DashboardLayout } from "@/components/DashboardLayout";
import { CustomerTable } from "@/components/CustomerTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Companies = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground mt-2">
              Gérez vos clients et prospects
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Client
          </Button>
        </div>
        <CustomerTable />
      </div>
    </DashboardLayout>
  );
};

export default Companies;
