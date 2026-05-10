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

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dateWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizePlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function normalizeImportDay(value) {
  const text = String(value || "").trim();
  if (weekDays.includes(text)) return text;
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const date = new Date(`${text}T00:00:00Z`);
    if (!Number.isNaN(date.getTime())) return dateWeekDays[date.getUTCDay()];
  }
  return "";
}

function normalizeStringList(value) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  const text = String(value || "").trim();
  return text ? [text] : [];
}

function getProductMetadata(item = {}) {
  return {
    barcode: String(item.barcode || item.gtin || item.ean || item.upc || "").trim(),
    imageUrl: String(item.imageUrl || item.image_url || "").trim(),
    imageThumbUrl: String(item.imageThumbUrl || item.image_thumb_url || "").trim(),
    ingredientsImageUrl: String(item.ingredientsImageUrl || item.ingredients_image_url || "").trim(),
    nutritionImageUrl: String(item.nutritionImageUrl || item.nutrition_image_url || "").trim(),
    brand: String(item.brand || item.brandName || "").trim(),
    brandName: String(item.brandName || item.brand || "").trim(),
    productName: String(item.productName || "").trim(),
    nutritionSource: String(item.nutritionSource || "").trim(),
    processingLevel: String(item.processingLevel || item.processing_level || "").trim(),
    ingredientsList: normalizeStringList(item.ingredientsList || item.ingredients_list),
    brandNutritionPer100g: normalizePlainObject(item.brandNutritionPer100g),
    brandNutritionPer100ml: normalizePlainObject(item.brandNutritionPer100ml),
    brandNutritionPer20g: normalizePlainObject(item.brandNutritionPer20g),
    brandNutritionPerServing: normalizePlainObject(item.brandNutritionPerServing),
  };
}

function normalizeAminoAcidList(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      if (typeof item === "string") {
        const name = item.trim();
        return name && name !== "[object Object]" ? { name, function: "" } : null;
      }
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const name = String(item.name || item.aminoAcid || "").trim();
        if (!name) return null;
        return { name, function: String(item.function || item.benefit || item.role || "").trim() };
      }
      return null;
    })
    .filter(Boolean);
}

function normalizeNutriEntry(item, context = {}) {
  const ingredient = String(item?.ingredient || item?.name || "").trim();
  if (!ingredient) return null;
  const day = normalizeImportDay(context.day) || normalizeImportDay(item.day);
  if (!day) return null;
  const grams = safeNumber(item.grams ?? item.amount);
  const kcal = safeNumber(item.kcal);
  if (grams <= 0 || kcal < 0) return null;

  return {
    id: crypto.randomUUID(),
    day,
    meal: context.meal || item.meal || "",
    recipeName: context.recipeName || item.recipeName || "",
    tag: context.tag || item.tag || "Recipe",
    notes: context.notes || item.notes || {},
    dailyNotes: context.dailyNotes || item.dailyNotes || {},
    ingredient,
    grams,
    unit: item.unit || "g",
    kcal,
    ...getProductMetadata(item),
    micronutrients: normalizePlainObject(item.micronutrients),
    protein: Number.isFinite(Number(item.protein)) ? safeNumber(item.protein) : undefined,
    carbs: Number.isFinite(Number(item.carbs ?? item.carbohydrates ?? item.carbohydrate)) ? safeNumber(item.carbs ?? item.carbohydrates ?? item.carbohydrate) : undefined,
    fat: Number.isFinite(Number(item.fat)) ? safeNumber(item.fat) : undefined,
    sugar: Number.isFinite(Number(item.sugar ?? item.sugars)) ? safeNumber(item.sugar ?? item.sugars) : undefined,
    fibreTypes: Array.isArray(item.fibreTypes) ? item.fibreTypes.map(String).filter(Boolean) : [],
    healthHighlights: Array.isArray(item.healthHighlights) ? item.healthHighlights.map(String).filter(Boolean) : [],
    aminoAcidProfile: item.aminoAcidProfile && typeof item.aminoAcidProfile === "object" && !Array.isArray(item.aminoAcidProfile)
      ? {
          proteinQuality: item.aminoAcidProfile.proteinQuality || "",
          keyAminoAcids: normalizeAminoAcidList(item.aminoAcidProfile.keyAminoAcids),
        }
      : null,
    fibrePer100g: Number.isFinite(Number(item.fibrePer100g)) ? safeNumber(item.fibrePer100g) : undefined,
    fibreG: Number.isFinite(Number(item.fibreG ?? item.fibre)) ? safeNumber(item.fibreG ?? item.fibre) : undefined,
  };
}

