// Evaluation questions data for different areas and levels

export interface EvaluationQuestion {
  id: string;
  question: string;
  code: string;
  fileName: string;
  highlightedLines?: number[];
  options: string[];
  correctAnswer: number;
  explanation: string;
  codeReference?: string;
}

export interface AdvancedTask {
  id: string;
  task: string;
  fileName: string;
  initialCode: string;
  editableRegion: { start: number; end: number };
  hints: string[];
  evaluationCriteria: string[];
  sampleSolution: string;
}

export interface LevelResult {
  strengths: string[];
  weakAreas: string[];
  recommendation?: string;
}

// Frontend evaluation questions
export const frontendQuestions: Record<string, EvaluationQuestion[]> = {
  beginner: [
    {
      id: "fe-b-1",
      question: "What happens when a user navigates to /login in this file?",
      code: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`,
      fileName: "App.tsx",
      highlightedLines: [11],
      options: [
        "The app redirects to the home page",
        "The Login component is rendered",
        "The Dashboard component is rendered",
        "An error is thrown"
      ],
      correctAnswer: 1,
      explanation: "The route /login renders the Login component because it is mapped here in App.tsx on line 11. React Router matches the URL path and renders the corresponding element.",
      codeReference: "<Route path=\"/login\" element={<Login />} />"
    },
    {
      id: "fe-b-2",
      question: "What is the purpose of the isLoggedIn prop in this Header component?",
      code: `interface HeaderProps {
  title: string;
  isLoggedIn: boolean;
}

export function Header({ title, isLoggedIn }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <h1 className="text-xl font-bold">{title}</h1>
          {isLoggedIn ? (
            <button>Logout</button>
          ) : (
            <a href="/login">Sign In</a>
          )}
        </div>
      </nav>
    </header>
  );
}`,
      fileName: "Header.tsx",
      highlightedLines: [12, 13, 14, 15, 16],
      options: [
        "It changes the header color",
        "It controls whether to show Logout or Sign In button",
        "It fetches user data from the API",
        "It enables dark mode"
      ],
      correctAnswer: 1,
      explanation: "The isLoggedIn prop is used for conditional rendering. When true, it shows a 'Logout' button; when false, it shows a 'Sign In' link. This is a common pattern for authentication UI.",
      codeReference: "{isLoggedIn ? <button>Logout</button> : <a href=\"/login\">Sign In</a>}"
    },
    {
      id: "fe-b-3",
      question: "What does the useState hook do in this component?",
      code: `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <p className="text-2xl font-bold">{count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Increment
      </button>
    </div>
  );
}`,
      fileName: "Counter.tsx",
      highlightedLines: [4],
      options: [
        "It creates a constant that never changes",
        "It creates reactive state that triggers re-renders when updated",
        "It connects to a database",
        "It defines the component's props"
      ],
      correctAnswer: 1,
      explanation: "useState is a React hook that creates reactive state. 'count' holds the current value (initialized to 0), and 'setCount' is the function to update it. When setCount is called, React re-renders the component with the new value.",
      codeReference: "const [count, setCount] = useState(0);"
    },
    {
      id: "fe-b-4",
      question: "What will happen when the button is clicked?",
      code: `import { useState } from 'react';

export function TodoList() {
  const [todos, setTodos] = useState(['Buy milk', 'Walk dog']);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo}</li>)}
      </ul>
    </div>
  );
}`,
      fileName: "TodoList.tsx",
      highlightedLines: [7, 8, 9, 10, 11],
      options: [
        "The input value is deleted permanently",
        "The input value is added to the todos array and input is cleared",
        "Nothing happens",
        "The page refreshes"
      ],
      correctAnswer: 1,
      explanation: "The addTodo function first checks if the input isn't empty, then creates a new array with all existing todos plus the new input, and finally clears the input field. The spread operator [...todos] creates a new array to ensure React detects the change.",
      codeReference: "setTodos([...todos, input]); setInput('');"
    },
    {
      id: "fe-b-5",
      question: "Why is the 'key' prop important in the map function?",
      code: `export function UserList({ users }) {
  return (
    <ul className="divide-y">
      {users.map((user) => (
        <li key={user.id} className="py-2">
          <span>{user.name}</span>
          <span className="text-gray-500">{user.email}</span>
        </li>
      ))}
    </ul>
  );
}`,
      fileName: "UserList.tsx",
      highlightedLines: [5],
      options: [
        "It's optional and only for styling",
        "It helps React identify which items changed, added, or removed",
        "It sets the z-index of elements",
        "It's required for TypeScript compilation"
      ],
      correctAnswer: 1,
      explanation: "The 'key' prop is crucial for React's reconciliation algorithm. It helps React identify which list items have changed, been added, or removed. Using unique identifiers (like user.id) instead of array indices ensures optimal performance and prevents bugs with stateful components.",
      codeReference: "<li key={user.id}>"
    }
  ],
  intermediate: [
    {
      id: "fe-i-1",
      question: "What problem does useEffect solve in this component?",
      code: `import { useState, useEffect } from 'react';

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}`,
      fileName: "UserProfile.tsx",
      highlightedLines: [7, 8, 9, 10, 11, 12, 13, 14, 15],
      options: [
        "It prevents the component from rendering",
        "It runs side effects (API calls) when the component mounts or userId changes",
        "It caches the user data permanently",
        "It validates the userId prop"
      ],
      correctAnswer: 1,
      explanation: "useEffect handles side effects in functional components. The dependency array [userId] means this effect runs on mount AND whenever userId changes. This ensures fresh data is fetched when viewing a different user's profile.",
      codeReference: "useEffect(() => { ... }, [userId]);"
    },
    {
      id: "fe-i-2",
      question: "What is the benefit of using a custom hook like this?",
      code: `import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage in component:
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return <button onClick={() => setTheme('dark')}>Dark Mode</button>;
}`,
      fileName: "useLocalStorage.ts",
      highlightedLines: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      options: [
        "It makes the code slower but more readable",
        "It encapsulates reusable stateful logic that can be shared across components",
        "It's required by React 18",
        "It replaces Redux completely"
      ],
      correctAnswer: 1,
      explanation: "Custom hooks allow you to extract and reuse stateful logic without changing component hierarchy. This useLocalStorage hook syncs state with localStorage, and any component can use it without duplicating the logic.",
      codeReference: "export function useLocalStorage(key, initialValue)"
    },
    {
      id: "fe-i-3",
      question: "What does the useCallback hook prevent in this component?",
      code: `import { useState, useCallback, memo } from 'react';

