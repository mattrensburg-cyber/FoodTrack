import Database from "better-sqlite3";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const dbPath = path.join(dataDir, "foodtrack.sqlite");
const port = Number(process.env.API_PORT || 5174);

fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS app_state (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

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
  const value = JSON.stringify(request.body?.value ?? null);
  const updatedAt = new Date().toISOString();
  db.prepare(`
    INSERT INTO app_state (key, value, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `).run(request.params.key, value, updatedAt);
  response.json({ ok: true, updatedAt });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`FoodTrack API listening on http://127.0.0.1:${port}`);
  console.log(`SQLite database: ${dbPath}`);
});
