import { ScrollArea } from "@/components/ui/scroll-area";

interface CodeContextPanelProps {
  code: string;
  fileName: string;
  highlightedLines?: number[];
}

export function CodeContextPanel({ code, fileName, highlightedLines = [] }: CodeContextPanelProps) {
  const lines = code.split('\n');

  return (
    <div className="h-full flex flex-col bg-sidebar border-r border-border">
      <div className="px-4 py-3 border-b border-border bg-sidebar-accent">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/50" />
            <div className="w-3 h-3 rounded-full bg-warning/50" />
            <div className="w-3 h-3 rounded-full bg-success/50" />
          </div>
          <span className="font-mono text-sm text-muted-foreground ml-2">{fileName}</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <pre className="font-mono text-sm">
            {lines.map((line, index) => {
              const lineNum = index + 1;
              const isHighlighted = highlightedLines.includes(lineNum);
              
              return (
                <div
                  key={index}
                  className={`flex ${isHighlighted ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}`}
                >
                  <span className="w-8 text-right text-muted-foreground/50 select-none mr-4 shrink-0">
                    {lineNum}
                  </span>
                  <code className={`flex-1 ${isHighlighted ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {line || ' '}
                  </code>
                </div>
              );
            })}
          </pre>
        </div>
      </ScrollArea>
    </div>
  );
}
