import React, { createContext, useContext, useState, useCallback } from "react";

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  children?: ProjectFile[];
  content?: string;
  purpose?: string;
  category?: "frontend" | "backend" | "database" | "config" | "other";
}

export interface Project {
  id: string;
  name: string;
  source: "github" | "zip";
  techStack: string[];
  totalFiles: number;
  totalFolders: number;
  files: ProjectFile[];
  createdAt: Date;
}

interface ProjectContextType {
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  isScanning: boolean;
  scanProject: (source: "github" | "zip", url?: string) => Promise<void>;
  selectedFile: ProjectFile | null;
  setSelectedFile: (file: ProjectFile | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Mock project data
const mockProjectFiles: ProjectFile[] = [
  {
    id: "1",
    name: "src",
    path: "/src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        path: "/src/components",
        type: "folder",
        category: "frontend",
        children: [
          {
            id: "3",
            name: "Header.tsx",
            path: "/src/components/Header.tsx",
            type: "file",
            category: "frontend",
            content: `import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  isLoggedIn: boolean;
}

export function Header({ title, isLoggedIn }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">{title}</span>
          </Link>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button>Logout</button>
            ) : (
              <Link to="/login">Sign In</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}`,
            purpose: "Header component that displays the navigation bar with logo and authentication state. It handles routing between pages and shows login/logout based on user status.",
          },
          {
            id: "4",
            name: "Button.tsx",
            path: "/src/components/Button.tsx",
            type: "file",
            category: "frontend",
            content: `import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button className={\`\${baseStyles} \${variants[variant]}\`} onClick={onClick}>
      {children}
    </button>
  );
}`,
            purpose: "Reusable button component with variant support. Implements the design system's button styles with primary and secondary variants.",
          },
        ],
      },
      {
        id: "5",
        name: "pages",
        path: "/src/pages",
        type: "folder",
        category: "frontend",
        children: [
          {
            id: "6",
            name: "Home.tsx",
            path: "/src/pages/Home.tsx",
            type: "file",
            category: "frontend",
            content: `import React from 'react';
import { Header } from '../components/Header';

export function Home() {
  return (
    <div>
      <Header title="My App" isLoggedIn={false} />
      <main className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p>Get started by exploring our features.</p>
      </main>
    </div>
  );
}`,
            purpose: "Home page component that serves as the landing page. It combines the Header component with main content area.",
          },
        ],
      },
      {
        id: "7",
        name: "api",
        path: "/src/api",
        type: "folder",
        category: "backend",
        children: [
          {
            id: "8",
            name: "users.ts",
            path: "/src/api/users.ts",
            type: "file",
            category: "backend",
            content: `import express from 'express';
import { User } from '../models/User';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;`,
            purpose: "User API routes handling CRUD operations. Implements RESTful endpoints for user management with proper error handling.",
          },
        ],
      },
      {
        id: "9",
        name: "models",
        path: "/src/models",
        type: "folder",
        category: "database",
        children: [
          {
            id: "10",
            name: "User.ts",
            path: "/src/models/User.ts",
            type: "file",
            category: "database",
            content: `import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);`,
            purpose: "MongoDB User model defining the schema for user documents. Includes validation rules and default values for user data.",
          },
        ],
      },
      {
        id: "11",
        name: "App.tsx",
        path: "/src/App.tsx",
        type: "file",
        category: "frontend",
        content: `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`,
        purpose: "Main application entry point that sets up routing. Configures React Router with all page routes for the SPA.",
      },
    ],
  },
  {
    id: "12",
    name: "package.json",
    path: "/package.json",
    type: "file",
    category: "config",
    content: `{
  "name": "my-fullstack-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-router-dom": "^6.0.0",
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  }
}`,
    purpose: "Project configuration file defining dependencies and scripts. Lists all npm packages required for both frontend and backend.",
  },
  {
    id: "devops-1",
    name: "Dockerfile",
    path: "/Dockerfile",
    type: "file",
    category: "other",
    content: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`,
    purpose: "Defines the container environment for the application. Sets up Node.js, installs dependencies, and configures the startup command.",
  },
  {
    id: "devops-2",
    name: "deploy.yml",
    path: "/.github/workflows/deploy.yml",
    type: "file",
    category: "other",
    content: `name: CI/CD Pipeline
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      - run: npm install
      - run: npm run build
      - run: npm test`,
    purpose: "Automated CI/CD workflow that runs tests and builds the project on every push to the main branch.",
  },
];

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);

  const scanProject = useCallback(async (source: "github" | "zip", url?: string) => {
    setIsScanning(true);

    // Simulate scanning
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const project: Project = {
      id: "proj_" + Math.random().toString(36).substr(2, 9),
      name: url ? url.split("/").pop() || "My Project" : "Uploaded Project",
      source,
      techStack: ["React", "Node.js", "Express", "MongoDB", "Docker", "GitHub Actions"],
      totalFiles: 14,
      totalFolders: 5,
      files: mockProjectFiles,
      createdAt: new Date(),
    };

    setCurrentProject(project);
    setIsScanning(false);
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        setCurrentProject,
        isScanning,
        scanProject,
        selectedFile,
        setSelectedFile,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
