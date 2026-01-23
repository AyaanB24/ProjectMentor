import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeSnippet } from "@/data/learningContent";
import { 
  FileCode2, 
  Eye, 
  Code2, 
  Maximize2,
  Minimize2
} from "lucide-react";

interface CodeViewerProps {
  fileName: string;
  filePath: string;
  fullContent: string;
  snippets: CodeSnippet[];
  activeSnippet: CodeSnippet | null;
  highlightedLine: number | null;
  onClearHighlight: () => void;
}

type ViewMode = "snippets" | "full";

export function CodeViewer({
  fileName,
  filePath,
  fullContent,
  snippets,
  activeSnippet,
  highlightedLine,
  onClearHighlight,
}: CodeViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("snippets");
  const codeRef = useRef<HTMLPreElement>(null);

  // Scroll to highlighted line
  useEffect(() => {
    if (highlightedLine && codeRef.current && viewMode === "full") {
      const lineHeight = 24; // Approximate line height in pixels
      const scrollTo = (highlightedLine - 1) * lineHeight - 100;
      codeRef.current.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  }, [highlightedLine, viewMode]);

  const lines = fullContent.split("\n");

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <FileCode2 className="w-4 h-4 text-primary" />
          <span className="font-mono text-sm font-medium">{fileName}</span>
          <Badge variant="outline" className="text-xs">
            {filePath}
          </Badge>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          <Button
            variant={viewMode === "snippets" ? "default" : "ghost"}
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={() => setViewMode("snippets")}
          >
            <Eye className="w-3.5 h-3.5" />
            Key Snippets
          </Button>
          <Button
            variant={viewMode === "full" ? "default" : "ghost"}
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={() => {
              setViewMode("full");
              onClearHighlight();
            }}
          >
            <Code2 className="w-3.5 h-3.5" />
            Full File
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto">
        {viewMode === "snippets" ? (
          <div className="p-4 space-y-4">
            {snippets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Code2 className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No key snippets extracted yet</p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setViewMode("full")}
                  className="mt-2"
                >
                  View full file instead
                </Button>
              </div>
            ) : (
              snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className={`rounded-xl border overflow-hidden transition-all ${
                    activeSnippet?.id === snippet.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border"
                  }`}
                >
                  {/* Snippet Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/20 text-xs">
                        {snippet.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Lines {snippet.startLine}-{snippet.endLine}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 gap-1 text-xs"
                      onClick={() => setViewMode("full")}
                    >
                      <Maximize2 className="w-3 h-3" />
                      Expand
                    </Button>
                  </div>
                  
                  {/* Snippet Description */}
                  <div className="px-4 py-2 bg-muted/30 border-b border-border">
                    <p className="text-xs text-muted-foreground">
                      {snippet.description}
                    </p>
                  </div>
                  
                  {/* Snippet Code */}
                  <pre className="p-4 overflow-x-auto bg-[hsl(var(--sidebar-background))]">
                    <code className="font-mono text-sm leading-relaxed">
                      {snippet.code}
                    </code>
                  </pre>
                </div>
              ))
            )}
          </div>
        ) : (
          <pre
            ref={codeRef}
            className="p-4 font-mono text-sm leading-6 overflow-x-auto"
          >
            {lines.map((line, index) => {
              const lineNum = index + 1;
              const isHighlighted = lineNum === highlightedLine;
              const isInActiveSnippet = activeSnippet
                ? lineNum >= activeSnippet.startLine && lineNum <= activeSnippet.endLine
                : false;

              return (
                <div
                  key={index}
                  className={`flex ${
                    isHighlighted
                      ? "bg-primary/20 -mx-4 px-4"
                      : isInActiveSnippet
                      ? "bg-accent/30 -mx-4 px-4"
                      : ""
                  }`}
                >
                  <span className="w-12 flex-shrink-0 text-muted-foreground/50 select-none text-right pr-4">
                    {lineNum}
                  </span>
                  <span className="flex-1">{line || " "}</span>
                </div>
              );
            })}
          </pre>
        )}
      </div>

      {/* Footer - show in full mode when highlighted */}
      {viewMode === "full" && highlightedLine && (
        <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Highlighting line {highlightedLine}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 gap-1 text-xs"
            onClick={() => setViewMode("snippets")}
          >
            <Minimize2 className="w-3 h-3" />
            Back to Snippets
          </Button>
        </div>
      )}
    </div>
  );
}
