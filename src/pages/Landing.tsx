import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { 
  Github, 
  Upload, 
  Search, 
  BookOpen, 
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Target
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleConnect = (type: "github" | "zip") => {
    if (!isAuthenticated) {
      navigate(`/auth?redirect=/connect?type=${type}`);
    } else {
      navigate(`/connect?type=${type}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Built for learners, by learners</span>
            </div>

            <h1 className="text-foreground">
              Understand Any Project.{" "}
              <span className="text-gradient">Faster.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore, learn, and evaluate real codebases with confidence. 
              Master any project structure in minutes, not days.
            </p>

            {/* CTA Cards */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-8">
              <button
                onClick={() => handleConnect("github")}
                className="group flex items-center gap-4 p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Github className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Connect GitHub Repo</p>
                  <p className="text-sm text-muted-foreground">Import from repository</p>
                </div>
              </button>

              <button
                onClick={() => handleConnect("zip")}
                className="group flex items-center gap-4 p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Upload Project (ZIP)</p>
                  <p className="text-sm text-muted-foreground">Upload local files</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2>How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to master any codebase
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto stagger-children">
            <div className="relative">
              <div className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2">1</div>
              <div className="relative pt-8 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold">Explore</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Navigate the full project structure. Understand what each file does before diving deeper.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2">2</div>
              <div className="relative pt-8 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold">Learn</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Focus on one area — frontend, backend, database — with guided learning paths.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2">3</div>
              <div className="relative pt-8 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold">Evaluate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Test your understanding with real project-based questions. Track your progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section id="who-is-it-for" className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2>Who Is It For?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for anyone navigating unfamiliar codebases
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-children">
            <FeatureCard
              icon={GraduationCap}
              title="Students"
              description="Learning to code? Explore real-world projects and understand how professionals structure applications."
            />
            <FeatureCard
              icon={Briefcase}
              title="Interns"
              description="Starting a new role? Get up to speed quickly by learning the codebase before your first day."
            />
            <FeatureCard
              icon={Users}
              title="New Team Members"
              description="Joining a team? Understand the architecture, patterns, and conventions in record time."
            />
          </div>
        </div>
      </section>

      {/* Why ProjectMentor */}
      <section id="why" className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2>Why ProjectMentor?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Purpose-built features that make learning codebases enjoyable
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-children">
            <div className="p-6 rounded-xl bg-card border border-border">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold mb-2">Instant Analysis</h4>
              <p className="text-sm text-muted-foreground">
                Connect a repo and get a complete breakdown in seconds.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold mb-2">Focused Learning</h4>
              <p className="text-sm text-muted-foreground">
                Learn frontend, backend, or database separately — no overwhelm.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-semibold mb-2">Confidence Building</h4>
              <p className="text-sm text-muted-foreground">
                Evaluate your understanding and track your growth over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2>Ready to Master Any Codebase?</h2>
            <p className="text-muted-foreground text-lg">
              Start exploring your first project in under a minute.
            </p>
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => handleConnect("github")}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">ProjectMentor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 ProjectMentor. Built with 💙 for learners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
