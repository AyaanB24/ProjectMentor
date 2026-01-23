import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, GraduationCap, Palette } from "lucide-react";
import { useProject, ProjectFile } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";
import { ScopedFileTree } from "@/components/learn/ScopedFileTree";
import { FullCodeViewer } from "@/components/learn/FullCodeViewer";
import { TabbedInsightPanel } from "@/components/learn/TabbedInsightPanel";
import { LearningProgress } from "@/components/learn/LearningProgress";
import {
  learningAreas,
  fileInsights,
  scopedFolders,
} from "@/data/learningContent";

export default function Learn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentProject } = useProject();
  const { isAuthenticated } = useAuth();

  const areaParam = searchParams.get("area");
  const [selectedArea, setSelectedArea] = useState<string | null>(areaParam);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=/learn");
      return;
    }
    if (!currentProject) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentProject, navigate]);

  if (!currentProject) return null;

  if (selectedArea) {
    return (
      <LearnDashboard
        area={selectedArea}
        onBack={() => setSelectedArea(null)}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="container max-w-4xl space-y-8">
        <div className="flex items-center gap-4 animate-fade-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{currentProject.name}</span>
            <Badge variant="secondary">Learn Mode</Badge>
          </div>
        </div>

        <div className="space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold">What do you want to learn?</h1>
          <p className="text-muted-foreground">
            Choose a specific area to focus on. Each area has its own guided
            learning path.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 stagger-children">
          {learningAreas.map((area) => (
            <FeatureCard
              key={area.id}
              icon={area.icon}
              title={area.title}
              description={area.description}
              badge={area.shortTitle}
              progress={area.progress}
              onClick={() => setSelectedArea(area.id)}
            >
              <Button className="w-full mt-4 gap-2">
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </Button>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

interface LearnDashboardProps {
  area: string;
  onBack: () => void;
}

function LearnDashboard({ area, onBack }: LearnDashboardProps) {
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [understoodFiles, setUnderstoodFiles] = useState<Set<string>>(new Set());
  const [highlightRange, setHighlightRange] = useState<{ startLine: number; endLine: number } | null>(null);

  const areaConfig = learningAreas.find((a) => a.id === area);

  // Get scoped files for the current area
  const scopedFiles = useMemo(() => {
    if (!currentProject) return [];
    const allowedFolders = scopedFolders[area] || [];

    const filterFiles = (files: ProjectFile[]): ProjectFile[] => {
      return files
        .map((file) => {
          if (file.type === "folder") {
            const pathParts = file.path.toLowerCase().split("/");
            const matchesFolder = allowedFolders.some((folder) =>
              pathParts.some((part) => part.includes(folder.toLowerCase()))
            );

            if (matchesFolder || file.name.toLowerCase() === "src") {
              const filteredChildren = file.children ? filterFiles(file.children) : [];
              if (filteredChildren.length > 0 || matchesFolder) {
                return { ...file, children: filteredChildren };
              }
            }
            return null;
          } else {
            // Check if file belongs to allowed category or folder
            const pathParts = file.path.toLowerCase().split("/");
            const matchesFolder = allowedFolders.some((folder) =>
              pathParts.some((part) => part.includes(folder.toLowerCase()))
            );
            const matchesCategory = file.category === area;
            return matchesFolder || matchesCategory ? file : null;
          }
        })
        .filter((f): f is ProjectFile => f !== null);
    };

    return filterFiles(currentProject.files);
  }, [currentProject, area]);

  // Count total learnable files
  const countFiles = useCallback((files: ProjectFile[]): number => {
    return files.reduce((acc, file) => {
      if (file.type === "folder") {
        return acc + (file.children ? countFiles(file.children) : 0);
      }
      return acc + 1;
    }, 0);
  }, []);

  const totalFiles = useMemo(() => countFiles(scopedFiles), [scopedFiles, countFiles]);

  // Get current file insight
  const currentInsight = selectedFile ? fileInsights[selectedFile.id] : null;
  const currentIssues = currentInsight?.issues || [];

  const handleFileSelect = (file: ProjectFile) => {
    if (file.type === "file") {
      setSelectedFile(file);
      setHighlightRange(null);
    }
  };

  const handleLineClick = (startLine: number, endLine: number) => {
    setHighlightRange({ startLine, endLine });
  };

  const handleMarkUnderstood = () => {
    if (selectedFile) {
      setUnderstoodFiles((prev) => {
        const next = new Set(prev);
        next.add(selectedFile.id);
        return next;
      });
    }
  };

  if (!currentProject || !areaConfig) return null;

  const AreaIcon = areaConfig.icon;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">{currentProject.name}</span>
            <Badge className={`gap-1 ${areaConfig.color}`}>
              <AreaIcon className="w-3 h-3" />
              {areaConfig.title}
            </Badge>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/evaluate?area=" + area)}
          className="gap-2"
        >
          <GraduationCap className="w-4 h-4" />
          Test Knowledge
        </Button>
      </div>

      {/* Progress Bar */}
      <LearningProgress
        areaTitle={areaConfig.title}
        areaIcon={AreaIcon}
        areaColor={areaConfig.color}
        completedCount={understoodFiles.size}
        totalCount={totalFiles}
      />

      {/* Main 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Scoped File Tree */}
        <div className="w-64 border-r border-border bg-sidebar flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              {areaConfig.title} Files
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Showing only {area} related files
            </p>
          </div>
          <div className="flex-1 overflow-auto">
            <ScopedFileTree
              files={scopedFiles}
              selectedFileId={selectedFile?.id || null}
              understoodFiles={understoodFiles}
              onFileSelect={handleFileSelect}
            />
          </div>
        </div>

        {/* Center Panel - Full Code Viewer */}
        {selectedFile ? (
          <FullCodeViewer
            fileName={selectedFile.name}
            filePath={selectedFile.path}
            content={selectedFile.content || "// No content available"}
            highlightRange={highlightRange}
            issues={currentIssues.map((issue) => ({
              line: issue.line,
              type: issue.type === "antipattern" ? "warning" : issue.type,
              message: issue.message,
            }))}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/10">
            <div className="text-center">
              <AreaIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                Select a file to view its code
              </p>
            </div>
          </div>
        )}

        {/* Right Panel - Tabbed Insights */}
        <TabbedInsightPanel
          insight={currentInsight}
          issues={currentIssues}
          onLineClick={handleLineClick}
          selectedRange={highlightRange}
          isFileUnderstood={selectedFile ? understoodFiles.has(selectedFile.id) : false}
          onMarkUnderstood={handleMarkUnderstood}
        />
      </div>
    </div>
  );
}
