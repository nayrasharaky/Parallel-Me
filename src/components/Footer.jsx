
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link to="/" className="logo">
          Parallel<span>Me.</span>
        </Link>
        <p>Explore the choices that shape your future.</p>
      </div>

      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Scenario</Link>
        <Link to="/compare">Compare Futures</Link>
        <Link to="/about">About</Link>
      </div>

      <p className="copyright">
        © 2026 Parallel Me. Your future, your choices.
      </p>
    </footer>
  );
}

export default Footer;
