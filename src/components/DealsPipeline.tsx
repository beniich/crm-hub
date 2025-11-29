import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { PipelineColumn } from "@/components/PipelineColumn";
import { DealCard } from "@/components/DealCard";

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  contact: string;
  stage: string;
  probability: number;
  closeDate: string;
}

const initialDeals: Deal[] = [
  {
    id: "1",
    title: "Migration Cloud",
    company: "TechCorp",
    value: 45000,
    contact: "Marie Dubois",
    stage: "prospect",
    probability: 20,
    closeDate: "2024-03-15",
  },
  {
    id: "2",
    title: "CRM Enterprise",
    company: "StartupXYZ",
    value: 78000,
    contact: "Pierre Martin",
    stage: "qualification",
    probability: 40,
    closeDate: "2024-02-28",
  },
  {
    id: "3",
    title: "Formation équipe",
    company: "InnovCorp",
    value: 12000,
    contact: "Sophie Bernard",
    stage: "proposition",
    probability: 60,
    closeDate: "2024-02-15",
  },
  {
    id: "4",
    title: "Consulting IT",
    company: "MegaSoft",
    value: 95000,
    contact: "Luc Moreau",
    stage: "negociation",
    probability: 80,
    closeDate: "2024-02-10",
  },
  {
    id: "5",
    title: "Site Web E-commerce",
    company: "ShopOnline",
    value: 32000,
    contact: "Emma Laurent",
    stage: "prospect",
    probability: 15,
    closeDate: "2024-04-01",
  },
  {
    id: "6",
    title: "App Mobile",
    company: "FinanceApp",
    value: 125000,
    contact: "Thomas Petit",
    stage: "qualification",
    probability: 35,
    closeDate: "2024-03-20",
  },
];

const stages = [
  { id: "prospect", name: "Prospect", color: "bg-info/10 border-info/20" },
  { id: "qualification", name: "Qualification", color: "bg-warning/10 border-warning/20" },
  { id: "proposition", name: "Proposition", color: "bg-primary/10 border-primary/20" },
  { id: "negociation", name: "Négociation", color: "bg-accent/10 border-accent/20" },
  { id: "gagne", name: "Gagné", color: "bg-success/10 border-success/20" },
  { id: "perdu", name: "Perdu", color: "bg-destructive/10 border-destructive/20" },
];

export function DealsPipeline() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const deal = deals.find((d) => d.id === event.active.id);
    if (deal) {
      setActiveDeal(deal);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveDeal(null);
      return;
    }

    const dealId = active.id as string;
    const newStage = over.id as string;

    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: newStage } : deal
      )
    );

    setActiveDeal(null);
  };

  const getDealsByStage = (stageId: string) => {
    return deals.filter((deal) => deal.stage === stageId);
  };

  const getTotalValueByStage = (stageId: string) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + deal.value, 0);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <PipelineColumn
            key={stage.id}
            stage={stage}
            deals={getDealsByStage(stage.id)}
            totalValue={getTotalValueByStage(stage.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeDeal ? (
          <div className="rotate-3 opacity-90">
            <DealCard deal={activeDeal} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
