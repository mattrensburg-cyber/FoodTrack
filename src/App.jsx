import { useEffect, useMemo, useRef, useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function SvgIcon({ children, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function BeefIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M7 8c1.5-2 4-3 6.5-2.5C17 6 19 9 18.5 12.5 18 16 15 18 11.5 18c-3 0-5.5-2-6-5C5 11 5.5 9.5 7 8z" />
      <circle cx="9" cy="9" r="1" />
    </SvgIcon>
  );
}

function AppleIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 7c-1.5-2-1-4 1-5" />
      <path d="M17.5 12.5c0 4-2.5 7.5-5.5 7.5s-5.5-3.5-5.5-7.5C6.5 9.5 8.5 8 10.5 8c1.2 0 2 .5 2.5.8.5-.3 1.3-.8 2.5-.8 2 0 4 1.5 4 4.5z" />
    </SvgIcon>
  );
}

function DropletsIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C9 6 6 9 6 13a6 6 0 0 0 12 0c0-4-3-7-6-11z" />
    </SvgIcon>
  );
}

function FlameIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3c2 2 4 4.5 4 8a4 4 0 1 1-8 0c0-2.5 1.5-4.5 4-8z" />
      <path d="M12 11c1 1 2 2.2 2 3.5a2 2 0 1 1-4 0c0-1.3.8-2.5 2-3.5z" />
    </SvgIcon>
  );
}

function PlusIcon(props) {
  return (
    <SvgIcon {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </SvgIcon>
  );
}

function ScaleIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M5 19h14" />
      <path d="M6 19V9a6 6 0 0 1 12 0v10" />
      <path d="M12 9l2.5 3.5" />
    </SvgIcon>
  );
}

function SparklesIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      <path d="M5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14z" />
    </SvgIcon>
  );
}

function TargetIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </SvgIcon>
  );
}

function UtensilsIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4 3v8" />
      <path d="M6 3v8" />
      <path d="M5 11v10" />
      <path d="M12 3v7" />
      <path d="M12 10c0-3 2-5 5-7v18" />
    </SvgIcon>
  );
}

function HeartPulseIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19.5 12.5C17 17 12 20 12 20s-7-4.2-8.8-9.1C2.2 8.1 3.8 5 6.8 5c1.8 0 3.1 1 4 2.2C11.7 6 13 5 14.8 5c2.1 0 3.5 1.4 4 3" />
      <path d="M3 13h4l1.5-3 2.5 6 2-4h2" />
      <path d="M17 13h4" />
    </SvgIcon>
  );
}

const weightData = [
  { id: "entry-1", date: "2026-01-24", weight: 110.9 },
  { id: "entry-2", date: "2026-02-03", weight: 107.7 },
  { id: "entry-3", date: "2026-02-05", weight: 106.1 },
  { id: "entry-4", date: "2026-02-06", weight: 105.6 },
  { id: "entry-5", date: "2026-02-09", weight: 105.3 },
];

const bloodPressureData = [
  { id: "bp-1", date: "2026-02-01", time: "08:30", systolic: 132, diastolic: 84, pulse: 74, notes: "Morning reading" },
  { id: "bp-2", date: "2026-02-08", time: "08:20", systolic: 128, diastolic: 82, pulse: 72, notes: "" },
  { id: "bp-3", date: "2026-02-15", time: "08:15", systolic: 124, diastolic: 79, pulse: 70, notes: "" },
];

const initialMeals = [
  {
    name: "Breakfast",
    items: "Greek yoghurt, berries, chia seeds",
    kcal: 410,
    protein: 34,
    fibre: 11,
  },
  {
    name: "Lunch",
    items: "Chicken salad wrap, lentil soup",
    kcal: 560,
    protein: 42,
    fibre: 13,
  },
  {
    name: "Dinner",
    items: "Salmon, potatoes, broccoli",
    kcal: 650,
    protein: 47,
    fibre: 8,
  },
  {
    name: "Snack",
    items: "Collagen drink and apple",
    kcal: 135,
    protein: 8,
    fibre: 4,
  },
];

const nutritionGoals = {
  calories: 1800,
  protein: 120,
  fibre: 30,
  water: 2.2,
};

const defaultWeightGoals = {
  startingWeight: 113,
  goalWeight: 90,
  weeklyLossMin: 0.6,
  weeklyLossMax: 1.1,
};

const databaseName = "FoodTrackDatabase";
const databaseVersion = 1;
const databaseStoreName = "records";
const appStateStorageKey = "foodTrackAppState";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function sortWeightEntries(entries) {
  if (!Array.isArray(entries)) return [];
  return [...entries]
    .filter((entry) => entry?.date && Number.isFinite(Number(entry.weight)))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortBloodPressureEntries(entries) {
  if (!Array.isArray(entries)) return [];
  return [...entries]
    .filter((entry) => entry?.date && Number.isFinite(Number(entry.systolic)) && Number.isFinite(Number(entry.diastolic)))
    .sort((a, b) => new Date(`${a.date}T${a.time || "00:00"}`) - new Date(`${b.date}T${b.time || "00:00"}`));
}

function getLatestWeightEntry(entries) {
  const sorted = sortWeightEntries(entries);
  return sorted.length ? sorted[sorted.length - 1] : null;
}

function getLatestBloodPressureEntry(entries) {
  const sorted = sortBloodPressureEntries(entries);
  return sorted.length ? sorted[sorted.length - 1] : null;
}

function calculateBMI(weightKg, heightCm) {
  const weight = safeNumber(weightKg);
  const heightM = safeNumber(heightCm) / 100;
  if (heightM <= 0) return 0;
  return Number((weight / (heightM * heightM)).toFixed(1));
}

function getBMICategory(bmi, ethnicity) {
  const value = safeNumber(bmi, 0);
  if (value < 18.5) return "underweight";
  if (value < 25) return "healthy";
  if (value < 30) return "overweight";
  if (value < 40) return "obese";
  return "severely obese";
}

function calculateHealthyWeightRange(heightCm) {
  const heightM = safeNumber(heightCm) / 100;
  const lower = 18.5 * heightM * heightM;
  const upper = 24.9 * heightM * heightM;
  return {
    lower: Number(lower.toFixed(1)),
    upper: Number(upper.toFixed(1)),
  };
}

function calculateWeightChange(currentEntry, previousEntry) {
  if (!currentEntry || !previousEntry) return null;
  return safeNumber(currentEntry.weight) - safeNumber(previousEntry.weight);
}

function calculateEstimatedWeeks(currentWeight, goalWeight, weeklyLossMin, weeklyLossMax) {
  const kgLeft = safeNumber(currentWeight) - safeNumber(goalWeight);
  const slow = weeklyLossMin > 0 ? Math.max(0, Math.ceil(kgLeft / weeklyLossMin)) : 0;
  const fast = weeklyLossMax > 0 ? Math.max(0, Math.ceil(kgLeft / weeklyLossMax)) : 0;
  return {
    slow: kgLeft > 0 ? slow : 0,
    fast: kgLeft > 0 ? fast : 0,
  };
}

function upsertWeightEntry(entries, entry) {
  if (!entry?.date || !Number.isFinite(Number(entry.weight))) return [...entries];
  const normalizedDate = entry.date;
  const normalizedWeight = safeNumber(entry.weight);
  const existing = entries.find((item) => item.date === normalizedDate);
  if (existing) {
    return entries.map((item) =>
      item.date === normalizedDate
        ? { ...item, weight: normalizedWeight, id: item.id || entry.id || createId() }
        : item
    );
  }
  return [...entries, { id: entry.id || createId(), date: normalizedDate, weight: normalizedWeight }];
}

function upsertBloodPressureEntry(entries, entry) {
  if (!entry?.date || !Number.isFinite(Number(entry.systolic)) || !Number.isFinite(Number(entry.diastolic))) return [...entries];
  const normalizedDate = entry.date;
  const normalizedTime = entry.time || "00:00";
  const normalizedSystolic = safeNumber(entry.systolic);
  const normalizedDiastolic = safeNumber(entry.diastolic);
  const normalizedPulse = entry.pulse === "" || entry.pulse === undefined ? "" : safeNumber(entry.pulse);
  const normalizedNotes = String(entry.notes || "").trim();
  const existing = entries.find((item) => item.date === normalizedDate && (item.time || "00:00") === normalizedTime);
  const nextEntry = {
    id: existing?.id || entry.id || createId(),
    date: normalizedDate,
    time: normalizedTime,
    systolic: normalizedSystolic,
    diastolic: normalizedDiastolic,
    pulse: normalizedPulse,
    notes: normalizedNotes,
  };
  if (existing) {
    return entries.map((item) => (item.date === normalizedDate && (item.time || "00:00") === normalizedTime ? nextEntry : item));
  }
  return [...entries, nextEntry];
}

function formatDecimal(value, digits = 1) {
  return Number.isFinite(value) ? value.toFixed(digits) : "0.0";
}

function formatDateReadable(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

function formatDateNumeric(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

function formatDateTimeNumeric(dateString, timeString = "") {
  const time = timeString || "00:00";
  return `${formatDateNumeric(dateString)} ${time}`;
}

function formatBloodPressureChartLabel(recordedAt) {
  const [date = "", time = ""] = String(recordedAt).split("T");
  return formatDateTimeNumeric(date, time.slice(0, 5));
}

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function saveToLocalStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function loadFromLocalStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) ?? fallback;
  } catch {
    return fallback;
  }
}