const ExpensiveList = memo(({ items, onItemClick }) => {
  console.log('ExpensiveList rendered');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

export function Parent() {
  const [count, setCount] = useState(0);
  const [items] = useState([{ id: 1, name: 'Item 1' }]);

  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveList items={items} onItemClick={handleClick} />
    </div>
  );
}`,
      fileName: "Parent.tsx",
      highlightedLines: [19, 20, 21],
      options: [
        "It prevents the component from unmounting",
        "It prevents unnecessary re-renders of memoized children by keeping function reference stable",
        "It makes the function run faster",
        "It caches API responses"
      ],
      correctAnswer: 1,
      explanation: "useCallback memoizes the function reference. Without it, a new function would be created on every render, causing ExpensiveList (wrapped in memo) to re-render unnecessarily when count changes. useCallback ensures the same function reference is passed unless dependencies change.",
      codeReference: "const handleClick = useCallback((id) => { ... }, []);"
    },
    {
      id: "fe-i-4",
      question: "What pattern does this Context implementation follow?",
      code: `import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}`,
      fileName: "AuthContext.tsx",
      highlightedLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      options: [
        "Singleton pattern",
        "Provider pattern with custom hook for global state management",
        "Factory pattern",
        "Observer pattern"
      ],
      correctAnswer: 1,
      explanation: "This is the Provider pattern combined with a custom hook. AuthProvider wraps the app to provide auth state globally. useAuth is a custom hook that makes consuming the context cleaner and adds error handling if used outside the provider.",
      codeReference: "<AuthContext.Provider value={{ user, login, logout }}>"
    },
    {
      id: "fe-i-5",
      question: "Why is the dependency array important in useMemo?",
      code: `import { useState, useMemo } from 'react';

