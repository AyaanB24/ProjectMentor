import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from "lucide-react";
import { EvaluationQuestion } from "@/data/evaluationContent";

interface QuestionPanelProps {
  question: EvaluationQuestion;
  selectedAnswer: number | undefined;
  showExplanation: boolean;
  onAnswer: (index: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function QuestionPanel({
  question,
  selectedAnswer,
  showExplanation,
  onAnswer,
  onNext,
  isLastQuestion,
}: QuestionPanelProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="h-full flex flex-col p-6 overflow-auto">
      <div className="max-w-2xl mx-auto w-full space-y-6 animate-fade-in">
        {/* Question */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold leading-relaxed">{question.question}</h2>
          
          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = question.correctAnswer === index;
              const showResult = showExplanation;
              
              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && onAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full flex items-start gap-3 p-4 rounded-lg border text-left transition-all ${
                    showResult
                      ? isCorrectOption
                        ? "border-success bg-success/10"
                        : isSelected
                        ? "border-destructive bg-destructive/10"
                        : "border-border bg-card opacity-60"
                      : isSelected
                      ? "border-primary bg-accent"
                      : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                    showResult && isCorrectOption
                      ? "bg-success text-success-foreground"
                      : showResult && isSelected
                      ? "bg-destructive text-destructive-foreground"
                      : isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {showResult && isCorrectOption ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : showResult && isSelected ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="flex-1 pt-0.5">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-5 rounded-lg border animate-fade-in ${
            isCorrect 
              ? "bg-success/5 border-success/30" 
              : "bg-destructive/5 border-destructive/30"
          }`}>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-success">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="text-destructive">Not quite right</span>
                </>
              )}
            </h4>
            
            <p className="text-sm text-muted-foreground mb-4">{question.explanation}</p>
            
            {question.codeReference && (
              <div className="flex items-start gap-2 p-3 rounded bg-muted/50 border border-border">
                <Lightbulb className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                <code className="text-xs font-mono text-muted-foreground break-all">
                  {question.codeReference}
                </code>
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        {showExplanation && (
          <div className="flex justify-end pt-2">
            <Button onClick={onNext} size="lg" className="gap-2">
              {isLastQuestion ? "View Results" : "Next Question"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
