import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Search, Filter, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  due_date?: string;
}

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const statusColors = {
  todo: "bg-yellow-500",
  in_progress: "bg-blue-500",
  done: "bg-green-500",
};

const statusLabels = {
  todo: "À faire",
  in_progress: "En cours",
  done: "Terminé",
};

const priorityColors = {
  low: "text-gray-500 border-gray-500",
  medium: "text-orange-500 border-orange-500",
  high: "text-red-500 border-red-500",
};

const priorityLabels = {
  low: "Basse",
  medium: "Moyenne",
  high: "Haute",
};

export function TaskList({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCheckboxChange = (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === "done" ? "todo" : "done";
    onStatusChange(taskId, newStatus);
  };

  return (
    <Card variant="neumorphismFlat">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg">Liste des tâches</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[200px]"
                variant="neumorphism"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px] shadow-neu rounded-xl">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent className="bg-background shadow-neu rounded-xl">
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="done">Terminé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[140px] shadow-neu rounded-xl">
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent className="bg-background shadow-neu rounded-xl">
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="low">Basse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune tâche trouvée
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`py-4 flex items-start gap-4 ${
                  task.status === "done" ? "opacity-60" : ""
                }`}
              >
                <Checkbox
                  checked={task.status === "done"}
                  onCheckedChange={() => handleCheckboxChange(task.id, task.status)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 
                      className={`font-medium ${
                        task.status === "done" ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </h4>
                    <Badge className={`${statusColors[task.status]} text-white text-xs`}>
                      {statusLabels[task.status]}
                    </Badge>
                    <Badge variant="outline" className={`${priorityColors[task.priority]} text-xs`}>
                      {priorityLabels[task.priority]}
                    </Badge>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                  {task.due_date && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(task.due_date), "d MMMM yyyy", { locale: fr })}
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="neumorphism"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(task)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="neumorphism"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