export function ProductList({ products, searchTerm }) {
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSorted = useMemo(() => {
    console.log('Filtering and sorting...');
    return products
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [products, searchTerm, sortBy]);

  return (
    <div>
      <select onChange={e => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="category">Category</option>
      </select>
      {filteredAndSorted.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}`,
      fileName: "ProductList.tsx",
      highlightedLines: [6, 7, 8, 9, 10, 11],
      options: [
        "It has no effect on performance",
        "It determines when the expensive calculation should be re-run",
        "It defines which products to filter",
        "It's required for TypeScript"
      ],
      correctAnswer: 1,
      explanation: "The dependency array [products, searchTerm, sortBy] tells React when to recalculate. The expensive filter/sort operation only runs when these values change, not on every render. This is crucial for performance with large lists.",
      codeReference: "}, [products, searchTerm, sortBy]);"
    },
    {
      id: "fe-i-6",
      question: "What does the async/await pattern accomplish here?",
      code: `import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!res.ok) throw new Error('Invalid credentials');
      
      const data = await res.json();
      // Handle successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {/* form fields */}
      <button disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}`,
      fileName: "LoginForm.tsx",
      highlightedLines: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
      options: [
        "It makes the form submit faster",
        "It handles asynchronous operations with proper loading and error states",
        "It's required for POST requests",
        "It encrypts the password"
      ],
      correctAnswer: 1,
      explanation: "Async/await with try/catch/finally provides clean handling of asynchronous operations. It manages loading state (for UI feedback), catches errors gracefully, and ensures cleanup happens regardless of success or failure.",
      codeReference: "const handleSubmit = async (e) => { try { await fetch(...) } catch { ... } finally { setLoading(false); } }"
    },
    {
      id: "fe-i-7",
      question: "What is the purpose of the Navigate component here?",
      code: `import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Usage:
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}`,
      fileName: "ProtectedRoute.tsx",
      highlightedLines: [8, 9, 10],
      options: [
        "It displays a 404 page",
        "It redirects unauthenticated users to login while preserving their intended destination",
        "It navigates to the home page",
        "It refreshes the current page"
      ],
      correctAnswer: 1,
      explanation: "Navigate performs a redirect. The 'state' prop preserves where the user was trying to go, so after login they can be redirected back. The 'replace' prop prevents the protected route from appearing in browser history.",
      codeReference: "<Navigate to=\"/login\" state={{ from: location }} replace />"
    },
    {
      id: "fe-i-8",
      question: "What problem does this error boundary solve?",
      code: `import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error, info);
    // Could send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage:
<ErrorBoundary>
  <App />
</ErrorBoundary>`,
      fileName: "ErrorBoundary.tsx",
      highlightedLines: [6, 7, 8, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      options: [
        "It prevents syntax errors during development",
        "It catches JavaScript errors in child components and displays a fallback UI",
        "It validates form inputs",
        "It handles 404 errors from API calls"
      ],
      correctAnswer: 1,
      explanation: "Error boundaries catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app. This prevents a single broken component from taking down the entire application.",
      codeReference: "static getDerivedStateFromError(error) { return { hasError: true, error }; }"
    }
  ],
  advanced: [
    {
      id: "fe-a-1",
      question: "What optimization technique is demonstrated here?",
      code: `import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}`,
      fileName: "App.tsx",
      highlightedLines: [3, 4, 5, 9],
      options: [
        "Server-side rendering",
        "Code splitting with lazy loading to reduce initial bundle size",
        "Static site generation",
        "Image optimization"
      ],
      correctAnswer: 1,
      explanation: "React.lazy enables code splitting by dynamically importing components. Each page is loaded only when needed, reducing the initial JavaScript bundle. Suspense provides a loading state while the chunk is being downloaded.",
      codeReference: "const Dashboard = lazy(() => import('./pages/Dashboard'));"
    },
    {
      id: "fe-a-2",
      question: "What advanced state pattern does this implement?",
      code: `import { useReducer, createContext, useContext } from 'react';

