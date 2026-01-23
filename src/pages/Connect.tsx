import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Upload, Loader2, ArrowLeft, Check } from "lucide-react";
import { useProject } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Connect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { scanProject, isScanning } = useProject();
  
  const type = searchParams.get("type") || "github";
  const [repoUrl, setRepoUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?redirect=/connect");
    }
  }, [isAuthenticated, navigate]);

  const handleGithubConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    await scanProject("github", repoUrl);
    navigate("/dashboard");
  };

  const handleZipUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    await scanProject("zip");
    navigate("/dashboard");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".zip")) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="container max-w-2xl">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Import Your Project</h1>
            <p className="text-muted-foreground">
              Connect a GitHub repository or upload a ZIP file to get started.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-card p-6">
            <Tabs defaultValue={type} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="github" className="gap-2">
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </TabsTrigger>
                <TabsTrigger value="zip" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload ZIP
                </TabsTrigger>
              </TabsList>

              <TabsContent value="github" className="space-y-4">
                <form onSubmit={handleGithubConnect} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="repo-url">Repository URL</Label>
                    <Input
                      id="repo-url"
                      type="url"
                      placeholder="https://github.com/username/repository"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the full URL of a public GitHub repository
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isScanning}>
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Scanning Repository...
                      </>
                    ) : (
                      <>
                        <Github className="w-4 h-4 mr-2" />
                        Connect Repository
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="zip" className="space-y-4">
                <form onSubmit={handleZipUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip-file">Project ZIP File</Label>
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        selectedFile 
                          ? "border-primary bg-accent/30" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-3 text-primary">
                          <Check className="w-6 h-6" />
                          <span className="font-medium">{selectedFile.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                          <p className="text-muted-foreground mb-2">
                            Drag and drop your ZIP file here, or
                          </p>
                          <label htmlFor="zip-file-input" className="text-primary font-medium cursor-pointer hover:underline">
                            browse to upload
                          </label>
                        </>
                      )}
                      <input
                        id="zip-file-input"
                        type="file"
                        accept=".zip"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Maximum file size: 50MB. Only .zip files are accepted.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isScanning || !selectedFile}
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Scanning Project...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload & Scan
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          {/* What happens next */}
          <div className="bg-muted/50 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold">What happens next?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">1</span>
                <span>We analyze your project's structure and detect the tech stack</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">2</span>
                <span>You can explore the full codebase with file explanations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">3</span>
                <span>Choose to learn specific areas or evaluate your understanding</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
