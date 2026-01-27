import { Palette, Server, Database, Container, Layers } from "lucide-react";

// Scoped folder paths per learning area
export const scopedFolders: Record<string, string[]> = {
  frontend: ["src", "components", "pages", "routes", "styles", "hooks", "contexts"],
  backend: ["controllers", "services", "routes", "middlewares", "api", "auth"],
  database: ["models", "schemas", "migrations", "seeds", "queries"],
  devops: ["docker", "ci", "k8s", ".github", "scripts", "deploy", "dockerfile"],
  architecture: ["src", "api", "models", "config"], // Shows all for architecture
};

export interface FlowStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fileId: string;
  narrative: {
    whatHappens: string;
    howItConnects: string;
    whyThisDesign: string;
  };
}

export interface CodeSnippet {
  id: string;
  label: string;
  description: string;
  startLine: number;
  endLine: number;
  code: string;
  context?: string;
}

export interface FileIssue {
  id: string;
  type: "error" | "warning" | "todo" | "antipattern";
  line: number;
  message: string;
  suggestion?: string;
}

export interface FileInsight {
  fileId: string;
  whyExists: string;
  problemSolved: string;
  keyMethods: {
    name: string;
    purpose: string;
    lineStart: number;
    lineEnd: number;
    context?: string;
  }[];
  snippets: CodeSnippet[];
  funFacts?: {
    title: string;
    content: string;
    icon?: string;
  }[];
  issues?: FileIssue[];
}