const initialState = { items: [], total: 0, isLoading: false };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price
      };
    case 'REMOVE_ITEM':
      const item = state.items.find(i => i.id === action.payload);
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - (item?.price || 0)
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}`,
      fileName: "CartContext.tsx",
      highlightedLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      options: [
        "Observer pattern",
        "Flux/Redux pattern with useReducer for predictable state transitions",
        "Pub/Sub pattern",
        "Factory pattern"
      ],
      correctAnswer: 1,
      explanation: "This implements the Flux pattern using useReducer. Actions describe what happened, the reducer specifies how state changes. This makes state transitions predictable and easier to debug than scattered setState calls.",
      codeReference: "function cartReducer(state, action) { switch (action.type) { ... } }"
    },
    {
      id: "fe-a-3",
      question: "What does this custom hook pattern enable?",
      code: `import { useState, useEffect, useRef } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearch) {
      fetchSearchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={search} onChange={e => setSearch(e.target.value)} />;
}`,
      fileName: "useDebounce.ts",
      highlightedLines: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      options: [
        "Instant search results",
        "Delayed value updates to prevent excessive API calls during rapid input",
        "Form validation",
        "Keyboard shortcut handling"
      ],
      correctAnswer: 1,
      explanation: "Debouncing delays updating the value until the user stops typing for the specified delay. This prevents making an API call for every keystroke, reducing server load and improving performance. The cleanup function ensures pending timeouts are cleared.",
      codeReference: "return () => clearTimeout(timer);"
    }
  ]
};

// Backend evaluation questions
export const backendQuestions: Record<string, EvaluationQuestion[]> = {
  beginner: [
    {
      id: "be-b-1",
      question: "What does this Express route handler do?",
      code: `const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;`,
      fileName: "routes/users.js",
      highlightedLines: [5, 6, 7, 8, 9, 10, 11],
      options: [
        "Creates a new user",
        "Retrieves all users from the database",
        "Updates a user's information",
        "Deletes all users"
      ],
      correctAnswer: 1,
      explanation: "This is a GET route handler that fetches all users. User.find() without parameters returns all documents in the collection. The response is sent as JSON.",
      codeReference: "router.get('/', async (req, res) => { const users = await User.find(); res.json(users); }"
    },
    {
      id: "be-b-2",
      question: "What status code should be returned for 'Resource not found'?",
      code: `router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(???).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});`,
      fileName: "routes/users.js",
      highlightedLines: [4, 5],
      options: [
        "200",
        "400",
        "404",
        "500"
      ],
      correctAnswer: 2,
      explanation: "404 is the HTTP status code for 'Not Found'. It indicates that the server cannot find the requested resource. 200 means success, 400 means bad request, and 500 means server error.",
      codeReference: "res.status(404).json({ message: 'User not found' });"
    },
    {
      id: "be-b-3",
      question: "What is req.body used for in this route?",
      code: `router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = new User({ name, email, password });
    await user.save();
    
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});`,
      fileName: "routes/users.js",
      highlightedLines: [3],
      options: [
        "To get URL parameters",
        "To access data sent in the request body (usually from a form or JSON)",
        "To get query string parameters",
        "To access request headers"
      ],
      correctAnswer: 1,
      explanation: "req.body contains data sent by the client in the request body, typically from form submissions or JSON payloads. This requires body-parsing middleware like express.json().",
      codeReference: "const { name, email, password } = req.body;"
    },
    {
      id: "be-b-4",
      question: "What is the purpose of the try/catch block here?",
      code: `router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});`,
      fileName: "routes/users.js",
      highlightedLines: [2, 8, 9, 10, 11],
      options: [
        "To make the code run faster",
        "To handle potential errors gracefully without crashing the server",
        "To validate user input",
        "To log all requests"
      ],
      correctAnswer: 1,
      explanation: "try/catch prevents unhandled exceptions from crashing the Node.js process. If an error occurs (database connection fails, invalid ID format, etc.), it's caught and a proper error response is sent to the client.",
      codeReference: "try { ... } catch (error) { res.status(500).json({ message: 'Server error' }); }"
    },
    {
      id: "be-b-5",
      question: "What does middleware do in Express?",
      code: `const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

// Routes
app.use('/api/users', userRoutes);

app.listen(3000);`,
      fileName: "server.js",
      highlightedLines: [6, 7, 8, 11, 12, 13, 14],
      options: [
        "It defines database schemas",
        "It processes requests before they reach route handlers",
        "It only handles errors",
        "It renders HTML templates"
      ],
      correctAnswer: 1,
      explanation: "Middleware functions run between receiving a request and sending a response. They can modify req/res objects, end the request, or call next() to pass control to the next middleware. Common uses: parsing JSON, enabling CORS, logging, authentication.",
      codeReference: "app.use((req, res, next) => { ... next(); });"
    }
  ],
  intermediate: [
    {
      id: "be-i-1",
      question: "What security measure does this middleware implement?",
      code: `const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Protected route usage
