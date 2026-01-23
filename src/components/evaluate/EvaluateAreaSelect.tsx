import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Palette, Server, Database, Layers } from "lucide-react";
import { Project } from "@/contexts/ProjectContext";

const evaluationAreas = [
  { id: "frontend", icon: Palette, title: "Frontend", description: "Test your knowledge of React, routing, and UI" },
  { id: "backend", icon: Server, title: "Backend", description: "Test your knowledge of APIs and server logic" },
  { id: "database", icon: Database, title: "Database", description: "Test your knowledge of models and data" },
  { id: "full", icon: Layers, title: "Full Project", description: "Comprehensive test covering all areas" },
];

interface EvaluateAreaSelectProps {
  project: Project;
  onBack: () => void;
  onSelectArea: (areaId: string) => void;
}

export function EvaluateAreaSelect({ project, onBack, onSelectArea }: EvaluateAreaSelectProps) {
  return (
    <div className="py-8 px-4">
      <div className="container max-w-4xl space-y-8">
        <div className="flex items-center gap-4 animate-fade-in">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{project.name}</span>
            <Badge variant="secondary">Evaluate Mode</Badge>
          </div>
        </div>

        <div className="space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold">What do you want to evaluate?</h1>
          <p className="text-muted-foreground">
            Choose an area to test your understanding with project-based questions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 stagger-children">
          {evaluationAreas.map((evalArea) => (
            <FeatureCard
              key={evalArea.id}
              icon={evalArea.icon}
              title={evalArea.title}
              description={evalArea.description}
              onClick={() => onSelectArea(evalArea.id)}
            >
              <Button className="w-full mt-4 gap-2">
                Select
                <ArrowRight className="w-4 h-4" />
              </Button>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}
