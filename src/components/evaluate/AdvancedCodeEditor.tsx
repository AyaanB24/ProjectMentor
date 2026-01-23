import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  RotateCcw, 
  Send, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { AdvancedTask } from "@/data/evaluationContent";

interface AdvancedCodeEditorProps {
  task: AdvancedTask;
  onSubmit: (code: string) => void;
  onNext: () => void;
  isLastTask: boolean;
  isSubmitted: boolean;
  feedback: {
    passed: string[];
    failed: string[];
    suggestions: string[];
  } | null;
}

export function AdvancedCodeEditor({
  task,
  onSubmit,
  onNext,
  isLastTask,
  isSubmitted,
  feedback,
}: AdvancedCodeEditorProps) {
  const [code, setCode] = useState(task.initialCode);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const handleReset = () => {
    setCode(task.initialCode);
  };

  const handleSubmit = () => {
    onSubmit(code);
  };

  const lines = code.split('\n');

  return (
    <div className="h-full flex">
      {/* Code Editor Panel */}
      <div className="flex-1 flex flex-col bg-sidebar border-r border-border">
        <div className="px-4 py-3 border-b border-border bg-sidebar-accent flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-warning/50" />
              <div className="w-3 h-3 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-sm text-muted-foreground ml-2">{task.fileName}</span>
            <Badge variant="secondary" className="text-xs">Editable</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} disabled={isSubmitted}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isSubmitted}
              className="w-full min-h-[500px] font-mono text-sm bg-transparent resize-none focus:outline-none disabled:opacity-70"
              spellCheck={false}
            />
          </div>
        </ScrollArea>
      </div>

      {/* Task & Feedback Panel */}
      <div className="w-[400px] flex flex-col bg-card">
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Task Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Your Task</h3>
              <p className="text-muted-foreground">{task.task}</p>
            </div>

            {/* Hints */}
            <div className="space-y-2">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Lightbulb className="w-4 h-4" />
                {showHints ? "Hide Hints" : "Show Hints"}
                {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showHints && (
                <ul className="space-y-1 text-sm text-muted-foreground pl-6 animate-fade-in">
                  {task.hints.map((hint, i) => (
                    <li key={i} className="list-disc">{hint}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Evaluation Criteria */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Evaluation Criteria</h4>
              <ul className="space-y-1">
                {task.evaluationCriteria.map((criterion, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    {feedback ? (
                      feedback.passed.includes(criterion) ? (
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      )
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted shrink-0 mt-0.5" />
                    )}
                    <span className={feedback?.passed.includes(criterion) ? "text-success" : feedback?.failed.includes(criterion) ? "text-destructive" : "text-muted-foreground"}>
                      {criterion}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="space-y-4 animate-fade-in">
                <div className={`p-4 rounded-lg border ${
                  feedback.failed.length === 0 
                    ? "bg-success/10 border-success/30" 
                    : "bg-warning/10 border-warning/30"
                }`}>
                  <h4 className="font-medium mb-2">
                    {feedback.failed.length === 0 ? "Excellent work!" : "Good attempt!"}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feedback.passed.length} of {task.evaluationCriteria.length} criteria met
                  </p>
                </div>

                {feedback.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Suggestions</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {feedback.suggestions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Show Solution */}
                <div className="space-y-2">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-sm text-primary hover:underline"
                  >
                    {showSolution ? "Hide Sample Solution" : "View Sample Solution"}
                  </button>
                  
                  {showSolution && (
                    <pre className="p-3 rounded bg-muted text-xs font-mono overflow-x-auto animate-fade-in">
                      <code>{task.sampleSolution}</code>
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="p-4 border-t border-border">
          {!isSubmitted ? (
            <Button onClick={handleSubmit} className="w-full gap-2">
              <Send className="w-4 h-4" />
              Submit Changes
            </Button>
          ) : (
            <Button onClick={onNext} className="w-full gap-2">
              {isLastTask ? "View Results" : "Next Task"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
