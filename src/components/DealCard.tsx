import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Calendar, TrendingUp } from "lucide-react";
import { Deal } from "@/components/DealsPipeline";

interface DealCardProps {
  deal: Deal;
  isDragging?: boolean;
}

export function DealCard({ deal, isDragging = false }: DealCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return "text-success";
    if (probability >= 40) return "text-warning";
    return "text-info";
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
        isDragging ? "shadow-lg ring-2 ring-primary" : ""
      }`}
    >
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-1">
            {deal.title}
          </h4>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Building2 className="h-3 w-3" />
            <span>{deal.company}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(deal.value)}
          </span>
          <Badge variant="outline" className={getProbabilityColor(deal.probability)}>
            <TrendingUp className="h-3 w-3 mr-1" />
            {deal.probability}%
          </Badge>
        </div>

        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{deal.contact}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Clôture: {formatDate(deal.closeDate)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
