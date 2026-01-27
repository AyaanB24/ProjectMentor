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
  Info,
  Sparkles
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
      <div className="w-72 border-l border-border bg-sidebar flex flex-col">
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
    <div className="w-72 border-l border-border bg-sidebar flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-semibold transition-all relative",
              activeTab === tab.id
                ? "text-primary bg-primary/5 shadow-[inset_0_-2px_0_0_currentColor]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {tab.label}
            {tab.id === "issues" && issues.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-1.5 h-4 px-1.5 text-[10px] bg-amber-500/20 text-amber-400 border-amber-500/30"
              >
                {issues.length}
              </Badge>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in fade-in slide-in-from-bottom-1 duration-200" />
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
    <div className="p-3 space-y-3">
      {/* Purpose */}
      <div className="p-3 rounded-lg bg-muted/30 space-y-1.5 border border-border/50">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Purpose</h4>
        </div>
        <p className="text-sm text-foreground/90 leading-normal pl-5">
          {insight.whyExists}
        </p>
      </div>

      {/* Problem it Solves */}
      <div className="p-3 rounded-lg bg-muted/30 space-y-1.5 border border-border/50">
        <div className="flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-green-400" />
          <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Problem it Solves</h4>
        </div>
        <p className="text-sm text-foreground/90 leading-normal pl-5">
          {insight.problemSolved}
        </p>
      </div>

      {/* Architecture Fit */}
      <div className="p-3 rounded-lg bg-muted/30 space-y-1.5 border border-border/50">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Architecture Fit</h4>
        </div>
        <p className="text-sm text-foreground/90 leading-normal pl-5">
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
  return (
    <div className="p-3 space-y-5">
      {/* Fun Facts */}
      {insight.funFacts && insight.funFacts.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h4 className="font-bold text-xs uppercase tracking-widest text-purple-400/80">Important Fun</h4>
          </div>
          <div className="grid gap-2">
            {insight.funFacts.map((fact, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-1">
                <h5 className="font-semibold text-xs text-purple-300">{fact.title}</h5>
                <p className="text-xs text-muted-foreground leading-normal">
                  {fact.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Methods */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <h4 className="font-bold text-xs uppercase tracking-widest text-cyan-400/80">Methods</h4>
        </div>
        <div className="grid gap-2">
          {insight.keyMethods.map((method) => {
            const isSelected = selectedRange?.startLine === method.lineStart;
            return (
              <button
                key={method.name}
                onClick={() => onLineClick(method.lineStart, method.lineEnd)}
                className={cn(
                  "w-full text-left p-2.5 rounded-lg transition-all group border",
                  isSelected
                    ? "bg-cyan-500/10 border-cyan-500/30 ring-1 ring-cyan-500/20"
                    : "bg-muted/30 border-border/50 hover:bg-muted/50 hover:border-border"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    {method.name}()
                  </span>
                  <Badge variant="outline" className="text-[10px] px-1 h-4 border-cyan-500/20 text-cyan-400/80">
                    L{method.lineStart}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">
                  {method.purpose}
                </p>
                {method.context && (
                  <div className="text-[10px] text-cyan-400/60 font-medium italic border-l border-cyan-500/20 pl-2 py-0.5">
                    {method.context}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Snippets */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Target className="w-4 h-4 text-green-400" />
          <h4 className="font-bold text-xs uppercase tracking-widest text-green-400/80">Snippets</h4>
        </div>
        <div className="grid gap-2">
          {insight.snippets.map((snippet) => {
            const isSelected = selectedRange?.startLine === snippet.startLine;
            return (
              <button
                key={snippet.id}
                onClick={() => onLineClick(snippet.startLine, snippet.endLine)}
                className={cn(
                  "w-full text-left p-2.5 rounded-lg transition-all group border",
                  isSelected
                    ? "bg-green-500/10 border-green-500/30 ring-1 ring-green-500/20"
                    : "bg-muted/30 border-border/50 hover:bg-muted/50 hover:border-border"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-xs text-green-300">
                    {snippet.label}
                  </span>
                  <Badge variant="outline" className="text-[10px] px-1 h-4 border-green-500/20 text-green-400/80">
                    L{snippet.startLine}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1.5">
                  {snippet.description}
                </p>
                {snippet.context && (
                  <div className="text-[10px] text-green-400/60 font-medium italic border-l border-green-500/20 pl-2 py-0.5">
                    {snippet.context}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
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
    <div className="p-3 space-y-2">
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
