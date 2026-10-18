
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Compare.css";

const metrics = [
  ["knowledge", "Knowledge"],
  ["energy", "Energy"],
  ["happiness", "Happiness"],
  ["health", "Health"],
  ["productivity", "Productivity"],
  ["career", "Career"],
];

export default function Compare() {
  const [scenarios, setScenarios] = useState([]);
  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("parallelMeScenarios") || "[]"
      );

      setScenarios(Array.isArray(saved) ? saved : []);
    } catch {
      setScenarios([]);
    }
  }, []);

  const first = scenarios.find(
    (scenario) => String(scenario.id) === firstId
  );

  const second = scenarios.find(
    (scenario) => String(scenario.id) === secondId
  );

  const getScore = (scenario, key) => {
    const score = Number(scenario?.results?.[key] ?? 0);

    if (!Number.isFinite(score)) return 0;

    return Math.max(0, Math.min(100, score));
  };

  const comparisons =
    first && second
      ? metrics.map(([key, label]) => {
          const firstScore = getScore(first, key);
          const secondScore = getScore(second, key);

          return {
            key,
            label,
            firstScore,
            secondScore,
            difference: Math.abs(firstScore - secondScore),
            winner:
              firstScore === secondScore
                ? "tie"
                : firstScore > secondScore
                  ? "first"
                  : "second",
          };
        })
      : [];

  const firstWins = comparisons.filter(
    (item) => item.winner === "first"
  ).length;

  const secondWins = comparisons.filter(
    (item) => item.winner === "second"
  ).length;

  const average = (scenario) => {
    if (!scenario) return 0;

    const total = metrics.reduce(
      (sum, [key]) => sum + getScore(scenario, key),
      0
    );

    return Math.round(total / metrics.length);
  };

  const handleFirstChange = (value) => {
    setFirstId(value);

    if (value && value === secondId) {
      setSecondId("");
    }
  };

  const handleSecondChange = (value) => {
    setSecondId(value);

    if (value && value === firstId) {
      setFirstId("");
    }
  };

  return (
    <main className="compare-page">
      <div className="compare-header">
        <span className="compare-tag">PARALLEL ME</span>
        <h1>Compare Your Futures</h1>
        <p>
          Explore two possible versions of your future and discover
          how your daily choices may affect your results.
        </p>
      </div>

      {scenarios.length < 2 ? (
        <div className="compare-empty">
          <h2>You need at least 2 scenarios</h2>
          <p>
            Create two different futures before comparing their results.
          </p>
          <Link to="/create" className="compare-create-btn">
            + Create a Scenario
          </Link>
        </div>
      ) : (
        <>
          <div className="compare-selectors">
            <div className="compare-select-card">
              <label htmlFor="first-future">First Future</label>
              <select
                id="first-future"
                value={firstId}
                onChange={(event) =>
                  handleFirstChange(event.target.value)
                }
              >
                <option value="">Choose a scenario</option>

                {scenarios.map((scenario) => (
                  <option
                    key={scenario.id}
                    value={String(scenario.id)}
                    disabled={String(scenario.id) === secondId}
                  >
                    {scenario.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="compare-vs">VS</div>

            <div className="compare-select-card">
              <label htmlFor="second-future">Second Future</label>
              <select
                id="second-future"
                value={secondId}
                onChange={(event) =>
                  handleSecondChange(event.target.value)
                }
              >
                <option value="">Choose a scenario</option>

                {scenarios.map((scenario) => (
                  <option
                    key={scenario.id}
                    value={String(scenario.id)}
                    disabled={String(scenario.id) === firstId}
                  >
                    {scenario.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!first || !second ? (
            <div className="compare-empty compare-hint">
              <h2>Select two different futures</h2>
              <p>
                Choose a scenario in each box to see the comparison,
                scores, and overall summary.
              </p>
            </div>
          ) : (
            <section className="comparison-results">
              <div className="future-headings">
                <div>
                  <span className="future-label">FIRST FUTURE</span>
                  <h2>{first.name}</h2>
                  <p className="future-average">
                    Average score: <strong>{average(first)}/100</strong>
                  </p>
                </div>

                <span className="compare-vs">VS</span>

                <div>
                  <span className="future-label">SECOND FUTURE</span>
                  <h2>{second.name}</h2>
                  <p className="future-average">
                    Average score: <strong>{average(second)}/100</strong>
                  </p>
                </div>
              </div>

              <div className="compare-summary">
                <h3>Comparison Summary</h3>

                <div className="summary-score-grid">
                  <div className="summary-score">
                    <span>{first.name}</span>
                    <strong>{firstWins}</strong>
                    <small>metrics ahead</small>
                  </div>

                  <div className="summary-score">
                    <span>Ties</span>
                    <strong>
                      {comparisons.filter(
                        (item) => item.winner === "tie"
                      ).length}
                    </strong>
                    <small>equal metrics</small>
                  </div>

                  <div className="summary-score">
                    <span>{second.name}</span>
                    <strong>{secondWins}</strong>
                    <small>metrics ahead</small>
                  </div>
                </div>

                <p className="summary-message">
                  {firstWins === secondWins
                    ? "Both futures lead in the same number of metrics. Compare the individual scores to decide what matters most to you."
                    : firstWins > secondWins
                      ? `${first.name} leads in more metrics.`
                      : `${second.name} leads in more metrics.`}
                  {" "}These scores are illustrative estimates, not guaranteed
                  predictions of real-life outcomes.
                </p>
              </div>

              <h3 className="metrics-heading">Metric-by-Metric Results</h3>

              {comparisons.map((item) => (
                <div className="metric-row" key={item.key}>
                  <div className="metric-label">
                    <strong>{item.label}</strong>
                    <span>
                      {item.firstScore}/100 — {item.secondScore}/100
                    </span>
                  </div>

                  <div className="compare-score-line">
                    <span className="compare-score-name">
                      {first.name}
                    </span>
                    <div
                      className="metric-track"
                      role="progressbar"
                      aria-label={`${first.name} ${item.label}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={item.firstScore}
                    >
                      <div
                        className="metric-fill first-fill"
                        style={{ width: `${item.firstScore}%` }}
                      />
                    </div>
                    <strong>{item.firstScore}</strong>
                  </div>

                  <div className="compare-score-line">
                    <span className="compare-score-name">
                      {second.name}
                    </span>
                    <div
                      className="metric-track"
                      role="progressbar"
                      aria-label={`${second.name} ${item.label}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={item.secondScore}
                    >
                      <div
                        className="metric-fill second-fill"
                        style={{ width: `${item.secondScore}%` }}
                      />
                    </div>
                    <strong>{item.secondScore}</strong>
                  </div>

                  <p className="metric-difference">
                    {item.winner === "tie"
                      ? "Both futures have the same score."
                      : `${item.winner === "first" ? first.name : second.name} is ahead by ${item.difference} point${item.difference === 1 ? "" : "s"}.`}
                  </p>
                </div>
              ))}

              <div className="compare-actions">
                <Link to="/create" className="compare-create-btn">
                  + Create Another Scenario
                </Link>
                <Link to="/dashboard" className="compare-dashboard-btn">
                  Back to Dashboard
                </Link>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
