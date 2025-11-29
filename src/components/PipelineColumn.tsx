import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DealCard } from "@/components/DealCard";
import { Deal } from "@/components/DealsPipeline";
import { Badge } from "@/components/ui/badge";

interface PipelineColumnProps {
  stage: {
    id: string;
    name: string;
    color: string;
  };
  deals: Deal[];
  totalValue: number;
}

export function PipelineColumn({ stage, deals, totalValue }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex-shrink-0 w-80">
      <div className={`rounded-lg border-2 ${stage.color} p-4 transition-colors ${isOver ? "ring-2 ring-primary" : ""}`}>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">{stage.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {deals.length}
            </Badge>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            {formatCurrency(totalValue)}
          </p>
        </div>

        <div
          ref={setNodeRef}
          className="space-y-3 min-h-[200px]"
        >
          <SortableContext
            items={deals.map((d) => d.id)}
            strategy={verticalListSortingStrategy}
          >
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </SortableContext>

          {deals.length === 0 && (
            <div className="flex items-center justify-center h-32 text-muted-foreground text-sm border-2 border-dashed border-border rounded-lg">
              Glissez une opportunité ici
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