function pickNumericValue(source = {}, keys = []) {
  for (const key of keys) {
    if (Number.isFinite(Number(source[key]))) return safeNumber(source[key]);
  }
  return undefined;
}

function normalizeMealSummaryEntry(entry, payload = {}) {
  const day = normalizeImportDay(payload.day) || normalizeImportDay(entry.day);
  if (!day) return null;

  const totals = normalizePlainObject(entry.totals || entry.dailyTotals);
  const kcal = pickNumericValue(totals, ["kcal", "caloriesKcal", "calories"]) ?? pickNumericValue(entry, ["kcal", "caloriesKcal", "calories"]);
  if (!Number.isFinite(Number(kcal))) return null;

  const recipeName = String(entry.recipeName || entry.name || entry.meal || "Meal summary").trim();
  const fibre = pickNumericValue(totals, ["fibre", "fibre_g", "fiber", "fiber_g"]) ?? pickNumericValue(entry, ["fibre", "fibreG", "fibre_g", "fiber", "fiberG", "fiber_g"]);
  const protein = pickNumericValue(totals, ["protein", "protein_g", "proteinG"]) ?? pickNumericValue(entry, ["protein", "protein_g", "proteinG"]);

  return {
    id: crypto.randomUUID(),
    day,
    meal: entry.meal || "",
    recipeName,
    tag: entry.tag || "Recipe",
    notes: entry.notes || {},
    dailyNotes: payload.dailyNotes || {},
    ingredient: recipeName,
    grams: 1,
    unit: "meal",
    kcal,
    protein,
    fibreG: fibre,
    fibrePer100g: fibre,
    healthHighlights: Array.isArray(entry.healthHighlights) ? entry.healthHighlights.map(String).filter(Boolean) : [],
  };
}

function normalizeGithubNutriPayload(payload) {
  if (payload?.type === "nutritrack_import" && Array.isArray(payload.items)) {
    return payload.items
      .map((item) => normalizeNutriEntry(item, {
        day: payload.day,
        meal: payload.meal || "",
        recipeName: payload.recipeName || "",
        tag: payload.tag || "Recipe",
        notes: payload.notes || {},
      }))
      .filter(Boolean);
  }

  if (payload?.meal && Array.isArray(payload.ingredients)) {
    return payload.ingredients
      .map((item) => normalizeNutriEntry(item, {
        day: payload.day,
        meal: payload.meal || "",
        recipeName: payload.recipeName || "",
        tag: payload.tag || "Recipe",
        notes: payload.notes || {},
      }))
      .filter(Boolean);
  }

  if (normalizeImportDay(payload?.day) && Array.isArray(payload.entries)) {
    return payload.entries.flatMap((entry) => {
      if (!Array.isArray(entry.ingredients)) {
        const summaryEntry = normalizeMealSummaryEntry(entry, payload);
        return summaryEntry ? [summaryEntry] : [];
      }
      return entry.ingredients
        .map((item) => normalizeNutriEntry(item, {
          day: payload.day,
          meal: entry.meal || "",
          recipeName: entry.recipeName || "",
          tag: entry.tag || "Recipe",
          notes: entry.notes || {},
          dailyNotes: payload.dailyNotes || {},
        }))
        .filter(Boolean);
    });
  }

  return [];
}

function getNutriEntryImportKey(entry) {
  return [
    normalizeImportDay(entry?.day),
    String(entry?.meal || "").trim().toLowerCase(),
    String(entry?.recipeName || "").trim().toLowerCase(),
    String(entry?.ingredient || "").trim().toLowerCase(),
    String(entry?.unit || "g").trim().toLowerCase(),
    safeNumber(entry?.grams),
    safeNumber(entry?.kcal),
  ].join("|");
}

function mergeNutriEntries(existingEntries, importedEntries) {
  const byKey = new Map();

  (Array.isArray(existingEntries) ? existingEntries : []).forEach((entry) => {
    byKey.set(getNutriEntryImportKey(entry), entry);
  });

  importedEntries.forEach((entry) => {
    byKey.set(getNutriEntryImportKey(entry), entry);
  });

  const dayIndex = new Map(weekDays.map((day, index) => [day, index]));
  return [...byKey.values()].sort((a, b) => {
    const dayDelta = (dayIndex.get(normalizeImportDay(a.day)) ?? 99) - (dayIndex.get(normalizeImportDay(b.day)) ?? 99);
    if (dayDelta) return dayDelta;
    return String(a.meal || "").localeCompare(String(b.meal || "")) || String(a.recipeName || "").localeCompare(String(b.recipeName || ""));
  });
}

