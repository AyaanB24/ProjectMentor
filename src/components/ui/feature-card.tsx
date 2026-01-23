import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  selected?: boolean;
  disabled?: boolean;
  badge?: string;
  progress?: number;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon: Icon, title, description, selected, disabled, badge, progress, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative rounded-xl border bg-card p-6 transition-all duration-200",
          "shadow-card hover:shadow-card-hover",
          "hover:border-primary/30 hover:-translate-y-0.5",
          selected && "border-primary bg-accent shadow-card-hover",
          disabled && "opacity-50 pointer-events-none",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {badge && (
          <span className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {badge}
          </span>
        )}
        
        <div className="flex flex-col gap-3">
          {Icon && (
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              "bg-primary/10 text-primary",
              "transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            )}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            )}
          </div>

          {progress !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {children}
        </div>
      </div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
