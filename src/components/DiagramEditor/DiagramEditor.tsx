import { useState, useCallback } from "react";
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { ShapesPalette } from "./ShapesPalette";
import { DiagramCanvas, Node, Connection } from "./DiagramCanvas";
import { Button } from "@/components/ui/button";
import { Download, Trash2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const DiagramEditor = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over?.id === "canvas" && active.data.current) {
      const shapeData = active.data.current;
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: shapeData.type,
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
        label: shapeData.label,
        color: shapeData.color,
      };
      setNodes((prev) => [...prev, newNode]);
      toast.success(`${shapeData.label} ajouté au diagramme`);
    }
  }, []);

  const handleNodeMove = useCallback((id: string, x: number, y: number) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, x, y } : node))
    );
  }, []);

  const handleNodeSelect = useCallback((id: string | null) => {
    if (connectingFrom && id && connectingFrom !== id) {
      // Create connection
      const connectionExists = connections.some(
        (c) =>
          (c.from === connectingFrom && c.to === id) ||
          (c.from === id && c.to === connectingFrom)
      );

      if (!connectionExists) {
        setConnections((prev) => [
          ...prev,
          { id: `conn-${Date.now()}`, from: connectingFrom, to: id },
        ]);
        toast.success("Connexion créée");
      }
      setConnectingFrom(null);
    } else {
      setSelectedNode(id);
      if (!id) setConnectingFrom(null);
    }
  }, [connectingFrom, connections]);

  const handleStartConnection = useCallback((id: string) => {
    setConnectingFrom(id);
    toast.info("Cliquez sur un autre élément pour créer une connexion");
  }, []);

  const handleDeleteNode = useCallback((id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setConnections((prev) =>
      prev.filter((conn) => conn.from !== id && conn.to !== id)
    );
    setSelectedNode(null);
    toast.success("Élément supprimé");
  }, []);

  const handleClearAll = () => {
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
    setConnectingFrom(null);
    toast.success("Diagramme effacé");
  };

  const handleExport = () => {
    const data = { nodes, connections };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagram.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Diagramme exporté");
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between p-4 rounded-2xl"
        style={{
          background: "hsl(var(--card))",
          boxShadow: "6px 6px 12px hsl(var(--foreground) / 0.08), -6px -6px 12px hsl(var(--background) / 0.9)",
        }}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="neumorphism"
            size="sm"
            onClick={() => setZoom((z) => Math.min(z + 0.1, 2))}
          >
            <ZoomIn className="w-4 h-4 mr-1" />
            Zoom +
          </Button>
          <Button
            variant="neumorphism"
            size="sm"
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
          >
            <ZoomOut className="w-4 h-4 mr-1" />
            Zoom -
          </Button>
          <span className="text-sm text-muted-foreground ml-2">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="neumorphism" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-1" />
            Exporter
          </Button>
          <Button
            variant="neumorphism"
            size="sm"
            onClick={handleClearAll}
            className="text-destructive"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Effacer
          </Button>
        </div>
      </div>

      {/* Editor area */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 flex-1">
          <ShapesPalette />
          
          <div
            className="flex-1 overflow-hidden rounded-2xl"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
          >
            <DiagramCanvas
              nodes={nodes}
              connections={connections}
              selectedNode={selectedNode}
              connectingFrom={connectingFrom}
              onNodeSelect={handleNodeSelect}
              onNodeMove={handleNodeMove}
              onStartConnection={handleStartConnection}
              onDeleteNode={handleDeleteNode}
            />
          </div>
        </div>
      </DndContext>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-2 rounded-xl text-sm text-muted-foreground"
        style={{
          background: "hsl(var(--muted) / 0.3)",
          boxShadow: "inset 2px 2px 4px hsl(var(--foreground) / 0.03), inset -2px -2px 4px hsl(var(--background) / 0.5)",
        }}
      >
        <span>{nodes.length} élément(s) • {connections.length} connexion(s)</span>
        {connectingFrom && (
          <span className="text-green-600 animate-pulse">
            Mode connexion actif - Cliquez sur un élément cible
          </span>
        )}
      </div>
    </div>
  );
};
