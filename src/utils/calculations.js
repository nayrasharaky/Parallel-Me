
export function calculateScenario(data) {
  const { study, sleep, exercise, social, work } = data;

  const clamp = (value) =>
    Math.max(0, Math.min(100, Math.round(value)));

  const knowledge = clamp(study * 12 + work * 3);

  const energy = clamp(
    50 + (sleep - 7) * 12 + exercise * 5 - study * 3 - work * 2
  );

  const happiness = clamp(
    50 + social * 9 + sleep * 3 + exercise * 3 - work * 2
  );

  const health = clamp(
    45 + sleep * 4 + exercise * 12 - work * 2
  );

  const productivity = clamp(
    40 + study * 8 + work * 5 + sleep * 2 - social * 2
  );

  const career = clamp(study * 8 + work * 7 + knowledge * 0.2);

  return {
    knowledge,
    energy,
    happiness,
    health,
    productivity,
    career,
  };
}

export function compareScenarios(first, second) {
  const metrics = [
    "knowledge",
    "energy",
    "happiness",
    "health",
    "productivity",
    "career",
  ];

  return metrics.map((metric) => ({
    metric,
    first: first.results[metric],
    second: second.results[metric],
    difference: first.results[metric] - second.results[metric],
  }));
}
