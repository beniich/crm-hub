import { useDroppable } from "@dnd-kit/core";
import { DiagramNode } from "./DiagramNode";
import { DiagramConnection } from "./DiagramConnection";

export interface Node {
  id: string;
  type: string;
  x: number;
  y: number;
  label: string;
  color: string;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
}

interface DiagramCanvasProps {
  nodes: Node[];
  connections: Connection[];
  selectedNode: string | null;
  connectingFrom: string | null;
  onNodeSelect: (id: string | null) => void;
  onNodeMove: (id: string, x: number, y: number) => void;
  onStartConnection: (id: string) => void;
  onDeleteNode: (id: string) => void;
}

export const DiagramCanvas = ({
  nodes,
  connections,
  selectedNode,
  connectingFrom,
  onNodeSelect,
  onNodeMove,
  onStartConnection,
  onDeleteNode,
}: DiagramCanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  const getNodePosition = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    return node ? { x: node.x + 60, y: node.y + 30 } : { x: 0, y: 0 };
  };

  return (
    <div
      ref={setNodeRef}
      className={`relative flex-1 min-h-[500px] rounded-2xl transition-all duration-300 overflow-hidden ${
        isOver ? "ring-2 ring-primary/50" : ""
      }`}
      style={{
        background: "hsl(var(--muted) / 0.3)",
        boxShadow: "inset 4px 4px 8px hsl(var(--foreground) / 0.05), inset -4px -4px 8px hsl(var(--background) / 0.8)",
      }}
      onClick={() => onNodeSelect(null)}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((conn) => {
          const from = getNodePosition(conn.from);
          const to = getNodePosition(conn.to);
          return (
            <DiagramConnection
              key={conn.id}
              fromX={from.x}
              fromY={from.y}
              toX={to.x}
              toY={to.y}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <DiagramNode
          key={node.id}
          node={node}
          isSelected={selectedNode === node.id}
          isConnecting={connectingFrom === node.id}
          onSelect={() => onNodeSelect(node.id)}
          onMove={(x, y) => onNodeMove(node.id, x, y)}
          onStartConnection={() => onStartConnection(node.id)}
          onDelete={() => onDeleteNode(node.id)}
        />
      ))}

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <p className="text-lg">Glissez des éléments ici pour créer votre diagramme</p>
        </div>
      )}
    </div>
  );
};
