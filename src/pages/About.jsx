import { Link } from "react-router-dom";
import {
  Sprout,
  Telescope,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import "./About.css";

export default function About() {
return (
    <main className="about-page">
    <section className="about-hero">
        <span className="about-tag">
        <Sparkles className="ui-icon" aria-hidden="true" />
        THE IDEA BEHIND PARALLEL ME
        </span>

        <h1>
        One Life.
        <br />
        <span>Infinite Possibilities.</span>
        </h1>

        <p>
        Every decision creates a different path. Parallel Me helps
        you explore those paths and imagine the person you could become.
        </p>

        <Link to="/create" className="about-btn">
        Explore Your Future
        <ArrowRight className="ui-icon" aria-hidden="true" />
        </Link>
    </section>

    <section className="about-cards">
        <article className="about-card">
        <div className="about-icon">
            <Sprout aria-hidden="true" />
        </div>

        <h2>Our Mission</h2>

        <p>
            Help people understand how their daily habits and choices
            can shape their future.
        </p>
        </article>

        <article className="about-card">
        <div className="about-icon">
            <Telescope aria-hidden="true" />
        </div>

        <h2>Our Vision</h2>

        <p>
            Make exploring different life possibilities simple,
            interactive, and inspiring.
        </p>
        </article>

        <article className="about-card">
        <div className="about-icon">
            <Target aria-hidden="true" />
        </div>

        <h2>Our Goal</h2>

        <p>
            Encourage better decisions by comparing different
            routines, priorities, and potential outcomes.
        </p>
        </article>
    </section>

    <section className="about-bottom">
        <h2>Your future isn't written yet.</h2>

        <p>
        Start building the version of yourself you want to become.
        </p>

        <Link to="/create" className="about-btn">
        Build Another You
        <ArrowRight className="ui-icon" aria-hidden="true" />
        </Link>
    </section>
    </main>
);
}