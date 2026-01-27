import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "group relative rounded-2xl border bg-card p-6 transition-all duration-300",
          "shadow-card hover:shadow-2xl hover:shadow-primary/10",
          "hover:border-primary/40",
          "glass-card hover-glow",
          selected && "border-primary bg-primary/5 shadow-elevated",
          disabled && "opacity-50 pointer-events-none",
          "cursor-pointer",
          className
        )}
        {...(props as any)}
      >
        {badge && (
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {badge}
          </span>
        )}

        <div className="flex flex-col gap-4">
          {Icon && (
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              "bg-primary/10 text-primary transition-all duration-300",
              "group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6 shadow-sm"
            )}>
              <Icon className="w-6 h-6" />
            </div>
          )}

          <div className="space-y-1.5">
            <h3 className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {description}
              </p>
            )}
          </div>

          {progress !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="text-muted-foreground">Completion</span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                />
              </div>
            </div>
          )}

          {children && (
            <div className="mt-2 relative z-10">
              {children}
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
