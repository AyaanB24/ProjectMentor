import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn, User, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isLanding = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="absolute inset-0 glass-card bg-background/60 backdrop-blur-xl border-b border-white/10" />

      <div className="container relative flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <span className="font-black text-2xl tracking-tighter">
            Project<span className="text-gradient">Mentor</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {isLanding && (
            <>
              {["How it works", "Who it's for", "Why"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              ))}
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {isAuthenticated ? (
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4"
              >
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest leading-none mb-1">Authenticated</span>
                  <span className="text-sm font-medium text-muted-foreground">{user?.email}</span>
                </div>
                <div className="h-8 w-px bg-border/50 mx-2 hidden sm:block" />
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-destructive/10 hover:text-destructive" onClick={logout}>
                  <LogOut className="w-5 h-5" />
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl px-6 font-bold shadow-lg shadow-primary/20 hover-glow"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="no-auth"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <Button variant="ghost" className="font-semibold" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="rounded-xl px-6 font-bold shadow-xl shadow-primary/20 hover-glow group"
                  onClick={() => navigate("/auth?mode=signup")}
                >
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