// Flow-first learning paths
export const learningFlows: Record<string, FlowStep[]> = {
  frontend: [
    {
      id: "why-layer",
      title: "Why This Layer Exists",
      subtitle: "Understanding the Frontend's Role",
      description: "The frontend is your user's window into the application. It handles what users see and interact with.",
      fileId: "3", // Header.tsx
      narrative: {
        whatHappens: "The frontend layer receives user input, displays data, and communicates with the backend through API calls.",
        howItConnects: "This connects to routing (next) which determines what content to show based on the URL.",
        whyThisDesign: "Separating UI from logic allows teams to work independently and makes the codebase more maintainable.",
      },
    },
    {
      id: "entry-point",
      title: "Entry Point",
      subtitle: "Where Everything Begins",
      description: "App.tsx is the root component that bootstraps the entire React application.",
      fileId: "11", // App.tsx
      narrative: {
        whatHappens: "When the app loads, React renders App.tsx first. It sets up the router and wraps everything with providers.",
        howItConnects: "From here, the router decides which page component to render based on the current URL.",
        whyThisDesign: "Having a single entry point makes it easy to add global providers, error boundaries, and layout components.",
      },
    },
    {
      id: "core-flow",
      title: "Core Flow",
      subtitle: "Component Rendering",
      description: "Components like Header are reusable building blocks that compose the UI.",
      fileId: "3", // Header.tsx
      narrative: {
        whatHappens: "The Header component receives props (title, isLoggedIn) and renders navigation UI accordingly.",
        howItConnects: "This component is used by page components like Home.tsx to maintain consistent navigation.",
        whyThisDesign: "Reusable components reduce code duplication and ensure consistent UI across the application.",
      },
    },
    {
      id: "supporting-logic",
      title: "Supporting Logic",
      subtitle: "State & Utilities",
      description: "Buttons, forms, and utility components support the main UI flow.",
      fileId: "4", // Button.tsx
      narrative: {
        whatHappens: "Utility components like Button provide consistent styling and behavior across the app.",
        howItConnects: "These components are imported by page and feature components wherever interaction is needed.",
        whyThisDesign: "A design system approach ensures visual consistency and makes global changes easy.",
      },
    },
    {
      id: "integration-point",
      title: "Integration Point",
      subtitle: "Connecting to Backend",
      description: "Pages combine components and connect to APIs to fetch/send data.",
      fileId: "6", // Home.tsx
      narrative: {
        whatHappens: "Page components like Home orchestrate the UI, combining multiple components and handling data flow.",
        howItConnects: "Pages can call API endpoints to fetch data, which then flows down to child components via props.",
        whyThisDesign: "Keeping API calls at the page level keeps components pure and reusable across different contexts.",
      },
    },
  ],
  backend: [
    {
      id: "why-layer",
      title: "Why This Layer Exists",
      subtitle: "The Backend's Purpose",
      description: "The backend processes requests, handles business logic, and manages data persistence.",
      fileId: "8", // users.ts
      narrative: {
        whatHappens: "When a frontend makes an HTTP request, the backend receives it, processes it, and returns a response.",
        howItConnects: "This connects to the entry point (Express server) which routes requests to the right handlers.",
        whyThisDesign: "Separating backend logic protects sensitive operations and enables secure data management.",
      },
    },
    {
      id: "entry-point",
      title: "Entry Point",
      subtitle: "Express Server Setup",
      description: "The server entry configures Express, loads middleware, and starts listening for requests.",
      fileId: "8", // users.ts (represents API)
      narrative: {
        whatHappens: "Express initializes, middleware is applied (CORS, JSON parsing), and routes are mounted.",
        howItConnects: "Incoming requests flow through middleware first, then to route handlers.",
        whyThisDesign: "This layered approach allows adding cross-cutting concerns without touching business logic.",
      },
    },
    {
      id: "core-flow",
      title: "Core Flow",
      subtitle: "Request Handling",
      description: "API routes define endpoints and connect them to controller logic.",
      fileId: "8", // users.ts
      narrative: {
        whatHappens: "A GET request to /users triggers the route handler which fetches all users from the database.",
        howItConnects: "The route handler calls the User model to interact with MongoDB, then returns JSON.",
        whyThisDesign: "RESTful routes provide a predictable API structure that frontend developers can easily understand.",
      },
    },
    {
      id: "supporting-logic",
      title: "Supporting Logic",
      subtitle: "Models & Validation",
      description: "Database models define data structure and validation rules.",
      fileId: "10", // User.ts model
      narrative: {
        whatHappens: "The User model defines the schema: what fields exist, their types, and validation rules.",
        howItConnects: "Controllers use models to create, read, update, and delete records in the database.",
        whyThisDesign: "Models centralize data definitions, making it easy to change structure in one place.",
      },
    },
    {
      id: "integration-point",
      title: "Integration Point",
      subtitle: "Error Handling & Response",
      description: "Proper error handling ensures the API is robust and informative.",
      fileId: "8", // users.ts
      narrative: {
        whatHappens: "Try/catch blocks capture errors, returning appropriate status codes and messages to the client.",
        howItConnects: "Error responses help the frontend display meaningful messages to users.",
        whyThisDesign: "Consistent error handling improves debugging and provides better user experience.",
      },
    },
  ],
  database: [
    {
      id: "why-layer",
      title: "Why This Layer Exists",
      subtitle: "Data Persistence",
      description: "The database layer stores and retrieves data that needs to persist beyond a single session.",
      fileId: "10",
      narrative: {
        whatHappens: "Data is stored in collections/tables and retrieved using queries defined in models.",
        howItConnects: "Backend controllers call model methods to interact with the database.",
        whyThisDesign: "Separating data access from business logic allows changing databases without rewriting application code.",
      },
    },
    {
      id: "entry-point",
      title: "Entry Point",
      subtitle: "Database Connection",
      description: "A connection to MongoDB is established when the server starts.",
      fileId: "10",
      narrative: {
        whatHappens: "Mongoose connects to MongoDB using a connection string, typically from environment variables.",
        howItConnects: "Once connected, all models can perform database operations.",
        whyThisDesign: "A single connection pool is more efficient than creating new connections for each request.",
      },
    },
    {
      id: "core-flow",
      title: "Core Flow",
      subtitle: "Schema Definition",
      description: "Schemas define the structure of documents stored in the database.",
      fileId: "10",
      narrative: {
        whatHappens: "The userSchema defines fields like email, name, password with their types and constraints.",
        howItConnects: "This schema is used to create a Model, which provides CRUD methods.",
        whyThisDesign: "Schemas provide validation and structure in a schema-less database environment.",
      },
    },
    {
      id: "supporting-logic",
      title: "Supporting Logic",
      subtitle: "Validation & Defaults",
      description: "Models enforce data integrity through validation rules and default values.",
      fileId: "10",
      narrative: {
        whatHappens: "Required fields are enforced, unique constraints prevent duplicates, and defaults populate missing values.",
        howItConnects: "Validation errors bubble up to controllers which return appropriate error responses.",
        whyThisDesign: "Database-level validation is the last line of defense against invalid data.",
      },
    },
    {
      id: "integration-point",
      title: "Integration Point",
      subtitle: "Query Operations",
      description: "Models provide methods for querying and manipulating data.",
      fileId: "10",
      narrative: {
        whatHappens: "Methods like find(), findById(), save(), and delete() interact with MongoDB collections.",
        howItConnects: "Controllers await these async operations and transform results for API responses.",
        whyThisDesign: "Mongoose methods abstract away raw MongoDB queries, making code more readable.",
      },
    },
  ],
  architecture: [
    {
      id: "why-layer",
      title: "The Big Picture",
      subtitle: "How Everything Connects",
      description: "Understanding the full request/response cycle from user click to database and back.",
      fileId: "11",
      narrative: {
        whatHappens: "A user action triggers a frontend event, which may call an API, which queries the database, and returns data.",
        howItConnects: "Each layer has a specific responsibility, communicating through well-defined interfaces.",
        whyThisDesign: "This separation of concerns makes the system maintainable, testable, and scalable.",
      },
    },
    {
      id: "entry-point",
      title: "User Interface",
      subtitle: "Where Users Interact",
      description: "React components render the UI and handle user interactions.",
      fileId: "6",
      narrative: {
        whatHappens: "Components render based on state. User actions update state or trigger API calls.",
        howItConnects: "API responses update state, causing React to re-render with new data.",
        whyThisDesign: "React's declarative approach makes UI predictable and easier to debug.",
      },
    },
    {
      id: "core-flow",
      title: "API Layer",
      subtitle: "The Bridge",
      description: "REST APIs provide a contract between frontend and backend.",
      fileId: "8",
      narrative: {
        whatHappens: "HTTP endpoints accept requests, process business logic, and return JSON responses.",
        howItConnects: "Frontend fetch calls hit these endpoints; responses update frontend state.",
        whyThisDesign: "RESTful APIs are stateless, cacheable, and follow web standards.",
      },
    },
    {
      id: "supporting-logic",
      title: "Data Layer",
      subtitle: "Persistent Storage",
      description: "MongoDB stores data that survives server restarts.",
      fileId: "10",
      narrative: {
        whatHappens: "Models define schema, validate data, and provide query methods.",
        howItConnects: "Controllers use models for all database operations.",
        whyThisDesign: "Document databases offer flexibility for evolving data requirements.",
      },
    },
    {
      id: "integration-point",
      title: "Full Cycle",
      subtitle: "Request to Response",
      description: "Tracing a complete user action through all layers.",
      fileId: "11",
      narrative: {
        whatHappens: "User clicks → Event handler → API call → Route handler → Model query → DB → Response → State update → Re-render.",
        howItConnects: "Each step transforms data: user input → HTTP → JSON → documents → JSON → UI.",
        whyThisDesign: "Understanding this flow helps debug issues at any layer.",
      },
    },
  ],
  devops: [
    {
      id: "why-layer",
      title: "Why DevOps Exists",
      subtitle: "Automation & Reliability",
      description: "DevOps bridges the gap between development and operations through automation and better monitoring.",
      fileId: "devops-1", // Dockerfile
      narrative: {
        whatHappens: "Configuration files define how the application is built, packaged, and deployed automatically.",
        howItConnects: "This layer wraps the entire application (frontend + backend) to ensure it runs the same way everywhere.",
        whyThisDesign: "Infrastructure as Code (IaC) makes environment setup reproducible and prevents 'it works on my machine' issues.",
      },
    },
    {
      id: "entry-point",
      title: "Containerization",
      subtitle: "Packaging with Docker",
      description: "Dockerfiles define the environment your application needs to run consistently.",
      fileId: "devops-1",
      narrative: {
        whatHappens: "A Dockerfile specifies the base image, installs dependencies, and copies the source code into a container.",
        howItConnects: "The resulting image can be deployed to any server or cloud platform that supports Docker.",
        whyThisDesign: "Containers provide isolation and portablity, ensuring the production environment matches development.",
      },
    },
    {
      id: "core-flow",
      title: "CI/CD Pipeline",
      subtitle: "Automated Workflows",
      description: "GitHub Actions or similar tools automate testing and deployment.",
      fileId: "devops-2", // deploy.yml
      narrative: {
        whatHappens: "When code is pushed, the pipeline automatically runs tests, builds the project, and deploys it.",
        howItConnects: "This connects your source code repository directly to your production environments.",
        whyThisDesign: "Automation reduces human error and allows for faster, more frequent releases.",
      },
    },
  ],
};

