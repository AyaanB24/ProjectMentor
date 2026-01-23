import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Clock, Code } from "lucide-react";

const difficultyLevels = [
  { 
    id: "beginner", 
    title: "Beginner", 
    questions: 5, 
    time: "~5 min", 
    color: "text-success",
    mode: "Read & Understand",
    description: "Perfect for getting started"
  },
  { 
    id: "intermediate", 
    title: "Intermediate", 
    questions: 8, 
    time: "~8 min", 
    color: "text-warning",
    mode: "Read & Understand",
    description: "Reinforcing knowledge"
  },
  { 
    id: "advanced", 
    title: "Advanced", 
    questions: 3, 
    time: "~15 min", 
    color: "text-destructive",
    mode: "Write & Modify Code",
    description: "Real-world coding tasks"
  },
];

interface EvaluateLevelSelectProps {
  areaTitle: string;
  onBack: () => void;
  onSelectLevel: (levelId: string) => void;
}

export function EvaluateLevelSelect({ areaTitle, onBack, onSelectLevel }: EvaluateLevelSelectProps) {
  return (
    <div className="py-8 px-4">
      <div className="container max-w-3xl space-y-8">
        <div className="flex items-center gap-4 animate-fade-in">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{areaTitle}</span>
            <Badge variant="secondary">Select Difficulty</Badge>
          </div>
        </div>

        <div className="space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold">Choose your level</h1>
          <p className="text-muted-foreground">
            Select a difficulty that matches your current understanding.
          </p>
        </div>

        <div className="grid gap-4 stagger-children">
          {difficultyLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              className="group flex items-center justify-between p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-200 text-left"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className={`text-xl font-semibold ${level.color}`}>{level.title}</h3>
                  <Badge variant={level.id === "advanced" ? "default" : "outline"} className="text-xs">
                    {level.id === "advanced" ? <Code className="w-3 h-3 mr-1" /> : null}
                    {level.mode}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{level.description}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-medium">{level.questions} {level.id === "advanced" ? "tasks" : "questions"}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {level.time}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { difficultyLevels };
