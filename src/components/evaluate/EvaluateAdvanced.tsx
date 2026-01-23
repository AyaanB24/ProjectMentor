import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { AdvancedCodeEditor } from "./AdvancedCodeEditor";
import { AdvancedTask } from "@/data/evaluationContent";

interface TaskFeedback {
  passed: string[];
  failed: string[];
  suggestions: string[];
}

interface EvaluateAdvancedProps {
  area: string;
  tasks: AdvancedTask[];
  onExit: () => void;
  onComplete: (results: { taskId: string; passed: number; total: number }[]) => void;
}

export function EvaluateAdvanced({
  area,
  tasks,
  onExit,
  onComplete,
}: EvaluateAdvancedProps) {
  const [currentTask, setCurrentTask] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<TaskFeedback | null>(null);
  const [results, setResults] = useState<{ taskId: string; passed: number; total: number }[]>([]);

  const task = tasks[currentTask];
  const totalTasks = tasks.length;

  const evaluateCode = (code: string): TaskFeedback => {
    // Mock evaluation - in real app, this would be AI-powered
    const passed: string[] = [];
    const failed: string[] = [];
    const suggestions: string[] = [];

    task.evaluationCriteria.forEach((criterion) => {
      // Simple heuristic checks
      const criterionLower = criterion.toLowerCase();
      const codeLower = code.toLowerCase();

      if (criterionLower.includes('loading') && (codeLower.includes('loading') || codeLower.includes('isloading'))) {
        passed.push(criterion);
      } else if (criterionLower.includes('error') && (codeLower.includes('error') || codeLower.includes('catch'))) {
        passed.push(criterion);
      } else if (criterionLower.includes('validation') && (codeLower.includes('validate') || codeLower.includes('error'))) {
        passed.push(criterion);
      } else if (criterionLower.includes('display') && codeLower.includes('return')) {
        passed.push(criterion);
      } else if (Math.random() > 0.4) {
        // Randomly pass some criteria for demo
        passed.push(criterion);
      } else {
        failed.push(criterion);
      }
    });

    if (failed.length > 0) {
      suggestions.push("Consider adding try/catch blocks for error handling");
      suggestions.push("Make sure to handle edge cases like null or undefined values");
    }

    return { passed, failed, suggestions };
  };

  const handleSubmit = (code: string) => {
    const evaluation = evaluateCode(code);
    setFeedback(evaluation);
    setIsSubmitted(true);
    
    setResults(prev => [...prev, {
      taskId: task.id,
      passed: evaluation.passed.length,
      total: task.evaluationCriteria.length
    }]);
  };

  const handleNext = () => {
    if (currentTask + 1 >= totalTasks) {
      onComplete(results);
    } else {
      setCurrentTask((prev) => prev + 1);
      setIsSubmitted(false);
      setFeedback(null);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onExit}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Badge>{area}</Badge>
            <Badge variant="default">Advanced</Badge>
            <Badge variant="outline">
              Task {currentTask + 1}/{totalTasks}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Progress</span>
          <Progress value={((currentTask + 1) / totalTasks) * 100} className="w-32" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <AdvancedCodeEditor
          task={task}
          onSubmit={handleSubmit}
          onNext={handleNext}
          isLastTask={currentTask + 1 >= totalTasks}
          isSubmitted={isSubmitted}
          feedback={feedback}
        />
      </div>
    </div>
  );
}
