
const STORAGE_KEY = "parallelMeScenarios";

export function exportScenarios() {
  const scenarios = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  const blob = new Blob(
    [JSON.stringify(scenarios, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "parallel-me-backup.json";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export async function importScenarios(file) {
  if (!file) {
    throw new Error("Please choose a backup file.");
  }

  if (
    file.type !== "application/json" &&
    !file.name.toLowerCase().endsWith(".json")
  ) {
    throw new Error("Please select a JSON file.");
  }

  const text = await file.text();
  const imported = JSON.parse(text);

  if (
    !Array.isArray(imported) ||
    !imported.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.name === "string" &&
        item.name.trim() &&
        item.results &&
        typeof item.results === "object"
    )
  ) {
    throw new Error("This file is not a valid Parallel Me backup.");
  }

  const current = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  const existing = Array.isArray(current) ? current : [];
  const merged = [...existing];
  let added = 0;

  for (const item of imported) {
    const duplicate = merged.some(
      (saved) =>
        saved.id === item.id ||
        (
          saved.name === item.name &&
          saved.createdAt === item.createdAt
        )
    );

    if (!duplicate) {
      merged.push({
        ...item,
        id: Date.now() + added,
        name: item.name.trim(),
      });
      added++;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

  return { added, total: merged.length };
}
