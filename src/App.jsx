import { HashRouter, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Sparkles,
  ArrowUpRight,
  GitCompareArrows,
  CircleDot,
  Infinity as InfinityIcon,
} from "lucide-react";

import Profile from "./pages/Profile";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";
import CreateScenario from "./pages/CreateScenario";
import "./index.css";


function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "logo active" : "logo"
        }
      >
        Parallel<span>Me.</span>
      </NavLink>

      <div className="links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/compare">Compare</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label="Toggle color theme"
        title="Toggle dark and light mode"
      >
        {theme === "dark" ? (
          <>
            <Sun className="ui-icon" aria-hidden="true" />
            Light Mode
          </>
        ) : (
          <>
            <Moon className="ui-icon" aria-hidden="true" />
            Dark Mode
          </>
        )}
      </button>

      <NavLink to="/create" className="nav-button">
        Start Exploring
        <ArrowUpRight className="ui-icon" aria-hidden="true" />
      </NavLink>
    </nav>
  );
}


function Footer() {
  return (
    <footer>
      <h2>
        Parallel<span>Me.</span>
      </h2>
      <p>Explore the choices that shape your future.</p>
      <small>© 2026 Parallel Me. Your future, your choices.</small>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="badge">
          <Sparkles className="ui-icon" aria-hidden="true" />
          YOUR LIFE. INFINITE POSSIBILITIES.
        </div>

        <h1>
          What if you chose
          <br />
          a <span>different future?</span>
        </h1>

        <p className="hero-text">
          Every decision creates a different version of you.
          Explore your possibilities, compare your paths, and discover
          the future you could build.
        </p>

        <div className="hero-buttons">
          <Link to="/create" className="primary-button">
            Create Your Future
            <ArrowUpRight className="ui-icon" aria-hidden="true" />
          </Link>

          <Link to="/compare" className="secondary-button">
            Compare Scenarios
          </Link>
        </div>

        <div className="stats">
          <div>
            <strong>∞</strong>
            <span>Possible Futures</span>
          </div>
          <div>
            <strong>6</strong>
            <span>Life Dimensions</span>
          </div>
          <div>
            <strong>1</strong>
            <span>You in Control</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <span>DISCOVER YOUR POTENTIAL</span>
          <h2>One life. Many possibilities.</h2>
          <p>Test your choices before you make them.</p>
        </div>

        <div className="cards">
          <article className="feature-card">
            <div className="feature-icon">
              <Sparkles aria-hidden="true" />
            </div>
            <h3>Build Your Scenarios</h3>
            <p>
              Design different daily routines and explore how your choices
              might shape your future.
            </p>
            <Link to="/create">
              Create a scenario
              <ArrowUpRight className="ui-icon" aria-hidden="true" />
            </Link>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <GitCompareArrows aria-hidden="true" />
            </div>
            <h3>Compare Your Paths</h3>
            <p>
              Compare study, sleep, exercise, and social time across
              different lifestyles.
            </p>
            <Link to="/compare">
              Compare futures
              <ArrowUpRight className="ui-icon" aria-hidden="true" />
            </Link>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <CircleDot aria-hidden="true" />
            </div>
            <h3>Track Your Progress</h3>
            <p>
              Keep your scenarios organized and see how your priorities
              change over time.
            </p>
            <Link to="/dashboard">
              Open dashboard
              <ArrowUpRight className="ui-icon" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}

function Page({ title, description }) {
  return (
    <section className="inner-page">
      <span className="badge">
        <Sparkles className="ui-icon" aria-hidden="true" />
        PARALLEL ME / EXPLORE
      </span>

      <h1>{title}</h1>
      <p>{description}</p>

      <Link to="/create" className="primary-button">
        Create a Scenario
        <ArrowUpRight className="ui-icon" aria-hidden="true" />
      </Link>
    </section>
  );
}


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-transition" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateScenario />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route
          path="*"
          element={
            <Page
              title="Page Not Found"
              description="This path does not exist. Let's explore another future."
            />
          }
        />

      </Routes>
    </div>
  );
}
  
function ScrollToTop() {
  const { pathname } = useLocation();

useEffect(() => {
  window.scrollTo(0, 0);

  const timer = setTimeout(() => {
    console.log("AFTER ANIMATION:", window.scrollY);
  }, 600);

  return () => clearTimeout(timer);
}, [pathname]);

  return null;
}


function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("parallelMeTheme") || "dark"
  );

  useEffect(() => {
    localStorage.setItem("parallelMeTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

return (
  <HashRouter>
    <ScrollToTop />

    <div className={`app ${theme}-theme`}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <AnimatedRoutes />
      </main>

      <Footer />
    </div>
  </HashRouter>
);
}

export default App;