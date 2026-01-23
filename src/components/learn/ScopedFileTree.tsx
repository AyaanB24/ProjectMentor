import { useState } from "react";
import { ProjectFile } from "@/contexts/ProjectContext";
import { 
  ChevronRight, 
  ChevronDown, 
  FileCode2, 
  Folder, 
  FolderOpen,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScopedFileTreeProps {
  files: ProjectFile[];
  selectedFileId: string | null;
  understoodFiles: Set<string>;
  onFileSelect: (file: ProjectFile) => void;
}

export function ScopedFileTree({
  files,
  selectedFileId,
  understoodFiles,
  onFileSelect,
}: ScopedFileTreeProps) {
  return (
    <div className="py-2">
      {files.map((file) => (
        <FileTreeNode
          key={file.id}
          file={file}
          selectedFileId={selectedFileId}
          understoodFiles={understoodFiles}
          onFileSelect={onFileSelect}
          depth={0}
        />
      ))}
    </div>
  );
}

interface FileTreeNodeProps {
  file: ProjectFile;
  selectedFileId: string | null;
  understoodFiles: Set<string>;
  onFileSelect: (file: ProjectFile) => void;
  depth: number;
}

function FileTreeNode({
  file,
  selectedFileId,
  understoodFiles,
  onFileSelect,
  depth,
}: FileTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const isFolder = file.type === "folder";
  const isSelected = file.id === selectedFileId;
  const isUnderstood = understoodFiles.has(file.id);

  const handleClick = () => {
    if (isFolder) {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-1.5 text-sm transition-colors hover:bg-muted/50",
          isSelected && "bg-primary/10 text-primary",
          !isSelected && "text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        {isFolder ? (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
            )}
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 flex-shrink-0 text-amber-400" />
            ) : (
              <Folder className="w-4 h-4 flex-shrink-0 text-amber-400" />
            )}
          </>
        ) : (
          <>
            <span className="w-4" />
            <FileCode2 className={cn(
              "w-4 h-4 flex-shrink-0",
              isSelected ? "text-primary" : "text-cyan-400"
            )} />
          </>
        )}
        <span className="flex-1 truncate text-left font-mono text-xs">
          {file.name}
        </span>
        {isUnderstood && !isFolder && (
          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
        )}
      </button>

      {isFolder && isExpanded && file.children && (
        <div>
          {file.children.map((child) => (
            <FileTreeNode
              key={child.id}
              file={child}
              selectedFileId={selectedFileId}
              understoodFiles={understoodFiles}
              onFileSelect={onFileSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
