
import { useState } from "react";
import { Link } from "react-router-dom";
import { calculateScenario } from "../utils/calculations";
import "../index.css";

const activities = [
  { key: "study", label: "Study", icon: "📚", description: "Learning and studying", max: 12 },
  { key: "sleep", label: "Sleep", icon: "🌙", description: "Hours of sleep", max: 12 },
  { key: "exercise", label: "Exercise", icon: "🏃", description: "Physical activity", max: 5 },
  { key: "social", label: "Social Life", icon: "🫂", description: "Friends and family", max: 8 },
  { key: "work", label: "Work", icon: "💼", description: "Work or projects", max: 12 },
];

const metrics = [
  { key: "knowledge", label: "Knowledge", icon: "📚" },
  { key: "energy", label: "Energy", icon: "⚡" },
  { key: "happiness", label: "Happiness", icon: "😊" },
  { key: "health", label: "Health", icon: "💪" },
  { key: "productivity", label: "Productivity", icon: "🎯" },
  { key: "career", label: "Career Potential", icon: "🚀" },
];

const initialValues = {
  study: 3,
  sleep: 8,
  exercise: 1,
  social: 2,
  work: 4,
};

function CreateScenario() {
  const [name, setName] = useState("");
  const [values, setValues] = useState({ ...initialValues });
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const totalHours = Object.values(values).reduce(
    (sum, hours) => sum + hours,
    0
  );

  function handleChange(key, value) {
    setValues((previous) => ({
      ...previous,
      [key]: Number(value),
    }));

    setResult(null);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) {
      setMessageType("error");
      setMessage("Please enter a scenario name.");
      return;
    }

    if (totalHours > 24) {
      setMessageType("error");
      setMessage("Your activities exceed 24 hours. Please adjust your hours.");
      setResult(null);
      return;
    }

    if (
      Object.values(values).some(
        (hours) => !Number.isFinite(hours) || hours < 0
      )
    ) {
      setMessageType("error");
      setMessage("Please enter valid activity hours.");
      setResult(null);
      return;
    }

    let scores;

    try {
      scores = calculateScenario(values);

      const validScores = metrics.every((metric) => {
        const score = scores?.[metric.key];
        return (
          Number.isFinite(score) &&
          score >= 0 &&
          score <= 100
        );
      });

      if (!validScores) {
        throw new Error("Invalid calculation results.");
      }
    } catch {
      setMessageType("error");
      setMessage("We couldn't calculate your scenario. Please try again.");
      setResult(null);
      return;
    }

    const scenario = {
      id: Date.now(),
      name: cleanName,
      values: { ...values },
      results: scores,
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = JSON.parse(
        localStorage.getItem("parallelMeScenarios") || "[]"
      );

      if (!Array.isArray(saved)) {
        throw new Error("Invalid saved scenarios");
      }

      localStorage.setItem(
        "parallelMeScenarios",
        JSON.stringify([...saved, scenario])
      );

      setResult(scenario);
      setMessageType("success");
      setMessage("Your scenario was created and saved successfully!");
    } catch {
      setResult(scenario);
      setMessageType("error");
      setMessage(
        "Your scenario was calculated, but saving failed. Check your browser storage."
      );
    }
  }

  function resetForm() {
    setResult(null);
    setMessage("");
    setName("");
    setValues({ ...initialValues });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="scenario-page">
      <div className="scenario-heading">
        <span className="badge">✦ DESIGN YOUR POSSIBILITIES</span>
        <h1>
          Create Your <span>Future</span>
        </h1>
        <p>
          Small choices can create different paths.
          Build a daily routine and explore your possibilities.
        </p>
      </div>

      <form className="scenario-form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="scenarioName">
          Scenario Name
        </label>

        <input
          id="scenarioName"
          className="scenario-name"
          type="text"
          placeholder="e.g. Future Engineer"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setMessage("");
          }}
          maxLength={50}
          required
        />

        <div className="hours-heading">
          <div>
            <h2>Your Daily Routine</h2>
            <p>How many hours do you spend on each activity?</p>
          </div>

          <span className="hours-total">
            {totalHours} / 24 hrs
          </span>
        </div>

        <div className="activity-list">
          {activities.map((activity) => (
            <div className="activity-item" key={activity.key}>
              <div className="activity-top">
                <div className="activity-title">
                  <span className="activity-icon">{activity.icon}</span>
                  <div>
                    <h3>{activity.label}</h3>
                    <p>{activity.description}</p>
                  </div>
                </div>

                <strong className="activity-value">
                  {values[activity.key]}{" "}
                  {values[activity.key] === 1 ? "hour" : "hours"}
                </strong>
              </div>

              <input
                className="activity-slider"
                type="range"
                min="0"
                max={activity.max}
                step="1"
                value={values[activity.key]}
                onChange={(event) =>
                  handleChange(activity.key, event.target.value)
                }
                aria-label={activity.label + " hours"}
              />

              <div className="slider-labels">
                <span>0 hours</span>
                <span>{activity.max} hours</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="hours-heading"
          style={{ marginTop: "20px", marginBottom: 0 }}
        >
          <p>
            {totalHours <= 24
              ? `${24 - totalHours} hours remaining in your day.`
              : `${totalHours - 24} hours over the daily limit.`}
          </p>
          <span className="hours-total">
            {Math.round((totalHours / 24) * 100)}% allocated
          </span>
        </div>

        {totalHours > 24 && (
          <p className="scenario-message error" role="alert">
            Your daily routine cannot exceed 24 hours.
          </p>
        )}

        {message && (
          <p
            className={`scenario-message ${messageType}`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        )}

        <button
          className="generate-button"
          type="submit"
          disabled={totalHours > 24}
        >
          Generate My Future ↗
        </button>
      </form>

      {result && (
        <section className="results-section">
          <div className="results-heading">
            <span className="badge">YOUR SIMULATED RESULTS</span>
            <h2>{result.name}</h2>
            <p>
              These scores are illustrative estimates based on your selected
              routine, not scientific predictions.
            </p>
          </div>

          <div className="results-grid">
            {metrics.map((metric) => (
              <article className="result-card" key={metric.key}>
                <span className="result-icon">{metric.icon}</span>
                <p>{metric.label}</p>
                <strong>{result.results[metric.key]}</strong>

                <div
                  className="progress-track"
                  role="progressbar"
                  aria-label={metric.label}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={result.results[metric.key]}
                >
                  <div
                    className="progress-fill"
                    style={{
                      width: `${result.results[metric.key]}%`,
                    }}
                  />
                </div>

                <small>out of 100</small>
              </article>
            ))}
          </div>

          <div className="result-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={resetForm}
            >
              Create Another
            </button>

            <Link to="/dashboard" className="primary-button">
              View Dashboard ↗
            </Link>
          </div>
        </section>
      )}
    </section>
  );
}

export default CreateScenario;
