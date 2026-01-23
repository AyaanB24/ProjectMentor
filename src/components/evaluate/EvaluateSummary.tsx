import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  BookOpen, 
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Award
} from "lucide-react";
import { LevelResult } from "@/data/evaluationContent";

interface EvaluateSummaryProps {
  area: string;
  level: string;
  score: number;
  total: number;
  result: LevelResult;
  onLearnWeakAreas: () => void;
  onSwitchArea: () => void;
  onIncreaseDifficulty: () => void;
  onRetake: () => void;
}

export function EvaluateSummary({
  area,
  level,
  score,
  total,
  result,
  onLearnWeakAreas,
  onSwitchArea,
  onIncreaseDifficulty,
  onRetake,
}: EvaluateSummaryProps) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 60;

  return (
    <div className="py-12 px-4">
      <div className="container max-w-2xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
            passed ? "bg-success/10" : "bg-warning/10"
          }`}>
            {passed ? (
              <Award className="w-10 h-10 text-success" />
            ) : (
              <Target className="w-10 h-10 text-warning" />
            )}
          </div>
          <h1 className="text-3xl font-bold">
            {passed ? "Evaluation Complete!" : "Keep Learning!"}
          </h1>
          <p className="text-muted-foreground">
            Here's how you did on {area} ({level})
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6 text-center">
          <div className={`text-5xl font-bold mb-2 ${
            percentage >= 80 ? "text-success" : percentage >= 60 ? "text-primary" : "text-warning"
          }`}>
            {score}/{total}
          </div>
          <p className="text-muted-foreground mb-1">
            {level === "advanced" ? "Tasks Completed" : "Questions Correct"}
          </p>
          <Badge variant={passed ? "default" : "secondary"} className="mt-2">
            {percentage}% Score
          </Badge>
          <Progress 
            value={percentage} 
            className="mt-4 h-3"
          />
        </div>

        {/* Recommendation */}
        {result.recommendation && (
          <div className={`p-4 rounded-lg border flex items-start gap-3 ${
            passed ? "bg-primary/5 border-primary/20" : "bg-warning/5 border-warning/20"
          }`}>
            <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${passed ? "text-primary" : "text-warning"}`} />
            <p className="text-sm">{result.recommendation}</p>
          </div>
        )}

        {/* Strengths & Weak Areas */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-lg bg-success/5 border border-success/20">
            <h4 className="font-semibold flex items-center gap-2 text-success mb-3">
              <CheckCircle2 className="w-5 h-5" />
              Strengths
            </h4>
            {result.strengths.length > 0 ? (
              <ul className="text-sm space-y-2 text-muted-foreground">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-success">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Keep practicing to discover your strengths!</p>
            )}
          </div>
          
          <div className="p-5 rounded-lg bg-destructive/5 border border-destructive/20">
            <h4 className="font-semibold flex items-center gap-2 text-destructive mb-3">
              <Target className="w-5 h-5" />
              Areas to Improve
            </h4>
            {result.weakAreas.length > 0 ? (
              <ul className="text-sm space-y-2 text-muted-foreground">
                {result.weakAreas.map((w, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Excellent! No major weak areas identified.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-3">
          {result.weakAreas.length > 0 && (
            <Button variant="outline" onClick={onLearnWeakAreas} className="gap-2">
              <BookOpen className="w-4 h-4" />
              Learn Weak Areas
            </Button>
          )}
          <Button variant="outline" onClick={onSwitchArea} className="gap-2">
            Switch Area
          </Button>
          {passed && level !== "advanced" && (
            <Button variant="outline" onClick={onIncreaseDifficulty} className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Increase Difficulty
            </Button>
          )}
          <Button onClick={onRetake} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Retake Test
          </Button>
        </div>

        {/* Next Steps */}
        {passed && level === "advanced" && (
          <div className="text-center pt-4">
            <p className="text-muted-foreground mb-3">Ready to master another area?</p>
            <Button onClick={onSwitchArea} size="lg" className="gap-2">
              Explore Other Areas
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
