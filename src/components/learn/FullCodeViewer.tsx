import { useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HighlightRange {
  startLine: number;
  endLine: number;
}

interface FileIssue {
  line: number;
  type: "error" | "warning" | "todo";
  message: string;
}

interface FullCodeViewerProps {
  fileName: string;
  filePath: string;
  content: string;
  highlightRange: HighlightRange | null;
  issues?: FileIssue[];
}

export function FullCodeViewer({
  fileName,
  filePath,
  content,
  highlightRange,
  issues = [],
}: FullCodeViewerProps) {
  const codeRef = useRef<HTMLPreElement>(null);

  // Scroll to highlighted range
  useEffect(() => {
    if (highlightRange && codeRef.current) {
      const lineHeight = 24;
      const scrollTo = (highlightRange.startLine - 1) * lineHeight - 100;
      codeRef.current.scrollTo({ top: Math.max(0, scrollTo), behavior: "smooth" });
    }
  }, [highlightRange]);

  const lines = content.split("\n");

  const getIssueForLine = (lineNum: number) => 
    issues.find((issue) => issue.line === lineNum);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/30">
        <FileCode2 className="w-4 h-4 text-primary" />
        <span className="font-mono text-sm font-medium">{fileName}</span>
        <Badge variant="outline" className="text-xs font-normal">
          {filePath}
        </Badge>
      </div>

      {/* Code Content */}
      <pre
        ref={codeRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm leading-6"
      >
        {lines.map((line, index) => {
          const lineNum = index + 1;
          const isHighlighted = highlightRange
            ? lineNum >= highlightRange.startLine && lineNum <= highlightRange.endLine
            : false;
          const issue = getIssueForLine(lineNum);

          return (
            <div
              key={index}
              className={cn(
                "flex",
                isHighlighted && "bg-primary/15 -mx-4 px-4 border-l-2 border-primary"
              )}
            >
              <span className="w-12 flex-shrink-0 text-muted-foreground/50 select-none text-right pr-4">
                {lineNum}
              </span>
              <span 
                className={cn(
                  "flex-1",
                  issue?.type === "error" && "underline decoration-wavy decoration-destructive",
                  issue?.type === "warning" && "underline decoration-wavy decoration-amber-400",
                  issue?.type === "todo" && "bg-amber-500/10"
                )}
                title={issue?.message}
              >
                {line || " "}
              </span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
