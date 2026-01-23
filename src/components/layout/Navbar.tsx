import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isLanding = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Project<span className="text-gradient">Mentor</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {isLanding && (
            <>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How it works
              </a>
              <a href="#who-is-it-for" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Who it's for
              </a>
              <a href="#why" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Why ProjectMentor
              </a>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Sign Out
              </Button>
              <Button size="sm" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button size="sm" onClick={() => navigate("/auth?mode=signup")}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
