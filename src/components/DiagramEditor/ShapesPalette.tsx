import { useDraggable } from "@dnd-kit/core";
import { Square, Circle, Triangle, Hexagon, Star, Diamond } from "lucide-react";

interface ShapeItem {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const shapes: ShapeItem[] = [
  { id: "shape-rectangle", type: "rectangle", label: "Rectangle", icon: <Square className="w-5 h-5" />, color: "hsl(221, 83%, 53%)" },
  { id: "shape-circle", type: "circle", label: "Cercle", icon: <Circle className="w-5 h-5" />, color: "hsl(142, 71%, 45%)" },
  { id: "shape-diamond", type: "diamond", label: "Losange", icon: <Diamond className="w-5 h-5" />, color: "hsl(262, 83%, 58%)" },
  { id: "shape-hexagon", type: "hexagon", label: "Hexagone", icon: <Hexagon className="w-5 h-5" />, color: "hsl(25, 95%, 53%)" },
  { id: "shape-triangle", type: "triangle", label: "Triangle", icon: <Triangle className="w-5 h-5" />, color: "hsl(0, 84%, 60%)" },
  { id: "shape-star", type: "star", label: "Étoile", icon: <Star className="w-5 h-5" />, color: "hsl(45, 93%, 47%)" },
];

const DraggableShape = ({ shape }: { shape: ShapeItem }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: shape.id,
    data: shape,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging ? "opacity-50 scale-105" : ""
      }`}
      title={shape.label}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white transition-transform hover:scale-110"
        style={{
          backgroundColor: shape.color,
          boxShadow: "3px 3px 6px hsl(var(--foreground) / 0.1), -2px -2px 4px hsl(var(--background) / 0.8)",
        }}
      >
        {shape.icon}
      </div>
      <span className="text-xs text-muted-foreground font-medium">{shape.label}</span>
    </div>
  );
};

export const ShapesPalette = () => {
  return (
    <div
      className="w-48 p-4 rounded-2xl"
      style={{
        background: "hsl(var(--card))",
        boxShadow: "6px 6px 12px hsl(var(--foreground) / 0.08), -6px -6px 12px hsl(var(--background) / 0.9)",
      }}
    >
      <h3 className="text-sm font-semibold mb-4 text-foreground">Formes</h3>
      <div className="grid grid-cols-2 gap-2">
        {shapes.map((shape) => (
          <DraggableShape key={shape.id} shape={shape} />
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Instructions</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Glisser pour ajouter</li>
          <li>• Cliquer pour sélectionner</li>
          <li>• Lier avec le bouton 🔗</li>
        </ul>
      </div>
    </div>
  );
};
