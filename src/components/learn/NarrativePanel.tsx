import { FlowStep } from "@/data/learningContent";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Link2,
  Sparkles
} from "lucide-react";

interface NarrativePanelProps {
  currentStep: FlowStep;
  stepIndex: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onMarkComplete: () => void;
  isCompleted: boolean;
}

export function NarrativePanel({
  currentStep,
  stepIndex,
  totalSteps,
  onPrevious,
  onNext,
  onMarkComplete,
  isCompleted,
}: NarrativePanelProps) {
  const { narrative } = currentStep;

  return (
    <div className="border-t border-border bg-card">
      {/* Main Narrative */}
      <div className="p-5">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-sm">Learning Narrative</h4>
          </div>

          {/* Narrative Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* What Happens */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                  What Happens Here
                </h5>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {narrative.whatHappens}
              </p>
            </div>

            {/* How It Connects */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Link2 className="w-3.5 h-3.5 text-green-400" />
                </div>
                <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                  How It Connects
                </h5>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {narrative.howItConnects}
              </p>
            </div>

            {/* Why This Design */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                  Why This Design
                </h5>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {narrative.whyThisDesign}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={stepIndex === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={stepIndex === totalSteps - 1}
            className="gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Step {stepIndex + 1} of {totalSteps}
          </span>
          {!isCompleted && (
            <Button size="sm" onClick={onMarkComplete} className="gap-2">
              Mark as Understood
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