function openFoodTrackDatabase() {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, databaseVersion);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(databaseStoreName)) {
        db.createObjectStore(databaseStoreName);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readDatabaseRecord(key) {
  const db = await openFoodTrackDatabase();
  if (!db) return null;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(databaseStoreName, "readonly");
    const store = transaction.objectStore(databaseStoreName);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

async function writeDatabaseRecord(key, value) {
  const db = await openFoodTrackDatabase();
  if (!db) return false;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(databaseStoreName, "readwrite");
    const store = transaction.objectStore(databaseStoreName);
    const request = store.put(value, key);

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve(true);
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

function createFallbackAppState() {
  const storedMeals = loadFromLocalStorage("foodTrackMeals", initialMeals);
  const storedHabits = loadFromLocalStorage("foodTrackHabits", null);
  const storedWeightGoals = loadFromLocalStorage("foodTrackWeightGoals", null);
  const storedBmiProfile = loadFromLocalStorage("foodTrackBmiProfile", null);
  const storedWeights = loadFromLocalStorage("foodTrackWeightEntries", weightData);
  const storedBloodPressure = loadFromLocalStorage("foodTrackBloodPressureEntries", bloodPressureData);

  return {
    meals: Array.isArray(storedMeals) ? storedMeals : initialMeals,
    habits: storedHabits && typeof storedHabits === "object" && !Array.isArray(storedHabits)
      ? {
          weighIn: true,
          humantra: true,
          collagen: true,
          strength: false,
          mounjaro: false,
          waterGoal: false,
          ...storedHabits,
        }
      : {
          weighIn: true,
          humantra: true,
          collagen: true,
          strength: false,
          mounjaro: false,
          waterGoal: false,
        },
    weightGoals: storedWeightGoals && typeof storedWeightGoals === "object" && !Array.isArray(storedWeightGoals)
      ? {
          startingWeight: safeNumber(storedWeightGoals.startingWeight, defaultWeightGoals.startingWeight),
          goalWeight: safeNumber(storedWeightGoals.goalWeight, defaultWeightGoals.goalWeight),
          weeklyLossMin: safeNumber(storedWeightGoals.weeklyLossMin, defaultWeightGoals.weeklyLossMin),
          weeklyLossMax: safeNumber(storedWeightGoals.weeklyLossMax, defaultWeightGoals.weeklyLossMax),
        }
      : defaultWeightGoals,
    bmiProfile: storedBmiProfile && typeof storedBmiProfile === "object" && !Array.isArray(storedBmiProfile)
      ? {
          heightCm: safeNumber(storedBmiProfile.heightCm, 178),
          ethnicity: storedBmiProfile.ethnicity || "white",
        }
      : { heightCm: 178, ethnicity: "white" },
    weights: sortWeightEntries((Array.isArray(storedWeights) ? storedWeights : weightData).map((entry) => ({ id: entry.id || createId(), date: entry.date, weight: safeNumber(entry.weight) }))),
    bloodPressureEntries: sortBloodPressureEntries((Array.isArray(storedBloodPressure) ? storedBloodPressure : bloodPressureData).map((entry) => ({
      id: entry.id || createId(),
      date: entry.date,
      time: entry.time || "00:00",
      systolic: safeNumber(entry.systolic),
      diastolic: safeNumber(entry.diastolic),
      pulse: entry.pulse === "" || entry.pulse === undefined ? "" : safeNumber(entry.pulse),
      notes: entry.notes || "",
    }))),
  };
}

function normalizeAppState(state) {
  const fallback = createFallbackAppState();
  if (!state || typeof state !== "object" || Array.isArray(state)) return fallback;

  const weightGoals = state.weightGoals && typeof state.weightGoals === "object" && !Array.isArray(state.weightGoals)
    ? {
        startingWeight: safeNumber(state.weightGoals.startingWeight, fallback.weightGoals.startingWeight),
        goalWeight: safeNumber(state.weightGoals.goalWeight, fallback.weightGoals.goalWeight),
        weeklyLossMin: safeNumber(state.weightGoals.weeklyLossMin, fallback.weightGoals.weeklyLossMin),
        weeklyLossMax: safeNumber(state.weightGoals.weeklyLossMax, fallback.weightGoals.weeklyLossMax),
      }
    : fallback.weightGoals;

  const bmiProfile = state.bmiProfile && typeof state.bmiProfile === "object" && !Array.isArray(state.bmiProfile)
    ? {
        heightCm: safeNumber(state.bmiProfile.heightCm, fallback.bmiProfile.heightCm),
        ethnicity: state.bmiProfile.ethnicity || fallback.bmiProfile.ethnicity,
      }
    : fallback.bmiProfile;

  return {
    meals: Array.isArray(state.meals) ? state.meals : fallback.meals,
    habits: state.habits && typeof state.habits === "object" && !Array.isArray(state.habits)
      ? { ...fallback.habits, ...state.habits }
      : fallback.habits,
    weightGoals,
    bmiProfile,
    weights: sortWeightEntries((Array.isArray(state.weights) ? state.weights : fallback.weights).map((entry) => ({ id: entry.id || createId(), date: entry.date, weight: safeNumber(entry.weight) }))),
    bloodPressureEntries: sortBloodPressureEntries((Array.isArray(state.bloodPressureEntries) ? state.bloodPressureEntries : fallback.bloodPressureEntries).map((entry) => ({
      id: entry.id || createId(),
      date: entry.date,
      time: entry.time || "00:00",
      systolic: safeNumber(entry.systolic),
      diastolic: safeNumber(entry.diastolic),
      pulse: entry.pulse === "" || entry.pulse === undefined ? "" : safeNumber(entry.pulse),
      notes: entry.notes || "",
    }))),
  };
}

function saveFallbackRecords(appState) {
  saveToLocalStorage(appStateStorageKey, appState);
  saveToLocalStorage("foodTrackMeals", appState.meals);
  saveToLocalStorage("foodTrackHabits", appState.habits);
  saveToLocalStorage("foodTrackWeightEntries", appState.weights);
  saveToLocalStorage("foodTrackWeightGoals", appState.weightGoals);
  saveToLocalStorage("foodTrackBmiProfile", appState.bmiProfile);
  saveToLocalStorage("foodTrackBloodPressureEntries", appState.bloodPressureEntries);
}

function calculateFoodTotals(items) {
  return items.reduce(
    (acc, meal) => ({
      kcal: acc.kcal + (meal.kcal || 0),
      protein: acc.protein + (meal.protein || 0),
      fibre: acc.fibre + (meal.fibre || 0),
    }),
    { kcal: 0, protein: 0, fibre: 0 }
  );
}

function clampPercentage(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(value, 100));
}

function calculateWeightProgress(currentWeight, startingWeight, goalWeight) {
  const start = safeNumber(startingWeight);
  const current = safeNumber(currentWeight);
  const target = safeNumber(goalWeight);
  const totalToLose = start - target;
  const lostSoFar = start - current;
  if (totalToLose <= 0) return 0;
  return clampPercentage((lostSoFar / totalToLose) * 100);
}

function calculateWeightLossMilestones(currentWeight, startingWeight, goalWeight) {
  const start = safeNumber(startingWeight);
  const current = safeNumber(currentWeight);
  const target = safeNumber(goalWeight);
  if (start <= 0 || target >= start) return [];

  const goalLossPercent = ((start - target) / start) * 100;
  const highestMilestone = Math.max(5, Math.ceil(goalLossPercent / 5) * 5);

  return Array.from({ length: highestMilestone / 5 }, (_, index) => {
    const percent = (index + 1) * 5;
    const targetWeight = start * (1 - percent / 100);
    const kgToMilestone = Math.max(0, current - targetWeight);
    return {
      percent,
      targetWeight,
      kgToMilestone,
      achieved: current <= targetWeight,
      isGoalRange: targetWeight <= target,
    };
  });
}

function calculateWeightPace(entries, currentWeight, startingWeight, weeklyLossMin, weeklyLossMax) {
  const sorted = sortWeightEntries(entries);
  const latest = sorted.length ? sorted[sorted.length - 1] : null;
  const first = sorted.length > 1 ? sorted[0] : null;
  const startWeight = first ? safeNumber(first.weight) : safeNumber(startingWeight);
  const latestWeight = latest ? safeNumber(latest.weight) : safeNumber(currentWeight);
  const startDate = first ? new Date(first.date + "T00:00:00") : null;
  const latestDate = latest ? new Date(latest.date + "T00:00:00") : null;
  const daysTracked = startDate && latestDate ? Math.max(1, (latestDate - startDate) / 86400000) : 0;
  const kgLostForPace = Math.max(0, startWeight - latestWeight);
  const weeklyPace = daysTracked > 0 ? (kgLostForPace / daysTracked) * 7 : 0;
  const min = safeNumber(weeklyLossMin);
  const max = safeNumber(weeklyLossMax);

  if (!latest || sorted.length < 2 || daysTracked < 7) {
    return {
      status: "neutral",
      label: "Not enough trend yet",
      pace: weeklyPace,
      detail: "Add at least a week of weight entries to judge pace properly.",
    };
  }

  if (max > 0 && weeklyPace > max) {
    return {
      status: "fast",
      label: "Losing faster than planned",
      pace: weeklyPace,
      detail: "Your average pace is above your saved weekly max. Check calories, protein, hydration and how you feel.",
    };
  }

  if (min > 0 && weeklyPace < min) {
    return {
      status: "slow",
      label: "Slower than target range",
      pace: weeklyPace,
      detail: "Your trend is below your saved weekly min. Normal fluctuations happen, so review the pattern over time.",
    };
  }

  return {
    status: "steady",
    label: "Within target pace",
    pace: weeklyPace,
    detail: "Your average weekly loss sits inside the pace range saved in goal settings.",
  };
}

function calculateBloodPressureAverage(entries) {
  const sorted = sortBloodPressureEntries(entries);
  if (!sorted.length) return { systolic: 0, diastolic: 0, pulse: 0 };
  const totals = sorted.reduce(
    (acc, entry) => ({
      systolic: acc.systolic + safeNumber(entry.systolic),
      diastolic: acc.diastolic + safeNumber(entry.diastolic),
      pulse: acc.pulse + (Number.isFinite(Number(entry.pulse)) ? safeNumber(entry.pulse) : 0),
      pulseCount: acc.pulseCount + (Number.isFinite(Number(entry.pulse)) ? 1 : 0),
    }),
    { systolic: 0, diastolic: 0, pulse: 0, pulseCount: 0 }
  );

  return {
    systolic: Math.round(totals.systolic / sorted.length),
    diastolic: Math.round(totals.diastolic / sorted.length),
    pulse: totals.pulseCount ? Math.round(totals.pulse / totals.pulseCount) : 0,
  };
}

function getBloodPressureStatus(systolic, diastolic) {
  const sys = safeNumber(systolic);
  const dia = safeNumber(diastolic);
  if (sys >= 180 || dia >= 120) {
    return {
      label: "Very high",
      tone: "bg-rose-50 text-rose-950 ring-rose-100",
      accent: "bg-rose-100 text-rose-700",
      note: "This reading is very high. Consider seeking medical advice promptly, especially if you feel unwell.",
    };
  }
  if (sys >= 140 || dia >= 90) {
    return {
      label: "High",
      tone: "bg-amber-50 text-amber-950 ring-amber-100",
      accent: "bg-amber-100 text-amber-700",
      note: "This is above the usual target range. Recheck when rested and discuss repeated high readings with a clinician.",
    };
  }
  if (sys < 90 || dia < 60) {
    return {
      label: "Low",
      tone: "bg-sky-50 text-sky-950 ring-sky-100",
      accent: "bg-sky-100 text-sky-700",
      note: "This is a low reading. Track symptoms such as dizziness and discuss repeated low readings with a clinician.",
    };
  }
  return {
    label: "In usual range",
    tone: "bg-emerald-50 text-emerald-950 ring-emerald-100",
    accent: "bg-emerald-100 text-emerald-700",
    note: "This reading sits in the usual adult range. Keep recording under similar conditions for a clearer trend.",
  };
}

function getCoachNote(calories, protein, fibre, caloriesTarget, proteinTarget) {
  if (calories < 1200) {
    return "Calories look very low today. Make sure you are not under-eating, especially on Mounjaro.";
  }
  if (protein < 80) {
    return "Protein is low today. Try adding a high-protein meal or snack.";
  }
  if (fibre < 20) {
    return "Fibre is a little low today. Add fruit, oats, beans, lentils or veg if tolerated.";
  }
  if (calories <= caloriesTarget && protein > proteinTarget) {
    return "Good balance today. Keep hydration steady and focus on consistency.";
  }
  return "Keep logging. Protein, fibre and hydration are the main priorities today.";
}

function StatCard({ icon: Icon, label, value, sub, progress, accent }) {
  return (
    <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
          <p className="mt-1 text-sm text-slate-500">{sub}</p>
        </div>
        <div className={`rounded-2xl p-3 ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {progress !== undefined && (
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-slate-950" style={{ width: `${clampPercentage(progress)}%` }} />
        </div>
      )}
    </div>
  );
}

function Ring({ value, max, label, sub }) {
  const percent = clampPercentage((value / max) * 100);
  return (
    <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl shadow-slate-300/40">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-2 text-3xl font-bold">
            {value}
            <span className="text-base font-medium text-slate-300">/{max}</span>
          </p>
          <p className="mt-1 text-sm text-slate-400">{sub}</p>
        </div>
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-white/10">
          <div className="absolute inset-2 rounded-full" style={{ background: `conic-gradient(white ${percent * 3.6}deg, rgba(255,255,255,0.15) 0deg)` }} />
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-slate-950 text-lg font-bold">{Math.round(percent)}%</div>
        </div>
      </div>
    </div>
  );
}

function ConfettiBurst({ pieces }) {
  if (!pieces.length) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes foodtrack-confetti-fall {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          12% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--drift), var(--drop), 0) rotate(var(--rotate));
          }
        }
      `}</style>
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute block rounded-sm"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 1.8}px`,
            backgroundColor: piece.color,
            "--drift": `${piece.drift}px`,
            "--drop": `${piece.drop}px`,
            "--rotate": `${piece.rotate}deg`,
            animation: `foodtrack-confetti-fall ${piece.duration}ms ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
}

function createConfettiPieces() {
  const colors = ["#0f172a", "#0284c7", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];
  return Array.from({ length: 72 }, (_, index) => ({
    id: `${Date.now()}-${index}`,
    left: 15 + Math.random() * 70,
    top: 4 + Math.random() * 18,
    size: 6 + Math.random() * 7,
    drift: -180 + Math.random() * 360,
    drop: 260 + Math.random() * 360,
    rotate: -420 + Math.random() * 840,
    duration: 1200 + Math.random() * 900,
    color: colors[index % colors.length],
  }));
}

function getAchievedMilestoneSignature(currentWeight, weightGoals) {
  return calculateWeightLossMilestones(currentWeight, weightGoals.startingWeight, weightGoals.goalWeight)
    .filter((milestone) => milestone.achieved)
    .map((milestone) => milestone.percent)
    .join("|");
}

function getReachedMilestonePoints(entries, weightGoals) {
  const sorted = sortWeightEntries(entries);
  const milestones = calculateWeightLossMilestones(
    sorted.length ? sorted[sorted.length - 1].weight : weightGoals.startingWeight,
    weightGoals.startingWeight,
    weightGoals.goalWeight
  );

  return milestones
    .filter((milestone) => milestone.achieved)
    .map((milestone) => {
      const entry = sorted.find((item) => safeNumber(item.weight) <= milestone.targetWeight);
      if (!entry) return null;
      return {
        percent: milestone.percent,
        date: entry.date,
        weight: safeNumber(entry.weight),
      };
    })
    .filter(Boolean);
}

function MilestoneBubble({ viewBox, percent }) {
  if (!viewBox) return null;
  const x = viewBox.cx ?? viewBox.x ?? 0;
  const y = viewBox.cy ?? viewBox.y ?? 0;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-26" y="-39" width="52" height="24" rx="12" fill="#059669" />
      <text x="0" y="-23" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
        {percent}%
      </text>
      <path d="M-5 -15 L0 -8 L5 -15 Z" fill="#059669" />
    </g>
  );
}

function WeightPage({
  sortedWeights,
  weightGoals,
  goalForm,
  currentWeight,
  latestEntry,
  previousEntry,
  progressPercent,
  kgLost,
  kgLeft,
  estimatedWeeks,
  weightForm,
  profileForm,
  bmiProfile,
  bmi,
  bmiCategory,
  bmiRange,
  bmiEthnicityNote,
  bmiSupportText,
  onGoalFormChange,
  onSaveGoals,
  onProfileFormChange,
  onSaveProfile,
  onWeightFormChange,
  onAddWeight,
  onDeleteWeight,
  onBack,
}) {
  const trendText = (() => {
    if (!latestEntry || !previousEntry) return "Add at least two entries to see a trend.";
    const delta = calculateWeightChange(latestEntry, previousEntry);
    if (delta < 0) return "Weight is trending down. Keep focusing on protein, fibre, hydration and strength training.";
    if (delta > 0) return "Weight is up compared with the last entry. This can happen with fluid, food timing and normal daily variation. Review the weekly trend.";
    return "Weight is stable. Keep logging and review the weekly pattern.";
  })();

  const bmiGraphPercent = (() => {
    const constrained = Math.min(50, Math.max(10, bmi));
    return ((constrained - 10) / 40) * 100;
  })();

  const bmiSegments = [
    { label: "Underweight", color: "bg-sky-100", activeColor: "bg-sky-300", left: 0, width: ((18.5 - 10) / 40) * 100 },
    { label: "Healthy", color: "bg-emerald-100", activeColor: "bg-emerald-300", left: ((18.5 - 10) / 40) * 100, width: ((25 - 18.5) / 40) * 100 },
    { label: "Overweight", color: "bg-amber-100", activeColor: "bg-amber-300", left: ((25 - 10) / 40) * 100, width: ((30 - 25) / 40) * 100 },
    { label: "Obese", color: "bg-rose-100", activeColor: "bg-rose-300", left: ((30 - 10) / 40) * 100, width: ((40 - 30) / 40) * 100 },
    { label: "Severely obese", color: "bg-pink-100", activeColor: "bg-pink-300", left: ((40 - 10) / 40) * 100, width: ((50 - 40) / 40) * 100 },
  ];

  const bmiScaleTicks = [10, 15, 20, 25, 30, 35, 40, 45, 50].map((value) => ({
    value,
    left: ((value - 10) / 40) * 100,
  }));
  const weightMilestones = calculateWeightLossMilestones(currentWeight, weightGoals.startingWeight, weightGoals.goalWeight);
  const reachedMilestonePoints = getReachedMilestonePoints(sortedWeights, weightGoals);
  const paceCheck = calculateWeightPace(sortedWeights, currentWeight, weightGoals.startingWeight, weightGoals.weeklyLossMin, weightGoals.weeklyLossMax);
  const paceStyles = {
    fast: "bg-rose-50 text-rose-950 ring-rose-100",
    slow: "bg-amber-50 text-amber-950 ring-amber-100",
    steady: "bg-emerald-50 text-emerald-950 ring-emerald-100",
    neutral: "bg-slate-50 text-slate-700 ring-slate-100",
  };
  const paceBadgeStyles = {
    fast: "bg-rose-600 text-white",
    slow: "bg-amber-500 text-white",
    steady: "bg-emerald-600 text-white",
    neutral: "bg-slate-200 text-slate-700",
  };
  const bmiStateStyles = {
    underweight: { marker: "bg-sky-600", text: "text-sky-700", ring: "ring-sky-200" },
    healthy: { marker: "bg-emerald-600", text: "text-emerald-700", ring: "ring-emerald-200" },
    overweight: { marker: "bg-amber-500", text: "text-amber-700", ring: "ring-amber-200" },
    obese: { marker: "bg-rose-600", text: "text-rose-700", ring: "ring-rose-200" },
    "severely obese": { marker: "bg-pink-600", text: "text-pink-700", ring: "ring-pink-200" },
  }[bmiCategory] || { marker: "bg-slate-950", text: "text-slate-700", ring: "ring-slate-200" };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Weight tracker</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">Track trends, set goals, and focus on steady progress.</h2>
          <p className="mt-3 text-sm text-slate-500">Keep your weight goals visible and log entries cleanly on a dedicated page.</p>
        </div>
        <div className="flex items-end justify-end">
          <button type="button" onClick={onBack} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Back to dashboard</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={ScaleIcon} label="Current weight" value={`${currentWeight.toFixed(1)} kg`} sub={latestEntry ? latestEntry.date : "No entries"} accent="bg-slate-100 text-slate-700" />
        <StatCard icon={TargetIcon} label="Starting weight" value={`${weightGoals.startingWeight.toFixed(1)} kg`} sub="Starting reference" accent="bg-indigo-100 text-indigo-700" />
        <StatCard icon={SparklesIcon} label="Goal weight" value={`${weightGoals.goalWeight.toFixed(1)} kg`} sub="Target to hit" accent="bg-emerald-100 text-emerald-700" />
        <StatCard icon={FlameIcon} label="Total lost" value={`${kgLost.toFixed(1)} kg`} sub="Since start" accent="bg-rose-100 text-rose-700" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.5fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Add weight</p>
                <p className="text-xs text-slate-500">Use a new date or update an existing entry.</p>
              </div>
            </div>
            <form onSubmit={onAddWeight} className="grid gap-4">
              <label className="block text-sm text-slate-600">
                Date
                <input type="date" value={weightForm.date} onChange={onWeightFormChange("date")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" />
              </label>
              <label className="block text-sm text-slate-600">
                Weight in kg
                <input type="number" step="0.1" min="0" max="400" value={weightForm.weight} onChange={onWeightFormChange("weight")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="kg" />
              </label>
              <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Add entry</button>
            </form>
          </div>

        <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <h3 className="text-xl font-semibold text-slate-950">Weight trend</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sortedWeights} margin={{ top: 48, right: 28, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickFormatter={formatDateNumeric} />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} tickLine={false} axisLine={false} />
                <Tooltip labelFormatter={formatDateNumeric} />
                <Line type="monotone" dataKey="weight" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                {reachedMilestonePoints.map((milestone) => (
                  <ReferenceDot
                    key={`${milestone.percent}-${milestone.date}`}
                    x={milestone.date}
                    y={milestone.weight}
                    r={6}
                    fill="#059669"
                    stroke="white"
                    strokeWidth={2}
                    label={<MilestoneBubble percent={milestone.percent} />}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <div className={`flex h-full flex-col rounded-3xl p-6 shadow-lg shadow-slate-200/60 ring-1 ${paceStyles[paceCheck.status]}`}>
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-xl font-semibold">Pace check</h3>
                <p className="mt-2 text-sm opacity-80">Compared with your saved {weightGoals.weeklyLossMin.toFixed(1)} to {weightGoals.weeklyLossMax.toFixed(1)} kg per week range.</p>
              </div>
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${paceBadgeStyles[paceCheck.status]}`}>{paceCheck.label}</span>
            </div>
            <div className="mt-5 grid gap-3">
              <div>
                <p className="text-sm opacity-75">Average pace</p>
                <p className="mt-2 text-3xl font-bold">{paceCheck.pace.toFixed(1)} kg/week</p>
              </div>
              <p className="text-sm leading-7 opacity-85">{paceCheck.detail}</p>
            </div>
        </div>

        <div className="flex h-full flex-col rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
            <h3 className="text-xl font-semibold text-slate-950">Progress</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Goal progress</p>
                <p className="mt-3 text-3xl font-bold text-slate-950">{Math.round(progressPercent)}%</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">kg left</p>
                <p className="mt-3 text-3xl font-bold text-slate-950">{kgLeft.toFixed(1)} kg</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-700">{kgLost.toFixed(1)} kg lost</p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">Estimated weeks</p>
                <p>{estimatedWeeks.fast} to {estimatedWeeks.slow} weeks</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">At your target pace, this could take around {estimatedWeeks.fast} to {estimatedWeeks.slow} weeks.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <h3 className="text-xl font-semibold text-slate-950">BMI summary</h3>
          <p className="mt-3 text-sm text-slate-500">Latest BMI based on saved height and ethnicity.</p>
          <div className="mt-6 space-y-3 rounded-3xl bg-slate-50 p-4 text-slate-700">
            <p className="text-sm text-slate-500">Your BMI is</p>
            <p className="text-3xl font-bold text-slate-950">{bmi.toFixed(1)}</p>
            <p className="text-sm text-slate-500">Your BMI is in the {bmiCategory} category.</p>
            <div className="mt-4 grid gap-2 rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm">
              <p>Latest weight used: {currentWeight.toFixed(1)} kg</p>
              <p>Height used: {bmiProfile.heightCm} cm</p>
              <p>Ethnicity used: {bmiProfile.ethnicity}</p>
            </div>
            <p className="mt-3 text-sm text-slate-600">{bmiSupportText}</p>
            {bmiEthnicityNote && <p className="text-xs text-slate-500">{bmiEthnicityNote}</p>}
            <p className="mt-2 text-xs text-slate-400">BMI is a screening tool and does not measure body fat directly.</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-950">NHS-style BMI graph</h3>
              <p className="mt-2 text-sm text-slate-500">Current BMI shown along a standard NHS category scale.</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="relative h-10 overflow-hidden rounded-full bg-slate-100">
              {bmiSegments.map((segment) => (
                <div
                  key={segment.label}
                  className={`${segment.label.toLowerCase() === bmiCategory ? segment.activeColor : segment.color} absolute top-0 h-full`}
                  style={{ left: `${segment.left}%`, width: `${segment.width}%` }}
                />
              ))}
              <div className={`absolute top-0 h-full w-1 rounded-full ${bmiStateStyles.marker}`} style={{ left: `${bmiGraphPercent}%` }} />
              <div className={`absolute -top-5 text-xs font-semibold ${bmiStateStyles.text}`} style={{ left: `${bmiGraphPercent}%`, transform: 'translateX(-50%)' }}>×</div>
            </div>
            <div className={`mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-semibold capitalize shadow-sm ring-1 ${bmiStateStyles.text} ${bmiStateStyles.ring}`}>
              Current state: {bmiCategory}
            </div>
            <div className="relative mt-4 h-5">
              {bmiScaleTicks.map((threshold) => (
                <div key={threshold.value} className="absolute top-0 text-[10px] text-slate-500" style={{ left: `${threshold.left}%`, transform: 'translateX(-50%)' }}>
                  {threshold.value}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-2 text-sm text-slate-600">
              {bmiSegments.map((segment) => (
                <div key={segment.label} className="flex items-center gap-2">
                  <span className={`inline-block h-3 w-3 rounded-full ${segment.color}`} />
                  <span className="capitalize">{segment.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-slate-950" />
                <span>Your BMI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
        <p className="text-sm text-slate-500">Healthy weight range for {bmiProfile.heightCm} cm: {bmiRange.lower} kg to {bmiRange.upper} kg</p>
      </div>

      <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
        <h3 className="text-xl font-semibold text-slate-950">Trend insight</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{trendText}</p>
      </div>

      <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
        <h3 className="text-xl font-semibold text-slate-950">Weight history</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr>
                <th className="px-3 py-3 font-semibold text-slate-500">Date</th>
                <th className="px-3 py-3 font-semibold text-slate-500">Weight</th>
                <th className="px-3 py-3 font-semibold text-slate-500">Change</th>
                <th className="px-3 py-3 font-semibold text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sortedWeights.map((entry, index) => {
                const previous = index > 0 ? sortedWeights[index - 1] : null;
                const diff = calculateWeightChange(entry, previous);
                return (
                  <tr key={entry.id}>
                    <td className="px-3 py-3">{formatDateReadable(entry.date)}</td>
                    <td className="px-3 py-3">{entry.weight.toFixed(1)} kg</td>
                    <td className="px-3 py-3 text-slate-600">{previous ? `${diff > 0 ? "+" : ""}${diff.toFixed(1)} kg` : "—"}</td>
                    <td className="px-3 py-3">
                      <button type="button" onClick={() => onDeleteWeight(entry.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">Goal settings</h3>
            <p className="mt-2 text-sm text-slate-500">Edit your starting weight and target weight.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Starting weight", field: "startingWeight", placeholder: "kg" },
                { label: "Goal weight", field: "goalWeight", placeholder: "kg" },
              ].map((item) => (
                <label key={item.field} className="block text-sm text-slate-600">
                  {item.label}
                  <input type="number" step="0.1" min="0" value={goalForm[item.field]} onChange={onGoalFormChange(item.field)} placeholder={item.placeholder} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" />
                </label>
              ))}
            </div>
            <button type="button" onClick={onSaveGoals} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 sm:w-auto">Save goals</button>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-950">BMI profile</h3>
            <p className="mt-2 text-sm text-slate-500">Save your height and ethnicity for BMI tracking.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-600">
                Height in cm
                <input type="number" min="100" value={profileForm.heightCm} onChange={onProfileFormChange("heightCm")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" />
              </label>
              <label className="block text-sm text-slate-600">
                Ethnicity
                <select value={profileForm.ethnicity} onChange={onProfileFormChange("ethnicity")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none">
                  {['white', 'black', 'asian', 'mixed', 'other'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <button type="button" onClick={onSaveProfile} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 sm:w-auto">Save profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BloodPressurePage({
  sortedEntries,
  latestEntry,
  averageReading,
  bpForm,
  onBpFormChange,
  onAddBloodPressure,
  onDeleteBloodPressure,
  onBack,
}) {
  const latestStatus = latestEntry ? getBloodPressureStatus(latestEntry.systolic, latestEntry.diastolic) : getBloodPressureStatus(0, 0);
  const averageStatus = averageReading.systolic ? getBloodPressureStatus(averageReading.systolic, averageReading.diastolic) : null;
  const chartEntries = sortedEntries.map((entry) => ({ ...entry, recordedAt: `${entry.date}T${entry.time || "00:00"}` }));

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">Blood pressure</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">Track readings, spot patterns, and keep notes together.</h2>
          <p className="mt-3 text-sm text-slate-500">Log systolic, diastolic, pulse, and context so repeated readings are easy to review.</p>
        </div>
        <div className="flex items-end justify-end">
          <button type="button" onClick={onBack} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Back to dashboard</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={HeartPulseIcon} label="Latest reading" value={latestEntry ? `${latestEntry.systolic}/${latestEntry.diastolic}` : "--/--"} sub={latestEntry ? formatDateTimeNumeric(latestEntry.date, latestEntry.time) : "No readings"} accent={latestStatus.accent} />
        <StatCard icon={TargetIcon} label="Latest status" value={latestEntry ? latestStatus.label : "No data"} sub="Based on latest reading" accent={latestStatus.accent} />
        <StatCard icon={SparklesIcon} label="Average reading" value={averageReading.systolic ? `${averageReading.systolic}/${averageReading.diastolic}` : "--/--"} sub={averageStatus ? averageStatus.label : "No readings"} accent={averageStatus?.accent || "bg-slate-100 text-slate-700"} />
        <StatCard icon={FlameIcon} label="Latest pulse" value={latestEntry?.pulse ? `${latestEntry.pulse} bpm` : "-- bpm"} sub="Optional field" accent="bg-indigo-100 text-indigo-700" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.5fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-700">Add blood pressure</p>
            <p className="text-xs text-slate-500">Use a new date or update an existing reading.</p>
          </div>
          <form onSubmit={onAddBloodPressure} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-600">
                Date
                <input type="date" value={bpForm.date} onChange={onBpFormChange("date")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" />
              </label>
              <label className="block text-sm text-slate-600">
                Time
                <input type="time" value={bpForm.time} onChange={onBpFormChange("time")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-600">
                Systolic
                <input type="number" min="50" max="260" value={bpForm.systolic} onChange={onBpFormChange("systolic")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="e.g. 120" />
              </label>
              <label className="block text-sm text-slate-600">
                Diastolic
                <input type="number" min="30" max="160" value={bpForm.diastolic} onChange={onBpFormChange("diastolic")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="e.g. 80" />
              </label>
            </div>
            <label className="block text-sm text-slate-600">
              Pulse
              <input type="number" min="30" max="220" value={bpForm.pulse} onChange={onBpFormChange("pulse")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="optional bpm" />
            </label>
            <label className="block text-sm text-slate-600">
              Notes
              <input value={bpForm.notes} onChange={onBpFormChange("notes")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="e.g. morning, rested, headache" />
            </label>
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Add reading</button>
          </form>
        </div>

        <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <h3 className="text-xl font-semibold text-slate-950">Blood pressure trend</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartEntries} margin={{ top: 16, right: 28, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="recordedAt" tickLine={false} axisLine={false} tickFormatter={formatBloodPressureChartLabel} />
                <YAxis domain={["dataMin - 10", "dataMax + 10"]} tickLine={false} axisLine={false} />
                <Tooltip labelFormatter={formatBloodPressureChartLabel} />
                <Line type="monotone" dataKey="systolic" name="Systolic" stroke="#e11d48" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="diastolic" name="Diastolic" stroke="#0284c7" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <div className={`flex h-full flex-col rounded-3xl p-6 shadow-lg shadow-slate-200/60 ring-1 ${latestStatus.tone}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Latest check</h3>
              <p className="mt-2 text-sm opacity-80">{latestEntry ? `${latestEntry.systolic}/${latestEntry.diastolic} mmHg` : "No blood pressure readings yet."}</p>
            </div>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">{latestEntry ? latestStatus.label : "No data"}</span>
          </div>
          <p className="mt-5 text-sm leading-7 opacity-85">{latestEntry ? latestStatus.note : "Add your first blood pressure reading to start tracking."}</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
        <h3 className="text-xl font-semibold text-slate-950">Blood pressure history</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr>
                <th className="px-3 py-3 font-semibold text-slate-500">Date</th>
                <th className="px-3 py-3 font-semibold text-slate-500">Time</th>
                <th className="px-3 py-3 font-semibold text-slate-500">Reading</th>
                <th className="px-3 py-3 font-semibold text-slate-500">Pulse</th>
                <th className="px-3 py-3 font-semibold text-slate-500">Status</th>
                <th className="px-3 py-3 font-semibold text-slate-500">Notes</th>
                <th className="px-3 py-3 font-semibold text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sortedEntries.map((entry) => {
                const status = getBloodPressureStatus(entry.systolic, entry.diastolic);
                return (
                  <tr key={entry.id}>
                    <td className="px-3 py-3">{formatDateNumeric(entry.date)}</td>
                    <td className="px-3 py-3">{entry.time || "00:00"}</td>
                    <td className="px-3 py-3 font-semibold">{entry.systolic}/{entry.diastolic}</td>
                    <td className="px-3 py-3">{entry.pulse ? `${entry.pulse} bpm` : "--"}</td>
                    <td className="px-3 py-3">{status.label}</td>
                    <td className="px-3 py-3 text-slate-600">{entry.notes || "--"}</td>
                    <td className="px-3 py-3">
                      <button type="button" onClick={() => onDeleteBloodPressure(entry.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const fallbackAppState = createFallbackAppState();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [meals, setMeals] = useState(() => fallbackAppState.meals);
  const [waterIntake, setWaterIntake] = useState(1.7);
  const [habits, setHabits] = useState(() => fallbackAppState.habits);
  const [weightGoals, setWeightGoals] = useState(() => fallbackAppState.weightGoals);
  const [goalForm, setGoalForm] = useState(() => ({ ...weightGoals }));
  const [bmiProfile, setBmiProfile] = useState(() => fallbackAppState.bmiProfile);
  const [profileForm, setProfileForm] = useState(() => ({ ...bmiProfile }));
  const [weights, setWeights] = useState(() => fallbackAppState.weights);
  const [bloodPressureEntries, setBloodPressureEntries] = useState(() => fallbackAppState.bloodPressureEntries);
  const [form, setForm] = useState({ meal: "Snack", items: "", kcal: "", protein: "", fibre: "" });
  const [weightForm, setWeightForm] = useState({ date: "", weight: "" });
  const [bpForm, setBpForm] = useState({ date: "", time: "", systolic: "", diastolic: "", pulse: "", notes: "" });
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [storageStatus, setStorageStatus] = useState("Opening database");
  const [confettiPieces, setConfettiPieces] = useState([]);
  const achievedMilestoneRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    async function loadDatabaseState() {
      try {
        const databaseState = await readDatabaseRecord(appStateStorageKey);
        if (!isActive) return;
        if (databaseState) {
          const nextState = normalizeAppState(databaseState);
          setMeals(nextState.meals);
          setHabits(nextState.habits);
          setWeights(nextState.weights);
          setBloodPressureEntries(nextState.bloodPressureEntries);
          setWeightGoals(nextState.weightGoals);
          setGoalForm(nextState.weightGoals);
          setBmiProfile(nextState.bmiProfile);
          setProfileForm(nextState.bmiProfile);
          setStorageStatus("Database loaded");
        } else {
          setStorageStatus("Database ready");
        }
      } catch {
        if (isActive) setStorageStatus("Using browser fallback");
      } finally {
        if (isActive) setIsDatabaseReady(true);
      }
    }

    loadDatabaseState();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!isDatabaseReady) return;

    const appState = {
      meals,
      habits,
      weights,
      bloodPressureEntries,
      weightGoals,
      bmiProfile,
      savedAt: new Date().toISOString(),
    };
    let isActive = true;

    saveFallbackRecords(appState);
    setStorageStatus("Saving");

    writeDatabaseRecord(appStateStorageKey, appState)
      .then((saved) => {
        if (!isActive) return;
        setStorageStatus(saved ? "Saved to database" : "Saved in browser");
      })
      .catch(() => {
        if (isActive) setStorageStatus("Saved in browser fallback");
      });

    return () => {
      isActive = false;
    };
  }, [isDatabaseReady, meals, habits, weights, bloodPressureEntries, weightGoals, bmiProfile]);

  const totals = useMemo(() => calculateFoodTotals(meals), [meals]);
  const sortedWeights = useMemo(() => sortWeightEntries(weights), [weights]);
  const sortedBloodPressureEntries = useMemo(() => sortBloodPressureEntries(bloodPressureEntries), [bloodPressureEntries]);
  const latestWeightEntry = getLatestWeightEntry(sortedWeights);
  const latestBloodPressureEntry = getLatestBloodPressureEntry(sortedBloodPressureEntries);
  const bloodPressureAverage = useMemo(() => calculateBloodPressureAverage(sortedBloodPressureEntries), [sortedBloodPressureEntries]);
  const previousWeightEntry = sortedWeights.length > 1 ? sortedWeights[sortedWeights.length - 2] : null;
  const currentWeight = latestWeightEntry ? safeNumber(latestWeightEntry.weight, weightGoals.startingWeight) : weightGoals.startingWeight;
  const kgLost = Math.max(0, weightGoals.startingWeight - currentWeight);
  const kgLeft = Math.max(0, currentWeight - weightGoals.goalWeight);
  const weightProgress = calculateWeightProgress(currentWeight, weightGoals.startingWeight, weightGoals.goalWeight);
  const estimatedWeeks = calculateEstimatedWeeks(currentWeight, weightGoals.goalWeight, weightGoals.weeklyLossMin, weightGoals.weeklyLossMax);
  const bmi = calculateBMI(currentWeight, bmiProfile.heightCm);
  const bmiCategory = getBMICategory(bmi, bmiProfile.ethnicity);
  const bmiRange = calculateHealthyWeightRange(bmiProfile.heightCm);
  const bmiEthnicityNote = bmiProfile.ethnicity !== "white" ? "NHS guidance may use different BMI risk thresholds for some ethnic groups. This app currently displays the standard adult BMI categories." : "";
  const bmiSupportText = {
    underweight: "Your BMI is below the healthy range.",
    healthy: "Your BMI is in the healthy range.",
    overweight: "Your BMI is in the overweight range.",
    obese: "Your BMI is in the obese range.",
    "severely obese": "Your BMI is in the severely obese range.",
  }[bmiCategory] || "BMI is a screening tool and does not measure body fat directly.";
  const coachNote = getCoachNote(totals.kcal, totals.protein, totals.fibre, nutritionGoals.calories, nutritionGoals.protein);
  const achievedMilestoneSignature = useMemo(
    () => getAchievedMilestoneSignature(currentWeight, weightGoals),
    [currentWeight, weightGoals]
  );

  useEffect(() => {
    if (!isDatabaseReady) return undefined;

    if (achievedMilestoneRef.current === null) {
      achievedMilestoneRef.current = achievedMilestoneSignature;
      return undefined;
    }

    const previous = achievedMilestoneRef.current ? achievedMilestoneRef.current.split("|").filter(Boolean) : [];
    const current = achievedMilestoneSignature ? achievedMilestoneSignature.split("|").filter(Boolean) : [];
    const reachedNewMilestone = current.some((milestone) => !previous.includes(milestone));

    achievedMilestoneRef.current = achievedMilestoneSignature;

    if (!reachedNewMilestone) return undefined;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    setConfettiPieces(createConfettiPieces());
    const timeoutId = window.setTimeout(() => setConfettiPieces([]), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [achievedMilestoneSignature, isDatabaseReady]);

  const handleFormChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAddMeal = (event) => {
    event.preventDefault();
    const items = form.items.trim();
    const kcal = safeNumber(form.kcal);
    const protein = safeNumber(form.protein);
    const fibre = safeNumber(form.fibre);
    if (!items || kcal <= 0 || protein < 0 || fibre < 0) return;
    setMeals((prevMeals) => [...prevMeals, { name: form.meal, items, kcal, protein, fibre }]);
    setForm({ meal: "Snack", items: "", kcal: "", protein: "", fibre: "" });
  };

  const handleDeleteMeal = (index) => setMeals((prevMeals) => prevMeals.filter((_, i) => i !== index));
  const toggleHabit = (key) => setHabits((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleGoalFormChange = (field) => (event) => setGoalForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSaveGoals = () => {
    const nextGoals = {
      startingWeight: safeNumber(goalForm.startingWeight, defaultWeightGoals.startingWeight),
      goalWeight: safeNumber(goalForm.goalWeight, defaultWeightGoals.goalWeight),
      weeklyLossMin: Math.max(0.1, safeNumber(weightGoals.weeklyLossMin, defaultWeightGoals.weeklyLossMin)),
      weeklyLossMax: Math.max(0.1, safeNumber(weightGoals.weeklyLossMax, defaultWeightGoals.weeklyLossMax)),
    };
    setWeightGoals(nextGoals);
    setGoalForm(nextGoals);
  };

  const handleProfileFormChange = (field) => (event) => {
    const value = field === "heightCm" ? safeNumber(event.target.value, bmiProfile.heightCm) : event.target.value;
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    const nextProfile = {
      heightCm: Math.max(100, safeNumber(profileForm.heightCm, 178)),
      ethnicity: profileForm.ethnicity || "white",
    };
    setBmiProfile(nextProfile);
    setProfileForm(nextProfile);
  };

  const handleWeightFormChange = (field) => (event) => setWeightForm((prev) => ({ ...prev, [field]: event.target.value }));
  const handleAddWeight = (event) => {
    event.preventDefault();
    if (!weightForm.date || !weightForm.weight) return;
    const weight = safeNumber(weightForm.weight);
    if (weight <= 0 || weight >= 400) return;
    setWeights((prev) => sortWeightEntries(upsertWeightEntry(prev, { date: weightForm.date, weight })));
    setWeightForm({ date: "", weight: "" });
  };

  const handleDeleteWeight = (id) => setWeights((prev) => prev.filter((entry) => entry.id !== id));
  const handleBpFormChange = (field) => (event) => setBpForm((prev) => ({ ...prev, [field]: event.target.value }));
  const handleAddBloodPressure = (event) => {
    event.preventDefault();
    if (!bpForm.date || !bpForm.time || !bpForm.systolic || !bpForm.diastolic) return;
    const systolic = safeNumber(bpForm.systolic);
    const diastolic = safeNumber(bpForm.diastolic);
    const pulse = bpForm.pulse === "" ? "" : safeNumber(bpForm.pulse);
    if (systolic < 50 || systolic > 260 || diastolic < 30 || diastolic > 160) return;
    if (pulse !== "" && (pulse < 30 || pulse > 220)) return;
    setBloodPressureEntries((prev) => sortBloodPressureEntries(upsertBloodPressureEntry(prev, { ...bpForm, systolic, diastolic, pulse })));
    setBpForm({ date: "", time: "", systolic: "", diastolic: "", pulse: "", notes: "" });
  };
  const handleDeleteBloodPressure = (id) => setBloodPressureEntries((prev) => prev.filter((entry) => entry.id !== id));
  const openWeightPage = () => setCurrentPage("weight");
  const openBloodPressurePage = () => setCurrentPage("bloodPressure");
  const openDashboardPage = () => setCurrentPage("dashboard");
  const pageTitle = {
    dashboard: "Weight & food dashboard",
    weight: "Weight tracker",
    bloodPressure: "Blood pressure tracker",
  }[currentPage];
  const pageSubtitle = {
    dashboard: "Track calories, protein, fibre, hydration, supplements and weekly weight changes in one clean view.",
    weight: "Track trends, set goals, and focus on steady progress.",
    bloodPressure: "Record blood pressure readings, pulse, notes, and trends in one dedicated view.",
  }[currentPage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 p-4 text-slate-950 md:p-8">
      <ConfettiBurst pieces={confettiPieces} />
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/50 md:p-8">
          <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">
                <SparklesIcon className="h-4 w-4" />
                Mounjaro nutrition tracker
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight md:text-6xl">{pageTitle}</h1>
                <p className="mt-3 max-w-2xl text-base text-slate-300 md:text-lg">{pageSubtitle}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-slate-200 ring-1 ring-white/10">
                <span className={`h-2 w-2 rounded-full ${storageStatus.includes("Saving") || storageStatus.includes("Opening") ? "bg-amber-300" : storageStatus.includes("fallback") ? "bg-rose-300" : "bg-emerald-300"}`} />
                {storageStatus}
              </div>
              <div className="inline-flex overflow-hidden rounded-3xl border border-white/10 bg-white/10 text-sm font-semibold text-slate-200">
                <button type="button" onClick={openDashboardPage} className={`rounded-3xl px-5 py-3 transition ${currentPage === "dashboard" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Dashboard</button>
                <button type="button" onClick={openWeightPage} className={`rounded-3xl px-5 py-3 transition ${currentPage === "weight" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Weight</button>
                <button type="button" onClick={openBloodPressurePage} className={`rounded-3xl px-5 py-3 transition ${currentPage === "bloodPressure" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Blood pressure</button>
              </div>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100"><PlusIcon className="h-5 w-5" />Log food</button>
            </div>
          </div>
        </div>

        {currentPage === "dashboard" && (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              <StatCard icon={FlameIcon} label="Calories today" value={`${totals.kcal}`} sub={`${nutritionGoals.calories - totals.kcal} kcal left`} progress={(totals.kcal / nutritionGoals.calories) * 100} accent="bg-orange-100 text-orange-700" />
              <StatCard icon={BeefIcon} label="Protein" value={`${totals.protein}g`} sub={`Goal ${nutritionGoals.protein}g`} progress={(totals.protein / nutritionGoals.protein) * 100} accent="bg-rose-100 text-rose-700" />
              <StatCard icon={AppleIcon} label="Fibre" value={`${totals.fibre}g`} sub={`Goal ${nutritionGoals.fibre}g`} progress={(totals.fibre / nutritionGoals.fibre) * 100} accent="bg-emerald-100 text-emerald-700" />
              <StatCard icon={DropletsIcon} label="Water" value={`${formatDecimal(waterIntake)}L`} sub={`Goal ${nutritionGoals.water}L`} progress={(waterIntake / nutritionGoals.water) * 100} accent="bg-sky-100 text-sky-700" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 lg:col-span-2">
                <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Weight summary</h2>
                    <p className="text-sm text-slate-500">Quick trend snapshot and progress toward goal.</p>
                  </div>
                  <button type="button" onClick={openWeightPage} className="inline-flex h-fit items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Open weight page</button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Current weight</p>
                    <p className="mt-3 text-3xl font-bold text-slate-950">{currentWeight.toFixed(1)} kg</p>
                    <p className="mt-2 text-sm text-slate-500">Latest: {latestWeightEntry?.date ?? "No entries"}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Goal progress</p>
                    <p className="mt-3 text-3xl font-bold text-slate-950">{Math.round(weightProgress)}%</p>
                    <p className="mt-2 text-sm text-slate-500">{kgLost.toFixed(1)} kg lost • {kgLeft.toFixed(1)} kg left</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Ring value={Math.round(weightProgress)} max={100} label="Weight goal progress" sub={`${kgLost.toFixed(1)} kg lost, ${kgLeft.toFixed(1)} kg to target`} />
                <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-700"><TargetIcon className="h-5 w-5" /></div>
                    <div>
                      <h3 className="font-bold">Weekly target</h3>
                      <p className="text-sm text-slate-500">{weightGoals.weeklyLossMin.toFixed(1)} to {weightGoals.weeklyLossMax.toFixed(1)} kg per week</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Open the weight page to manage goals, entries, and weekly pacing.</div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 lg:col-span-2">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Today’s food log</h2>
                    <p className="text-sm text-slate-500">Designed to stop accidental under-eating on Mounjaro.</p>
                  </div>
                  <UtensilsIcon className="h-6 w-6 text-slate-400" />
                </div>
                <div className="space-y-3">
                  {meals.map((meal, index) => (
                    <div key={`${meal.name}-${index}`} className="grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <p className="font-bold">{meal.name}</p>
                        <p className="text-sm text-slate-500">{meal.items}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span className="rounded-full bg-white px-3 py-1 shadow-sm">{meal.kcal} kcal</span>
                        <span className="rounded-full bg-white px-3 py-1 shadow-sm">{meal.protein}g protein</span>
                        <span className="rounded-full bg-white px-3 py-1 shadow-sm">{meal.fibre}g fibre</span>
                        <button type="button" onClick={() => handleDeleteMeal(index)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAddMeal} className="mt-6 rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-slate-700">Add meal entry</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-500">By meal</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-sm text-slate-600">
                      Meal
                      <select value={form.meal} onChange={handleFormChange("meal")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none">
                        {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((option) => (<option key={option} value={option}>{option}</option>))}
                      </select>
                    </label>
                    <label className="block text-sm text-slate-600">
                      Food items
                      <input value={form.items} onChange={handleFormChange("items")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="e.g. turkey wrap, spinach" />
                    </label>
                    <label className="block text-sm text-slate-600">
                      Calories
                      <input value={form.kcal} onChange={handleFormChange("kcal")} type="number" min="0" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="kcal" />
                    </label>
                    <label className="block text-sm text-slate-600">
                      Protein (g)
                      <input value={form.protein} onChange={handleFormChange("protein")} type="number" min="0" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="grams" />
                    </label>
                    <label className="block text-sm text-slate-600 sm:col-span-2">
                      Fibre (g)
                      <input value={form.fibre} onChange={handleFormChange("fibre")} type="number" min="0" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="grams" />
                    </label>
                  </div>
                  <button type="submit" className="mt-4 inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Add entry</button>
                </form>
              </div>
              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-amber-100 p-3 text-amber-700"><SparklesIcon className="h-5 w-5" /></div>
                  <div>
                    <h2 className="text-2xl font-bold">Coach note</h2>
                    <p className="text-sm text-slate-500">A quick check on calories, protein and fibre.</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200">{coachNote}</div>
              </div>
            </div>
          </>
        )}

        {currentPage === "weight" && (
          <WeightPage
            sortedWeights={sortedWeights}
            weightGoals={weightGoals}
            goalForm={goalForm}
            currentWeight={currentWeight}
            latestEntry={latestWeightEntry}
            previousEntry={previousWeightEntry}
            progressPercent={weightProgress}
            kgLost={kgLost}
            kgLeft={kgLeft}
            estimatedWeeks={estimatedWeeks}
            weightForm={weightForm}
            profileForm={profileForm}
            bmiProfile={bmiProfile}
            bmi={bmi}
            bmiCategory={bmiCategory}
            bmiRange={bmiRange}
            bmiSupportText={bmiSupportText}
            bmiEthnicityNote={bmiEthnicityNote}
            onGoalFormChange={handleGoalFormChange}
            onSaveGoals={handleSaveGoals}
            onWeightFormChange={handleWeightFormChange}
            onAddWeight={handleAddWeight}
            onDeleteWeight={handleDeleteWeight}
            onProfileFormChange={handleProfileFormChange}
            onSaveProfile={handleSaveProfile}
            onBack={openDashboardPage}
          />
        )}

        {currentPage === "bloodPressure" && (
          <BloodPressurePage
            sortedEntries={sortedBloodPressureEntries}
            latestEntry={latestBloodPressureEntry}
            averageReading={bloodPressureAverage}
            bpForm={bpForm}
            onBpFormChange={handleBpFormChange}
            onAddBloodPressure={handleAddBloodPressure}
            onDeleteBloodPressure={handleDeleteBloodPressure}
            onBack={openDashboardPage}
          />
        )}
      </div>
    </div>
  );
}
