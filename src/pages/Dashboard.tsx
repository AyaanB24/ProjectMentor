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
  Plus,
  Sparkles,
  Zap,
  LayoutDashboard
} from "lucide-react";
import { useProject } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (!currentProject) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="container max-w-4xl relative z-10"
        >
          <div className="text-center space-y-8 glass-card p-12 rounded-3xl border-white/20">
            <div className="w-24 h-24 rounded-3xl bg-gradient-primary flex items-center justify-center mx-auto shadow-lg animate-float">
              <FolderOpen className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight">Setup Your Project</h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Ready to dive in? Connect a repository or upload your files to get started.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="h-12 px-8 hover-glow" onClick={() => navigate("/connect?type=github")}>
                <Github className="w-5 h-5 mr-2" />
                Connect GitHub
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8" onClick={() => navigate("/connect?type=zip")}>
                <Upload className="w-5 h-5 mr-2" />
                Upload ZIP
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[100px] -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container max-w-6xl space-y-10 relative z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Project Ready
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
                </h1>
                <motion.div
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </motion.div>
              </div>
              <p className="text-xl text-muted-foreground">
                Currently exploring <span className="text-foreground font-semibold">{currentProject.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="lg" className="rounded-xl border-dashed hover:border-primary transition-colors" onClick={() => navigate("/connect")}>
              <Plus className="w-4 h-4 mr-2" />
              Switch Project
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border-white/10 group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <FileCode2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Files</p>
                <h3 className="text-3xl font-bold tracking-tight">{currentProject.totalFiles}</h3>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border-white/10 group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Folder className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Folders</p>
                <h3 className="text-3xl font-bold tracking-tight">{currentProject.totalFolders}</h3>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border-white/10 group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stack Size</p>
                <h3 className="text-3xl font-bold tracking-tight">
                  {Object.values(currentProject.techStack).flat().length} Layers
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Distribution */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold font-outfit tracking-tight">Project Architecture</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <motion.div
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {[
              { label: "Frontend", data: currentProject.techStack.frontend, icon: LayoutDashboard, color: "text-blue-400", bg: "bg-blue-400/10" },
              { label: "Backend", data: currentProject.techStack.backend, icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10" },
              { label: "Database", data: currentProject.techStack.database, icon: FileCode2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { label: "DevOps", data: currentProject.techStack.devops, icon: Sparkles, color: "text-purple-400", bg: "bg-purple-400/10" },
              { label: "Other", data: currentProject.techStack.other, icon: Folder, color: "text-slate-400", bg: "bg-slate-400/10" },
            ].map((cat) => (
              <motion.div
                key={cat.label}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card p-5 rounded-2xl border-white/5 flex flex-col gap-4 group hover:border-primary/20 transition-all shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12", cat.bg)}>
                    <cat.icon className={cn("w-5 h-5", cat.color)} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-70">{cat.label}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.data.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="bg-white/5 border-white/10 hover:border-primary/30 text-[10px] px-2 py-0.5 rounded-lg transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Actions */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Recommended for you</h2>
            <div className="h-px flex-1 bg-border/50" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
              <FeatureCard
                icon={FolderOpen}
                title="Project Explorer"
                description="Navigate the visual architecture and understand dependency flows."
                onClick={() => navigate("/explorer")}
                className="h-full border-white/10 glass-card hover:border-primary/20"
              >
                <Button className="w-full mt-6 gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  Open Explorer
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </FeatureCard>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
              <FeatureCard
                icon={BookOpen}
                title="Learning Path"
                description="Step-by-step guidance through the most critical parts of the codebase."
                onClick={() => navigate("/learn")}
                className="h-full border-white/10 glass-card hover:border-primary/20"
              >
                <Button variant="outline" className="w-full mt-6 gap-2 border-primary/20 hover:border-primary/50">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </FeatureCard>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
              <FeatureCard
                icon={ClipboardCheck}
                title="Self Evaluation"
                description="Test your project knowledge with AI-driven challenges and tasks."
                onClick={() => navigate("/evaluate")}
                className="h-full border-white/10 glass-card hover:border-primary/20"
              >
                <Button variant="outline" className="w-full mt-6 gap-2 border-primary/20 hover:border-primary/50">
                  Take Evaluation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </FeatureCard>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
