import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
Orbit,
Zap,
Heart,
ChartNoAxesCombined,
Trophy,
Pencil,
Sparkles,
ArrowRight,
Plus,
UserRound,
Save,
X,
} from "lucide-react";
import "./Profile.css";

const metrics = [
"knowledge",
"energy",
"happiness",
"health",
"productivity",
"career",
];

function getScore(value) {
const score = Number(value) || 0;
return Math.max(0, Math.min(100, score));
}

function getScenarioAverage(scenario) {
const total = metrics.reduce(
    (sum, metric) => sum + getScore(scenario.results?.[metric]),
    0
);

return Math.round(total / metrics.length);
}

export default function Profile() {
const [name, setName] = useState("");
const [savedName, setSavedName] = useState("");
const [editing, setEditing] = useState(false);
const [scenarios, setScenarios] = useState([]);
const [message, setMessage] = useState("");

useEffect(() => {
    try {
    const profile = JSON.parse(
        localStorage.getItem("parallelMeProfile") || "{}"
    );

    const savedScenarios = JSON.parse(
        localStorage.getItem("parallelMeScenarios") || "[]"
    );

    const profileName =
        typeof profile.name === "string" ? profile.name : "";

    setName(profileName);
    setSavedName(profileName);
    setScenarios(
        Array.isArray(savedScenarios) ? savedScenarios : []
    );
    } catch {
    setMessage("Some saved data could not be loaded.");
    setScenarios([]);
    }
}, []);

const saveProfile = (event) => {
    event.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) {
    setMessage("Please enter your name.");
    return;
    }

    try {
    localStorage.setItem(
        "parallelMeProfile",
        JSON.stringify({ name: cleanName })
    );

    setName(cleanName);
    setSavedName(cleanName);
    setEditing(false);
    setMessage("Profile updated successfully!");
    } catch {
    setMessage("Unable to save your profile. Please try again.");
    }
};

const average = (metric) => {
    if (scenarios.length === 0) return 0;

    const total = scenarios.reduce(
    (sum, scenario) =>
        sum + getScore(scenario.results?.[metric]),
    0
    );

    return Math.round(total / scenarios.length);
};

const bestProductivity = scenarios.length
    ? Math.max(
        ...scenarios.map((scenario) =>
        getScore(scenario.results?.productivity)
        )
    )
    : 0;

