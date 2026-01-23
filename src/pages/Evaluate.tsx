import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProject } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";
import { EvaluateAreaSelect } from "@/components/evaluate/EvaluateAreaSelect";
import { EvaluateLevelSelect, difficultyLevels } from "@/components/evaluate/EvaluateLevelSelect";
import { EvaluateQuestions } from "@/components/evaluate/EvaluateQuestions";
import { EvaluateAdvanced } from "@/components/evaluate/EvaluateAdvanced";
import { EvaluateSummary } from "@/components/evaluate/EvaluateSummary";
import { getQuestions, evaluatePerformance, advancedTasks, LevelResult } from "@/data/evaluationContent";

const areaLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend", 
  database: "Database",
  full: "Full Project"
};

type EvaluationStep = "area" | "level" | "questions" | "summary";

export default function Evaluate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentProject } = useProject();
  const { isAuthenticated } = useAuth();
  
  const areaParam = searchParams.get("area");
  
  const [step, setStep] = useState<EvaluationStep>("area");
  const [selectedArea, setSelectedArea] = useState<string | null>(areaParam);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState<LevelResult>({ strengths: [], weakAreas: [] });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=/evaluate");
      return;
    }
    if (!currentProject) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentProject, navigate]);

  useEffect(() => {
    if (areaParam) {
      setSelectedArea(areaParam);
      setStep("level");
    }
  }, [areaParam]);

  if (!currentProject) return null;

  const handleAreaSelect = (areaId: string) => {
    setSelectedArea(areaId);
    setStep("level");
  };

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
    setStep("questions");
  };

  const handleQuestionsComplete = (answers: Record<number, number>) => {
    const questions = getQuestions(selectedArea || "frontend", selectedLevel || "beginner");
    const evaluation = evaluatePerformance(answers, questions);
    
    let correct = 0;
    Object.entries(answers).forEach(([qIndex, answer]) => {
      if (questions[parseInt(qIndex)]?.correctAnswer === answer) correct++;
    });
    
    setScore(correct);
    setTotal(questions.length);
    setResult(evaluation);
    setStep("summary");
  };

  const handleAdvancedComplete = (results: { taskId: string; passed: number; total: number }[]) => {
    const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
    const totalCriteria = results.reduce((sum, r) => sum + r.total, 0);
    
    setScore(totalPassed);
    setTotal(totalCriteria);
    setResult({
      strengths: totalPassed > totalCriteria * 0.7 ? ["Strong coding skills", "Good problem-solving approach"] : [],
      weakAreas: totalPassed < totalCriteria * 0.5 ? ["Error handling patterns", "State management"] : [],
      recommendation: totalPassed < totalCriteria * 0.6 ? "Consider revisiting the Learn section for more practice." : undefined
    });
    setStep("summary");
  };

  const handleRestart = () => {
    setStep("level");
  };

  const level = difficultyLevels.find((l) => l.id === selectedLevel);
  const questions = getQuestions(selectedArea || "frontend", selectedLevel || "beginner");
  const tasks = advancedTasks[selectedArea || "frontend"] || advancedTasks.frontend;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {step === "area" && (
        <EvaluateAreaSelect
          project={currentProject}
          onBack={() => navigate("/dashboard")}
          onSelectArea={handleAreaSelect}
        />
      )}

      {step === "level" && selectedArea && (
        <EvaluateLevelSelect
          areaTitle={areaLabels[selectedArea]}
          onBack={() => setStep("area")}
          onSelectLevel={handleLevelSelect}
        />
      )}

      {step === "questions" && selectedArea && selectedLevel && selectedLevel !== "advanced" && (
        <EvaluateQuestions
          area={areaLabels[selectedArea]}
          level={level?.title || "Beginner"}
          questions={questions}
          onExit={() => setStep("level")}
          onComplete={handleQuestionsComplete}
        />
      )}

      {step === "questions" && selectedArea && selectedLevel === "advanced" && (
        <EvaluateAdvanced
          area={areaLabels[selectedArea]}
          tasks={tasks}
          onExit={() => setStep("level")}
          onComplete={handleAdvancedComplete}
        />
      )}

      {step === "summary" && selectedArea && selectedLevel && (
        <EvaluateSummary
          area={areaLabels[selectedArea]}
          level={level?.title || "Beginner"}
          score={score}
          total={total}
          result={result}
          onLearnWeakAreas={() => navigate(`/learn?area=${selectedArea}`)}
          onSwitchArea={() => setStep("area")}
          onIncreaseDifficulty={() => {
            const levels = ["beginner", "intermediate", "advanced"];
            const nextIdx = levels.indexOf(selectedLevel) + 1;
            if (nextIdx < levels.length) {
              setSelectedLevel(levels[nextIdx]);
              setStep("questions");
            }
          }}
          onRetake={handleRestart}
        />
      )}
    </div>
  );
}
