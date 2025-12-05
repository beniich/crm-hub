import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Save, Download, Upload, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Column {
  id: string;
  name: string;
  type: "text" | "number" | "date";
}

interface Row {
  id: string;
  data: Record<string, string>;
}

interface InteractiveSpreadsheetProps {
  initialColumns?: Column[];
  initialRows?: Row[];
  onSave?: (columns: Column[], rows: Row[]) => void;
  title?: string;
}

export function InteractiveSpreadsheet({ 
  initialColumns = [], 
  initialRows = [], 
  onSave,
  title = "Tableur"
}: InteractiveSpreadsheetProps) {
  const { toast } = useToast();
  const [columns, setColumns] = useState<Column[]>(
    initialColumns.length > 0 
      ? initialColumns 
      : [
          { id: "col-1", name: "Nom", type: "text" },
          { id: "col-2", name: "Email", type: "text" },
          { id: "col-3", name: "Valeur", type: "number" },
        ]
  );
  const [rows, setRows] = useState<Row[]>(
    initialRows.length > 0 
      ? initialRows 
      : [
          { id: "row-1", data: { "col-1": "", "col-2": "", "col-3": "" } },
        ]
  );
  const [editingCell, setEditingCell] = useState<{ rowId: string; colId: string } | null>(null);
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: "asc" | "desc" } | null>(null);

  const addColumn = () => {
    const newColId = `col-${Date.now()}`;
    setColumns([...columns, { id: newColId, name: `Colonne ${columns.length + 1}`, type: "text" }]);
    setRows(rows.map(row => ({
      ...row,
      data: { ...row.data, [newColId]: "" }
    })));
  };

  const removeColumn = (colId: string) => {
    if (columns.length <= 1) return;
    setColumns(columns.filter(c => c.id !== colId));
    setRows(rows.map(row => {
      const { [colId]: removed, ...rest } = row.data;
      return { ...row, data: rest };
    }));
  };

  const addRow = () => {
    const newRowId = `row-${Date.now()}`;
    const emptyData: Record<string, string> = {};
    columns.forEach(col => { emptyData[col.id] = ""; });
    setRows([...rows, { id: newRowId, data: emptyData }]);
  };

  const removeRow = (rowId: string) => {
    if (rows.length <= 1) return;
    setRows(rows.filter(r => r.id !== rowId));
  };

  const updateCell = (rowId: string, colId: string, value: string) => {
    setRows(rows.map(row => 
      row.id === rowId 
        ? { ...row, data: { ...row.data, [colId]: value } }
        : row
    ));
  };

  const updateColumnName = (colId: string, name: string) => {
    setColumns(columns.map(col => 
      col.id === colId ? { ...col, name } : col
    ));
  };

  const handleSort = (colId: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.column === colId && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ column: colId, direction });

    const sortedRows = [...rows].sort((a, b) => {
      const aVal = a.data[colId] || "";
      const bVal = b.data[colId] || "";
      
      const column = columns.find(c => c.id === colId);
      if (column?.type === "number") {
        const aNum = parseFloat(aVal) || 0;
        const bNum = parseFloat(bVal) || 0;
        return direction === "asc" ? aNum - bNum : bNum - aNum;
      }
      
      return direction === "asc" 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    setRows(sortedRows);
  };

  const handleSave = () => {
    onSave?.(columns, rows);
    toast({
      title: "Enregistré",
      description: "Les données ont été sauvegardées avec succès.",
    });
  };

  const exportToCSV = () => {
    const headers = columns.map(c => c.name).join(",");
    const data = rows.map(row => 
      columns.map(col => `"${row.data[col.id] || ""}"`).join(",")
    ).join("\n");
    
    const csv = `${headers}\n${data}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "export.csv";
    link.click();
    
    toast({
      title: "Exporté",
      description: "Le fichier CSV a été téléchargé.",
    });
  };

  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n").filter(line => line.trim());
      
      if (lines.length === 0) return;

      const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
      const newColumns: Column[] = headers.map((name, index) => ({
        id: `col-${Date.now()}-${index}`,
        name,
        type: "text" as const,
      }));

      const newRows: Row[] = lines.slice(1).map((line, rowIndex) => {
        const values = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
        const data: Record<string, string> = {};
        newColumns.forEach((col, colIndex) => {
          data[col.id] = values[colIndex] || "";
        });
        return { id: `row-${Date.now()}-${rowIndex}`, data };
      });

      setColumns(newColumns);
      setRows(newRows.length > 0 ? newRows : [{ id: `row-${Date.now()}`, data: {} }]);
      
      toast({
        title: "Importé",
        description: `${newRows.length} lignes importées avec succès.`,
      });
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <Card variant="neumorphismFlat">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button variant="neumorphism" size="sm" onClick={addColumn}>
              <Plus className="h-4 w-4 mr-1" /> Colonne
            </Button>
            <Button variant="neumorphism" size="sm" onClick={addRow}>
              <Plus className="h-4 w-4 mr-1" /> Ligne
            </Button>
            <label>
              <Button variant="neumorphism" size="sm" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-1" /> Importer CSV
                </span>
              </Button>
              <input
                type="file"
                accept=".csv"
                onChange={importFromCSV}
                className="hidden"
              />
            </label>
            <Button variant="neumorphism" size="sm" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-1" /> Exporter
            </Button>
            <Button variant="neumorphismPrimary" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Sauvegarder
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto shadow-neu-inset rounded-xl p-4">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/50">
                <TableHead className="w-[50px]">#</TableHead>
                {columns.map((col) => (
                  <TableHead key={col.id} className="min-w-[150px]">
                    <div className="flex items-center gap-2">
                      {editingHeader === col.id ? (
                        <Input
                          value={col.name}
                          onChange={(e) => updateColumnName(col.id, e.target.value)}
                          onBlur={() => setEditingHeader(null)}
                          onKeyDown={(e) => e.key === "Enter" && setEditingHeader(null)}
                          autoFocus
                          className="h-7 text-sm"
                          variant="neumorphism"
                        />
                      ) : (
                        <span 
                          onClick={() => setEditingHeader(col.id)}
                          className="cursor-pointer hover:text-primary"
                        >
                          {col.name}
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleSort(col.id)}
                      >
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                      {columns.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          onClick={() => removeColumn(col.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={row.id} className="border-b border-border/30">
                  <TableCell className="text-muted-foreground text-sm">
                    {rowIndex + 1}
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.id} className="p-1">
                      {editingCell?.rowId === row.id && editingCell?.colId === col.id ? (
                        <Input
                          value={row.data[col.id] || ""}
                          onChange={(e) => updateCell(row.id, col.id, e.target.value)}
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => e.key === "Enter" && setEditingCell(null)}
                          autoFocus
                          type={col.type === "number" ? "number" : col.type === "date" ? "date" : "text"}
                          className="h-8"
                          variant="neumorphism"
                        />
                      ) : (
                        <div
                          onClick={() => setEditingCell({ rowId: row.id, colId: col.id })}
                          className="min-h-[32px] px-2 py-1 cursor-pointer hover:bg-muted/50 rounded-lg flex items-center"
                        >
                          {row.data[col.id] || <span className="text-muted-foreground">—</span>}
                        </div>
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="p-1">
                    {rows.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeRow(row.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
