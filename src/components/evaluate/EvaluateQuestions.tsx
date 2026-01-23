import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { CodeContextPanel } from "./CodeContextPanel";
import { QuestionPanel } from "./QuestionPanel";
import { EvaluationQuestion } from "@/data/evaluationContent";

interface EvaluateQuestionsProps {
  area: string;
  level: string;
  questions: EvaluationQuestion[];
  onExit: () => void;
  onComplete: (answers: Record<number, number>) => void;
}

export function EvaluateQuestions({
  area,
  level,
  questions,
  onExit,
  onComplete,
}: EvaluateQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;

  const handleAnswer = (answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answerIndex }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion + 1 >= totalQuestions) {
      onComplete(answers);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
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
            <Badge variant="secondary">{level}</Badge>
            <Badge variant="outline">
              {currentQuestion + 1}/{totalQuestions}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Progress</span>
          <Progress value={((currentQuestion + 1) / totalQuestions) * 100} className="w-32" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Code Context */}
        <div className="w-[45%] min-w-[400px]">
          <CodeContextPanel
            code={currentQ.code}
            fileName={currentQ.fileName}
            highlightedLines={currentQ.highlightedLines}
          />
        </div>

        {/* Right: Question Panel */}
        <div className="flex-1 bg-background">
          <QuestionPanel
            question={currentQ}
            selectedAnswer={answers[currentQuestion]}
            showExplanation={showExplanation}
            onAnswer={handleAnswer}
            onNext={handleNext}
            isLastQuestion={currentQuestion + 1 >= totalQuestions}
          />
        </div>
      </div>
    </div>
  );
}
