
import Toast from "../components/Toast";
import { exportScenarios, importScenarios } from "../utils/scenarioBackup";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [scenarios, setScenarios] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [backupMessage, setBackupMessage] = useState("");
const [importing, setImporting] = useState(false);
const [toast, setToast] = useState({
  message: "",
  type: "success",
});

function showToast(message, type = "success") {
  setToast({ message, type });
}

function closeToast() {
  setToast({ message: "", type: "success" });
}

async function handleImport(event) {
  const file = event.target.files?.[0];

  if (!file) return;

  setImporting(true);
  setBackupMessage("");

  try {
    const result = await importScenarios(file);
    loadScenarios();
showToast(`Imported ${result.added} new scenarios successfully.`);  } catch (error) {
showToast(error.message || "Could not import this file.", "error");  } finally {
    setImporting(false);
    event.target.value = "";
  }
}

  function loadScenarios() {
    try {
      const saved = JSON.parse(
        localStorage.getItem("parallelMeScenarios") || "[]"
      );
      setScenarios(Array.isArray(saved) ? saved : []);
    } catch {
      setScenarios([]);
    }
  }

  useEffect(() => {
    loadScenarios();
  }, []);

  function deleteScenario(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this scenario?"
    );

    if (!confirmed) return;

    const updated = scenarios.filter(
      (scenario) => scenario.id !== id
    );

    localStorage.setItem(
      "parallelMeScenarios",
      JSON.stringify(updated)
    );

    setScenarios(updated);
    showToast("Scenario deleted successfully!");
  }

  const averageHappiness = scenarios.length
    ? Math.round(
        scenarios.reduce(
          (sum, scenario) =>
            sum + (scenario.results?.happiness || 0),
          0
        ) / scenarios.length
      )
    : 0;

  const bestProductivity = scenarios.length
    ? Math.max(
        ...scenarios.map(
          (scenario) => scenario.results?.productivity || 0
        )
      )
    : 0;

    
  const metricNames = [
    "knowledge",
    "energy",
    "happiness",
    "health",
    "productivity",
    "career",
  ];

  function getScenarioAverage(scenario) {
    const scores = metricNames.map((metric) =>
      Math.max(
        0,
        Math.min(
          100,
          Number(scenario.results?.[metric]) || 0
        )
      )
    );

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    );
  }

  const overallAverage = scenarios.length
    ? Math.round(
        scenarios.reduce(
          (sum, scenario) =>
            sum + getScenarioAverage(scenario),
          0
        ) / scenarios.length
      )
    : 0;

  const bestFuture = scenarios.length
    ? scenarios.reduce((best, scenario) =>
        getScenarioAverage(scenario) >
        getScenarioAverage(best)
          ? scenario
          : best
      )
    : null;

  const metricOverview = [
    { name: "Knowledge", key: "knowledge", icon: "🧠" },
    { name: "Energy", key: "energy", icon: "⚡" },
    { name: "Happiness", key: "happiness", icon: "😊" },
    { name: "Health", key: "health", icon: "💚" },
    { name: "Productivity", key: "productivity", icon: "🎯" },
    { name: "Career", key: "career", icon: "🚀" },
  ];

  const averageByMetric = metricOverview.map((metric) => ({
    ...metric,
    value: scenarios.length
      ? Math.round(
          scenarios.reduce(
            (sum, scenario) =>
              sum +
              Math.max(
                0,
                Math.min(
                  100,
                  Number(
                    scenario.results?.[metric.key]
                  ) || 0
                )
              ),
            0
          ) / scenarios.length
        )
      : 0,
  }));


  const filteredScenarios = scenarios
    .filter((scenario) =>
      (scenario.name || "")
        .toLowerCase()
        .includes(search.toLowerCase().trim())
    )
    .filter((scenario) => {
      const productivity = scenario.results?.productivity || 0;

      if (filterBy === "high") return productivity >= 70;
      if (filterBy === "medium")
        return productivity >= 40 && productivity < 70;
      if (filterBy === "low") return productivity < 40;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "productivity") {
        return (
          (b.results?.productivity || 0) -
          (a.results?.productivity || 0)
        );
      }

      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      return (b.id || 0) - (a.id || 0);
    });

  return (
    
    <section className="dashboard-page">
      <div className="dashboard-heading">
        <span className="badge">✦ YOUR PERSONAL SPACE</span>
        <h1>
          Your <span>Dashboard</span>
        </h1>
        <p>Explore the different futures you have imagined.</p>
      </div>

      <div className="dashboard-stats">
        <article className="dashboard-stat">
          <span>🪐</span>
          <p>Total Scenarios</p>
          <strong>{scenarios.length}</strong>
        </article>

        <article className="dashboard-stat">
          <span>🎯</span>
          <p>Best Productivity</p>
          <strong>{bestProductivity}<small>/100</small></strong>
        </article>

        <article className="dashboard-stat">
          <span>😊</span>
          <p>Average Happiness</p>
          <strong>{averageHappiness}<small>/100</small></strong>
        </article>

        
  <article className="dashboard-stat">
    <span>📊</span>
    <p>Overall Average</p>
    <strong>
      {overallAverage}<small>/100</small>
    </strong>
  </article>

  <article className="dashboard-stat">
    <span>🏆</span>
    <p>Best Future Score</p>
    <strong>
      {bestFuture
        ? getScenarioAverage(bestFuture)
        : 0}
      <small>/100</small>
    </strong>
  </article>
      </div>


  <section className="dashboard-insights">
    <div className="insights-header">
      <span className="badge">✦ SMART INSIGHTS</span>
      <h2>Your Future at a Glance</h2>
      <p>
        Discover how your saved future scenarios compare.
      </p>
    </div>

    {scenarios.length === 0 ? (
      <p>Create a scenario to unlock your analytics.</p>
    ) : (
      <>
        <div className="best-future-card">
          <span>🏆 Your Highest-Rated Future</span>
          <h3>{bestFuture?.name || "Your Future"}</h3>
          <p>
            Average score:{" "}
            <strong>
              {bestFuture
                ? getScenarioAverage(bestFuture)
                : 0}/100
            </strong>
          </p>
        </div>

        <div className="metric-overview-grid">
          {averageByMetric.map((metric) => (
            <article
              className="metric-overview-card"
              key={metric.key}
            >
              <div className="overview-card-top">
                <span>{metric.icon}</span>
                <strong>{metric.value}/100</strong>
              </div>

              <h3>{metric.name}</h3>

              <div className="analytics-track">
                <div
                  className="analytics-fill"
                  style={{
                    width: `${metric.value}%`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>

        <p className="insights-note">
          Scores are averages of your saved scenarios,
          not predictions of real-life outcomes.
        </p>
      </>
    )}
  </section>


      <div className="saved-heading">
        <div>
          <h2>Your Scenarios</h2>
          <p>Search, organize, and explore your saved possibilities.</p>
        </div>

{scenarios.length > 0 && (
  <div className="analytics-card">
    <div className="analytics-heading">
      <span className="badge">✦ ANALYTICS</span>
      <h2>Future Comparison</h2>
      <p>Compare the results of your imagined futures.</p>
    </div>

    <div className="analytics-list">
      {scenarios.map((scenario) => {
        const metrics = [
          {
            name: "Productivity",
            value: scenario.results?.productivity ?? 0,
          },
          {
            name: "Happiness",
            value: scenario.results?.happiness ?? 0,
          },
          {
            name: "Knowledge",
            value: scenario.results?.knowledge ?? 0,
          },
          {
            name: "Health",
            value: scenario.results?.health ?? 0,
          },
        ];

        return (
          <div className="analytics-scenario" key={scenario.id}>
            <h3>{scenario.name}</h3>

            {metrics.map((metric) => {
              const value = Math.max(
                0,
                Math.min(100, Number(metric.value) || 0)
              );

              return (
                <div className="analytics-metric" key={metric.name}>
                  <div className="analytics-metric-label">
                    <span>{metric.name}</span>
                    <strong>{value}/100</strong>
                  </div>

                  <div className="analytics-track">
                    <div
                      className="analytics-fill"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  </div>
)}



<div className="dashboard-actions">
  <button
    type="button"
    className="backup-button"
   onClick={() => {
  try {
    exportScenarios();
    showToast("Backup exported successfully!");
  } catch {
    showToast("Could not export your scenarios.", "error");
  }
}}
  >
    📥 Export Backup
  </button>

  <label className="backup-button import-button">
    {importing ? "Importing..." : "📤 Import Backup"}
    <input
      type="file"
      accept=".json,application/json"
      onChange={handleImport}
      disabled={importing}
      hidden
    />
  </label>

  <Link to="/create" className="primary-button">
    + New Scenario
  </Link>
</div>

{backupMessage && (
  <p className="backup-message" role="status">
    {backupMessage}
  </p>
)}

        
      </div>

      {scenarios.length > 0 && (
        <div className="scenario-tools">
          <input
            type="search"
            className="scenario-search"
            placeholder="🔎 Search scenarios by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search scenarios"
          />

          <select
            className="scenario-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort scenarios"
          >
            <option value="newest">Newest First</option>
            <option value="productivity">Highest Productivity</option>
            <option value="name">Name: A to Z</option>
          </select>

          <select
            className="scenario-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            aria-label="Filter by productivity"
          >
            <option value="all">All Productivity Levels</option>
            <option value="high">High: 70–100</option>
            <option value="medium">Medium: 40–69</option>
            <option value="low">Low: 0–39</option>
          </select>
        </div>
      )}

      {scenarios.length === 0 ? (
        <div className="empty-state">
          <span>🌌</span>
          <h3>Your story starts here</h3>
          <p>You haven't created any scenarios yet.</p>
          <Link to="/create" className="primary-button">
            Create Your First Future ↗
          </Link>
        </div>
      ) : filteredScenarios.length === 0 ? (
        <div className="empty-state">
          <span>🔍</span>
          <h3>No scenarios found</h3>
          <p>Try another search or change your filters.</p>
          <button
            className="primary-button"
            onClick={() => {
              setSearch("");
              setFilterBy("all");
              setSortBy("newest");
            }}
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <>
          <p className="scenario-count">
            Showing {filteredScenarios.length} of {scenarios.length} scenarios
          </p>

          <div className="saved-scenarios">
            {filteredScenarios.map((scenario) => (
              <article className="saved-card" key={scenario.id}>
                <div className="saved-card-top">
                  <span className="saved-icon">✦</span>

                  <button
                    className="delete-btn"
                    onClick={() => deleteScenario(scenario.id)}
                    title="Delete scenario"
                    aria-label={`Delete ${scenario.name}`}
                  >
                    <span>🗑️</span>
                    Delete
                  </button>
                </div>

                <h3>{scenario.name}</h3>

                <p className="saved-date">
                  Created{" "}
                  {scenario.createdAt
                    ? new Date(scenario.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </p>

                <div className="saved-score">
                  <span>Productivity</span>
                  <strong>
                    {scenario.results?.productivity ?? 0}/100
                  </strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, scenario.results?.productivity ?? 0)
                      )}%`,
                    }}
                  />
                </div>

                <div className="saved-score">
                  <span>Knowledge</span>
                  <strong>
                    {scenario.results?.knowledge ?? 0}/100
                  </strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, scenario.results?.knowledge ?? 0)
                      )}%`,
                    }}
                  />
                </div>

                <Link to="/compare" className="saved-link">
                  Compare futures ↗
                </Link>
              </article>
            ))}
          </div>
        </>
      )}

  <Toast
  message={toast.message}
  type={toast.type}
  onClose={closeToast}
/>

    </section>
  );

}

export default Dashboard;
