import { FileInsight, CodeSnippet } from "@/data/learningContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Target, 
  Code2, 
  ChevronRight,
  Eye,
  Layers
} from "lucide-react";

interface FileInsightPanelProps {
  insight: FileInsight | null;
  onMethodClick: (lineStart: number) => void;
  onSnippetClick: (snippet: CodeSnippet) => void;
  selectedSnippetId: string | null;
}

export function FileInsightPanel({
  insight,
  onMethodClick,
  onSnippetClick,
  selectedSnippetId,
}: FileInsightPanelProps) {
  if (!insight) {
    return (
      <div className="w-80 border-l border-border bg-sidebar flex items-center justify-center p-6">
        <p className="text-sm text-muted-foreground text-center">
          Select a file to see insights
        </p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-border bg-sidebar flex flex-col overflow-hidden">
      {/* Why This File Exists */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h4 className="font-medium text-sm">Why This File Exists</h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {insight.whyExists}
        </p>
      </div>

      {/* What Problem It Solves */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-green-400" />
          <h4 className="font-medium text-sm">Problem It Solves</h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {insight.problemSolved}
        </p>
      </div>

      {/* Key Methods */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h4 className="font-medium text-sm">Key Methods</h4>
        </div>
        <div className="space-y-2">
          {insight.keyMethods.map((method, idx) => (
            <button
              key={idx}
              onClick={() => onMethodClick(method.lineStart)}
              className="w-full flex items-center gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left group"
            >
              <Code2 className="w-4 h-4 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-foreground truncate">
                  {method.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {method.purpose}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Key Snippets */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-purple-400" />
          <h4 className="font-medium text-sm">Key Snippets</h4>
        </div>
        <div className="space-y-2">
          {insight.snippets.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => onSnippetClick(snippet)}
              className={`w-full p-3 rounded-lg text-left transition-all ${
                selectedSnippetId === snippet.id
                  ? "bg-primary/10 ring-1 ring-primary/30"
                  : "bg-muted/50 hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  L{snippet.startLine}-{snippet.endLine}
                </Badge>
                <span className="font-medium text-xs">{snippet.label}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {snippet.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
