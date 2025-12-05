import { DashboardLayout } from "@/components/DashboardLayout";
import { CustomerTable } from "@/components/CustomerTable";
import { Button } from "@/components/ui/button";
import { CustomerDialog } from "@/components/CustomerDialog";
import { Plus } from "lucide-react";
import { useState } from "react";

const Companies = () => {
  const [refreshKey, setRefreshKey] = useState(0);

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
          <CustomerDialog
            trigger={
              <Button className="gap-2" variant="neumorphismPrimary">
                <Plus className="h-4 w-4" />
                Nouveau Client
              </Button>
            }
            onSuccess={() => setRefreshKey(prev => prev + 1)}
          />
        </div>
        <CustomerTable key={refreshKey} />
      </div>
    </DashboardLayout>
  );
};

export default Companies;