// File insights with method highlighting
export const fileInsights: Record<string, FileInsight> = {
  "3": { // Header.tsx
    fileId: "3",
    whyExists: "Provides consistent navigation across all pages of the application.",
    problemSolved: "Without a shared header, each page would need its own navigation code, leading to duplication and inconsistency.",
    keyMethods: [
      {
        name: "Header",
        purpose: "Main component that renders the navigation bar with conditional auth UI",
        lineStart: 9,
        lineEnd: 18,
        context: "The Header is the entry point for users to navigate the application. It's built using React functional components and hooks for state management.",
      },
    ],
    funFacts: [
      {
        title: "Sticky Navigation",
        content: "Modern headers often use 'sticky' positioning to stay visible even when the user scrolls down, ensuring navigation is always a click away.",
      },
      {
        title: "Conditional Rendering",
        content: "We use simple if/else logic in the UI to swap between 'Login' and 'Profile' buttons based on whether the user is logged in.",
      },
    ],
    snippets: [
      {
        id: "nav-structure",
        label: "Navigation Structure",
        description: "Sets up the responsive navigation container",
        startLine: 10,
        endLine: 14,
        code: `<header className="bg-white shadow-sm">
  <nav className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between h-16">`,
        context: "The <nav> element is a semantic HTML tag that tells browsers and screen readers that this section contains primary navigation links.",
      },
      {
        id: "auth-conditional",
        label: "Auth State Handling",
        description: "Renders different UI based on login status",
        startLine: 15,
        endLine: 19,
        code: `{isLoggedIn ? (
  <button>Logout</button>
) : (
  <Link to="/login">Sign In</Link>
)}`,
        context: "This uses a ternary operator—the '?' and ':'—to quickly decide which button to show. It's the standard way to handle conditional UI in React.",
      },
    ],
    issues: [
      {
        id: "header-1",
        type: "todo",
        line: 15,
        message: "TODO: Add active link highlighting",
        suggestion: "Use useLocation hook to detect current route",
      },
    ],
  },
  "4": { // Button.tsx
    fileId: "4",
    whyExists: "Provides a reusable button component with consistent styling and variants.",
    problemSolved: "Eliminates the need to write button styles repeatedly and ensures design consistency.",
    keyMethods: [
      {
        name: "Button",
        purpose: "Renders a styled button with variant support",
        lineStart: 8,
        lineEnd: 13,
        context: "This component uses 'destruction' to pluck 'variant' and 'children' directly from props—a very clean and modern React pattern.",
      },
    ],
    funFacts: [
      {
        title: "Atomic Design",
        content: "The Button is a classic 'Atom' in design systems. It should be small, single-purpose, and used everywhere to maintain consistency.",
      },
    ],
    snippets: [
      {
        id: "variant-styles",
        label: "Variant Styling",
        description: "Maps variant props to Tailwind classes",
        startLine: 2,
        endLine: 7,
        code: `const baseStyles = "px-4 py-2 rounded-lg font-medium";
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
};`,
      },
    ],
    issues: [
      {
        id: "button-1",
        type: "antipattern",
        line: 3,
        message: "Hardcoded color values instead of design tokens",
        suggestion: "Use CSS variables or Tailwind theme colors",
      },
    ],
  },
  "6": { // Home.tsx
    fileId: "6",
    whyExists: "Serves as the main landing page, combining components into a complete view.",
    problemSolved: "Provides users with an entry point to the application and showcases available features.",
    keyMethods: [
      {
        name: "Home",
        purpose: "Page component that composes Header and main content",
        lineStart: 4,
        lineEnd: 14,
      },
    ],
    snippets: [
      {
        id: "page-composition",
        label: "Component Composition",
        description: "Shows how pages combine multiple components",
        startLine: 5,
        endLine: 13,
        code: `return (
  <div>
    <Header title="My App" isLoggedIn={false} />
    <main className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p>Get started by exploring our features.</p>
    </main>
  </div>
);`,
      },
    ],
    issues: [],
  },
  "8": { // users.ts API
    fileId: "8",
    whyExists: "Defines RESTful API endpoints for user management operations.",
    problemSolved: "Provides a structured way for the frontend to interact with user data in the database.",
    keyMethods: [
      {
        name: "GET /",
        purpose: "Retrieves all users from the database",
        lineStart: 7,
        lineEnd: 14,
        context: "This uses 'async/await' to talk to the database without freezing the server. It's like leaving a message and coming back when the data is ready.",
      },
      {
        name: "GET /:id",
        purpose: "Retrieves a single user by their ID",
        lineStart: 16,
        lineEnd: 27,
      },
    ],
    funFacts: [
      {
        title: "RESTful URLs",
        content: "The ':id' in the URL is a placeholder! Express automatically fills it with whatever the user types in that part of the web address.",
      },
    ],
    snippets: [
      {
        id: "get-all-users",
        label: "Get All Users",
        description: "Fetches complete user list with error handling",
        startLine: 7,
        endLine: 14,
        code: `router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});`,
      },
      {
        id: "get-user-by-id",
        label: "Get User by ID",
        description: "Finds specific user with 404 handling",
        startLine: 16,
        endLine: 27,
        code: `router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});`,
      },
    ],
  },
  "10": { // User.ts Model
    fileId: "10",
    whyExists: "Defines the data structure and validation rules for user documents in MongoDB.",
    problemSolved: "Ensures data consistency and provides a clear contract for what a 'user' looks like in the system.",
    keyMethods: [
      {
        name: "userSchema",
        purpose: "Defines the structure and validation for user documents",
        lineStart: 3,
        lineEnd: 17,
      },
    ],
    snippets: [
      {
        id: "schema-definition",
        label: "Schema Definition",
        description: "Defines fields, types, and constraints",
        startLine: 3,
        endLine: 17,
        code: `const userSchema = new mongoose.Schema({
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
});`,
      },
    ],
  },
  "11": { // App.tsx
    fileId: "11",
    whyExists: "Serves as the root component that bootstraps the entire React application.",
    problemSolved: "Provides a single entry point for routing, providers, and global configuration.",
    keyMethods: [
      {
        name: "App",
        purpose: "Root component that sets up routing for the SPA",
        lineStart: 5,
        lineEnd: 14,
      },
    ],
    snippets: [
      {
        id: "router-setup",
        label: "Router Configuration",
        description: "Sets up client-side routing with React Router",
        startLine: 6,
        endLine: 13,
        code: `return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);`,
      },
    ],
  },
  "devops-1": { // Dockerfile
    fileId: "devops-1",
    whyExists: "Defines a consistent environment for the application to run in any system.",
    problemSolved: "Eliminates environment-specific bugs and simplifies the deployment process.",
    keyMethods: [],
    funFacts: [
      {
        title: "Layer Caching",
        content: "Docker caches each line in your Dockerfile. If you don't change a line, Docker reuses the previous result, making builds much faster!",
      }
    ],
    snippets: [
      {
        id: "docker-base",
        label: "Base Image Selection",
        description: "Starts the build from a pre-configured environment",
        startLine: 1,
        endLine: 1,
        code: "FROM node:18-alpine",
        context: "Using '-alpine' versions keeps your container images small, which makes them faster to download and more secure.",
      },
      {
        id: "docker-workdir",
        label: "Working Directory",
        description: "Sets the directory where all following commands will run",
        startLine: 2,
        endLine: 2,
        code: "WORKDIR /app",
      }
    ],
  },
  "devops-2": { // deploy.yml
    fileId: "devops-2",
    whyExists: "Automates the process of testing and deploying code changes.",
    problemSolved: "Reduces manual work and ensures every change is tested before it hits production.",
    keyMethods: [],
    funFacts: [
      {
        title: "Continuous Delivery",
        content: "Some teams deploy their code many times per day! Automation is what makes this speed possible.",
      }
    ],
    snippets: [
      {
        id: "gh-actions-trigger",
        label: "Workflow Trigger",
        description: "Defines when the automation should run",
        startLine: 3,
        endLine: 5,
        code: "on:\n  push:\n    branches: [ main ]",
        context: "This tells GitHub to start the workflow only when someone pushes changes to the 'main' branch.",
      }
    ],
  },
};

export const learningAreas = [
  {
    id: "frontend",
    icon: Palette,
    title: "Frontend",
    shortTitle: "UI & Routing",
    description: "Learn about React components, routing, state management, and UI patterns.",
    progress: 0,
    color: "text-cyan-400",
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend",
    shortTitle: "APIs & Logic",
    description: "Understand API routes, controllers, services, middleware, and authentication.",
    progress: 0,
    color: "text-green-400",
  },
  {
    id: "database",
    icon: Database,
    title: "Database",
    shortTitle: "Models & Data",
    description: "Explore database schemas, models, queries, and data relationships.",
    progress: 0,
    color: "text-amber-400",
  },
  {
    id: "architecture",
    icon: Container,
    title: "Architecture",
    shortTitle: "End-to-End",
    description: "Get a complete picture of how all parts work together.",
    progress: 0,
    color: "text-purple-400",
  },
  {
    id: "devops",
    icon: Layers,
    title: "DevOps",
    shortTitle: "CI/CD & Docker",
    description: "Learn about containerization, automated deployments, and infrastructure.",
    progress: 0,
    color: "text-orange-400",
  },
];
