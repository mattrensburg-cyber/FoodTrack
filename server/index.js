import "dotenv/config";
import Database from "better-sqlite3";
import express from "express";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const dbPath = path.join(dataDir, "foodtrack.sqlite");
const port = Number(process.env.API_PORT || 5174);
const githubApiBase = "https://api.github.com";
const appStateKey = "foodTrackAppState";
const githubPendingPath = "ai-imports/pending";
const githubSyncedPath = "ai-imports/synced";

function requireGithubConfig() {
  const required = ["GITHUB_TOKEN", "GITHUB_OWNER", "GITHUB_REPO", "GITHUB_BRANCH"];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing ${key} in .env`);
    }
  }
}

async function githubRequest(path, options = {}) {
  requireGithubConfig();

  const response = await fetch(`${githubApiBase}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API failed: ${response.status} ${text}`);
  }

  return response.json();
}

function decodeBase64Content(content) {
  return Buffer.from(content, "base64").toString("utf8");
}

function encodeBase64Content(content) {
  return Buffer.from(content, "utf8").toString("base64");
}

function encodeGithubContentPath(filePath) {
  return filePath.split("/").map(encodeURIComponent).join("/");
}

fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS app_state (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

function readAppStateValue(key) {
  const record = db.prepare("SELECT value FROM app_state WHERE key = ?").get(key);
  return record ? JSON.parse(record.value) : null;
}

function writeAppStateValue(key, value) {
  const updatedAt = new Date().toISOString();
  db.prepare(`
    INSERT INTO app_state (key, value, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `).run(key, JSON.stringify(value), updatedAt);
  return updatedAt;
}

const app = express();
app.use(express.json({ limit: "25mb" }));

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, database: dbPath });
});

app.get("/api/app-state/:key", (request, response) => {
  const record = db.prepare("SELECT value, updated_at FROM app_state WHERE key = ?").get(request.params.key);
  if (!record) {
    response.status(404).json({ value: null });
    return;
  }
  response.json({ value: JSON.parse(record.value), updatedAt: record.updated_at });
});

app.put("/api/app-state/:key", (request, response) => {
  const updatedAt = writeAppStateValue(request.params.key, request.body?.value ?? null);
  response.json({ ok: true, updatedAt });
});

app.post("/api/github-imports/sync", async (_request, response) => {
  try {
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH;
    const pendingPath = encodeGithubContentPath(githubPendingPath);
    const pendingFiles = await githubRequest(`/repos/${owner}/${repo}/contents/${pendingPath}?ref=${encodeURIComponent(branch)}`);
    const jsonFiles = (Array.isArray(pendingFiles) ? pendingFiles : [])
      .filter((file) => file.type === "file")
      .filter((file) => file.name.toLowerCase().endsWith(".json"));

    const appState = readAppStateValue(appStateKey) || {};
    const aiImports = Array.isArray(appState.aiImports) ? [...appState.aiImports] : [];
    const syncedFiles = [];

    for (const file of jsonFiles) {
      const filePath = encodeGithubContentPath(file.path);
      const fileData = await githubRequest(`/repos/${owner}/${repo}/contents/${filePath}?ref=${encodeURIComponent(branch)}`);
      const rawContent = decodeBase64Content(fileData.content || "");
      const importedAt = new Date().toISOString();
      let payload;

      try {
        payload = JSON.parse(rawContent);
      } catch {
        payload = { raw: rawContent };
      }

      aiImports.push({
        id: `${file.name}-${importedAt}`,
        filename: file.name,
        sourcePath: file.path,
        importedAt,
        payload,
      });

      const safeTimestamp = importedAt.replace(/[:.]/g, "-");
      const syncedFilePath = `${githubSyncedPath}/${safeTimestamp}-${file.name}`;
      await githubRequest(`/repos/${owner}/${repo}/contents/${encodeGithubContentPath(syncedFilePath)}`, {
        method: "PUT",
        body: JSON.stringify({
          message: `Sync AI import ${file.name}`,
          content: encodeBase64Content(rawContent),
          branch,
        }),
      });

      await githubRequest(`/repos/${owner}/${repo}/contents/${filePath}`, {
        method: "DELETE",
        body: JSON.stringify({
          message: `Move AI import ${file.name} to synced`,
          sha: fileData.sha,
          branch,
        }),
      });

      syncedFiles.push({
        filename: file.name,
        from: file.path,
        to: syncedFilePath,
      });
    }

    const updatedAt = writeAppStateValue(appStateKey, {
      ...appState,
      aiImports,
      savedAt: new Date().toISOString(),
    });

    response.json({
      ok: true,
      imported: syncedFiles.length,
      files: syncedFiles,
      updatedAt,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "GitHub import sync failed",
    });
  }
});

app.post("/api/github/sync-nutritrack", async (_request, response) => {
  try {
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH;

    const pendingFiles = await githubRequest(
      `/repos/${owner}/${repo}/contents/ai-imports/pending?ref=${encodeURIComponent(branch)}`
    );

    const jsonFiles = (Array.isArray(pendingFiles) ? pendingFiles : []).filter((file) =>
      file.type === "file" && file.name.endsWith(".json")
    );

    if (!jsonFiles.length) {
      return response.json({ ok: true, imported: 0, message: "No pending imports." });
    }

    const current = db
      .prepare("SELECT value FROM app_state WHERE key = ?")
      .get("foodTrackAppState");

    const appState = current ? JSON.parse(current.value) : {};
    const existingEntries = Array.isArray(appState.nutriEntries)
      ? appState.nutriEntries
      : [];

    const importedEntries = [];

    for (const file of jsonFiles) {
      const fileData = await githubRequest(
        `/repos/${owner}/${repo}/contents/${encodeGithubContentPath(file.path)}?ref=${encodeURIComponent(branch)}`
      );

      const rawJson = decodeBase64Content(fileData.content);
      const payload = JSON.parse(rawJson);

      const items = Array.isArray(payload.items) ? payload.items : [];

      const newEntries = items.map((item) => ({
        id: crypto.randomUUID(),
        day: payload.day,
        meal: payload.meal || "",
        recipeName: payload.recipeName || "",
        tag: payload.tag || "Recipe",
        ingredient: item.ingredient || item.name,
        grams: Number(item.grams ?? item.amount),
        unit: item.unit || "g",
        kcal: Number(item.kcal || 0),
        fibrePer100g: Number(item.fibrePer100g || 0),
        micronutrients: item.micronutrients || {},
        notes: payload.notes || {},
      }));

      importedEntries.push(...newEntries);

      const syncedPath = file.path.replace(
        "ai-imports/pending/",
        "ai-imports/synced/"
      );

      await githubRequest(`/repos/${owner}/${repo}/contents/${encodeGithubContentPath(syncedPath)}`, {
        method: "PUT",
        body: JSON.stringify({
          message: `Sync NutriTrack import ${file.name}`,
          content: encodeBase64Content(rawJson),
          branch,
        }),
      });

      await githubRequest(`/repos/${owner}/${repo}/contents/${encodeGithubContentPath(file.path)}`, {
        method: "DELETE",
        body: JSON.stringify({
          message: `Remove synced NutriTrack import ${file.name}`,
          sha: file.sha,
          branch,
        }),
      });
    }

    const nextState = {
      ...appState,
      nutriEntries: [...existingEntries, ...importedEntries],
      savedAt: new Date().toISOString(),
    };

    db.prepare(`
      INSERT INTO app_state (key, value, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = excluded.updated_at
    `).run(
      "foodTrackAppState",
      JSON.stringify(nextState),
      new Date().toISOString()
    );

    response.json({
      ok: true,
      imported: importedEntries.length,
      files: jsonFiles.length,
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Sync failed",
    });
  }
});

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`FoodTrack API listening on http://127.0.0.1:${port}`);
  console.log(`SQLite database: ${dbPath}`);
});

function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
