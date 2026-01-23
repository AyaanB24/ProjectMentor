import { FlowStep } from "@/data/learningContent";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface FlowSidebarProps {
  steps: FlowStep[];
  currentStepIndex: number;
  completedSteps: Set<string>;
  onStepClick: (index: number) => void;
  areaIcon: LucideIcon;
  areaTitle: string;
  areaColor: string;
}

export function FlowSidebar({
  steps,
  currentStepIndex,
  completedSteps,
  onStepClick,
  areaIcon: AreaIcon,
  areaTitle,
  areaColor,
}: FlowSidebarProps) {
  return (
    <div className="w-72 border-r border-border bg-sidebar flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-primary/10 ${areaColor}`}>
            <AreaIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{areaTitle} Path</h3>
            <p className="text-xs text-muted-foreground">Follow the guided flow</p>
          </div>
        </div>
      </div>

      {/* Flow Steps */}
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-1">
          {steps.map((step, index) => {
            const isActive = currentStepIndex === index;
            const isCompleted = completedSteps.has(step.id);
            const isPast = index < currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => onStepClick(index)}
                className={`w-full group relative flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 ring-1 ring-primary/20"
                    : "hover:bg-muted/60"
                }`}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div 
                    className={`absolute left-[1.65rem] top-12 w-0.5 h-[calc(100%-1.5rem)] ${
                      isPast || isCompleted ? "bg-primary/40" : "bg-border"
                    }`}
                  />
                )}

                {/* Step Indicator */}
                <div className="relative flex-shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                  ) : (
                    <Circle className={`w-5 h-5 ${isPast ? "text-primary/60" : "text-muted-foreground/40"}`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium text-sm ${
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {step.title}
                    </p>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 ${
                    isActive ? "text-muted-foreground" : "text-muted-foreground/70"
                  }`}>
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{completedSteps.size}/{steps.length} completed</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
