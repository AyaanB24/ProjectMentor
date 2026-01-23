import { useState } from "react";
import { FileInsight, CodeSnippet } from "@/data/learningContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Target, 
  Code2, 
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  ListTodo,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "why" | "important" | "issues";

interface FileIssue {
  id: string;
  type: "error" | "warning" | "todo" | "antipattern";
  line: number;
  message: string;
  suggestion?: string;
}

interface TabbedInsightPanelProps {
  insight: FileInsight | null;
  issues: FileIssue[];
  onLineClick: (startLine: number, endLine: number) => void;
  selectedRange: { startLine: number; endLine: number } | null;
  isFileUnderstood: boolean;
  onMarkUnderstood: () => void;
}

export function TabbedInsightPanel({
  insight,
  issues,
  onLineClick,
  selectedRange,
  isFileUnderstood,
  onMarkUnderstood,
}: TabbedInsightPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("why");

  const tabs: { id: TabId; label: string }[] = [
    { id: "why", label: "Why" },
    { id: "important", label: "Important" },
    { id: "issues", label: "Issues" },
  ];

  if (!insight) {
    return (
      <div className="w-80 border-l border-border bg-sidebar flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <Info className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Select a file to see insights
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-border bg-sidebar flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-3 py-2.5 text-xs font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.id === "issues" && issues.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-1.5 h-4 px-1 text-[10px] bg-amber-500/20 text-amber-400"
              >
                {issues.length}
              </Badge>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "why" && (
          <WhyTab insight={insight} />
        )}
        {activeTab === "important" && (
          <ImportantTab
            insight={insight}
            onLineClick={onLineClick}
            selectedRange={selectedRange}
          />
        )}
        {activeTab === "issues" && (
          <IssuesTab issues={issues} onLineClick={onLineClick} />
        )}
      </div>

      {/* Mark as Understood */}
      <div className="p-4 border-t border-border bg-muted/20">
        <Button
          onClick={onMarkUnderstood}
          variant={isFileUnderstood ? "secondary" : "default"}
          className="w-full gap-2"
          disabled={isFileUnderstood}
        >
          {isFileUnderstood ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Marked as Understood
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Mark as Understood
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function WhyTab({ insight }: { insight: FileInsight }) {
  return (
    <div className="p-4 space-y-4">
      {/* Purpose */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h4 className="font-medium text-sm">Purpose</h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed pl-6">
          {insight.whyExists}
        </p>
      </div>

      {/* Problem it Solves */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-green-400" />
          <h4 className="font-medium text-sm">Problem it Solves</h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed pl-6">
          {insight.problemSolved}
        </p>
      </div>

      {/* Architecture Fit */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <h4 className="font-medium text-sm">Architecture Fit</h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed pl-6">
          This file is part of the frontend layer, handling UI presentation and user interactions.
        </p>
      </div>
    </div>
  );
}

interface ImportantTabProps {
  insight: FileInsight;
  onLineClick: (startLine: number, endLine: number) => void;
  selectedRange: { startLine: number; endLine: number } | null;
}

function ImportantTab({ insight, onLineClick, selectedRange }: ImportantTabProps) {
  const allItems = [
    ...insight.keyMethods.map((method) => ({
      id: `method-${method.name}`,
      label: method.name,
      description: method.purpose,
      startLine: method.lineStart,
      endLine: method.lineEnd,
      type: "method" as const,
    })),
    ...insight.snippets.map((snippet) => ({
      id: snippet.id,
      label: snippet.label,
      description: snippet.description,
      startLine: snippet.startLine,
      endLine: snippet.endLine,
      type: "snippet" as const,
    })),
  ];

  return (
    <div className="p-4 space-y-2">
      <p className="text-xs text-muted-foreground mb-3">
        Click to highlight in code viewer
      </p>
      {allItems.map((item) => {
        const isSelected = selectedRange?.startLine === item.startLine && 
                          selectedRange?.endLine === item.endLine;
        return (
          <button
            key={item.id}
            onClick={() => onLineClick(item.startLine, item.endLine)}
            className={cn(
              "w-full flex items-center gap-2 p-3 rounded-lg text-left transition-all group",
              isSelected
                ? "bg-primary/10 ring-1 ring-primary/30"
                : "bg-muted/50 hover:bg-muted"
            )}
          >
            <Code2 className={cn(
              "w-4 h-4 flex-shrink-0",
              isSelected ? "text-primary" : "text-cyan-400"
            )} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-xs font-medium truncate">
                  {item.label}
                </span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 flex-shrink-0">
                  L{item.startLine}-{item.endLine}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </div>
            <ChevronRight className={cn(
              "w-4 h-4 flex-shrink-0 transition-colors",
              isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )} />
          </button>
        );
      })}
    </div>
  );
}

interface IssuesTabProps {
  issues: FileIssue[];
  onLineClick: (startLine: number, endLine: number) => void;
}

function IssuesTab({ issues, onLineClick }: IssuesTabProps) {
  const getIssueIcon = (type: FileIssue["type"]) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case "todo":
        return <ListTodo className="w-4 h-4 text-cyan-400" />;
      case "antipattern":
        return <Info className="w-4 h-4 text-orange-400" />;
    }
  };

  if (issues.length === 0) {
    return (
      <div className="p-4 text-center">
        <CheckCircle2 className="w-8 h-8 mx-auto mb-3 text-green-500/50" />
        <p className="text-sm text-muted-foreground">No issues found</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          This file looks good!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      {issues.map((issue) => (
        <button
          key={issue.id}
          onClick={() => onLineClick(issue.line, issue.line)}
          className="w-full flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted text-left transition-colors"
        >
          {getIssueIcon(issue.type)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                Line {issue.line}
              </Badge>
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-[10px] px-1.5 py-0",
                  issue.type === "error" && "bg-destructive/20 text-destructive",
                  issue.type === "warning" && "bg-amber-500/20 text-amber-400",
                  issue.type === "todo" && "bg-cyan-500/20 text-cyan-400",
                  issue.type === "antipattern" && "bg-orange-500/20 text-orange-400"
                )}
              >
                {issue.type}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {issue.message}
            </p>
            {issue.suggestion && (
              <p className="text-xs text-primary mt-1">
                💡 {issue.suggestion}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