function normalizeNutriReferenceFromEntry(entry) {
  const brandPer100 = entry.brandNutritionPer100g || entry.brandNutritionPer100ml || {};
  const amount = safeNumber(entry.grams);
  const unit = entry.unit || "g";
  const isPer100Unit = (unit === "g" || unit === "ml") && amount > 0;
  const per100Multiplier = isPer100Unit ? 100 / amount : null;

  return {
    id: crypto.randomUUID(),
    ingredient: entry.ingredient,
    ...getProductMetadata(entry),
    serving: isPer100Unit ? `estimated per 100${unit}` : `per ${amount || 1}${unit}`,
    nutrition: {
      caloriesKcal: Number.isFinite(Number(brandPer100.kcal)) ? safeNumber(brandPer100.kcal) : per100Multiplier ? safeNumber(entry.kcal) * per100Multiplier : safeNumber(entry.kcal),
      proteinG: Number.isFinite(Number(brandPer100.protein_g)) ? safeNumber(brandPer100.protein_g) : per100Multiplier && Number.isFinite(Number(entry.protein)) ? safeNumber(entry.protein) * per100Multiplier : entry.protein,
      fibreG: Number.isFinite(Number(brandPer100.fibre_g)) ? safeNumber(brandPer100.fibre_g) : entry.fibrePer100g,
      carbohydratesG: Number.isFinite(Number(brandPer100.carbohydrate_g)) ? safeNumber(brandPer100.carbohydrate_g) : per100Multiplier && Number.isFinite(Number(entry.carbs)) ? safeNumber(entry.carbs) * per100Multiplier : entry.carbs,
      fatG: Number.isFinite(Number(brandPer100.fat_g)) ? safeNumber(brandPer100.fat_g) : per100Multiplier && Number.isFinite(Number(entry.fat)) ? safeNumber(entry.fat) * per100Multiplier : entry.fat,
      sugarG: Number.isFinite(Number(brandPer100.sugars_g)) ? safeNumber(brandPer100.sugars_g) : per100Multiplier && Number.isFinite(Number(entry.sugar)) ? safeNumber(entry.sugar) * per100Multiplier : entry.sugar,
    },
    keyVitaminsMinerals: Object.keys(entry.micronutrients || {}),
    fibreTypes: Array.isArray(entry.fibreTypes) ? entry.fibreTypes : [],
    healthHighlights: Array.isArray(entry.healthHighlights) ? entry.healthHighlights : [],
    aminoAcidProfile: entry.aminoAcidProfile || null,
  };
}

function mergeNutriReferences(existingReferences, importedEntries) {
  const references = Array.isArray(existingReferences) ? [...existingReferences] : [];
  const nextByName = new Map(references.map((reference) => [String(reference?.ingredient || "").toLowerCase(), reference]));

  importedEntries.forEach((entry) => {
    if (!entry?.ingredient) return;
    nextByName.set(entry.ingredient.toLowerCase(), normalizeNutriReferenceFromEntry(entry));
  });

  return [...nextByName.values()].sort((a, b) => String(a.ingredient || "").localeCompare(String(b.ingredient || "")));
}

function normalizeWeightEntry(item = {}) {
  const date = String(item.date || item.recordedDate || "").trim();
  const weight = safeNumber(item.weightKg ?? item.weight_kg ?? item.weight);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || weight <= 0 || weight >= 400) return null;
  return {
    id: item.id || crypto.randomUUID(),
    date,
    weight,
  };
}

function normalizeGithubWeightPayload(payload) {
  if (payload?.type === "foodtrack_weight_import") {
    const entries = Array.isArray(payload.weights) ? payload.weights : [payload];
    return entries.map(normalizeWeightEntry).filter(Boolean);
  }

  if (Array.isArray(payload?.weights)) {
    return payload.weights.map(normalizeWeightEntry).filter(Boolean);
  }

  const single = normalizeWeightEntry(payload);
  return single ? [single] : [];
}

function upsertWeightEntries(existingWeights, importedWeights) {
  const byDate = new Map(
    (Array.isArray(existingWeights) ? existingWeights : [])
      .filter((entry) => entry?.date && Number.isFinite(Number(entry.weight)))
      .map((entry) => [entry.date, { ...entry, weight: safeNumber(entry.weight) }])
  );

  importedWeights.forEach((entry) => {
    const existing = byDate.get(entry.date);
    byDate.set(entry.date, {
      id: existing?.id || entry.id || crypto.randomUUID(),
      date: entry.date,
      weight: safeNumber(entry.weight),
    });
  });

  return [...byDate.values()].sort((a, b) => new Date(a.date) - new Date(b.date));
}

function readPendingPayload(rawJson, sourceFile = "") {
  const payload = JSON.parse(rawJson);
  const entries = normalizeGithubNutriPayload(payload).map((entry) => ({
    ...entry,
    sourceFile: sourceFile || entry.sourceFile || "",
  }));
  return {
    entries,
    weights: normalizeGithubWeightPayload(payload),
  };
}