const overallAverage = scenarios.length
    ? Math.round(
        scenarios.reduce(
        (sum, scenario) => sum + getScenarioAverage(scenario),
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

const clearProfile = () => {
    const confirmed = window.confirm(
    "Remove your saved profile name? Your saved futures will not be deleted."
    );

    if (!confirmed) return;

    try {
    localStorage.removeItem("parallelMeProfile");
    setName("");
    setSavedName("");
    setEditing(false);
    setMessage("Profile name removed. Your saved futures are safe.");
    } catch {
    setMessage("Unable to remove your profile. Please try again.");
    }
};

return (
    <main className="profile-page">
    <section className="profile-hero">
        <div className="profile-avatar">
        {savedName ? (
            savedName.charAt(0).toUpperCase()
        ) : (
            <UserRound aria-hidden="true" />
        )}
        </div>

        <span className="profile-tag">
        <Sparkles className="ui-icon" aria-hidden="true" />
        YOUR PERSONAL SPACE
        </span>

        <h1>{savedName || "Your Profile"}</h1>

        <p>
        Every version of you starts with a choice.
        Keep exploring your possibilities.
        </p>

        <div className="profile-actions">
        <button
            type="button"
            className="profile-edit-btn"
            onClick={() => {
            setName(savedName);
            setEditing(!editing);
            setMessage("");
            }}
        >
            {editing ? (
            <>
                <X className="ui-icon" aria-hidden="true" />
                Cancel Editing
            </>
            ) : (
            <>
                <Pencil className="ui-icon" aria-hidden="true" />
                Edit Profile
            </>
            )}
        </button>

        {savedName && (
            <button
            type="button"
            className="profile-edit-btn"
            onClick={clearProfile}
            >
            Clear Profile Name
            </button>
        )}
        </div>

        {editing && (
        <form className="profile-form" onSubmit={saveProfile}>
            <label htmlFor="profile-name">Your name</label>

            <input
            id="profile-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            maxLength={50}
            required
            />

            <button type="submit" className="profile-save-btn">
            <Save className="ui-icon" aria-hidden="true" />
            Save Changes
            </button>
        </form>
        )}

        {message && (
        <p className="profile-message" role="status">
            {message}
        </p>
        )}
    </section>

    <section className="profile-stats">
        <article className="profile-stat">
        <span className="stat-icon">
            <Orbit aria-hidden="true" />
        </span>
        <p>Saved Futures</p>
        <h2>{scenarios.length}</h2>
        </article>

        <article className="profile-stat">
        <span className="stat-icon">
            <Zap aria-hidden="true" />
        </span>
        <p>Best Productivity</p>
        <h2>{bestProductivity}%</h2>
        </article>

        <article className="profile-stat">
        <span className="stat-icon">
            <Heart aria-hidden="true" />
        </span>
        <p>Average Happiness</p>
        <h2>{average("happiness")}%</h2>
        </article>

        <article className="profile-stat">
        <span className="stat-icon">
            <ChartNoAxesCombined aria-hidden="true" />
        </span>
        <p>Overall Average</p>
        <h2>{overallAverage}%</h2>
        </article>
    </section>

    {bestFuture && (
        <section className="profile-best-future">
        <span className="profile-highlight-label">
            <Trophy className="ui-icon" aria-hidden="true" />
            YOUR TOP-RATED FUTURE
        </span>

        <h2>{bestFuture.name || "Untitled Future"}</h2>

        <p>
            Average score:{" "}
            <strong>{getScenarioAverage(bestFuture)}/100</strong>
        </p>

        <Link to="/compare" className="profile-create-link">
            Compare Futures
            <ArrowRight className="ui-icon" aria-hidden="true" />
        </Link>
        </section>
    )}

    <section className="profile-scenarios">
        <div className="profile-section-heading">
        <div>
            <span className="profile-tag">
            <Sparkles className="ui-icon" aria-hidden="true" />
            YOUR JOURNEY
            </span>

            <h2>Your Saved Futures</h2>
        </div>

        <Link to="/create" className="profile-create-link">
            <Plus className="ui-icon" aria-hidden="true" />
            New Future
        </Link>
        </div>

        {scenarios.length === 0 ? (
        <div className="profile-empty">
            <span className="profile-empty-icon">
            <Sparkles aria-hidden="true" />
            </span>

            <h3>Your journey starts here</h3>

            <p>Create your first future and it will appear here.</p>

            <Link to="/create" className="profile-create-link">
            <Plus className="ui-icon" aria-hidden="true" />
            Create Your First Future
            </Link>
        </div>
        ) : (
        <div className="profile-scenario-grid">
            {scenarios.map((scenario, index) => (
            <article
                className="profile-scenario"
                key={scenario.id ?? `${scenario.name}-${index}`}
            >
                <span className="scenario-symbol">
                <Sparkles aria-hidden="true" />
                </span>

                <h3>{scenario.name || "Untitled Future"}</h3>

                <p>
                Productivity:{" "}
                <strong>
                    {getScore(scenario.results?.productivity)}%
                </strong>
                </p>

                <p>
                Happiness:{" "}
                <strong>
                    {getScore(scenario.results?.happiness)}%
                </strong>
                </p>

                <p>
                Overall Score:{" "}
                <strong>{getScenarioAverage(scenario)}/100</strong>
                </p>

                <div
                className="profile-progress-track"
                role="progressbar"
                aria-label={`${scenario.name || "Future"} overall score`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={getScenarioAverage(scenario)}
                >
                <div
                    className="profile-progress-fill"
                    style={{
                    width: `${getScenarioAverage(scenario)}%`,
                    }}
                />
                </div>

                <small>
                {scenario.createdAt &&
                !Number.isNaN(new Date(scenario.createdAt).getTime())
                    ? new Date(scenario.createdAt).toLocaleDateString()
                    : "Saved future"}
                </small>

                <div className="profile-scenario-actions">
                <Link to="/compare" className="profile-create-link">
                    Compare
                    <ArrowRight className="ui-icon" aria-hidden="true" />
                </Link>
                </div>
            </article>
            ))}
        </div>
        )}
    </section>

    <section className="profile-settings">
        <span className="profile-tag">
        <Sparkles className="ui-icon" aria-hidden="true" />
        PREFERENCES
        </span>

        <h2>Profile & Settings</h2>

        <p>
        Your profile name is saved in this browser. Your futures are stored
        separately, so clearing your profile name does not delete them.
        </p>

        <Link to="/dashboard" className="profile-create-link">
        Go to Dashboard
        <ArrowRight className="ui-icon" aria-hidden="true" />
        </Link>
    </section>
    </main>
);
}