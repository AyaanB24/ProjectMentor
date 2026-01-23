import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronRight,
  ChevronDown,
  FileCode2,
  Folder,
  FolderOpen,
  ArrowLeft,
  BookOpen,
  ClipboardCheck,
  Info,
} from "lucide-react";
import { useProject, ProjectFile } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";

interface FileTreeItemProps {
  file: ProjectFile;
  level: number;
  selectedId: string | null;
  onSelect: (file: ProjectFile) => void;
  expandedFolders: Set<string>;
  onToggleFolder: (id: string) => void;
}

function FileTreeItem({ file, level, selectedId, onSelect, expandedFolders, onToggleFolder }: FileTreeItemProps) {
  const isExpanded = expandedFolders.has(file.id);
  const isSelected = selectedId === file.id;
  const isFolder = file.type === "folder";

  return (
    <div>
      <button
        onClick={() => isFolder ? onToggleFolder(file.id) : onSelect(file)}
        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors hover:bg-accent/50 ${
          isSelected ? "bg-accent text-accent-foreground" : ""
        }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {isFolder ? (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground" />
            )}
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 shrink-0 text-primary" />
            ) : (
              <Folder className="w-4 h-4 shrink-0 text-primary" />
            )}
          </>
        ) : (
          <>
            <span className="w-4" />
            <FileCode2 className="w-4 h-4 shrink-0 text-muted-foreground" />
          </>
        )}
        <span className="truncate">{file.name}</span>
        {file.category && (
          <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0">
            {file.category}
          </Badge>
        )}
      </button>
      
      {isFolder && isExpanded && file.children && (
        <div>
          {file.children.map((child) => (
            <FileTreeItem
              key={child.id}
              file={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedFolders={expandedFolders}
              onToggleFolder={onToggleFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Explorer() {
  const navigate = useNavigate();
  const { currentProject, selectedFile, setSelectedFile } = useProject();
  const { isAuthenticated } = useAuth();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["1", "2", "5"]));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=/explorer");
      return;
    }
    if (!currentProject) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentProject, navigate]);

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (!currentProject) return null;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{currentProject.name}</span>
            <Badge variant="secondary">Explorer</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/learn")}>
            <BookOpen className="w-4 h-4 mr-2" />
            Learn Project
          </Button>
          <Button size="sm" onClick={() => navigate("/evaluate")}>
            <ClipboardCheck className="w-4 h-4 mr-2" />
            Evaluate
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Tree */}
        <div className="w-72 border-r border-border bg-sidebar flex flex-col">
          <div className="p-3 border-b border-border">
            <h3 className="font-medium text-sm text-muted-foreground">Project Files</h3>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {currentProject.files.map((file) => (
                <FileTreeItem
                  key={file.id}
                  file={file}
                  level={0}
                  selectedId={selectedFile?.id || null}
                  onSelect={setSelectedFile}
                  expandedFolders={expandedFolders}
                  onToggleFolder={toggleFolder}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Code Viewer + Purpose Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedFile ? (
            <>
              {/* Code Viewer */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-sm">{selectedFile.path}</span>
                  </div>
                  {selectedFile.category && (
                    <Badge>{selectedFile.category}</Badge>
                  )}
                </div>
                <ScrollArea className="flex-1 bg-muted/10">
                  <pre className="p-4 font-mono text-sm leading-relaxed">
                    <code>{selectedFile.content || "// No content available"}</code>
                  </pre>
                </ScrollArea>
              </div>

              {/* Purpose Panel */}
              <div className="border-t border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Info className="w-4 h-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">File Purpose</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedFile.purpose || "Purpose description will be generated after analysis."}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <FileCode2 className="w-12 h-12 mx-auto text-muted-foreground/50" />
                <p>Select a file to view its contents</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