function getLocalSyncedPath(filename) {
  const syncedDir = path.join(rootDir, githubSyncedPath);
  fs.mkdirSync(syncedDir, { recursive: true });
  const safeName = path.basename(filename);
  let syncedPath = path.join(syncedDir, safeName);
  if (!fs.existsSync(syncedPath)) return syncedPath;
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  syncedPath = path.join(syncedDir, `${stamp}-${safeName}`);
  return syncedPath;
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
    const localPendingDir = path.join(rootDir, githubPendingPath);
    const localSyncedDir = path.join(rootDir, githubSyncedPath);
    fs.mkdirSync(localPendingDir, { recursive: true });
    fs.mkdirSync(localSyncedDir, { recursive: true });
    const localJsonFiles = fs.readdirSync(localPendingDir, { withFileTypes: true })
      .filter((file) => file.isFile() && file.name.toLowerCase().endsWith(".json"));
    const localSyncedJsonFiles = fs.readdirSync(localSyncedDir, { withFileTypes: true })
      .filter((file) => file.isFile() && file.name.toLowerCase().endsWith(".json"));

    const current = db
      .prepare("SELECT value FROM app_state WHERE key = ?")
      .get("foodTrackAppState");

    const appState = current ? JSON.parse(current.value) : {};
    const existingEntries = Array.isArray(appState.nutriEntries)
      ? appState.nutriEntries
      : [];
    const existingReferences = Array.isArray(appState.nutriReferences)
      ? appState.nutriReferences
      : [];
    const existingWeights = Array.isArray(appState.weights)
      ? appState.weights
      : [];

    const importedEntries = [];
    const importedWeights = [];
    const syncedFiles = [];

    const pendingFiles = await githubRequest(
      `/repos/${owner}/${repo}/contents/ai-imports/pending?ref=${encodeURIComponent(branch)}`
    );

    const jsonFiles = (Array.isArray(pendingFiles) ? pendingFiles : []).filter((file) =>
      file.type === "file" && file.name.endsWith(".json")
    );

    if (!jsonFiles.length && !localJsonFiles.length && !localSyncedJsonFiles.length) {
      return response.json({ ok: true, imported: 0, weightsImported: 0, files: 0, message: "No pending imports." });
    }

    for (const file of jsonFiles) {
      const fileData = await githubRequest(
        `/repos/${owner}/${repo}/contents/${encodeGithubContentPath(file.path)}?ref=${encodeURIComponent(branch)}`
      );

      const rawJson = decodeBase64Content(fileData.content);
      const parsed = readPendingPayload(rawJson, file.name);

      importedEntries.push(...parsed.entries);
      importedWeights.push(...parsed.weights);

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

      syncedFiles.push({
        filename: file.name,
        source: "github",
        to: syncedPath,
      });
    }

    for (const file of localJsonFiles) {
      const localPath = path.join(localPendingDir, file.name);
      const rawJson = fs.readFileSync(localPath, "utf8");
      const parsed = readPendingPayload(rawJson, file.name);
      importedEntries.push(...parsed.entries);
      importedWeights.push(...parsed.weights);

      const syncedPath = getLocalSyncedPath(file.name);
      fs.renameSync(localPath, syncedPath);
      syncedFiles.push({
        filename: file.name,
        source: "local",
        to: path.relative(rootDir, syncedPath).replace(/\\/g, "/"),
      });
    }

    for (const file of localSyncedJsonFiles) {
      const localPath = path.join(localSyncedDir, file.name);
      const rawJson = fs.readFileSync(localPath, "utf8");
      const parsed = readPendingPayload(rawJson, file.name);
      importedEntries.push(...parsed.entries);
      importedWeights.push(...parsed.weights);
      if (parsed.entries.length || parsed.weights.length) {
        syncedFiles.push({
          filename: file.name,
          source: "local-synced-backfill",
          to: path.relative(rootDir, localPath).replace(/\\/g, "/"),
        });
      }
    }

    const mergedNutriEntries = mergeNutriEntries(existingEntries, importedEntries);
    const mergedWeights = upsertWeightEntries(existingWeights, importedWeights);

    const nextState = {
      ...appState,
      nutriEntries: mergedNutriEntries,
      nutriReferences: mergeNutriReferences(existingReferences, importedEntries),
      weights: mergedWeights,
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
      imported: Math.max(0, mergedNutriEntries.length - existingEntries.length),
      weightsImported: Math.max(0, mergedWeights.length - existingWeights.length),
      files: syncedFiles.length,
      syncedFiles,
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
