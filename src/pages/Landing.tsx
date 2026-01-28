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
  Target,
  ChevronRight,
  Code2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const handleConnect = (type: "github" | "zip") => {
    if (!isAuthenticated) {
      navigate(`/auth?redirect=/connect?type=${type}`);
    } else {
      navigate(`/connect?type=${type}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] -z-10 animate-pulse delay-1000"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0),hsl(var(--background)))] pointer-events-none" />

        <div className="container relative z-10 px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center space-y-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary text-sm font-semibold tracking-wide"
            >
              <Sparkles className="w-4 h-4 fill-primary/20" />
              <span>THE FUTURE OF CODE EXPLORATION</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter"
            >
              Master any Codebase,<br />
              <span className="text-gradient">Effortlessly.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium"
            >
              ProjectMentor transforms complex repositories into visual, guided learning paths.
              Understand architecture, logic, and patterns in minutes.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            >
              <Button
                size="lg"
                className="h-14 px-10 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 group hover-glow"
                onClick={() => handleConnect("github")}
              >
                Start Exploring Free
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a
                href="#how-it-works"
                className="text-lg font-semibold hover:text-primary transition-colors flex items-center gap-2"
              >
                See how it works
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </a>
            </motion.div>

            {/* Visual Teaser */}
            <motion.div
              variants={itemVariants}
              className="relative mt-20 pt-10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
              <div className="relative glass rounded-3xl border-white/10 shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                  <div className="text-center space-y-4">
                    <Code2 className="w-16 h-14 text-primary/40 mx-auto animate-float" />
                    <p className="font-mono text-sm text-muted-foreground/60 tracking-widest uppercase">Interactive Dashboard Preview</p>
                  </div>
                </div>
                {/* Decorative dots/lines */}
                <div className="absolute top-4 left-6 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 relative">
        <div className="container px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The 3-Step Mastery</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              We've distilled the complex process of code analysis into an intuitive workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                icon: Search,
                title: "Deep Scan",
                desc: "Connect your repo and our engine maps the entire architecture instantly.",
                color: "from-blue-500 to-cyan-400"
              },
              {
                step: "02",
                icon: BookOpen,
                title: "Guided Learn",
                desc: "Focus on specific layers—Frontend, Backend, or Auth—with AI-curated paths.",
                color: "from-primary to-emerald-400"
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Validate",
                desc: "Verify your expertise with project-specific challenges that prove your understanding.",
                color: "from-purple-500 to-pink-500"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="relative p-8 rounded-3xl glass border-white/5 group transition-all"
              >
                <div className="text-6xl font-black text-primary/5 absolute top-4 right-8 group-hover:text-primary/10 transition-colors">
                  {item.step}
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section with Visual Cards */}
      <section className="py-32 bg-secondary/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Why developers <br /><span className="text-primary italic">choose</span> ProjectMentor</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Traditional onboarding takes weeks. With ProjectMentor, you're contributing to a new codebase on day one.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Zap, text: "90% faster codebase familiarity" },
                  { icon: Shield, text: "Reduced architectural technical debt" },
                  { icon: Target, text: "Consistent team onboarding standards" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              <FeatureCard
                icon={GraduationCap}
                title="Seniors"
                description="Easily hand over projects to new joiners without hours of meetings."
                className="glass-card hover:border-primary/30"
              />
              <FeatureCard
                icon={Briefcase}
                title="Juniors"
                description="Understand the big picture before getting lost in the syntax."
                className="mt-12 glass-card hover:border-primary/30"
              />
              <FeatureCard
                icon={Users}
                title="Managers"
                description="Track team learning progress and ensure code quality standards."
                className="glass-card hover:border-primary/30"
              />
              <FeatureCard
                icon={Code2}
                title="Freelancers"
                description="Pick up existing projects and start delivering value in record time."
                className="mt-12 glass-card hover:border-primary/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[4rem] text-center space-y-8 relative overflow-hidden border-white/10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 -z-10" />
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Ready to stop guessing?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers who use ProjectMentor to visualize their way to code mastery.
            </p>
            <div className="pt-8">
              <Button
                size="lg"
                className="h-16 px-12 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/40 group hover-glow"
                onClick={() => handleConnect("github")}
              >
                Launch Your First Repo
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter">ProjectMentor</span>
              </div>
              <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
                Building the future of developer onboarding and code exploration.
                Made for the next generation of engineers.
              </p>
            </div>
            {/* Nav links could go here */}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-border/50">
            <p className="text-muted-foreground font-medium">
              © 2026 ProjectMentor. All rights reserved.
            </p>
            <div className="flex gap-8">
              <span className="text-sm font-semibold hover:text-primary cursor-pointer transition-colors">Privacy</span>
              <span className="text-sm font-semibold hover:text-primary cursor-pointer transition-colors">Terms</span>
              <span className="text-sm font-semibold hover:text-primary cursor-pointer transition-colors">Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
