import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeatureCard } from "@/components/ui/feature-card";
import { 
  FolderOpen, 
  BookOpen, 
  ClipboardCheck,
  FileCode2,
  Folder,
  Github,
  Upload,
  ArrowRight,
  Plus
} from "lucide-react";
import { useProject } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (!currentProject) {
    return (
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
        <div className="container max-w-4xl">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto">
              <FolderOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">No Project Loaded</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Connect a GitHub repository or upload a ZIP file to start exploring.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate("/connect?type=github")}>
                <Github className="w-4 h-4 mr-2" />
                Connect GitHub Repo
              </Button>
              <Button variant="outline" onClick={() => navigate("/connect?type=zip")}>
                <Upload className="w-4 h-4 mr-2" />
                Upload ZIP
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="container max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{currentProject.name}</h1>
              <Badge variant="secondary" className="capitalize">
                {currentProject.source}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Scanned on {currentProject.createdAt.toLocaleDateString()}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/connect")}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Project Summary Card */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-slide-in-left">
          <h2 className="text-xl font-semibold mb-4">Project Summary</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tech Stack */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {currentProject.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Files */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Files</p>
              <div className="flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">{currentProject.totalFiles}</span>
              </div>
            </div>

            {/* Folders */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Folders</p>
              <div className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">{currentProject.totalFolders}</span>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="font-medium">Ready to Explore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What would you like to do?</h2>
          
          <div className="grid md:grid-cols-3 gap-4 stagger-children">
            <FeatureCard
              icon={FolderOpen}
              title="Explore Project"
              description="Navigate the full project structure. Understand what each file and folder does."
              onClick={() => navigate("/explorer")}
            >
              <Button className="w-full mt-4 gap-2">
                Open Explorer
                <ArrowRight className="w-4 h-4" />
              </Button>
            </FeatureCard>

            <FeatureCard
              icon={BookOpen}
              title="Learn Project"
              description="Focus on specific areas like frontend, backend, or database with guided learning paths."
              onClick={() => navigate("/learn")}
            >
              <Button variant="outline" className="w-full mt-4 gap-2">
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </Button>
            </FeatureCard>

            <FeatureCard
              icon={ClipboardCheck}
              title="Evaluate Understanding"
              description="Test your knowledge with real project-based questions and track your progress."
              onClick={() => navigate("/evaluate")}
            >
              <Button variant="outline" className="w-full mt-4 gap-2">
                Take Evaluation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </FeatureCard>
          </div>
        </div>
      </div>
    </div>
  );
}
