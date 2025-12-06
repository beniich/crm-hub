import { useState, useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Link2, Trash2, Square, Circle, Triangle, Hexagon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Node } from "./DiagramCanvas";

interface DiagramNodeProps {
  node: Node;
  isSelected: boolean;
  isConnecting: boolean;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
  onStartConnection: () => void;
  onDelete: () => void;
}

const shapeIcons: Record<string, React.ReactNode> = {
  rectangle: <Square className="w-6 h-6" />,
  circle: <Circle className="w-6 h-6" />,
  diamond: <Square className="w-6 h-6 rotate-45" />,
  hexagon: <Hexagon className="w-6 h-6" />,
  triangle: <Triangle className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
};

export const DiagramNode = ({
  node,
  isSelected,
  isConnecting,
  onSelect,
  onMove,
  onStartConnection,
  onDelete,
}: DiagramNodeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    setIsDragging(true);
    const rect = nodeRef.current?.getBoundingClientRect();
    if (rect) {
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !nodeRef.current) return;
      const parent = nodeRef.current.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const newX = e.clientX - parentRect.left - offset.x;
      const newY = e.clientY - parentRect.top - offset.y;

      onMove(Math.max(0, newX), Math.max(0, newY));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset, onMove]);

  const getShapeStyles = () => {
    const baseStyles = "flex items-center justify-center";
    switch (node.type) {
      case "circle":
        return `${baseStyles} rounded-full w-[120px] h-[60px]`;
      case "diamond":
        return `${baseStyles} rotate-45 w-[85px] h-[85px]`;
      default:
        return `${baseStyles} rounded-xl w-[120px] h-[60px]`;
    }
  };

  return (
    <div
      ref={nodeRef}
      className="absolute cursor-move group"
      style={{
        left: node.x,
        top: node.y,
        zIndex: isSelected ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`${getShapeStyles()} transition-all duration-200 ${
          isSelected ? "ring-2 ring-primary ring-offset-2" : ""
        } ${isConnecting ? "ring-2 ring-green-500 ring-offset-2" : ""}`}
        style={{
          backgroundColor: node.color,
          boxShadow: "4px 4px 8px hsl(var(--foreground) / 0.1), -2px -2px 6px hsl(var(--background) / 0.8)",
        }}
      >
        <span
          className={`text-white text-sm font-medium ${
            node.type === "diamond" ? "-rotate-45" : ""
          }`}
        >
          {node.label}
        </span>
      </div>

      {/* Action buttons */}
      {isSelected && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="neumorphism"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onStartConnection();
            }}
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="neumorphism"
            className="h-8 w-8 text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