router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});`,
      fileName: "middleware/auth.js",
      highlightedLines: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      options: [
        "Password hashing",
        "JWT-based authentication with token verification",
        "Rate limiting",
        "SQL injection prevention"
      ],
      correctAnswer: 1,
      explanation: "This middleware validates JWT tokens. It extracts the token from the Authorization header, verifies it using the secret key, and attaches the decoded user data to the request. Invalid or missing tokens result in 401 Unauthorized.",
      codeReference: "const decoded = jwt.verify(token, process.env.JWT_SECRET); req.user = decoded;"
    }
  ],
  advanced: []
};

// Database evaluation questions
export const databaseQuestions: Record<string, EvaluationQuestion[]> = {
  beginner: [
    {
      id: "db-b-1",
      question: "What does this Mongoose schema define?",
      code: `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);`,
      fileName: "models/User.js",
      highlightedLines: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      options: [
        "A REST API endpoint",
        "The structure and validation rules for user documents in MongoDB",
        "A React component",
        "A SQL table"
      ],
      correctAnswer: 1,
      explanation: "A Mongoose schema defines the structure of documents in a MongoDB collection. It specifies field types, validation rules (required, minlength), transformations (trim, lowercase), and defaults. This ensures data consistency.",
      codeReference: "const userSchema = new mongoose.Schema({ name: { type: String, required: true }, ... });"
    }
  ],
  intermediate: [],
  advanced: []
};

// Advanced tasks for code editing mode
export const advancedTasks: Record<string, AdvancedTask[]> = {
  frontend: [
    {
      id: "fe-adv-1",
      task: "Refactor this component to properly handle loading and error states when fetching user data.",
      fileName: "UserProfile.tsx",
      initialCode: `import { useState, useEffect } from 'react';

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}`,
      editableRegion: { start: 1, end: 18 },
      hints: [
        "Add loading and error state variables",
        "Handle the case when user is null",
        "Add try/catch for error handling",
        "Show appropriate UI for each state"
      ],
      evaluationCriteria: [
        "Added loading state with useState",
        "Added error state handling",
        "Shows loading indicator while fetching",
        "Handles null user case (prevents crash)",
        "Displays error message on failure"
      ],
      sampleSolution: `import { useState, useEffect } from 'react';

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!user) return <div className="p-4">User not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}`
    },
    {
      id: "fe-adv-2",
      task: "Add form validation to this login form with proper error messages.",
      fileName: "LoginForm.tsx",
      initialCode: `import { useState } from 'react';

export function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
}`,
      editableRegion: { start: 1, end: 33 },
      hints: [
        "Add an errors state object",
        "Validate email format",
        "Check password minimum length",
        "Display error messages below inputs",
        "Prevent submission if validation fails"
      ],
      evaluationCriteria: [
        "Added validation state",
        "Email format validation",
        "Password length validation (min 6 chars)",
        "Error messages displayed",
        "Form doesn't submit with invalid data"
      ],
      sampleSolution: `import { useState } from 'react';

export function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={\`w-full p-2 border rounded \${errors.email ? 'border-red-500' : ''}\`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={\`w-full p-2 border rounded \${errors.password ? 'border-red-500' : ''}\`}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
}`
    }
  ],
  backend: [],
  database: []
};

// Get questions by area and level
export function getQuestions(area: string, level: string): EvaluationQuestion[] {
  const questionSets: Record<string, Record<string, EvaluationQuestion[]>> = {
    frontend: frontendQuestions,
    backend: backendQuestions,
    database: databaseQuestions,
    full: { ...frontendQuestions } // Combine all for full
  };
  
  return questionSets[area]?.[level] || frontendQuestions.beginner;
}

// Evaluate user performance
export function evaluatePerformance(
  answers: Record<number, number>,
  questions: EvaluationQuestion[]
): LevelResult {
  let correct = 0;
  const wrongTopics: string[] = [];
  
  Object.entries(answers).forEach(([qIndex, answer]) => {
    const q = questions[parseInt(qIndex)];
    if (q && q.correctAnswer === answer) {
      correct++;
    } else if (q) {
      // Extract topic from question for weak areas
      if (q.question.toLowerCase().includes('state')) wrongTopics.push('State Management');
      if (q.question.toLowerCase().includes('effect')) wrongTopics.push('Side Effects');
      if (q.question.toLowerCase().includes('route')) wrongTopics.push('Routing');
      if (q.question.toLowerCase().includes('api') || q.question.toLowerCase().includes('fetch')) wrongTopics.push('API Integration');
    }
  });
  
  const percentage = (correct / questions.length) * 100;
  
  const strengths = [];
  const weakAreas = [...new Set(wrongTopics)];
  
  if (percentage >= 80) strengths.push('Strong conceptual understanding');
  if (percentage >= 60) strengths.push('Good grasp of fundamentals');
  if (wrongTopics.length === 0) strengths.push('Excellent performance!');
  
  let recommendation;
  if (percentage < 50) {
    recommendation = `We recommend revisiting the Learn section to strengthen your understanding.`;
  } else if (percentage < 80) {
    recommendation = `Good progress! Consider reviewing: ${weakAreas.join(', ')}`;
  }
  
  return { strengths, weakAreas, recommendation };
}
