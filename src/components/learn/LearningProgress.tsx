import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningProgressProps {
  areaTitle: string;
  areaIcon: LucideIcon;
  areaColor: string;
  completedCount: number;
  totalCount: number;
}

export function LearningProgress({
  areaTitle,
  areaIcon: AreaIcon,
  areaColor,
  completedCount,
  totalCount,
}: LearningProgressProps) {
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-muted/30 border-b border-border">
      <div className="flex items-center gap-2">
        <div className={cn("p-1.5 rounded-md", areaColor)}>
          <AreaIcon className="w-4 h-4" />
        </div>
        <span className="font-medium text-sm">{areaTitle} Learning Progress</span>
      </div>
      <div className="flex-1 flex items-center gap-3 max-w-xs">
        <Progress value={percentage} className="h-2" />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {completedCount} / {totalCount} files
        </span>
      </div>
    </div>
  );
}
