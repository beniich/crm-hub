import { DashboardLayout } from "@/components/DashboardLayout";
import { DiagramEditor } from "@/components/DiagramEditor";

const DiagramEditorPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Éditeur de Diagrammes</h1>
          <p className="text-muted-foreground mt-1">
            Créez des diagrammes interactifs avec glisser-déposer
          </p>
        </div>
        
        <div className="h-[calc(100vh-220px)]">
          <DiagramEditor />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DiagramEditorPage;
