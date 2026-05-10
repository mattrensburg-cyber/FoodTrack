import { useEffect, useMemo, useRef, useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
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

const exerciseData = [
  { id: "exercise-1", date: "2026-05-04", activityType: "Walking", duration: 45, distance: "", steps: 6200, calories: "", intensity: "Light to moderate", notes: "After lunch walk" },
  { id: "exercise-2", date: "2026-05-05", activityType: "Strength training", duration: 35, distance: "", steps: "", calories: "", intensity: "Moderate", notes: "Upper body, energy good" },
];

const activityTypes = ["Walking", "Strength training", "Cycling", "Running", "Swimming", "Yoga / mobility", "General activity"];
const intensityOptions = ["Light", "Light to moderate", "Moderate", "Hard", "Very hard"];
const mounjaroStrengths = ["2.5 mg", "5 mg", "7.5 mg", "10 mg", "12.5 mg", "15 mg"];

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

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dateWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const foodCategories = ["All", "Fruit", "Vegetables", "Grains", "Legumes", "Protein", "Dairy", "Snacks"];
const defaultFoodCategories = foodCategories.filter((item) => item !== "All");

const fibreLookupPer100g = {
  oats: 10.6,
  "chia seeds": 34.4,
  chia: 34.4,
  banana: 2.6,
  blueberries: 2.4,
  raspberries: 6.5,
  apple: 2.4,
  lentils: 7.9,
  chickpeas: 7.6,
  "butter beans": 7,
  beans: 6.4,
  broccoli: 2.6,
  tomato: 1.2,
  "napa cabbage": 1.2,
  cabbage: 1.2,
  flaxseed: 27,
  "mixed nuts": 7,
  "sesame seeds": 12,
  paprika: 35,
  honey: 0,
  kefir: 0,
  "soya milk unsweetened": 0.3,
  "soy sauce": 0,
  "olive oil": 0,
  "lemon juice": 0,
  spinach: 2.2,
  potato: 2.2,
  "sweet potato": 3,
  yoghurt: 0,
  yogurt: 0,
  salmon: 0,
  chicken: 0,
  beef: 0,
  egg: 0,
};

const defaultFoodDatabase = [
  { name: "Oats", category: "Grains", kcal: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fibre: 10.6, sugar: 0.9, portion: 40, unit: "g", fibreTypes: ["Beta-glucan", "Soluble fibre"], gutHealth: "Supports beneficial gut bacteria and bowel regularity.", mounjaroNote: "Useful for fullness, but portions should still be controlled." },
  { name: "Blueberries", category: "Fruit", kcal: 45, protein: 0.7, carbs: 11, fat: 0.3, fibre: 2.4, sugar: 10, portion: 100, unit: "g", fibreTypes: ["Pectin", "Fruit skin fibre"], gutHealth: "Polyphenols support gut microbiome diversity.", mounjaroNote: "Low calorie sweet option with useful volume." },
  { name: "Chia seeds", category: "Grains", kcal: 486, protein: 17, carbs: 42, fat: 31, fibre: 34, sugar: 0, portion: 15, unit: "g", fibreTypes: ["Mucilage fibre", "Soluble fibre", "Insoluble fibre"], gutHealth: "Forms a gel that slows digestion and supports stool bulk.", mounjaroNote: "Very high fibre; increase gradually and drink enough fluid." },
  { name: "Flaxseed", category: "Grains", kcal: 530, protein: 18, carbs: 29, fat: 42, fibre: 27, sugar: 1.6, portion: 20, unit: "g", fibreTypes: ["Mucilage fibre", "Soluble fibre", "Insoluble fibre"], gutHealth: "Supports bowel regularity and may support cholesterol management.", mounjaroNote: "Calorie dense but useful in small measured portions." },
  { name: "Chickpeas", category: "Legumes", kcal: 160, protein: 8.9, carbs: 27, fat: 2.6, fibre: 7.6, sugar: 4.8, portion: 50, unit: "g", fibreTypes: ["Fermentable fibre", "Resistant starch", "Insoluble fibre"], gutHealth: "Supports gut fermentation and butyrate production.", mounjaroNote: "Good fibre and protein balance for fullness." },
  { name: "Butter beans", category: "Legumes", kcal: 90, protein: 6, carbs: 16, fat: 0.5, fibre: 7, sugar: 1, portion: 50, unit: "g", fibreTypes: ["Fermentable fibre", "Resistant starch", "Soluble fibre"], gutHealth: "Supports microbiome diversity and fullness.", mounjaroNote: "High fibre for relatively low calories." },
  { name: "Salmon", category: "Protein", kcal: 208, protein: 20, carbs: 0, fat: 13, fibre: 0, sugar: 0, portion: 113, unit: "g", fibreTypes: [], gutHealth: "No fibre, but pairs well with vegetables and legumes.", mounjaroNote: "High quality protein supports muscle retention during weight loss." },
  { name: "Eggs", category: "Protein", kcal: 143, protein: 13, carbs: 1.1, fat: 10, fibre: 0, sugar: 1.1, portion: 100, unit: "g", fibreTypes: [], gutHealth: "No fibre, but useful alongside fibre foods.", mounjaroNote: "Compact protein option when appetite is low." },
  { name: "Tenderstem broccoli", category: "Vegetables", kcal: 34, protein: 2.8, carbs: 7, fat: 0.4, fibre: 2.6, sugar: 1.7, portion: 120, unit: "g", fibreTypes: ["Insoluble fibre", "Soluble fibre"], gutHealth: "Adds cruciferous vegetable diversity and supports bowel regularity.", mounjaroNote: "High volume for low calories." },
  { name: "Kefir", category: "Dairy", kcal: 60, protein: 3.5, carbs: 4.5, fat: 3, fibre: 0, sugar: 4.5, portion: 100, unit: "g", fibreTypes: [], gutHealth: "Can provide live cultures when the product contains active cultures.", mounjaroNote: "Works well with prebiotic fibre foods." },
  { name: "Mixed nuts", category: "Snacks", kcal: 637, protein: 16.7, carbs: 20, fat: 56.7, fibre: 7, sugar: 4.7, portion: 30, unit: "g", fibreTypes: ["Nut fibre"], gutHealth: "Adds fibre and minerals but is calorie dense.", mounjaroNote: "Measure portions carefully." },
  { name: "Soya milk unsweetened", category: "Dairy", kcal: 36, protein: 3.3, carbs: 0.8, fat: 1.8, fibre: 0.3, sugar: 0.2, portion: 200, unit: "ml", fibreTypes: [], gutHealth: "Low sugar option that pairs with high fibre foods.", mounjaroNote: "Useful plant protein without many calories." },
];

const ingredientInsightLookup = {
  salmon: {
    aminoAcids: [
      { name: "Leucine", function: "Supports muscle protein synthesis and helps protect lean mass during weight loss." },
      { name: "Lysine", function: "Supports collagen formation, tissue repair, and immune function." },
    ],
    protein: "Complete protein with all essential amino acids, useful for muscle maintenance.",
    fats: "Provides omega-3 fats EPA and DHA, which support heart and brain health.",
  },
  oats: {
    fibre: [
      { name: "Beta-glucan", benefit: "A soluble fibre that can support cholesterol management and steadier post-meal glucose." },
      { name: "Insoluble fibre", benefit: "Adds bulk and supports bowel regularity." },
    ],
    carbs: "Slow-release carbohydrate that can support fullness and steady energy.",
  },
  "chia seeds": {
    fibre: [
      { name: "Mucilage fibre", benefit: "Forms a gel with fluid, supporting fullness and slower digestion." },
      { name: "Insoluble fibre", benefit: "Supports stool bulk and gut transit." },
    ],
    fats: "Rich in ALA omega-3, a plant omega-3 fat.",
  },
  chia: {
    fibre: [
      { name: "Mucilage fibre", benefit: "Forms a gel with fluid, supporting fullness and slower digestion." },
      { name: "Insoluble fibre", benefit: "Supports stool bulk and gut transit." },
    ],
    fats: "Rich in ALA omega-3, a plant omega-3 fat.",
  },
  blueberries: {
    fibre: [
      { name: "Pectin", benefit: "A soluble fibre that supports gut bacteria and digestion." },
      { name: "Fruit skin fibre", benefit: "Adds gentle bulk with relatively low calories." },
    ],
    polyphenols: "Contains anthocyanins, plant compounds linked with antioxidant activity.",
  },
  chicken: {
    aminoAcids: [
      { name: "Leucine", function: "Supports muscle protein synthesis." },
      { name: "Lysine", function: "Supports tissue repair and immune function." },
    ],
    protein: "Lean complete protein when skinless.",
  },
  beef: {
    aminoAcids: [
      { name: "Leucine", function: "Supports muscle protein synthesis and recovery." },
      { name: "Lysine", function: "Supports tissue repair, immune function, and collagen formation." },
    ],
    protein: "Complete protein with iron, zinc, and vitamin B12.",
    fats: "Fat level depends on the cut; leaner cuts keep calories tighter.",
  },
  egg: {
    aminoAcids: [
      { name: "Leucine", function: "Supports muscle protein synthesis." },
      { name: "Lysine", function: "Supports tissue repair and collagen formation." },
    ],
    protein: "Complete protein with high digestibility.",
  },
};

const initialNutriEntries = [
  { id: "nutri-1", day: "Monday", meal: "Breakfast", recipeName: "High fibre berry oat bowl", tag: "Recipe", ingredient: "Oats", grams: 40, kcal: 150, fibrePer100g: 10.6 },
  { id: "nutri-2", day: "Monday", meal: "Breakfast", recipeName: "High fibre berry oat bowl", tag: "Recipe", ingredient: "Chia seeds", grams: 12, kcal: 58, fibrePer100g: 34.4 },
  { id: "nutri-3", day: "Monday", meal: "Breakfast", recipeName: "High fibre berry oat bowl", tag: "Recipe", ingredient: "Blueberries", grams: 80, kcal: 46, fibrePer100g: 2.4 },
];

const defaultWeightGoals = {
  startingWeight: 113,
  goalWeight: 70,
  weeklyLossMin: 0.6,
  weeklyLossMax: 1.1,
};
const oldDefaultGoalWeight = 90;

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

function sortExerciseEntries(entries) {
  if (!Array.isArray(entries)) return [];
  return [...entries]
    .filter((entry) => entry?.date && entry?.activityType && Number.isFinite(Number(entry.duration)))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortMounjaroEntries(entries) {
  if (!Array.isArray(entries)) return [];
  return [...entries]
    .filter((entry) => entry?.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function sortNutriEntries(entries) {
  if (!Array.isArray(entries)) return [];
  return [...entries]
    .filter((entry) => weekDays.includes(entry?.day) && entry?.ingredient && Number.isFinite(Number(entry.grams)) && Number.isFinite(Number(entry.kcal)))
    .sort((a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day));
}

function sortNutriWeekArchives(archives) {
  if (!Array.isArray(archives)) return [];
  return [...archives]
    .filter((archive) => archive?.id && archive?.label && Array.isArray(archive.entries))
    .map((archive) => ({ ...archive, entries: sortNutriEntries(archive.entries) }))
    .sort((a, b) => new Date(b.savedAt || 0) - new Date(a.savedAt || 0));
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

function getDateWeekdayIndex(dateString) {
  const parts = parseDateParts(dateString);
  if (!parts) return -1;
  const date = new Date(`${parts.year}-${parts.month}-${parts.day}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? -1 : date.getUTCDay();
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
    brandNutritionPer100g: roundNutritionObject(item.brandNutritionPer100g),
    brandNutritionPer100ml: roundNutritionObject(item.brandNutritionPer100ml),
    brandNutritionPer20g: roundNutritionObject(item.brandNutritionPer20g),
    brandNutritionPerServing: roundNutritionObject(item.brandNutritionPerServing),
  };
}

function normalizeNutriReference(reference) {
  const ingredient = String(reference?.ingredient || "").trim();
  if (!ingredient) return null;
  return {
    id: reference.id || createId(),
    ingredient,
    ...getProductMetadata(reference),
    serving: reference.serving || "",
    nutrition: reference.nutrition && typeof reference.nutrition === "object" && !Array.isArray(reference.nutrition)
      ? {
          caloriesKcal: Number.isFinite(Number(reference.nutrition.caloriesKcal)) ? roundNutritionValue(reference.nutrition.caloriesKcal) : undefined,
          waterPercent: Number.isFinite(Number(reference.nutrition.waterPercent)) ? roundNutritionValue(reference.nutrition.waterPercent) : undefined,
          carbohydratesG: Number.isFinite(Number(reference.nutrition.carbohydratesG)) ? roundNutritionValue(reference.nutrition.carbohydratesG) : undefined,
          fibreG: Number.isFinite(Number(reference.nutrition.fibreG)) ? roundNutritionValue(reference.nutrition.fibreG) : undefined,
          sugarG: Number.isFinite(Number(reference.nutrition.sugarG)) ? roundNutritionValue(reference.nutrition.sugarG) : undefined,
          proteinG: Number.isFinite(Number(reference.nutrition.proteinG)) ? roundNutritionValue(reference.nutrition.proteinG) : undefined,
          fatG: Number.isFinite(Number(reference.nutrition.fatG)) ? roundNutritionValue(reference.nutrition.fatG) : undefined,
        }
      : {},
    keyVitaminsMinerals: Array.isArray(reference.keyVitaminsMinerals) ? reference.keyVitaminsMinerals.map(String).filter(Boolean) : [],
    fibreTypes: Array.isArray(reference.fibreTypes) ? reference.fibreTypes.map(String).filter(Boolean) : [],
    healthHighlights: Array.isArray(reference.healthHighlights) ? reference.healthHighlights.map(String).filter(Boolean) : [],
    aminoAcidProfile: reference.aminoAcidProfile && typeof reference.aminoAcidProfile === "object" && !Array.isArray(reference.aminoAcidProfile)
      ? {
          proteinQuality: reference.aminoAcidProfile.proteinQuality || "",
          keyAminoAcids: normalizeAminoAcidList(reference.aminoAcidProfile.keyAminoAcids),
        }
      : null,
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

function formatAminoAcid(amino) {
  if (typeof amino === "string") return amino;
  return amino?.name || "";
}

function sortNutriReferences(references) {
  if (!Array.isArray(references)) return [];
  return references
    .map(normalizeNutriReference)
    .filter(Boolean)
    .sort((a, b) => a.ingredient.localeCompare(b.ingredient));
}

function mergeNutriReferences(existingReferences, incomingReferences) {
  const normalizedIncoming = sortNutriReferences(incomingReferences);
  if (!normalizedIncoming.length) return sortNutriReferences(existingReferences);

  const incomingNames = new Set(normalizedIncoming.map((reference) => reference.ingredient.toLowerCase()));
  return sortNutriReferences([
    ...(Array.isArray(existingReferences) ? existingReferences : []).filter((reference) => !incomingNames.has(String(reference?.ingredient || "").toLowerCase())),
    ...normalizedIncoming,
  ]);
}

function buildReferenceFromNutriIngredient(item) {
  const ingredient = String(item?.name || item?.ingredient || "").trim();
  if (!ingredient) return null;

  const amount = safeNumber(item.amount ?? item.grams);
  const kcal = safeNumber(item.kcal);
  const unit = item.unit || "g";
  const isPer100Unit = (unit === "g" || unit === "ml") && amount > 0;
  const per100Multiplier = isPer100Unit ? 100 / amount : null;
  const protein = Number.isFinite(Number(item.protein)) ? safeNumber(item.protein) : undefined;
  const fibrePer100g = Number.isFinite(Number(item.fibrePer100g)) ? safeNumber(item.fibrePer100g) : undefined;
  const brandPer100 = item.brandNutritionPer100g || item.brandNutritionPer100ml || {};

  return normalizeNutriReference({
    ingredient,
    ...getProductMetadata(item),
    serving: isPer100Unit ? `estimated per 100${unit}` : `per ${amount || 1}${unit}`,
    nutrition: {
      caloriesKcal: Number.isFinite(Number(brandPer100.kcal)) ? safeNumber(brandPer100.kcal) : per100Multiplier ? kcal * per100Multiplier : kcal,
      proteinG: Number.isFinite(Number(brandPer100.protein_g)) ? safeNumber(brandPer100.protein_g) : per100Multiplier && Number.isFinite(protein) ? protein * per100Multiplier : protein,
      fibreG: Number.isFinite(Number(brandPer100.fibre_g)) ? safeNumber(brandPer100.fibre_g) : fibrePer100g,
      carbohydratesG: Number.isFinite(Number(brandPer100.carbohydrate_g)) ? safeNumber(brandPer100.carbohydrate_g) : Number.isFinite(Number(item.carbs ?? item.carbohydrates ?? item.carbohydrate)) && per100Multiplier ? safeNumber(item.carbs ?? item.carbohydrates ?? item.carbohydrate) * per100Multiplier : undefined,
      fatG: Number.isFinite(Number(brandPer100.fat_g)) ? safeNumber(brandPer100.fat_g) : Number.isFinite(Number(item.fat)) && per100Multiplier ? safeNumber(item.fat) * per100Multiplier : undefined,
      sugarG: Number.isFinite(Number(brandPer100.sugars_g)) ? safeNumber(brandPer100.sugars_g) : Number.isFinite(Number(item.sugar ?? item.sugars)) && per100Multiplier ? safeNumber(item.sugar ?? item.sugars) * per100Multiplier : undefined,
    },
    keyVitaminsMinerals: Object.keys(item.micronutrients || {}),
    fibreTypes: Array.isArray(item.fibreTypes) ? item.fibreTypes : [],
    healthHighlights: Array.isArray(item.healthHighlights) ? item.healthHighlights : [],
    aminoAcidProfile: item.aminoAcidProfile || null,
  });
}

function buildReferencesFromNutriItems(items) {
  if (!Array.isArray(items)) return [];
  return sortNutriReferences(items.map(buildReferenceFromNutriIngredient).filter(Boolean));
}

function buildNutriEntryFromImportItem(item, context = {}) {
  const ingredientName = String(item?.name || item?.ingredient || "").trim();
  const grams = safeNumber(item?.amount ?? item?.grams);
  const kcal = safeNumber(item?.kcal);
  if (!ingredientName || grams <= 0 || kcal < 0) {
    throw new Error(context.errorMessage || "Each ingredient needs name, amount above 0, and kcal.");
  }

  return {
    id: createId(),
    day: context.day || null,
    meal: context.meal || "",
    recipeName: context.recipeName || "",
    tag: context.tag || "",
    notes: context.notes || {},
    dailyNotes: context.dailyNotes || {},
    ingredient: ingredientName,
    grams,
    unit: item.unit || "g",
    kcal: roundNutritionValue(kcal),
    ...getProductMetadata(item),
    micronutrients: roundNutritionObject(item.micronutrients),
    protein: Number.isFinite(Number(item.protein)) ? roundNutritionValue(item.protein) : undefined,
    carbs: Number.isFinite(Number(item.carbs ?? item.carbohydrates ?? item.carbohydrate)) ? roundNutritionValue(item.carbs ?? item.carbohydrates ?? item.carbohydrate) : undefined,
    fat: Number.isFinite(Number(item.fat)) ? roundNutritionValue(item.fat) : undefined,
    sugar: Number.isFinite(Number(item.sugar ?? item.sugars)) ? roundNutritionValue(item.sugar ?? item.sugars) : undefined,
    fibreTypes: Array.isArray(item.fibreTypes) ? item.fibreTypes.map(String).filter(Boolean) : [],
    healthHighlights: Array.isArray(item.healthHighlights) ? item.healthHighlights.map(String).filter(Boolean) : [],
    aminoAcidProfile: item.aminoAcidProfile || null,
    fibrePer100g: Number.isFinite(Number(item.fibrePer100g)) ? roundNutritionValue(item.fibrePer100g) : undefined,
    fibreG: Number.isFinite(Number(item.fibreG ?? item.fibre)) ? roundNutritionValue(item.fibreG ?? item.fibre) : undefined,
  };
}

function normalizeNutriEntry(entry, fallbackDay = "Monday") {
  return {
    id: entry.id || createId(),
    day: normalizeImportDay(entry.day) || fallbackDay,
    meal: entry.meal || "",
    recipeName: entry.recipeName || "",
    tag: entry.tag || "",
    notes: entry.notes || {},
    dailyNotes: entry.dailyNotes || {},
    ingredient: entry.ingredient || "",
    grams: safeNumber(entry.grams),
    unit: entry.unit || "g",
    kcal: roundNutritionValue(entry.kcal),
    ...getProductMetadata(entry),
    micronutrients: roundNutritionObject(entry.micronutrients),
    protein: Number.isFinite(Number(entry.protein)) ? roundNutritionValue(entry.protein) : undefined,
    carbs: Number.isFinite(Number(entry.carbs)) ? roundNutritionValue(entry.carbs) : undefined,
    fat: Number.isFinite(Number(entry.fat)) ? roundNutritionValue(entry.fat) : undefined,
    sugar: Number.isFinite(Number(entry.sugar)) ? roundNutritionValue(entry.sugar) : undefined,
    fibreTypes: Array.isArray(entry.fibreTypes) ? entry.fibreTypes.map(String).filter(Boolean) : [],
    healthHighlights: Array.isArray(entry.healthHighlights) ? entry.healthHighlights.map(String).filter(Boolean) : [],
    aminoAcidProfile: entry.aminoAcidProfile || null,
    fibrePer100g: Number.isFinite(Number(entry.fibrePer100g)) ? roundNutritionValue(entry.fibrePer100g) : undefined,
    fibreG: Number.isFinite(Number(entry.fibreG)) ? roundNutritionValue(entry.fibreG) : undefined,
  };
}

function scaleNumericObjectValues(value, factor) {
  return Object.fromEntries(
    Object.entries(normalizePlainObject(value)).map(([key, item]) => [
      key,
      Number.isFinite(Number(item)) ? roundNutritionValue(safeNumber(item) * factor) : item,
    ])
  );
}

function scaleNutriEntryPortion(entry, factor) {
  const scale = safeNumber(factor, 1);
  return {
    ...entry,
    grams: Number((safeNumber(entry.grams) * scale).toFixed(2)),
    kcal: Math.round(safeNumber(entry.kcal) * scale),
    protein: Number.isFinite(Number(entry.protein)) ? Number((safeNumber(entry.protein) * scale).toFixed(1)) : entry.protein,
    carbs: Number.isFinite(Number(entry.carbs)) ? Number((safeNumber(entry.carbs) * scale).toFixed(1)) : entry.carbs,
    fat: Number.isFinite(Number(entry.fat)) ? Number((safeNumber(entry.fat) * scale).toFixed(1)) : entry.fat,
    sugar: Number.isFinite(Number(entry.sugar)) ? Number((safeNumber(entry.sugar) * scale).toFixed(1)) : entry.sugar,
    fibreG: Number.isFinite(Number(entry.fibreG)) ? Number((safeNumber(entry.fibreG) * scale).toFixed(1)) : entry.fibreG,
    micronutrients: scaleNumericObjectValues(entry.micronutrients, scale),
  };
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

function getIngredientFibrePer100g(ingredient) {
  const normalized = String(ingredient || "").trim().toLowerCase();
  if (fibreLookupPer100g[normalized] !== undefined) return fibreLookupPer100g[normalized];
  const matchedKey = Object.keys(fibreLookupPer100g).find((key) => normalized.includes(key));
  return matchedKey ? fibreLookupPer100g[matchedKey] : null;
}

function getIngredientInsights(ingredient) {
  const normalized = String(ingredient || "").trim().toLowerCase();
  if (ingredientInsightLookup[normalized]) return ingredientInsightLookup[normalized];
  const matchedKey = Object.keys(ingredientInsightLookup).find((key) => normalized.includes(key));
  return matchedKey ? ingredientInsightLookup[matchedKey] : {};
}

function getNutriReference(ingredient, references = []) {
  const normalized = String(ingredient || "").trim().toLowerCase();
  return references.find((reference) => {
    const referenceName = reference.ingredient.toLowerCase();
    return normalized === referenceName || normalized.includes(referenceName) || referenceName.includes(normalized);
  }) || null;
}

function getReferenceFibrePer100g(reference) {
  if (!reference || !Number.isFinite(Number(reference.nutrition?.fibreG))) return null;
  const serving = String(reference.serving || "").toLowerCase();
  return serving.includes("100g") || serving.includes("100ml") ? safeNumber(reference.nutrition.fibreG) : null;
}

function getReferenceServingMultiplier(entry, reference) {
  const serving = String(reference?.serving || "").toLowerCase();
  const unit = String(entry.unit || "g").toLowerCase();
  const amount = safeNumber(entry.grams);
  const match = serving.match(/per\s+(\d+(?:\.\d+)?)\s*(g|ml|tsp|tbsp|egg|eggs)/);
  if (!match) return null;

  const servingAmount = safeNumber(match[1], 1);
  const servingUnit = match[2];
  if (servingAmount <= 0) return null;
  if ((servingUnit === "egg" || servingUnit === "eggs") && unit.includes("egg")) return amount / servingAmount;
  if (servingUnit === unit || (servingUnit === "g" && unit === "g") || (servingUnit === "ml" && unit === "ml")) return amount / servingAmount;
  if ((servingUnit === "tsp" || servingUnit === "tbsp") && unit === servingUnit) return amount / servingAmount;
  return null;
}

function estimateReferenceNutrient(entry, key) {
  const value = safeNumber(entry.reference?.nutrition?.[key], NaN);
  if (!Number.isFinite(value)) return null;
  const multiplier = getReferenceServingMultiplier(entry, entry.reference);
  return multiplier === null ? null : value * multiplier;
}

function uniqueSorted(items) {
  return [...new Set(items.map((item) => String(item || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function formatMicronutrientName(key) {
  return String(key || "")
    .replace(/_g$|_mg$|_ug$/g, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function formatMicronutrientValue(key, value) {
  const suffix = String(key || "").match(/_(g|mg|ug)$/)?.[1];
  return suffix ? `${value} ${suffix}` : value;
}

function formatNutritionLabel(key) {
  const match = String(key || "").match(/^(.+?)_(g|mg|ug|ml)$/);
  const label = formatMicronutrientName(match ? match[1] : key);
  return match ? `${label} (${match[2]})` : label;
}

function formatNutritionValue(key, value) {
  const suffix = String(key || "").match(/_(g|mg|ug|ml)$/)?.[1];
  return suffix && typeof value === "number" ? `${value} ${suffix}` : String(value);
}

function getBrandNutritionBlocks(item = {}) {
  return [
    ["Per 100g", item.brandNutritionPer100g],
    ["Per 100ml", item.brandNutritionPer100ml],
    ["Per 20g", item.brandNutritionPer20g],
    ["Per serving", item.brandNutritionPerServing],
  ].filter(([, values]) => values && typeof values === "object" && Object.keys(values).length > 0);
}

function getProductImageLinks(item = {}) {
  return [
    ["Product", item.imageUrl || item.imageThumbUrl],
    ["Ingredients", item.ingredientsImageUrl],
    ["Nutrition", item.nutritionImageUrl],
  ].filter(([, url]) => String(url || "").trim());
}

function formatMicronutrientLabel(value) {
  if (typeof value !== "string") return String(value || "");
  const match = value.match(/^(.+?)_(g|mg|ug)$/);
  if (!match) return formatMicronutrientName(value);
  return `${formatMicronutrientName(value)} (${match[2]})`;
}

function calculateNutriDayProfile(analysis) {
  const vitaminsMinerals = uniqueSorted(analysis.rows.flatMap((entry) => [
    ...(entry.reference?.keyVitaminsMinerals || []).map(formatMicronutrientLabel),
    ...Object.keys(entry.micronutrients || {}).map(formatMicronutrientName),
  ]));
  const fibreTypes = uniqueSorted(analysis.rows.flatMap((entry) => [
    ...(entry.reference?.fibreTypes || []),
    ...(entry.insights.fibre || []).map((item) => item.name),
  ]));
  const aminoAcids = uniqueSorted(analysis.rows.flatMap((entry) => [
    ...(entry.reference?.aminoAcidProfile?.keyAminoAcids || []).map(formatAminoAcid),
    ...(entry.insights.aminoAcids || []).map((item) => item.name),
  ]));
  const healthHighlights = uniqueSorted(analysis.rows.flatMap((entry) => entry.reference?.healthHighlights || [])).slice(0, 6);
  const proteinEstimate = analysis.rows.reduce((sum, entry) => sum + (estimateReferenceNutrient(entry, "proteinG") || 0), 0);
  const carbsEstimate = analysis.rows.reduce((sum, entry) => sum + (estimateReferenceNutrient(entry, "carbohydratesG") || 0), 0);
  const fatEstimate = analysis.rows.reduce((sum, entry) => sum + (estimateReferenceNutrient(entry, "fatG") || 0), 0);
  const knownProteinRows = analysis.rows.filter((entry) => estimateReferenceNutrient(entry, "proteinG") !== null).length;

  const checks = [
    {
      label: "Fibre",
      value: `${analysis.totals.fibre.toFixed(1)}g`,
      target: `${nutritionGoals.fibre}g+`,
      status: analysis.totals.fibre >= nutritionGoals.fibre ? "met" : analysis.totals.fibre >= 20 ? "close" : "low",
    },
    {
      label: "Protein",
      value: knownProteinRows ? `${proteinEstimate.toFixed(1)}g` : "Needs reference data",
      target: `${nutritionGoals.protein}g goal`,
      status: !knownProteinRows ? "unknown" : proteinEstimate >= nutritionGoals.protein ? "met" : proteinEstimate >= 80 ? "close" : "low",
    },
    {
      label: "Calories",
      value: `${analysis.totals.kcal} kcal`,
      target: "Steady range",
      status: analysis.totals.kcal >= 1200 && analysis.totals.kcal <= 2200 ? "met" : "watch",
    },
    {
      label: "Micronutrient variety",
      value: `${vitaminsMinerals.length} listed`,
      target: "6+ listed",
      status: vitaminsMinerals.length >= 6 ? "met" : vitaminsMinerals.length >= 3 ? "close" : "unknown",
    },
    {
      label: "Fibre diversity",
      value: `${fibreTypes.length} types`,
      target: "3+ types",
      status: fibreTypes.length >= 3 ? "met" : fibreTypes.length >= 1 ? "close" : "unknown",
    },
    {
      label: "Amino acids",
      value: `${aminoAcids.length} listed`,
      target: "Complete sources help",
      status: aminoAcids.length >= 5 ? "met" : aminoAcids.length >= 2 ? "close" : "unknown",
    },
  ];

  return {
    vitaminsMinerals,
    fibreTypes,
    aminoAcids,
    healthHighlights,
    proteinEstimate,
    carbsEstimate,
    fatEstimate,
    knownProteinRows,
    checks,
  };
}

function getIngredientEmoji(ingredient) {
  const normalized = String(ingredient || "").trim().toLowerCase();
  if (normalized.includes("oat")) return "🥣";
  if (normalized.includes("chia") || normalized.includes("flax") || normalized.includes("sesame") || normalized.includes("seed")) return "🌱";
  if (normalized.includes("salmon")) return "🐟";
  if (normalized.includes("beef") || normalized.includes("steak") || normalized.includes("mince")) return "🥩";
  if (normalized.includes("chicken")) return "🍗";
  if (normalized.includes("egg")) return "🥚";
  if (normalized.includes("nut")) return "🥜";
  if (normalized.includes("blueberr")) return "🫐";
  if (normalized.includes("raspberr") || normalized.includes("strawberr")) return "🍓";
  if (normalized.includes("tomato")) return "🍅";
  if (normalized.includes("honey")) return "🍯";
  if (normalized.includes("oil")) return "🫒";
  if (normalized.includes("lemon")) return "🍋";
  if (normalized.includes("apple")) return "🍎";
  if (normalized.includes("lentil") || normalized.includes("bean") || normalized.includes("chickpea")) return "🫘";
  if (normalized.includes("broccoli") || normalized.includes("spinach") || normalized.includes("cabbage")) return "🥦";
  if (normalized.includes("potato")) return "🥔";
  if (normalized.includes("yoghurt") || normalized.includes("yogurt") || normalized.includes("kefir") || normalized.includes("milk")) return "🥛";
  return "🍽️";
}

function formatNutriAmount(entry) {
  const unit = String(entry.unit || "g").trim();
  if (!unit || unit === "g") return `${entry.grams}g`;
  return `${entry.grams} ${unit}`;
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekArchiveLabel(date = new Date()) {
  const end = new Date(date);
  const start = new Date(date);
  const daysSinceMonday = (date.getDay() + 6) % 7;
  start.setDate(date.getDate() - daysSinceMonday);
  return `${formatDateNumeric(getLocalDateKey(start))} to ${formatDateNumeric(getLocalDateKey(end))}`;
}

function calculateNutriAnalysis(entries, references = []) {
  const sorted = sortNutriEntries(entries);
  const totals = sorted.reduce(
    (acc, entry) => {
      const reference = getNutriReference(entry.ingredient, references);
      const referenceFibre = getReferenceFibrePer100g(reference);
      const fibrePer100g = Number.isFinite(Number(entry.fibrePer100g)) ? safeNumber(entry.fibrePer100g) : referenceFibre ?? getIngredientFibrePer100g(entry.ingredient);
      const fibre = Number.isFinite(Number(entry.fibreG)) ? safeNumber(entry.fibreG) : fibrePer100g === null ? null : (safeNumber(entry.grams) / 100) * fibrePer100g;
      return {
        kcal: acc.kcal + safeNumber(entry.kcal),
        grams: acc.grams + safeNumber(entry.grams),
        fibre: acc.fibre + (fibre || 0),
        knownFibreCount: acc.knownFibreCount + (fibre === null ? 0 : 1),
      };
    },
    { kcal: 0, grams: 0, fibre: 0, knownFibreCount: 0 }
  );

  return {
    totals,
    rows: sorted.map((entry) => {
      const reference = getNutriReference(entry.ingredient, references);
      const referenceFibre = getReferenceFibrePer100g(reference);
      const fibrePer100g = Number.isFinite(Number(entry.fibrePer100g)) ? safeNumber(entry.fibrePer100g) : referenceFibre ?? getIngredientFibrePer100g(entry.ingredient);
      const fibre = Number.isFinite(Number(entry.fibreG)) ? safeNumber(entry.fibreG) : fibrePer100g === null ? null : (safeNumber(entry.grams) / 100) * fibrePer100g;
      return { ...entry, fibrePer100g, fibre, insights: getIngredientInsights(entry.ingredient), reference };
    }),
  };
}

function getRecipeTheme(recipe) {
  const text = `${recipe.title} ${recipe.ingredients.map((entry) => entry.ingredient).join(" ")}`.toLowerCase();
  if (text.includes("salmon")) return { bg: "#dff6f4", bowl: "#0f766e", food: "#fb7185", accent: "#f97316", emoji: "🐟" };
  if (text.includes("oat") || text.includes("berry") || text.includes("chia")) return { bg: "#fef3c7", bowl: "#92400e", food: "#f8fafc", accent: "#7c3aed", emoji: "🫐" };
  if (text.includes("egg")) return { bg: "#fef9c3", bowl: "#ca8a04", food: "#fff7ed", accent: "#f59e0b", emoji: "🥚" };
  if (text.includes("chicken")) return { bg: "#dcfce7", bowl: "#166534", food: "#fed7aa", accent: "#84cc16", emoji: "🍗" };
  if (text.includes("beef")) return { bg: "#fee2e2", bowl: "#991b1b", food: "#7f1d1d", accent: "#f97316", emoji: "🥩" };
  if (text.includes("bean") || text.includes("chickpea")) return { bg: "#ede9fe", bowl: "#5b21b6", food: "#facc15", accent: "#16a34a", emoji: "🫘" };
  return { bg: "#e0f2fe", bowl: "#0369a1", food: "#f8fafc", accent: "#22c55e", emoji: "🍽️" };
}

function getRecipeImageSvg(recipe) {
  const theme = getRecipeTheme(recipe);
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650">
      <rect width="900" height="650" fill="${theme.bg}"/>
      <circle cx="170" cy="130" r="90" fill="${theme.accent}" opacity="0.25"/>
      <circle cx="755" cy="105" r="130" fill="#ffffff" opacity="0.45"/>
      <circle cx="705" cy="500" r="115" fill="${theme.accent}" opacity="0.18"/>
      <ellipse cx="450" cy="430" rx="285" ry="86" fill="#0f172a" opacity="0.12"/>
      <path d="M190 292c24 142 128 225 260 225s236-83 260-225H190z" fill="${theme.bowl}"/>
      <ellipse cx="450" cy="292" rx="270" ry="92" fill="#ffffff"/>
      <ellipse cx="450" cy="292" rx="235" ry="68" fill="${theme.food}"/>
      <circle cx="330" cy="268" r="34" fill="${theme.accent}" opacity="0.9"/>
      <circle cx="410" cy="244" r="28" fill="#22c55e" opacity="0.85"/>
      <circle cx="506" cy="270" r="38" fill="#f8fafc" opacity="0.9"/>
      <circle cx="584" cy="248" r="30" fill="${theme.accent}" opacity="0.75"/>
      <text x="450" y="170" text-anchor="middle" font-family="Arial, sans-serif" font-size="78">${theme.emoji}</text>
    </svg>
  `)}`;
}

function buildRecipeCards(entries, references = []) {
  const grouped = new Map();
  sortNutriEntries(entries)
    .filter((entry) => entry.recipeName || entry.meal)
    .filter((entry) => String(entry.tag || "").toLowerCase() !== "supplement")
    .forEach((entry) => {
      const title = entry.recipeName || `${entry.meal} recipe`;
      const key = getRecipeCardKey(entry);
      const current = grouped.get(key) || {
        id: key,
        title,
        meal: entry.meal || "Meal",
        day: entry.day,
        days: [],
        tag: entry.tag || "Recipe",
        ingredients: [],
      };
      if (!current.days.includes(entry.day)) current.days.push(entry.day);
      if (entry.day === current.day) current.ingredients.push(entry);
      grouped.set(key, current);
    });

  return [...grouped.values()].map((recipe) => ({
    ...recipe,
    imageUrl: getRecipeImageSvg(recipe),
    analysis: calculateNutriAnalysis(recipe.ingredients, references),
  })).sort((a, b) => a.title.localeCompare(b.title) || a.meal.localeCompare(b.meal));
}

function getRecipeCardKey(entry) {
  const title = entry.recipeName || `${entry.meal} recipe`;
  return `${entry.meal || ""}|${title}|${entry.tag || "Recipe"}`.toLowerCase();
}

function getFoodCategory(name) {
  const normalized = String(name || "").toLowerCase();
  if (normalized.includes("blueberr") || normalized.includes("apple") || normalized.includes("banana")) return "Fruit";
  if (normalized.includes("broccoli") || normalized.includes("cabbage") || normalized.includes("tomato") || normalized.includes("spinach")) return "Vegetables";
  if (normalized.includes("oat") || normalized.includes("chia") || normalized.includes("flax") || normalized.includes("seed")) return "Grains";
  if (normalized.includes("bean") || normalized.includes("chickpea") || normalized.includes("lentil")) return "Legumes";
  if (normalized.includes("salmon") || normalized.includes("egg") || normalized.includes("chicken") || normalized.includes("beef")) return "Protein";
  if (normalized.includes("kefir") || normalized.includes("milk") || normalized.includes("yoghurt") || normalized.includes("yogurt")) return "Dairy";
  return "Snacks";
}

function buildFoodDatabase(references = [], favorites = {}, categoryOverrides = {}, nutritionOverrides = {}, deletedFoods = {}) {
  const foods = new Map(defaultFoodDatabase.map((food) => [food.name.toLowerCase(), food]));

  references.forEach((reference) => {
    const name = reference.ingredient;
    const existing = foods.get(name.toLowerCase());
    const serving = String(reference.serving || "").toLowerCase();
    const isPer100 = serving.includes("100g") || serving.includes("100ml");
    const fromReference = isPer100
      ? {
          kcal: reference.nutrition.caloriesKcal,
          protein: reference.nutrition.proteinG,
          carbs: reference.nutrition.carbohydratesG,
          fat: reference.nutrition.fatG,
          fibre: reference.nutrition.fibreG,
          sugar: reference.nutrition.sugarG,
        }
      : {};
    const overrides = nutritionOverrides[name] || {};
    foods.set(name.toLowerCase(), {
      name,
      barcode: reference.barcode || existing?.barcode || "",
      imageUrl: reference.imageUrl || existing?.imageUrl || "",
      imageThumbUrl: reference.imageThumbUrl || existing?.imageThumbUrl || "",
      ingredientsImageUrl: reference.ingredientsImageUrl || existing?.ingredientsImageUrl || "",
      nutritionImageUrl: reference.nutritionImageUrl || existing?.nutritionImageUrl || "",
      brand: reference.brand || existing?.brand || "",
      brandName: reference.brandName || existing?.brandName || "",
      productName: reference.productName || existing?.productName || "",
      nutritionSource: reference.nutritionSource || existing?.nutritionSource || "",
      processingLevel: reference.processingLevel || existing?.processingLevel || "",
      ingredientsList: reference.ingredientsList?.length ? reference.ingredientsList : existing?.ingredientsList || [],
      brandNutritionPer100g: Object.keys(reference.brandNutritionPer100g || {}).length ? reference.brandNutritionPer100g : existing?.brandNutritionPer100g || {},
      brandNutritionPer100ml: Object.keys(reference.brandNutritionPer100ml || {}).length ? reference.brandNutritionPer100ml : existing?.brandNutritionPer100ml || {},
      brandNutritionPer20g: Object.keys(reference.brandNutritionPer20g || {}).length ? reference.brandNutritionPer20g : existing?.brandNutritionPer20g || {},
      brandNutritionPerServing: Object.keys(reference.brandNutritionPerServing || {}).length ? reference.brandNutritionPerServing : existing?.brandNutritionPerServing || {},
      category: categoryOverrides[name] || existing?.category || getFoodCategory(name),
      kcal: Number.isFinite(Number(overrides.kcal)) ? safeNumber(overrides.kcal) : safeNumber(fromReference.kcal, existing?.kcal ?? 0),
      protein: Number.isFinite(Number(overrides.protein)) ? safeNumber(overrides.protein) : safeNumber(fromReference.protein, existing?.protein ?? 0),
      carbs: Number.isFinite(Number(overrides.carbs)) ? safeNumber(overrides.carbs) : safeNumber(fromReference.carbs, existing?.carbs ?? 0),
      fat: Number.isFinite(Number(overrides.fat)) ? safeNumber(overrides.fat) : safeNumber(fromReference.fat, existing?.fat ?? 0),
      fibre: Number.isFinite(Number(overrides.fibre)) ? safeNumber(overrides.fibre) : safeNumber(fromReference.fibre, existing?.fibre ?? getIngredientFibrePer100g(name) ?? 0),
      sugar: Number.isFinite(Number(overrides.sugar)) ? safeNumber(overrides.sugar) : Number.isFinite(Number(fromReference.sugar)) ? safeNumber(fromReference.sugar) : existing?.sugar,
      portion: existing?.portion || 100,
      unit: existing?.unit || "g",
      fibreTypes: reference.fibreTypes?.length ? reference.fibreTypes : existing?.fibreTypes || [],
      gutHealth: reference.healthHighlights?.[0] || existing?.gutHealth || "No gut-health note saved yet.",
    });
  });

  Object.entries(nutritionOverrides).forEach(([name, overrides]) => {
    const key = String(name || "").toLowerCase();
    const existing = foods.get(key);
    if (!existing) return;
    foods.set(key, {
      ...existing,
      kcal: Number.isFinite(Number(overrides.kcal)) ? safeNumber(overrides.kcal) : existing.kcal,
      protein: Number.isFinite(Number(overrides.protein)) ? safeNumber(overrides.protein) : existing.protein,
      carbs: Number.isFinite(Number(overrides.carbs)) ? safeNumber(overrides.carbs) : existing.carbs,
      fat: Number.isFinite(Number(overrides.fat)) ? safeNumber(overrides.fat) : existing.fat,
      fibre: Number.isFinite(Number(overrides.fibre)) ? safeNumber(overrides.fibre) : existing.fibre,
      sugar: Number.isFinite(Number(overrides.sugar)) ? safeNumber(overrides.sugar) : existing.sugar,
    });
  });

  return [...foods.values()]
    .filter((food) => !deletedFoods[food.name])
    .map((food) => ({ ...food, favorite: Boolean(favorites[food.name]) }))
    .sort((a, b) => Number(b.favorite) - Number(a.favorite) || a.name.localeCompare(b.name));
}

function calculatePortionValue(food, key) {
  const multiplier = food.unit === "g" || food.unit === "ml" ? safeNumber(food.portion) / 100 : safeNumber(food.portion);
  return safeNumber(food[key]) * multiplier;
}

function normalizeNutriImportPayload(text) {
  const parsed = JSON.parse(text);

  if (Array.isArray(parsed?.ingredientNutritionBreakdown)) {
    const references = sortNutriReferences(parsed.ingredientNutritionBreakdown);
    if (!references.length) throw new Error("No ingredient nutrition breakdowns found.");
    return {
      kind: "references",
      references,
    };
  }

  const parsedDay = normalizeImportDay(parsed?.day);

  if (parsed?.type === "nutritrack_import" && parsedDay && Array.isArray(parsed.items)) {
    return {
      kind: "day",
      day: parsedDay,
      meal: parsed.meal || "",
      recipeName: parsed.recipeName || "",
      tag: parsed.tag || "",
      items: parsed.items.map((item) => buildNutriEntryFromImportItem(item, {
        day: parsedDay,
        meal: parsed.meal || "",
        recipeName: parsed.recipeName || "",
        tag: parsed.tag || "",
        notes: parsed.notes || {},
        errorMessage: "Each item needs ingredient, grams above 0, and kcal.",
      })),
    };
  }

  if (parsed?.meal && Array.isArray(parsed.ingredients)) {
    const fallbackDay = normalizeImportDay(parsed.day) || null;
    return {
      kind: "singleMeal",
      day: fallbackDay,
      meal: parsed.meal || "",
      recipeName: parsed.recipeName || "",
      tag: parsed.tag || "",
      items: parsed.ingredients.map((item) => buildNutriEntryFromImportItem(item, {
        day: fallbackDay,
        meal: parsed.meal || "",
        recipeName: parsed.recipeName || "",
        tag: parsed.tag || "",
        notes: parsed.notes || {},
        errorMessage: "Each supplement ingredient needs name, amount above 0, and kcal.",
      })),
    };
  }

  if (!parsedDay || !Array.isArray(parsed?.entries)) {
    throw new Error("Import must include a valid day and either entries with ingredients or type nutritrack_import with items.");
  }

  const items = parsed.entries.flatMap((entry) => {
    if (!Array.isArray(entry.ingredients)) return [];
    return entry.ingredients.map((item) => buildNutriEntryFromImportItem(item, {
        day: parsedDay,
        meal: entry.meal || "",
        recipeName: entry.recipeName || "",
        tag: entry.tag || "",
        notes: entry.notes || {},
        dailyNotes: parsed.dailyNotes || {},
      }));
  });

  if (!items.length) throw new Error("No ingredients found in the import.");

  return {
    kind: "day",
    day: parsedDay,
    meal: "",
    recipeName: "",
    tag: "",
    items,
  };
}

function formatDecimal(value, digits = 1) {
  return Number.isFinite(value) ? value.toFixed(digits) : "0.0";
}

function kgToPounds(kg) {
  return safeNumber(kg) * 2.2046226218;
}

function formatPounds(kg) {
  return `${kgToPounds(kg).toFixed(1)} lb`;
}

function formatStones(kg) {
  const totalPounds = kgToPounds(kg);
  const stones = Math.floor(totalPounds / 14);
  const pounds = totalPounds - stones * 14;
  return `${stones} st ${pounds.toFixed(1)} lb`;
}

function parseDateParts(dateString) {
  const match = String(dateString || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  return {
    year: match[1],
    month: match[2],
    day: match[3],
  };
}

function formatDateReadable(dateString) {
  const parts = parseDateParts(dateString);
  if (!parts) return String(dateString || "");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parts.day} ${monthNames[Number(parts.month) - 1] || parts.month} ${parts.year}`;
}

function formatDateNumeric(dateString) {
  const parts = parseDateParts(dateString);
  if (!parts) return String(dateString || "");
  return `${parts.day}-${parts.month}-${parts.year}`;
}

function dateToChartTime(dateString) {
  const parts = parseDateParts(dateString);
  if (!parts) return null;
  return Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
}

function formatChartTime(value) {
  const timestamp = Number(value);
  if (!Number.isFinite(timestamp)) return "";
  return formatDateNumeric(new Date(timestamp).toISOString().slice(0, 10));
}

function formatMonthLabel(dateString) {
  const parts = parseDateParts(dateString);
  if (!parts) return String(dateString || "");
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${monthNames[Number(parts.month) - 1] || parts.month} ${parts.year}`;
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

function roundNutritionValue(value) {
  return Number.isFinite(Number(value)) ? Number(Number(value).toFixed(1)) : value;
}

function roundNutritionObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      Number.isFinite(Number(item)) ? roundNutritionValue(item) : item,
    ])
  );
}

async function readDatabaseRecord(key) {
  const response = await fetch(`/api/app-state/${encodeURIComponent(key)}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("SQLite API read failed.");
  const payload = await response.json();
  return payload.value ?? null;
}

async function writeDatabaseRecord(key, value) {
  const response = await fetch(`/api/app-state/${encodeURIComponent(key)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  });
  if (!response.ok) throw new Error("SQLite API write failed.");
  return true;
}

function normalizeWeightGoals(value, fallback = defaultWeightGoals) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { ...fallback };

  const goalWeight = safeNumber(value.goalWeight, fallback.goalWeight);
  return {
    startingWeight: safeNumber(value.startingWeight, fallback.startingWeight),
    goalWeight: Math.abs(goalWeight - oldDefaultGoalWeight) < 0.01 ? defaultWeightGoals.goalWeight : goalWeight,
    weeklyLossMin: safeNumber(value.weeklyLossMin, fallback.weeklyLossMin),
    weeklyLossMax: safeNumber(value.weeklyLossMax, fallback.weeklyLossMax),
  };
}

function createFallbackAppState() {
  return {
    meals: initialMeals,
    habits: {
      weighIn: true,
      humantra: true,
      collagen: true,
      strength: false,
      mounjaro: false,
      waterGoal: false,
    },
    weightGoals: { ...defaultWeightGoals },
    bmiProfile: { heightCm: 178, ethnicity: "white" },
    weights: sortWeightEntries(weightData.map((entry) => ({ id: entry.id || createId(), date: entry.date, weight: safeNumber(entry.weight) }))),
    bloodPressureEntries: sortBloodPressureEntries(bloodPressureData.map((entry) => ({
      id: entry.id || createId(),
      date: entry.date,
      time: entry.time || "00:00",
      systolic: safeNumber(entry.systolic),
      diastolic: safeNumber(entry.diastolic),
      pulse: entry.pulse === "" || entry.pulse === undefined ? "" : safeNumber(entry.pulse),
      notes: entry.notes || "",
    }))),
    exerciseEntries: sortExerciseEntries(exerciseData.map((entry) => ({
      id: entry.id || createId(),
      date: entry.date,
      activityType: activityTypes.includes(entry.activityType) ? entry.activityType : "Walking",
      duration: safeNumber(entry.duration),
      distance: entry.distance === "" || entry.distance === undefined ? "" : safeNumber(entry.distance),
      steps: entry.steps === "" || entry.steps === undefined ? "" : safeNumber(entry.steps),
      calories: entry.calories === "" || entry.calories === undefined ? "" : safeNumber(entry.calories),
      intensity: entry.intensity || "Moderate",
      notes: entry.notes || "",
    }))),
    mounjaroEntries: [],
    nutriEntries: sortNutriEntries(initialNutriEntries.map((entry) => normalizeNutriEntry(entry))),
    nutriWeekArchives: [],
    nutriReferences: [],
    foodDatabaseFavorites: {},
    foodDatabaseCategories: {},
    foodDatabaseNutrition: {},
    foodDatabaseDeleted: {},
    nutriAutoArchivePausedLabel: "",
    mounjaroNextStrength: "2.5 mg",
    mounjaroNextStrengthStartDate: "",
  };
}

function normalizeAppState(state) {
  const fallback = createFallbackAppState();
  if (!state || typeof state !== "object" || Array.isArray(state)) return fallback;

  const weightGoals = normalizeWeightGoals(state.weightGoals, fallback.weightGoals);

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
    exerciseEntries: sortExerciseEntries((Array.isArray(state.exerciseEntries) ? state.exerciseEntries : fallback.exerciseEntries).map((entry) => ({
      id: entry.id || createId(),
      date: entry.date,
      activityType: activityTypes.includes(entry.activityType) ? entry.activityType : "Walking",
      duration: safeNumber(entry.duration),
      distance: entry.distance === "" || entry.distance === undefined ? "" : safeNumber(entry.distance),
      steps: entry.steps === "" || entry.steps === undefined ? "" : safeNumber(entry.steps),
      calories: entry.calories === "" || entry.calories === undefined ? "" : safeNumber(entry.calories),
      intensity: entry.intensity || "Moderate",
      notes: entry.notes || "",
    }))),
    mounjaroEntries: sortMounjaroEntries((Array.isArray(state.mounjaroEntries) ? state.mounjaroEntries : fallback.mounjaroEntries).map((entry) => ({
      id: entry.id || createId(),
      date: entry.date,
      strength: mounjaroStrengths.includes(entry.strength) ? entry.strength : entry.strength || "2.5 mg",
      nextStrength: mounjaroStrengths.includes(entry.nextStrength) ? entry.nextStrength : entry.nextStrength || "",
      notes: entry.notes || "",
    }))),
    nutriEntries: sortNutriEntries((Array.isArray(state.nutriEntries) ? state.nutriEntries : fallback.nutriEntries).map((entry) => normalizeNutriEntry(entry))),
    nutriWeekArchives: sortNutriWeekArchives((Array.isArray(state.nutriWeekArchives) ? state.nutriWeekArchives : fallback.nutriWeekArchives).map((archive) => ({
      id: archive.id || createId(),
      label: archive.label || "Saved week",
      savedAt: archive.savedAt || new Date().toISOString(),
      entries: sortNutriEntries((Array.isArray(archive.entries) ? archive.entries : []).map((entry) => normalizeNutriEntry(entry))),
    }))),
    nutriReferences: sortNutriReferences(Array.isArray(state.nutriReferences) ? state.nutriReferences : fallback.nutriReferences),
    foodDatabaseFavorites: state.foodDatabaseFavorites && typeof state.foodDatabaseFavorites === "object" && !Array.isArray(state.foodDatabaseFavorites) ? state.foodDatabaseFavorites : fallback.foodDatabaseFavorites,
    foodDatabaseCategories: state.foodDatabaseCategories && typeof state.foodDatabaseCategories === "object" && !Array.isArray(state.foodDatabaseCategories) ? state.foodDatabaseCategories : fallback.foodDatabaseCategories,
    foodDatabaseNutrition: state.foodDatabaseNutrition && typeof state.foodDatabaseNutrition === "object" && !Array.isArray(state.foodDatabaseNutrition) ? state.foodDatabaseNutrition : fallback.foodDatabaseNutrition,
    foodDatabaseDeleted: state.foodDatabaseDeleted && typeof state.foodDatabaseDeleted === "object" && !Array.isArray(state.foodDatabaseDeleted) ? state.foodDatabaseDeleted : fallback.foodDatabaseDeleted,
    nutriAutoArchivePausedLabel: String(state.nutriAutoArchivePausedLabel || ""),
    mounjaroNextStrength: mounjaroStrengths.includes(state.mounjaroNextStrength) ? state.mounjaroNextStrength : fallback.mounjaroNextStrength,
    mounjaroNextStrengthStartDate: /^\d{4}-\d{2}-\d{2}$/.test(String(state.mounjaroNextStrengthStartDate || "")) ? state.mounjaroNextStrengthStartDate : "",
  };
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

function getTodayWeekDay() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long" });
}

function calculateNutriDashboardTotals(entries, references = [], day = getTodayWeekDay()) {
  const entriesForDay = sortNutriEntries(entries).filter((entry) => entry.day === day);
  const analysis = calculateNutriAnalysis(entriesForDay, references);
  const protein = analysis.rows.reduce((sum, entry) => {
    if (Number.isFinite(Number(entry.protein))) return sum + safeNumber(entry.protein);
    return sum + (estimateReferenceNutrient(entry, "proteinG") || 0);
  }, 0);

  return {
    day,
    kcal: Math.round(analysis.totals.kcal),
    protein: Number(protein.toFixed(1)),
    fibre: Number(analysis.totals.fibre.toFixed(1)),
    entries: entriesForDay.length,
  };
}

function getNutriMealGroupKey(entry) {
  return [
    entry.day || "",
    String(entry.meal || "").trim().toLowerCase(),
    String(entry.recipeName || "").trim().toLowerCase(),
    String(entry.tag || "").trim().toLowerCase(),
  ].join("|");
}

function mergeNutriEntriesForImport(existingEntries, incomingEntries) {
  const incomingGroupKeys = new Set(incomingEntries.map(getNutriMealGroupKey));
  return sortNutriEntries([
    ...existingEntries.filter((entry) => !incomingGroupKeys.has(getNutriMealGroupKey(entry))),
    ...incomingEntries,
  ]);
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
      pace: null,
      daysTracked,
      kgLostForPace,
      detail: daysTracked > 0
        ? `${kgLostForPace.toFixed(1)} kg logged over ${Math.round(daysTracked)} day${Math.round(daysTracked) === 1 ? "" : "s"}. Pace will show after at least 7 days of readings.`
        : "Add at least a week of weight entries to judge pace properly.",
    };
  }

  if (max > 0 && weeklyPace > max) {
    return {
      status: "fast",
      label: "Losing faster than planned",
      pace: weeklyPace,
      daysTracked,
      kgLostForPace,
      detail: "Your average pace is above your saved weekly max. Check calories, protein, hydration and how you feel.",
    };
  }

  if (min > 0 && weeklyPace < min) {
    return {
      status: "slow",
      label: "Slower than target range",
      pace: weeklyPace,
      daysTracked,
      kgLostForPace,
      detail: "Your trend is below your saved weekly min. Normal fluctuations happen, so review the pattern over time.",
    };
  }

  return {
    status: "steady",
    label: "Within target pace",
    pace: weeklyPace,
    daysTracked,
    kgLostForPace,
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

function WeightStatValue({ kg }) {
  return (
    <span className="block">
      <span className="block">{kg.toFixed(1)} kg</span>
      <span className="mt-1 block text-sm font-semibold text-slate-500">{formatPounds(kg)} / {formatStones(kg)}</span>
    </span>
  );
}

function SmallImperialValue({ kg, suffix = "" }) {
  return (
    <span className="mt-1 block text-sm font-semibold opacity-70">
      {formatPounds(kg)}{suffix} / {formatStones(kg)}{suffix}
    </span>
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
  const start = safeNumber(weightGoals.startingWeight);
  const target = safeNumber(weightGoals.goalWeight);
  const goalLoss = Math.max(0, start - target);
  if (!goalLoss || !sorted.length) return [];

  const milestones = [5, 10, 25, 50, 70, 90, 100].map((percent) => ({
    percent,
    targetWeight: start - goalLoss * (percent / 100),
  }));

  return milestones
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

function getMounjaroDoseStartMarkers(entries) {
  const sorted = sortMounjaroEntries(entries);
  const markers = [];
  let previousStrength = "";

  sorted.forEach((entry) => {
    const strength = String(entry.strength || "").trim();
    if (!entry.date || !strength || strength === previousStrength) return;
    previousStrength = strength;
    markers.push({ date: entry.date, strength });
  });

  return markers;
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
  mounjaroDoseMarkers = [],
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
  const bodyWeightLossPercent = weightGoals.startingWeight > 0 ? clampPercentage((kgLost / weightGoals.startingWeight) * 100) : 0;
  const goalMilestonePercents = [5, 10, 25, 50, 70, 90, 100];
  const goalMilestoneCards = goalMilestonePercents.map((percent) => {
    const start = safeNumber(weightGoals.startingWeight);
    const target = safeNumber(weightGoals.goalWeight);
    const goalLoss = Math.max(0, start - target);
    const milestoneWeight = goalLoss > 0 ? start - goalLoss * (percent / 100) : start;
    return {
      percent,
      milestoneWeight,
      achieved: progressPercent >= percent,
    };
  });
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
  const weightChartData = sortedWeights
    .map((entry) => ({ ...entry, chartTime: dateToChartTime(entry.date) }))
    .filter((entry) => Number.isFinite(entry.chartTime));
  const mounjaroDoseChartMarkers = mounjaroDoseMarkers
    .map((marker) => ({ ...marker, chartTime: dateToChartTime(marker.date) }))
    .filter((marker) => Number.isFinite(marker.chartTime));
  const reachedMilestoneChartPoints = reachedMilestonePoints
    .map((milestone) => ({ ...milestone, chartTime: dateToChartTime(milestone.date) }))
    .filter((milestone) => Number.isFinite(milestone.chartTime));
  const weightChartTimes = [
    ...weightChartData.map((entry) => entry.chartTime),
    ...mounjaroDoseChartMarkers.map((marker) => marker.chartTime),
  ];
  const weightChartDomain = weightChartTimes.length
    ? [Math.min(...weightChartTimes), Math.max(...weightChartTimes)]
    : ["auto", "auto"];
  const weightHistoryRows = sortedWeights
    .map((entry, index) => {
      const previousWeight = index > 0 ? safeNumber(sortedWeights[index - 1].weight) : safeNumber(weightGoals.startingWeight);
      const changeFromPrevious = previousWeight - safeNumber(entry.weight);
      return { entry, changeFromPrevious };
    })
    .reverse();

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
        <StatCard icon={ScaleIcon} label="Current weight" value={<WeightStatValue kg={currentWeight} />} sub={latestEntry ? latestEntry.date : "No entries"} accent="bg-slate-100 text-slate-700" />
        <StatCard icon={TargetIcon} label="Starting weight" value={<WeightStatValue kg={weightGoals.startingWeight} />} sub="Starting reference" accent="bg-indigo-100 text-indigo-700" />
        <StatCard icon={SparklesIcon} label="Goal weight" value={<WeightStatValue kg={weightGoals.goalWeight} />} sub="Target to hit" accent="bg-emerald-100 text-emerald-700" />
        <StatCard icon={FlameIcon} label="Total lost" value={<WeightStatValue kg={kgLost} />} sub="Since start" accent="bg-rose-100 text-rose-700" />
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
              <LineChart data={weightChartData} margin={{ top: 48, right: 28, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="chartTime"
                  type="number"
                  domain={weightChartDomain}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatChartTime}
                />
                <YAxis domain={["dataMin - 1", "dataMax + 1"]} tickLine={false} axisLine={false} />
                <Tooltip labelFormatter={formatChartTime} />
                {mounjaroDoseChartMarkers.map((marker) => (
                  <ReferenceLine
                    key={`${marker.date}-${marker.strength}`}
                    x={marker.chartTime}
                    stroke="#16a34a"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    label={{
                      value: marker.strength,
                      position: "top",
                      fill: "#166534",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  />
                ))}
                <Line type="monotone" dataKey="weight" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                {reachedMilestoneChartPoints.map((milestone) => (
                  <ReferenceDot
                    key={`${milestone.percent}-${milestone.date}`}
                    x={milestone.chartTime}
                    y={milestone.weight}
                    r={0}
                    fill="transparent"
                    stroke="transparent"
                    strokeWidth={0}
                    label={<MilestoneBubble percent={milestone.percent} />}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {goalMilestoneCards.map((milestone) => (
          <div
            key={milestone.percent}
            className={`rounded-2xl border p-4 shadow-sm transition ${
              milestone.achieved
                ? "border-emerald-300 bg-emerald-50 text-emerald-950 shadow-emerald-100"
                : "border-slate-200 bg-white/80 text-slate-600 shadow-slate-200/50"
            }`}
          >
            <p className="text-xs font-semibold uppercase text-current opacity-70">Milestone</p>
            <p className="mt-2 text-2xl font-black">{milestone.percent}%</p>
            <p className="mt-2 text-xs font-semibold">
              {milestone.achieved ? "Achieved" : `${milestone.milestoneWeight.toFixed(1)} kg`}
            </p>
          </div>
        ))}
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
                <p className="mt-2 text-3xl font-bold">{paceCheck.pace === null ? "--" : `${paceCheck.pace.toFixed(1)} kg/week`}</p>
                {paceCheck.pace !== null ? <SmallImperialValue kg={paceCheck.pace} suffix="/week" /> : <span className="mt-1 block text-sm font-semibold opacity-70">Needs 7 days of data</span>}
              </div>
              <p className="text-sm leading-7 opacity-85">{paceCheck.detail}</p>
            </div>
        </div>

        <div className="flex h-full flex-col rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
            <h3 className="text-xl font-semibold text-slate-950">Progress</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Progress to {weightGoals.goalWeight.toFixed(1)} kg goal</p>
                <p className="mt-3 text-3xl font-bold text-slate-950">{Math.round(progressPercent)}%</p>
                <p className="mt-2 text-xs font-semibold text-slate-500">{bodyWeightLossPercent.toFixed(1)}% body weight lost</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">kg left</p>
                <p className="mt-3 text-3xl font-bold text-slate-950">{kgLeft.toFixed(1)} kg</p>
                <SmallImperialValue kg={kgLeft} />
              </div>
            </div>
            <div className="mt-5 grid gap-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-700">{kgLost.toFixed(1)} kg lost</p>
                <SmallImperialValue kg={kgLost} />
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
              {weightHistoryRows.map(({ entry, changeFromPrevious }) => (
                <tr key={entry.id}>
                  <td className="px-3 py-3">{formatDateReadable(entry.date)}</td>
                  <td className="px-3 py-3">
                    <span className="font-semibold">{entry.weight.toFixed(1)} kg</span>
                    <span className="mt-1 block text-xs font-semibold text-slate-500">{formatPounds(entry.weight)} / {formatStones(entry.weight)}</span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">
                    <span className="font-semibold">{changeFromPrevious > 0 ? `${changeFromPrevious.toFixed(1)} kg lost` : changeFromPrevious < 0 ? `${Math.abs(changeFromPrevious).toFixed(1)} kg gained` : "No change"}</span>
                    {changeFromPrevious !== 0 && <span className="mt-1 block text-xs font-semibold text-slate-500">{formatPounds(Math.abs(changeFromPrevious))} / {formatStones(Math.abs(changeFromPrevious))}</span>}
                  </td>
                  <td className="px-3 py-3">
                    <button type="button" onClick={() => onDeleteWeight(entry.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">Delete</button>
                  </td>
                </tr>
              ))}
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
            <div className="mt-5">
              <button type="button" onClick={onSaveGoals} className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 sm:w-auto">Save goals</button>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-700">Goal preview</h4>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                <div className="rounded-2xl bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500">Current BMI</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{bmi.toFixed(1)}</p>
                  <p className="text-xs text-slate-400">Current weight</p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-3 text-center">
                  <p className="text-xs text-slate-500">Goal BMI</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{calculateBMI(weightGoals.goalWeight, bmiProfile.heightCm).toFixed(1)}</p>
                  <p className="text-xs text-slate-400">At {weightGoals.goalWeight.toFixed(1)} kg</p>
                </div>

                <div className="rounded-2xl bg-rose-50 p-3 text-center">
                  <p className="text-xs text-slate-500">To lose</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{Math.max(0, (currentWeight - weightGoals.goalWeight)).toFixed(0)} kg</p>
                  <p className="text-xs text-slate-400">To goal</p>
                </div>

                <div className="rounded-2xl bg-sky-50 p-3 text-center">
                  <p className="text-xs text-slate-500">Estimate</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{estimatedWeeks.fast} to {estimatedWeeks.slow} <span className="text-xs">weeks</span></p>
                  <p className="text-xs text-slate-400">At target pace</p>
                </div>

                <div className="rounded-2xl bg-white p-3 text-center ring-1 ring-slate-100">
                  <p className="text-xs text-slate-500">Healthy range</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{bmiRange.lower}-{bmiRange.upper}</p>
                  <p className="text-xs text-slate-400">kg for height</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">First 5% loss</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{(weightGoals.startingWeight * 0.95).toFixed(1)} kg</p>
                  <p className="text-xs text-slate-400">Remaining {Math.max(0, (weightGoals.startingWeight * 0.95) - currentWeight).toFixed(1)} kg</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">10% loss</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{(weightGoals.startingWeight * 0.9).toFixed(1)} kg</p>
                  <p className="text-xs text-slate-400">Remaining {Math.max(0, (weightGoals.startingWeight * 0.9) - currentWeight).toFixed(1)} kg</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Under BMI 35</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{calculateHealthyWeightRange(bmiProfile.heightCm).upper.toFixed(1)} kg</p>
                  <p className="text-xs text-slate-400">BMI milestone</p>
                </div>
              </div>
            </div>
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

function ExercisePage({ entries, exerciseForm, onExerciseFormChange, onAddExercise, onDeleteExercise, onBack }) {
  const totalDuration = entries.reduce((sum, entry) => sum + safeNumber(entry.duration), 0);
  const totalSteps = entries.reduce((sum, entry) => sum + safeNumber(entry.steps), 0);
  const totalCalories = entries.reduce((sum, entry) => sum + safeNumber(entry.calories), 0);
  const latestEntry = entries.length ? entries[entries.length - 1] : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-500">Exercise</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">Track movement, training, and general activity.</h2>
          <p className="mt-3 text-sm text-slate-500">Log walking, strength, cycling, running, swimming, yoga, steps, intensity and notes.</p>
        </div>
        <div className="flex items-end justify-end">
          <button type="button" onClick={onBack} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Back to dashboard</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={SparklesIcon} label="Latest activity" value={latestEntry?.activityType || "No activity"} sub={latestEntry ? formatDateNumeric(latestEntry.date) : "Add an entry"} accent="bg-violet-100 text-violet-700" />
        <StatCard icon={FlameIcon} label="Total duration" value={`${totalDuration} min`} sub="All logged activity" accent="bg-orange-100 text-orange-700" />
        <StatCard icon={TargetIcon} label="Steps" value={totalSteps ? `${totalSteps}` : "--"} sub="Walking/general activity" accent="bg-emerald-100 text-emerald-700" />
        <StatCard icon={DropletsIcon} label="Calories burned" value={totalCalories ? `${totalCalories}` : "--"} sub="Optional estimate" accent="bg-sky-100 text-sky-700" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.5fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-700">Add exercise</p>
            <p className="text-xs text-slate-500">Track the activity side of the picture.</p>
          </div>
          <form onSubmit={onAddExercise} className="grid gap-4">
            <label className="block text-sm text-slate-600">
              Date
              <input type="date" value={exerciseForm.date} onChange={onExerciseFormChange("date")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" />
            </label>
            <label className="block text-sm text-slate-600">
              Activity type
              <select value={exerciseForm.activityType} onChange={onExerciseFormChange("activityType")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none">
                {activityTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-600">
                Duration
                <input type="number" min="1" value={exerciseForm.duration} onChange={onExerciseFormChange("duration")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="minutes" />
              </label>
              <label className="block text-sm text-slate-600">
                Intensity
                <select value={exerciseForm.intensity} onChange={onExerciseFormChange("intensity")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none">
                  {intensityOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-sm text-slate-600">
                Distance
                <input type="number" min="0" step="0.1" value={exerciseForm.distance} onChange={onExerciseFormChange("distance")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="km optional" />
              </label>
              <label className="block text-sm text-slate-600">
                Steps
                <input type="number" min="0" value={exerciseForm.steps} onChange={onExerciseFormChange("steps")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="optional" />
              </label>
              <label className="block text-sm text-slate-600">
                Calories
                <input type="number" min="0" value={exerciseForm.calories} onChange={onExerciseFormChange("calories")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="optional" />
              </label>
            </div>
            <label className="block text-sm text-slate-600">
              Notes
              <input value={exerciseForm.notes} onChange={onExerciseFormChange("notes")} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="e.g. upper body, energy good" />
            </label>
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Add exercise</button>
          </form>
        </div>

        <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <h3 className="text-xl font-semibold text-slate-950">Exercise history</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead>
                <tr>
                  <th className="px-3 py-3 font-semibold text-slate-500">Date</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Activity</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Duration</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Distance</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Steps</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Intensity</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Calories</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Notes</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-3 py-3">{formatDateNumeric(entry.date)}</td>
                    <td className="px-3 py-3 font-semibold">{entry.activityType}</td>
                    <td className="px-3 py-3">{entry.duration} min</td>
                    <td className="px-3 py-3">{entry.distance === "" ? "--" : `${entry.distance} km`}</td>
                    <td className="px-3 py-3">{entry.steps || "--"}</td>
                    <td className="px-3 py-3">{entry.intensity}</td>
                    <td className="px-3 py-3">{entry.calories === "" ? "--" : entry.calories}</td>
                    <td className="px-3 py-3 text-slate-600">{entry.notes || "--"}</td>
                    <td className="px-3 py-3"><button type="button" onClick={() => onDeleteExercise(entry.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function MounjaroPage({ entries, nextStrength, nextStrengthStartDate, onSelectNextStrength, onSelectNextStrengthStartDate, onConfirmInjectionDate, onDeleteEntry, onBack }) {
  const [editingStartDateFor, setEditingStartDateFor] = useState("");
  const sortedEntries = sortMounjaroEntries(entries);
  const latestEntry = sortedEntries.length ? sortedEntries[sortedEntries.length - 1] : null;
  const injectionDates = new Set(sortedEntries.map((entry) => entry.date));
  const todayKey = getLocalDateKey(new Date());
  const currentStrength = latestEntry?.strength || "2.5 mg";
  const injectionScheduleDates = (() => {
    const today = new Date();
    const treatmentStart = new Date("2026-05-01T00:00:00");
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const start = monthStart < treatmentStart ? treatmentStart : monthStart;
    const daysToShow = Math.max(0, Math.floor((monthEnd - start) / 86400000) + 1);
    return Array.from({ length: daysToShow }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return getLocalDateKey(date);
    }).filter((date) => getDateWeekdayIndex(date) === 5);
  })();
  const nextInjectionDate = injectionScheduleDates.find((date) => date >= todayKey && !injectionDates.has(date))
    || injectionScheduleDates.find((date) => !injectionDates.has(date))
    || injectionScheduleDates[injectionScheduleDates.length - 1]
    || "";
  const strengthForDate = (date) => nextStrengthStartDate && date >= nextStrengthStartDate ? nextStrength : currentStrength;
  const historyGroups = [...sortedEntries].reverse().reduce((groups, entry) => {
    const key = String(entry.date || "").slice(0, 7);
    const existing = groups.find((group) => group.key === key);
    if (existing) existing.entries.push(entry);
    else groups.push({ key, label: formatMonthLabel(entry.date), entries: [entry] });
    return groups;
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">Mounjaro</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">Track injection days and strength changes.</h2>
          <p className="mt-3 text-sm text-slate-500">Log each injection date, the strength started, and the next planned strength.</p>
        </div>
        <div className="flex items-end justify-end">
          <button type="button" onClick={onBack} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Back to dashboard</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={SparklesIcon} label="Latest injection" value={latestEntry ? formatDateNumeric(latestEntry.date) : "--"} sub={latestEntry ? latestEntry.strength : "No injections logged"} accent="bg-emerald-100 text-emerald-700" />
        <StatCard icon={TargetIcon} label="Current strength" value={latestEntry?.strength || "--"} sub="Strength started" accent="bg-sky-100 text-sky-700" />
        <StatCard icon={FlameIcon} label="Next strength" value={latestEntry?.nextStrength || "--"} sub="Planned next step" accent="bg-amber-100 text-amber-700" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <h3 className="text-xl font-semibold text-slate-950">Next Strength</h3>
          <p className="mt-2 text-sm text-slate-500">Pick the next strength and the date it starts. Earlier Fridays stay on the previous strength.</p>
          <div className="mt-5 grid gap-3">
            {mounjaroStrengths.map((strength) => {
              const selected = nextStrength === strength;
              const isEditingDate = editingStartDateFor === strength;
              return (
                <div
                  key={strength}
                  className={`flex items-center justify-between gap-3 rounded-2xl p-4 text-left ring-1 transition ${selected ? "bg-emerald-50 text-emerald-950 ring-emerald-200" : "bg-slate-50 text-slate-700 ring-slate-100 hover:bg-white"}`}
                >
                  <button type="button" onClick={() => onSelectNextStrength(strength)} className="flex items-center gap-3 text-left">
                    <span className={`inline-grid h-7 w-7 place-items-center rounded-full border text-sm font-black ${selected ? "border-emerald-500 bg-emerald-600 text-white" : "border-slate-300 bg-white text-transparent"}`}>{selected ? "✓" : ""}</span>
                    <span className="font-bold">{strength}</span>
                  </button>
                  {isEditingDate ? (
                    <input
                      type="date"
                      value={selected ? nextStrengthStartDate : ""}
                      onChange={(event) => {
                        onSelectNextStrength(strength);
                        onSelectNextStrengthStartDate(event.target.value);
                      }}
                      onBlur={() => setEditingStartDateFor("")}
                      autoFocus
                      className="w-36 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm focus:border-emerald-400 focus:outline-none"
                      aria-label={`${strength} start date`}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectNextStrength(strength);
                        setEditingStartDateFor(strength);
                      }}
                      className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-500 ring-1 ring-slate-100 transition hover:text-emerald-700 hover:ring-emerald-200"
                    >
                      {selected && nextStrengthStartDate ? formatDateNumeric(nextStrengthStartDate) : "Set date"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <h3 className="text-xl font-semibold text-slate-950">Injection days</h3>
          <p className="mt-2 text-sm text-slate-500">Friday injection days for this month. Click a circle to confirm it.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {injectionScheduleDates.map((date) => {
              const hasInjection = injectionDates.has(date);
              return (
                <div key={date} className={`rounded-2xl p-4 text-center ring-1 ${hasInjection ? "bg-emerald-50 text-emerald-950 ring-emerald-200" : "bg-white text-slate-700 ring-emerald-200"}`}>
                  <p className="text-xs font-semibold text-slate-500">Friday</p>
                  <p className="mt-1 text-sm font-bold">{formatDateNumeric(date)}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">{strengthForDate(date)}</p>
                  <button
                    type="button"
                    onClick={() => !hasInjection && onConfirmInjectionDate(date, strengthForDate(date))}
                    disabled={hasInjection}
                    className={`mt-3 inline-grid h-11 w-11 place-items-center rounded-full border text-xl font-black transition ${
                      hasInjection
                        ? "cursor-default border-emerald-500 bg-emerald-600 text-white"
                        : "border-emerald-300 bg-white text-emerald-600 hover:bg-emerald-50"
                    }`}
                    aria-label={hasInjection ? `Injection confirmed for ${formatDateNumeric(date)}` : `Confirm injection for ${formatDateNumeric(date)}`}
                  >
                    {hasInjection ? "✓" : ""}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3">
            {historyGroups.map((group, index) => (
              <details key={group.key} open={index === 0} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <summary className="cursor-pointer font-semibold text-slate-950">
                  {group.label} / {group.entries.length} injection{group.entries.length === 1 ? "" : "s"}
                </summary>
                <div className="mt-3 overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-700">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 font-semibold text-slate-500">Date</th>
                        <th className="px-3 py-3 font-semibold text-slate-500">Strength</th>
                        <th className="px-3 py-3 font-semibold text-slate-500">Notes</th>
                        <th className="px-3 py-3 font-semibold text-slate-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {group.entries.map((entry) => (
                        <tr key={entry.id}>
                          <td className="px-3 py-3 font-semibold">{formatDateNumeric(entry.date)}</td>
                          <td className="px-3 py-3">{entry.strength}</td>
                          <td className="px-3 py-3 text-slate-600">{entry.notes || "--"}</td>
                          <td className="px-3 py-3"><button type="button" onClick={() => onDeleteEntry(entry.id)} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-100 transition hover:bg-slate-100">Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ))}
            {!sortedEntries.length && <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 ring-1 ring-slate-100">No Mounjaro injections logged yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsiblePanel({ title, subtitle, meta, defaultOpen = true, children }) {
  return (
    <details open={defaultOpen} className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
            {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
          </div>
          {meta && <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 ring-1 ring-emerald-100">{meta}</div>}
        </div>
      </summary>
      <div className="mt-5">
        {children}
      </div>
    </details>
  );
}

function NutriTrackPage({
  nutriEntries,
  nutriWeekArchives,
  nutriReferences,
  selectedDay,
  nutriImportStatus,
  onSelectDay,
  onDeleteNutriEntry,
  onUpdateNutriEntry,
  onScaleNutriEntries,
  onSaveNutriWeek,
  onEditNutriWeek,
  onBack,
}) {
  const entriesForDay = sortNutriEntries(nutriEntries).filter((entry) => entry.day === selectedDay);
  const [halveSelection, setHalveSelection] = useState([]);
  const analysis = calculateNutriAnalysis(entriesForDay, nutriReferences);
  const dayTotals = analysis.totals;
  const dayProfile = calculateNutriDayProfile(analysis);
  const checkClassNames = {
    met: "bg-emerald-50 text-emerald-900 ring-emerald-100",
    close: "bg-amber-50 text-amber-900 ring-amber-100",
    low: "bg-rose-50 text-rose-900 ring-rose-100",
    watch: "bg-sky-50 text-sky-900 ring-sky-100",
    unknown: "bg-slate-50 text-slate-700 ring-slate-100",
  };
  const selectedHalveIds = halveSelection.filter((id) => entriesForDay.some((entry) => entry.id === id));
  const allDayEntryIds = entriesForDay.map((entry) => entry.id);
  const allSelected = allDayEntryIds.length > 0 && allDayEntryIds.every((id) => selectedHalveIds.includes(id));
  const toggleHalveSelection = (id) => {
    setHalveSelection((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };
  const selectAllForHalving = () => setHalveSelection(allDayEntryIds);
  const clearHalving = () => setHalveSelection([]);
  const halveSelected = () => {
    if (!selectedHalveIds.length) return;
    onScaleNutriEntries(selectedHalveIds, 0.5);
    setHalveSelection([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500">NutriTrack</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">Import ingredients and review fibre by ingredient.</h2>
          <p className="mt-3 text-sm text-slate-500">Paste the ChatGPT JSON import, then review the day totals and NutriAnalysis without entering ingredients manually.</p>
        </div>
        <div className="flex items-end justify-end">
          <button type="button" onClick={onBack} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Back to dashboard</button>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-7">
        {weekDays.map((day) => {
          const count = nutriEntries.filter((entry) => entry.day === day).length;
          return (
            <button key={day} type="button" onClick={() => onSelectDay(day)} className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${selectedDay === day ? "bg-slate-950 text-white shadow-lg" : "bg-white/80 text-slate-700 ring-1 ring-slate-100 hover:bg-slate-50"}`}>
              <span className="block">{day.slice(0, 3)}</span>
              <span className="mt-1 block text-xs opacity-70">{count} item{count === 1 ? "" : "s"}</span>
            </button>
          );
        })}
      </div>

      <CollapsiblePanel
        title={selectedDay}
        subtitle="Imported ingredients eaten."
        meta={`${dayTotals.kcal} kcal / ${dayTotals.fibre.toFixed(1)}g fibre`}
      >
          <div className="flex justify-end">
            <button type="button" onClick={onSaveNutriWeek} disabled={!nutriEntries.length} className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">
              Save current week
            </button>
          </div>
          <div className="mt-5 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-950">Daily nutrient profile</h4>
                <p className="mt-1 text-sm text-slate-500">Summary from imported foods and saved nutrition breakdowns.</p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                {dayProfile.knownProteinRows ? `${dayProfile.proteinEstimate.toFixed(1)}g protein est.` : "Protein needs reference data"}
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {dayProfile.checks.map((check) => (
                <div key={check.label} className={`rounded-2xl p-4 text-sm ring-1 ${checkClassNames[check.status] || checkClassNames.unknown}`}>
                  <p className="font-semibold">{check.label}</p>
                  <p className="mt-2 text-2xl font-bold">{check.value}</p>
                  <p className="mt-1 opacity-75">{check.target}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                <p className="font-semibold text-slate-950">Vitamins & minerals</p>
                <p className="mt-2">{dayProfile.vitaminsMinerals.length ? dayProfile.vitaminsMinerals.slice(0, 10).join(", ") : "Paste an ingredient nutrition breakdown to show this."}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                <p className="font-semibold text-slate-950">Amino acids</p>
                <p className="mt-2">{dayProfile.aminoAcids.length ? dayProfile.aminoAcids.join(", ") : "Add protein reference foods to show this."}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                <p className="font-semibold text-slate-950">Fibre profile</p>
                <p className="mt-2">{dayProfile.fibreTypes.length ? dayProfile.fibreTypes.join(", ") : "Import fibre-type reference data to show this."}</p>
              </div>
            </div>
            {dayProfile.healthHighlights.length > 0 && (
              <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                <p className="font-semibold text-slate-950">Healthy day notes</p>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {dayProfile.healthHighlights.map((highlight) => <p key={highlight}>{highlight}</p>)}
                </div>
              </div>
            )}
            {dayProfile.knownProteinRows > 0 && (
              <p className="mt-4 text-xs font-semibold text-slate-500">
                Estimated macros from matched reference data: {dayProfile.carbsEstimate.toFixed(1)}g carbs / {dayProfile.fatEstimate.toFixed(1)}g fat / {dayProfile.proteinEstimate.toFixed(1)}g protein.
              </p>
            )}
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-3xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-950">Adjust imported ingredients</p>
              <p className="mt-1 text-slate-500">Tick the ingredients to halve, untick anything you want to keep full size, or edit amount and kcal directly.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={allSelected ? clearHalving : selectAllForHalving} disabled={!entriesForDay.length} className="rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50">
                {allSelected ? "Clear ticks" : "Tick all"}
              </button>
              <button type="button" onClick={halveSelected} disabled={!selectedHalveIds.length} className="rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                Halve selected
              </button>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead>
                <tr>
                  <th className="px-3 py-3 font-semibold text-slate-500">Half?</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Meal</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Ingredient</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Amount</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Kcal</th>
                  <th className="px-3 py-3 font-semibold text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {entriesForDay.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-3 py-3">
                      <input type="checkbox" checked={selectedHalveIds.includes(entry.id)} onChange={() => toggleHalveSelection(entry.id)} className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" aria-label={`Select ${entry.ingredient} for halving`} />
                    </td>
                    <td className="px-3 py-3">{entry.meal || "--"}</td>
                    <td className="px-3 py-3 font-semibold"><span className="mr-2" aria-hidden="true">{getIngredientEmoji(entry.ingredient)}</span>{entry.ingredient}</td>
                    <td className="px-3 py-3">
                      <div className="flex min-w-32 items-center gap-2">
                        <input type="number" min="0" step="0.1" value={entry.grams} onChange={(event) => onUpdateNutriEntry(entry.id, { grams: event.target.value })} className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-300 focus:outline-none" aria-label={`${entry.ingredient} amount`} />
                        <span className="text-xs font-semibold text-slate-500">{entry.unit || "g"}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <input type="number" min="0" step="1" value={entry.kcal} onChange={(event) => onUpdateNutriEntry(entry.id, { kcal: event.target.value })} className="w-24 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-300 focus:outline-none" aria-label={`${entry.ingredient} kcal`} />
                    </td>
                    <td className="px-3 py-3">
                      <button type="button" onClick={() => onDeleteNutriEntry(entry.id)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">Delete</button>
                    </td>
                  </tr>
                ))}
                {!entriesForDay.length && (
                  <tr>
                    <td className="px-3 py-6 text-slate-500" colSpan={6}>No ingredients imported for this day yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      </CollapsiblePanel>

      <CollapsiblePanel
        title="NutriAnalysis"
        subtitle={`Ingredient-level function notes for ${selectedDay}, using imported data where supplied.`}
        meta={`${analysis.rows.length} item${analysis.rows.length === 1 ? "" : "s"}`}
      >
        <div className="grid gap-4">
          {analysis.rows.map((entry) => (
            <div key={entry.id} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-100">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-bold text-slate-950"><span className="mr-2" aria-hidden="true">{getIngredientEmoji(entry.ingredient)}</span>{entry.ingredient}</p>
                  <p className="mt-1 text-sm text-slate-500">{entry.meal || "Ingredient"}{entry.recipeName ? ` / ${entry.recipeName}` : ""} / {formatNutriAmount(entry)} / {entry.kcal} kcal</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                  {entry.fibre === null ? "Unknown fibre" : `${entry.fibre.toFixed(1)}g fibre`}
                </span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {(entry.barcode || entry.imageUrl || entry.imageThumbUrl || entry.ingredientsImageUrl || entry.nutritionImageUrl || entry.brand || entry.productName || entry.nutritionSource || entry.processingLevel || entry.ingredientsList?.length || entry.reference?.barcode || entry.reference?.imageUrl || entry.reference?.imageThumbUrl || entry.reference?.ingredientsImageUrl || entry.reference?.nutritionImageUrl || entry.reference?.brand || entry.reference?.productName || entry.reference?.nutritionSource || entry.reference?.processingLevel || entry.reference?.ingredientsList?.length) && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Product details</h4>
                    <div className="mt-3 grid gap-2">
                      {getProductImageLinks({
                        imageUrl: entry.imageUrl || entry.reference?.imageUrl,
                        imageThumbUrl: entry.imageThumbUrl || entry.reference?.imageThumbUrl,
                        ingredientsImageUrl: entry.ingredientsImageUrl || entry.reference?.ingredientsImageUrl,
                        nutritionImageUrl: entry.nutritionImageUrl || entry.reference?.nutritionImageUrl,
                      }).length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {getProductImageLinks({
                            imageUrl: entry.imageUrl || entry.reference?.imageUrl,
                            imageThumbUrl: entry.imageThumbUrl || entry.reference?.imageThumbUrl,
                            ingredientsImageUrl: entry.ingredientsImageUrl || entry.reference?.ingredientsImageUrl,
                            nutritionImageUrl: entry.nutritionImageUrl || entry.reference?.nutritionImageUrl,
                          }).map(([label, url]) => (
                            <a key={label} href={url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-100">
                              <img src={url} alt={`${entry.ingredient} ${label.toLowerCase()}`} className="aspect-square w-full object-cover" loading="lazy" />
                              <span className="block px-2 py-1 text-center text-[10px] font-semibold text-slate-600">{label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                      {(entry.barcode || entry.reference?.barcode) && <p><span className="font-semibold text-slate-800">Barcode:</span> {entry.barcode || entry.reference?.barcode}</p>}
                      {(entry.brand || entry.reference?.brand) && <p><span className="font-semibold text-slate-800">Brand:</span> {entry.brand || entry.reference?.brand}</p>}
                      {(entry.productName || entry.reference?.productName) && <p><span className="font-semibold text-slate-800">Product:</span> {entry.productName || entry.reference?.productName}</p>}
                      {(entry.nutritionSource || entry.reference?.nutritionSource) && <p><span className="font-semibold text-slate-800">Nutrition source:</span> {entry.nutritionSource || entry.reference?.nutritionSource}</p>}
                      {(entry.processingLevel || entry.reference?.processingLevel) && <p><span className="font-semibold text-slate-800">Processing level:</span> {entry.processingLevel || entry.reference?.processingLevel}</p>}
                      {((entry.ingredientsList?.length ? entry.ingredientsList : entry.reference?.ingredientsList) || []).length > 0 && (
                        <p><span className="font-semibold text-slate-800">Ingredients list:</span> {(entry.ingredientsList?.length ? entry.ingredientsList : entry.reference?.ingredientsList).join(", ")}</p>
                      )}
                    </div>
                  </div>
                )}

                {getBrandNutritionBlocks({
                  brandNutritionPer100g: Object.keys(entry.brandNutritionPer100g || {}).length ? entry.brandNutritionPer100g : entry.reference?.brandNutritionPer100g,
                  brandNutritionPer100ml: Object.keys(entry.brandNutritionPer100ml || {}).length ? entry.brandNutritionPer100ml : entry.reference?.brandNutritionPer100ml,
                  brandNutritionPer20g: Object.keys(entry.brandNutritionPer20g || {}).length ? entry.brandNutritionPer20g : entry.reference?.brandNutritionPer20g,
                  brandNutritionPerServing: Object.keys(entry.brandNutritionPerServing || {}).length ? entry.brandNutritionPerServing : entry.reference?.brandNutritionPerServing,
                }).length > 0 && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Brand label nutrition</h4>
                    <div className="mt-3 grid gap-3">
                      {getBrandNutritionBlocks({
                        brandNutritionPer100g: Object.keys(entry.brandNutritionPer100g || {}).length ? entry.brandNutritionPer100g : entry.reference?.brandNutritionPer100g,
                        brandNutritionPer100ml: Object.keys(entry.brandNutritionPer100ml || {}).length ? entry.brandNutritionPer100ml : entry.reference?.brandNutritionPer100ml,
                        brandNutritionPer20g: Object.keys(entry.brandNutritionPer20g || {}).length ? entry.brandNutritionPer20g : entry.reference?.brandNutritionPer20g,
                        brandNutritionPerServing: Object.keys(entry.brandNutritionPerServing || {}).length ? entry.brandNutritionPerServing : entry.reference?.brandNutritionPerServing,
                      }).map(([label, values]) => (
                        <div key={label}>
                          <p className="font-semibold text-slate-800">{label}</p>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            {Object.entries(values).map(([key, value]) => (
                              <p key={key}><span className="font-semibold text-slate-800">{formatNutritionLabel(key)}:</span> {formatNutritionValue(key, value)}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {entry.insights.aminoAcids?.length > 0 && (
                  <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Amino acids</h4>
                    <div className="mt-3 grid gap-2 text-sm text-slate-600">
                      {entry.insights.aminoAcids.map((amino) => (
                        <p key={amino.name}><span className="font-semibold text-slate-800">{amino.name}:</span> {amino.function}</p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                  <h4 className="font-semibold text-slate-950">Fibre</h4>
                  {entry.insights.fibre?.length > 0 ? (
                    <div className="mt-3 grid gap-2 text-sm text-slate-600">
                      {entry.insights.fibre.map((fibreItem) => (
                        <p key={fibreItem.name}><span className="font-semibold text-slate-800">{getIngredientEmoji(entry.ingredient)} {entry.ingredient} - {fibreItem.name}:</span> {fibreItem.benefit}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-slate-600">{entry.fibre === null ? "No fibre value is available yet for this ingredient." : `${entry.ingredient} contributes ${entry.fibre.toFixed(1)}g fibre in this portion.`}</p>
                  )}
                  {entry.fibre !== null && <p className="mt-3 text-xs font-semibold text-slate-500">{entry.fibrePer100g}g fibre per 100g x {formatNutriAmount(entry)} = {entry.fibre.toFixed(1)}g fibre.</p>}
                </div>

                {entry.insights.protein && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Protein</h4>
                    <p className="mt-3">{entry.insights.protein}</p>
                  </div>
                )}

                {entry.insights.fats && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Fats</h4>
                    <p className="mt-3">{entry.insights.fats}</p>
                  </div>
                )}

                {entry.insights.carbs && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Carbohydrates</h4>
                    <p className="mt-3">{entry.insights.carbs}</p>
                  </div>
                )}

                {entry.insights.polyphenols && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Polyphenols</h4>
                    <p className="mt-3">{entry.insights.polyphenols}</p>
                  </div>
                )}

                {entry.reference?.nutrition && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Nutrition reference</h4>
                    <p className="mt-3 font-semibold text-slate-800">{entry.reference.serving || "Reference serving"}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {Number.isFinite(Number(entry.reference.nutrition.caloriesKcal)) && <p>{entry.reference.nutrition.caloriesKcal} kcal</p>}
                      {Number.isFinite(Number(entry.reference.nutrition.proteinG)) && <p>{entry.reference.nutrition.proteinG}g protein</p>}
                      {Number.isFinite(Number(entry.reference.nutrition.carbohydratesG)) && <p>{entry.reference.nutrition.carbohydratesG}g carbs</p>}
                      {Number.isFinite(Number(entry.reference.nutrition.fatG)) && <p>{entry.reference.nutrition.fatG}g fat</p>}
                      {Number.isFinite(Number(entry.reference.nutrition.sugarG)) && <p>{entry.reference.nutrition.sugarG}g sugar</p>}
                      {Number.isFinite(Number(entry.reference.nutrition.waterPercent)) && <p>{entry.reference.nutrition.waterPercent}% water</p>}
                    </div>
                  </div>
                )}

                {entry.reference?.keyVitaminsMinerals?.length > 0 && Object.keys(entry.micronutrients || {}).length === 0 && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Vitamins & minerals</h4>
                    <p className="mt-3">{entry.reference.keyVitaminsMinerals.map(formatMicronutrientLabel).join(", ")}</p>
                  </div>
                )}

                {Object.keys(entry.micronutrients || {}).length > 0 && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Supplement micronutrients</h4>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {Object.entries(entry.micronutrients).map(([key, value]) => (
                        <p key={key}><span className="font-semibold text-slate-800">{formatMicronutrientName(key)}:</span> {formatMicronutrientValue(key, value)}</p>
                      ))}
                    </div>
                  </div>
                )}

                {entry.reference?.fibreTypes?.length > 0 && (
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                    <h4 className="font-semibold text-slate-950">Fibre types</h4>
                    <p className="mt-3">{entry.reference.fibreTypes.join(", ")}</p>
                  </div>
                )}

                {(entry.reference?.aminoAcidProfile || entry.reference?.healthHighlights?.length > 0) && (
                  <div className="grid gap-3 md:col-span-2 md:grid-cols-2">
                    {entry.reference?.aminoAcidProfile && (
                      <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                        <h4 className="font-semibold text-slate-950">Amino acid profile</h4>
                        {entry.reference.aminoAcidProfile.proteinQuality && <p className="mt-3 font-semibold text-slate-800">{entry.reference.aminoAcidProfile.proteinQuality}</p>}
                        {entry.reference.aminoAcidProfile.keyAminoAcids?.length > 0 && (
                          <div className="mt-3 grid gap-2">
                            {entry.reference.aminoAcidProfile.keyAminoAcids.map((amino) => (
                              <p key={formatAminoAcid(amino)}>
                                <span className="font-semibold text-slate-800">{formatAminoAcid(amino)}</span>
                                {amino.function ? `: ${amino.function}` : ""}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {entry.reference?.healthHighlights?.length > 0 && (
                      <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100">
                        <h4 className="font-semibold text-slate-950">Health highlights</h4>
                        <div className="mt-3 grid gap-2">
                          {entry.reference.healthHighlights.map((highlight) => <p key={highlight}>{highlight}</p>)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {!analysis.rows.length && <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Import ingredients to see the breakdown for this day.</div>}
        </div>
      </CollapsiblePanel>

      <CollapsiblePanel
        title="Saved weeks"
        subtitle="On Sundays, the current week saves into a compact drop-down row. Reopen a saved week if it was archived by mistake."
        meta={`${nutriWeekArchives.length} week${nutriWeekArchives.length === 1 ? "" : "s"}`}
        defaultOpen={nutriWeekArchives.length > 0}
      >
        <div className="grid gap-3">
          {nutriWeekArchives.map((archive) => {
            const archiveAnalysis = calculateNutriAnalysis(archive.entries, nutriReferences);
            return (
              <details key={archive.id} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <summary className="cursor-pointer">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-semibold text-slate-950">{archive.label}</span>
                    <span className="text-sm font-semibold text-emerald-800">{archiveAnalysis.totals.kcal} kcal / {archiveAnalysis.totals.fibre.toFixed(1)}g fibre / {archive.entries.length} item{archive.entries.length === 1 ? "" : "s"}</span>
                  </div>
                </summary>
                <div className="mt-4 grid gap-3">
                  <div className="flex justify-end">
                    <button type="button" onClick={() => onEditNutriWeek(archive.id)} className="rounded-2xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:bg-slate-800">
                      Reopen as current week
                    </button>
                  </div>
                  {weekDays.map((day) => {
                    const dayEntries = archive.entries.filter((entry) => entry.day === day);
                    if (!dayEntries.length) return null;
                    const dayAnalysis = calculateNutriAnalysis(dayEntries, nutriReferences);
                    return (
                      <div key={day} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-semibold text-slate-950">{day}</p>
                          <p className="text-sm font-semibold text-slate-600">{dayAnalysis.totals.kcal} kcal / {dayAnalysis.totals.fibre.toFixed(1)}g fibre</p>
                        </div>
                        <div className="mt-3 grid gap-2 text-sm text-slate-600">
                          {dayEntries.map((entry) => (
                            <p key={entry.id}>
                              <span className="mr-2" aria-hidden="true">{getIngredientEmoji(entry.ingredient)}</span>
                              <span className="font-semibold text-slate-800">{entry.ingredient}</span>
                              {entry.meal ? ` / ${entry.meal}` : ""} / {formatNutriAmount(entry)} / {entry.kcal} kcal
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
          {!nutriWeekArchives.length && <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">No saved weeks yet.</div>}
        </div>
      </CollapsiblePanel>
    </div>
  );
}

function RecipesPage({ recipes, onAddRecipeToDay, onRenameRecipe, onDeleteRecipe, onDeleteRecipeIngredient, onBack }) {
  const [targetDays, setTargetDays] = useState({});
  const [recipeNames, setRecipeNames] = useState({});
  const [editingRecipeId, setEditingRecipeId] = useState("");
  const getTargetDay = (recipe) => targetDays[recipe.id] || recipe.day || "Monday";
  const getRecipeName = (recipe) => recipeNames[recipe.id] ?? recipe.title;
  const clearRecipeNameDraft = (recipeId) => {
    setRecipeNames((prev) => {
      const next = { ...prev };
      delete next[recipeId];
      return next;
    });
    setEditingRecipeId("");
  };
  const startRecipeNameEdit = (recipe) => {
    setRecipeNames((prev) => ({ ...prev, [recipe.id]: recipe.title }));
    setEditingRecipeId(recipe.id);
  };
  const saveRecipeName = (recipe) => {
    const nextName = getRecipeName(recipe).trim();
    if (!nextName || nextName === recipe.title) {
      clearRecipeNameDraft(recipe.id);
      return;
    }
    onRenameRecipe(recipe, nextName);
    clearRecipeNameDraft(recipe.id);
  };
  const deleteRecipe = (recipe) => {
    if (typeof window !== "undefined" && !window.confirm(`Delete ${recipe.title} from recipe cards and NutriTrack?`)) return;
    onDeleteRecipe(recipe);
  };
  const deleteIngredient = (entry) => {
    if (typeof window !== "undefined" && !window.confirm(`Delete ${entry.ingredient} from this recipe?`)) return;
    onDeleteRecipeIngredient(entry.id);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">Recipes</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">Recipe cards from your uploaded meals.</h2>
          <p className="mt-3 text-sm text-slate-500">Meals imported into NutriTrack appear here with a recipe image, ingredient list, calories and fibre.</p>
        </div>
        <div className="flex items-end justify-end">
          <button type="button" onClick={onBack} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Back to dashboard</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="overflow-hidden rounded-3xl bg-white/85 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img src={recipe.imageUrl} alt={recipe.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 px-4 py-3 shadow-lg shadow-slate-900/10 ring-1 ring-white/70 backdrop-blur">
                {editingRecipeId === recipe.id ? (
                  <input
                    value={getRecipeName(recipe)}
                    onChange={(event) => setRecipeNames((prev) => ({ ...prev, [recipe.id]: event.target.value }))}
                    onBlur={() => saveRecipeName(recipe)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur();
                    }}
                    autoFocus
                    className="w-full border-0 border-b border-amber-300 bg-transparent px-0 py-1 text-center text-xl font-bold text-slate-950 outline-none"
                    aria-label={`Recipe name for ${recipe.title}`}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => startRecipeNameEdit(recipe)}
                    className="block w-full text-center text-xl font-bold text-slate-950 transition hover:text-amber-700"
                    aria-label={`Edit recipe name for ${recipe.title}`}
                  >
                    {recipe.title}
                  </button>
                )}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{(recipe.days?.length ? recipe.days : [recipe.day]).join(", ")} / {recipe.meal}</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-100">{recipe.tag}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-500">Calories</p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">{recipe.analysis.totals.kcal}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-900">
                  <p className="text-xs font-semibold opacity-75">Fibre</p>
                  <p className="mt-1 text-2xl font-bold">{recipe.analysis.totals.fibre.toFixed(1)}g</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-950">Ingredients</p>
                  <button
                    type="button"
                    onClick={() => deleteRecipe(recipe)}
                    className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100 transition hover:bg-rose-100"
                  >
                    Delete recipe
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {recipe.ingredients.map((entry) => (
                    <span key={entry.id} className="inline-flex items-center gap-2 rounded-full bg-slate-100 py-1 pl-3 pr-1 text-xs font-semibold text-slate-700">
                      <span>
                        <span className="mr-1" aria-hidden="true">{getIngredientEmoji(entry.ingredient)}</span>{entry.ingredient} / {formatNutriAmount(entry)}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteIngredient(entry)}
                        className="grid h-5 w-5 place-items-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-rose-50 hover:text-rose-700 hover:ring-rose-100"
                        aria-label={`Delete ${entry.ingredient}`}
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
                <select
                  value={getTargetDay(recipe)}
                  onChange={(event) => setTargetDays((prev) => ({ ...prev, [recipe.id]: event.target.value }))}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm focus:border-amber-300 focus:outline-none"
                  aria-label={`Day to add ${recipe.title}`}
                >
                  {weekDays.map((day) => <option key={day} value={day}>{day}</option>)}
                </select>
                <button
                  type="button"
                  onClick={() => onAddRecipeToDay(recipe, getTargetDay(recipe))}
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
                >
                  Add to day
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!recipes.length && (
        <div className="rounded-3xl bg-white/80 p-6 text-sm text-slate-600 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          Import a meal with a recipe name in NutriTrack and it will appear here as a recipe card.
        </div>
      )}
    </div>
  );
}

function FoodDatabasePage({ foods, selectedDay, customCategories, onAddFoodToNutriTrack, onUseFoodInRecipe, onToggleFavorite, onMoveFoodCategory, onCreateFoodCategory, onUpdateFoodNutrition, onDeleteFood, onBack }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [newCategory, setNewCategory] = useState("");
  const [draggedFood, setDraggedFood] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const categories = ["All", ...defaultFoodCategories, ...customCategories.filter((item) => !defaultFoodCategories.includes(item))];
  const filteredFoods = foods.filter((food) => {
    const matchesCategory = category === "All" || food.category === category;
    const matchesSearch = `${food.name} ${food.barcode} ${food.brand} ${food.productName} ${food.category} ${food.gutHealth} ${food.nutritionSource}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const groupedFoods = filteredFoods.reduce((groups, food) => {
    const key = food.category || "Other";
    return { ...groups, [key]: [...(groups[key] || []), food] };
  }, {});
  const categorySections = [
    ...categories.filter((item) => item !== "All" && (groupedFoods[item] || customCategories.includes(item))),
    ...Object.keys(groupedFoods).filter((item) => !categories.includes(item)),
  ];
  const handleCreateCategory = (event) => {
    event.preventDefault();
    const categoryName = newCategory.trim();
    if (!categoryName) return;
    onCreateFoodCategory(categoryName);
    setNewCategory("");
  };
  const handleDropOnCategory = (event, categoryName) => {
    event.preventDefault();
    const payload = event.dataTransfer.getData("application/json");
    const foodNames = payload ? JSON.parse(payload) : [event.dataTransfer.getData("text/plain") || draggedFood].filter(Boolean);
    if (!foodNames.length || categoryName === "All") return;
    foodNames.forEach((foodName) => onMoveFoodCategory(foodName, categoryName));
    setDraggedFood("");
    setSelectedFoods([]);
  };
  const handleFoodDragOver = (event) => {
    event.preventDefault();
    if (typeof window === "undefined") return;
    const edgeSize = 120;
    if (event.clientY < edgeSize) window.scrollBy({ top: -18, behavior: "auto" });
    if (event.clientY > window.innerHeight - edgeSize) window.scrollBy({ top: 18, behavior: "auto" });
  };
  const toggleSelectedFood = (foodName) => {
    setSelectedFoods((prev) => prev.includes(foodName) ? prev.filter((item) => item !== foodName) : [...prev, foodName]);
  };
  const handleDeleteFood = (event, food) => {
    event.preventDefault();
    if (typeof window !== "undefined" && !window.confirm(`Delete ${food.name} from the food database?`)) return;
    onDeleteFood(food.name);
    setSelectedFoods((prev) => prev.filter((item) => item !== food.name));
  };

  return (
    <div className="space-y-6" onDragOver={handleFoodDragOver}>
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-600">Food database</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">Master list of saved foods.</h2>
          <p className="mt-3 text-sm text-slate-500">Search saved foods, review per 100g nutrition, and reuse common portions in NutriTrack.</p>
        </div>
        <div className="flex items-end justify-end">
          <button type="button" onClick={onBack} className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Back to dashboard</button>
        </div>
      </div>

      <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-sky-300 focus:outline-none" placeholder="Search oats, salmon, fibre, protein..." />
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{item}</button>
            ))}
          </div>
        </div>
        <form onSubmit={handleCreateCategory} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-lime-300 focus:outline-none" placeholder="New category name..." />
          <button type="submit" className="rounded-2xl bg-lime-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-lime-700">Add category</button>
        </form>
        {selectedFoods.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-lime-50 px-4 py-3 text-sm font-semibold text-lime-900 ring-1 ring-lime-100">
            <span>{selectedFoods.length} selected</span>
            <button type="button" onClick={() => setSelectedFoods([])} className="rounded-xl bg-white px-3 py-1 text-xs text-lime-900 ring-1 ring-lime-100">Clear</button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {categorySections.map((section) => (
          <section
            key={section}
            onDragOver={handleFoodDragOver}
            onDrop={(event) => handleDropOnCategory(event, section)}
            className={`space-y-3 rounded-3xl border border-dashed p-3 transition ${draggedFood ? "border-lime-300 bg-lime-50/50" : "border-transparent"}`}
          >
            <div
              className="flex items-center justify-between rounded-2xl px-4 py-3"
            >
              <h3 className="text-lg font-bold text-slate-950">{section}</h3>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-100">{(groupedFoods[section] || []).length} foods </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {(groupedFoods[section] || []).map((food) => {
                const portionKcal = calculatePortionValue(food, "kcal");
                const portionFibre = calculatePortionValue(food, "fibre");
                const isSelected = selectedFoods.includes(food.name);
                return (
                  <details
                    key={food.name}
                    draggable
                    onDragStart={(event) => {
                      setDraggedFood(food.name);
                      const draggedFoods = isSelected ? selectedFoods : [food.name];
                      event.dataTransfer.setData("text/plain", food.name);
                      event.dataTransfer.setData("application/json", JSON.stringify(draggedFoods));
                      event.dataTransfer.effectAllowed = "move";
                    }}
                    onDragEnd={() => setDraggedFood("")}
                    className={`rounded-2xl bg-white/85 p-4 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100 ${isSelected ? "ring-2 ring-lime-300" : ""}`}
                  >
                    <summary className="cursor-pointer list-none">
                      <div className="min-h-36">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(event) => {
                                event.preventDefault();
                                toggleSelectedFood(food.name);
                              }}
                              onClick={(event) => event.stopPropagation()}
                              className="h-4 w-4 rounded border-slate-300 text-lime-600 focus:ring-lime-500"
                              aria-label={`Select ${food.name}`}
                            />
                            <span className="text-2xl" aria-hidden="true">{getIngredientEmoji(food.name)}</span>
                          </div>
                          {food.favorite && <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-100">Saved</span>}
                        </div>
                        {(food.imageThumbUrl || food.imageUrl) && (
                          <img src={food.imageThumbUrl || food.imageUrl} alt={food.name} className="mt-3 aspect-[4/3] w-full rounded-xl bg-slate-100 object-cover ring-1 ring-slate-100" loading="lazy" />
                        )}
                        <h4 className="mt-3 text-base font-bold leading-tight text-slate-950">{food.name}</h4>
                        {(food.barcode || food.brand || food.productName) && <p className="mt-1 text-[11px] font-semibold text-slate-500">{[food.brand, food.productName, food.barcode].filter(Boolean).join(" / ")}</p>}
                        <p className="mt-3 text-xs font-semibold text-slate-500">{food.kcal} kcal / 100g</p>
                        <p className="mt-1 text-xs text-slate-500">{food.protein}g protein / {food.fibre}g fibre</p>
                      </div>
                    </summary>

                    <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-semibold text-slate-950">Nutritional information</p>
                        <p className="mt-1 text-[11px] font-semibold text-slate-500">Per 100g or 100ml where saved from the label</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                        {[
                          ["Kcal", "kcal", food.kcal, ""],
                          ["Protein", "protein", food.protein, "g"],
                          ["Carbs", "carbs", food.carbs, "g"],
                          ["Fat", "fat", food.fat, "g"],
                          ["Fibre", "fibre", food.fibre, "g"],
                          ["Sugar", "sugar", food.sugar === undefined ? "" : food.sugar, "g"],
                        ].map(([label, key, value, unit]) => (
                          <div key={label} className="rounded-lg bg-white p-2 ring-1 ring-slate-100">
                            <p className="text-[10px] font-semibold text-slate-500">{label}</p>
                            <div className="mt-1 flex items-center gap-1">
                              <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={value}
                                onChange={(event) => onUpdateFoodNutrition(food.name, key, event.target.value)}
                                className="w-full rounded-md border-0 bg-transparent p-0 text-sm font-bold text-slate-950 outline-none focus:bg-slate-50"
                                aria-label={`${food.name} ${label}`}
                              />
                              {unit && <span className="text-xs font-semibold text-slate-500">{unit}</span>}
                            </div>
                          </div>
                        ))}
                        </div>
                      </div>
                      <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-950 ring-1 ring-emerald-100">
                        <p className="font-semibold">Common portion</p>
                        <p className="mt-1">{food.portion}{food.unit} = {portionKcal.toFixed(0)} kcal / {portionFibre.toFixed(1)}g fibre</p>
                      </div>
                      {(food.barcode || food.imageUrl || food.imageThumbUrl || food.ingredientsImageUrl || food.nutritionImageUrl || food.brand || food.productName || food.nutritionSource || food.processingLevel || food.ingredientsList?.length) && (
                        <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                          <p className="font-semibold text-slate-950">Product details</p>
                          {getProductImageLinks(food).length > 0 && (
                            <div className="mb-3 mt-2 grid grid-cols-3 gap-2">
                              {getProductImageLinks(food).map(([label, url]) => (
                                <a key={label} href={url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg bg-white ring-1 ring-slate-100">
                                  <img src={url} alt={`${food.name} ${label.toLowerCase()}`} className="aspect-square w-full object-cover" loading="lazy" />
                                  <span className="block px-1 py-1 text-center text-[10px] font-semibold text-slate-600">{label}</span>
                                </a>
                              ))}
                            </div>
                          )}
                          {food.barcode && <p className="mt-1"><span className="font-semibold">Barcode:</span> {food.barcode}</p>}
                          {food.brand && <p className="mt-1"><span className="font-semibold">Brand:</span> {food.brand}</p>}
                          {food.productName && <p className="mt-1"><span className="font-semibold">Product:</span> {food.productName}</p>}
                          {food.nutritionSource && <p className="mt-1"><span className="font-semibold">Source:</span> {food.nutritionSource}</p>}
                          {food.processingLevel && <p className="mt-1"><span className="font-semibold">Processing:</span> {food.processingLevel}</p>}
                          {food.ingredientsList?.length > 0 && <p className="mt-1"><span className="font-semibold">Ingredients:</span> {food.ingredientsList.join(", ")}</p>}
                        </div>
                      )}
                      {getBrandNutritionBlocks(food).length > 0 && (
                        <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                          <p className="font-semibold text-slate-950">Brand label nutrition</p>
                          <div className="mt-2 grid gap-2">
                            {getBrandNutritionBlocks(food).map(([label, values]) => (
                              <div key={label}>
                                <p className="font-semibold text-slate-800">{label}</p>
                                <p className="mt-1">{Object.entries(values).slice(0, 8).map(([key, value]) => `${formatNutritionLabel(key)}: ${formatNutritionValue(key, value)}`).join(" / ")}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                        <p className="font-semibold text-slate-950">Gut health</p>
                        <p className="mt-1">{food.fibreTypes.length ? food.fibreTypes.join(", ") : "No specific fibre type saved."}</p>
                        <p className="mt-1">{food.gutHealth}</p>
                      </div>
                      <div className="grid gap-2">
                        <button type="button" onClick={(event) => { event.preventDefault(); onToggleFavorite(food.name); }} className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 ring-1 ring-amber-100">{food.favorite ? "Saved" : "Favourite"}</button>
                        <button type="button" onClick={(event) => { event.preventDefault(); onAddFoodToNutriTrack(food); }} className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white shadow-lg transition hover:bg-slate-800">Add to NutriTrack</button>
                        <button type="button" onClick={(event) => { event.preventDefault(); onUseFoodInRecipe(food); }} className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-100">Use in recipe</button>
                        <button type="button" onClick={(event) => handleDeleteFood(event, food)} className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 ring-1 ring-rose-100 transition hover:bg-rose-100">Delete food</button>
                      </div>
                      <p className="text-[10px] font-semibold text-slate-500">Adds to {selectedDay} using the common portion.</p>
                    </div>
                  </details>
                );
              })}
              {!(groupedFoods[section] || []).length && (
                <div className="rounded-2xl border border-dashed border-lime-200 bg-lime-50/70 p-5 text-sm font-semibold text-lime-900">
                  Drop foods here to add them to {section}.
                </div>
              )}
            </div>
          </section>
        ))}

        {!filteredFoods.length && <div className="rounded-3xl bg-white/80 p-6 text-sm text-slate-600 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">No foods match that search.</div>}
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
  const [exerciseEntries, setExerciseEntries] = useState(() => fallbackAppState.exerciseEntries);
  const [mounjaroEntries, setMounjaroEntries] = useState(() => fallbackAppState.mounjaroEntries);
  const [nutriEntries, setNutriEntries] = useState(() => fallbackAppState.nutriEntries);
  const [nutriWeekArchives, setNutriWeekArchives] = useState(() => fallbackAppState.nutriWeekArchives);
  const [nutriReferences, setNutriReferences] = useState(() => fallbackAppState.nutriReferences);
  const [foodDatabaseFavorites, setFoodDatabaseFavorites] = useState(() => fallbackAppState.foodDatabaseFavorites);
  const [foodDatabaseCategories, setFoodDatabaseCategories] = useState(() => fallbackAppState.foodDatabaseCategories);
  const [foodDatabaseNutrition, setFoodDatabaseNutrition] = useState(() => fallbackAppState.foodDatabaseNutrition);
  const [foodDatabaseDeleted, setFoodDatabaseDeleted] = useState(() => fallbackAppState.foodDatabaseDeleted);
  const [nutriAutoArchivePausedLabel, setNutriAutoArchivePausedLabel] = useState(() => fallbackAppState.nutriAutoArchivePausedLabel);
  const [mounjaroNextStrength, setMounjaroNextStrength] = useState(() => fallbackAppState.mounjaroNextStrength);
  const [mounjaroNextStrengthStartDate, setMounjaroNextStrengthStartDate] = useState(() => fallbackAppState.mounjaroNextStrengthStartDate);
  const [selectedNutriDay, setSelectedNutriDay] = useState("Monday");
  const [form, setForm] = useState({ meal: "Snack", items: "", kcal: "", protein: "", fibre: "" });
  const [weightForm, setWeightForm] = useState({ date: "", weight: "" });
  const [bpForm, setBpForm] = useState({ date: "", time: "", systolic: "", diastolic: "", pulse: "", notes: "" });
  const [exerciseForm, setExerciseForm] = useState({ date: "", activityType: "Walking", duration: "", distance: "", steps: "", calories: "", intensity: "Light to moderate", notes: "" });
  const [nutriForm, setNutriForm] = useState({ day: "Monday", ingredient: "", grams: "", kcal: "" });
  const [nutriImportText, setNutriImportText] = useState("");
  const [nutriImportStatus, setNutriImportStatus] = useState("");
  const [githubSyncStatus, setGithubSyncStatus] = useState("");
  const [isGithubSyncing, setIsGithubSyncing] = useState(false);
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);
  const [isDatabaseAvailable, setIsDatabaseAvailable] = useState(false);
  const [storageStatus, setStorageStatus] = useState("Opening database");
  const [confettiPieces, setConfettiPieces] = useState([]);
  const achievedMilestoneRef = useRef(null);
  const startupSyncRanRef = useRef(false);

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
          setExerciseEntries(nextState.exerciseEntries);
          setMounjaroEntries(nextState.mounjaroEntries);
          setNutriEntries(nextState.nutriEntries);
          setNutriWeekArchives(nextState.nutriWeekArchives);
          setNutriReferences(nextState.nutriReferences);
          setFoodDatabaseFavorites(nextState.foodDatabaseFavorites);
          setFoodDatabaseCategories(nextState.foodDatabaseCategories);
          setFoodDatabaseNutrition(nextState.foodDatabaseNutrition);
          setFoodDatabaseDeleted(nextState.foodDatabaseDeleted);
          setNutriAutoArchivePausedLabel(nextState.nutriAutoArchivePausedLabel);
          setMounjaroNextStrength(nextState.mounjaroNextStrength);
          setMounjaroNextStrengthStartDate(nextState.mounjaroNextStrengthStartDate);
          setWeightGoals(nextState.weightGoals);
          setGoalForm(nextState.weightGoals);
          setBmiProfile(nextState.bmiProfile);
          setProfileForm(nextState.bmiProfile);
          setStorageStatus("Database loaded");
        } else {
          setStorageStatus("Database ready");
        }
        setIsDatabaseAvailable(true);
        setIsDatabaseReady(true);
      } catch {
        if (isActive) {
          setIsDatabaseAvailable(false);
          setIsDatabaseReady(false);
          setStorageStatus("Database unavailable");
        }
      }
    }

    loadDatabaseState();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!isDatabaseReady || !isDatabaseAvailable) return;

    const appState = {
      meals,
      habits,
      weights,
      bloodPressureEntries,
      exerciseEntries,
      mounjaroEntries,
      nutriEntries,
      nutriWeekArchives,
      nutriReferences,
      foodDatabaseFavorites,
      foodDatabaseCategories,
      foodDatabaseNutrition,
      foodDatabaseDeleted,
      nutriAutoArchivePausedLabel,
      mounjaroNextStrength,
      mounjaroNextStrengthStartDate,
      weightGoals,
      bmiProfile,
      savedAt: new Date().toISOString(),
    };
    let isActive = true;

    setStorageStatus("Saving");

    writeDatabaseRecord(appStateStorageKey, appState)
      .then((saved) => {
        if (!isActive) return;
        setStorageStatus(saved ? "Saved to database" : "Database save skipped");
      })
      .catch(() => {
        if (isActive) {
          setIsDatabaseAvailable(false);
          setStorageStatus("Database save failed");
        }
      });

    return () => {
      isActive = false;
    };
  }, [isDatabaseReady, isDatabaseAvailable, meals, habits, weights, bloodPressureEntries, exerciseEntries, mounjaroEntries, nutriEntries, nutriWeekArchives, nutriReferences, foodDatabaseFavorites, foodDatabaseCategories, foodDatabaseNutrition, foodDatabaseDeleted, nutriAutoArchivePausedLabel, mounjaroNextStrength, mounjaroNextStrengthStartDate, weightGoals, bmiProfile]);

  const dashboardDay = getTodayWeekDay();
  const totals = useMemo(() => calculateNutriDashboardTotals(nutriEntries, nutriReferences, dashboardDay), [nutriEntries, nutriReferences, dashboardDay]);
  const sortedWeights = useMemo(() => sortWeightEntries(weights), [weights]);
  const sortedBloodPressureEntries = useMemo(() => sortBloodPressureEntries(bloodPressureEntries), [bloodPressureEntries]);
  const sortedExerciseEntries = useMemo(() => sortExerciseEntries(exerciseEntries), [exerciseEntries]);
  const sortedMounjaroEntries = useMemo(() => sortMounjaroEntries(mounjaroEntries), [mounjaroEntries]);
  const mounjaroDoseMarkers = useMemo(() => getMounjaroDoseStartMarkers(sortedMounjaroEntries), [sortedMounjaroEntries]);
  const latestWeightEntry = getLatestWeightEntry(sortedWeights);
  const latestBloodPressureEntry = getLatestBloodPressureEntry(sortedBloodPressureEntries);
  const bloodPressureAverage = useMemo(() => calculateBloodPressureAverage(sortedBloodPressureEntries), [sortedBloodPressureEntries]);
  const previousWeightEntry = sortedWeights.length > 1 ? sortedWeights[sortedWeights.length - 2] : null;
  const currentWeight = latestWeightEntry ? safeNumber(latestWeightEntry.weight, weightGoals.startingWeight) : weightGoals.startingWeight;
  const kgLost = Math.max(0, weightGoals.startingWeight - currentWeight);
  const kgLeft = Math.max(0, currentWeight - weightGoals.goalWeight);
  const bodyWeightLossPercent = weightGoals.startingWeight > 0 ? clampPercentage((kgLost / weightGoals.startingWeight) * 100) : 0;
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
  const allRecipeEntries = useMemo(
    () => sortNutriEntries([
      ...nutriEntries,
      ...nutriWeekArchives.flatMap((archive) => Array.isArray(archive.entries) ? archive.entries : []),
    ]),
    [nutriEntries, nutriWeekArchives]
  );
  const recipeCards = useMemo(() => buildRecipeCards(allRecipeEntries, nutriReferences), [allRecipeEntries, nutriReferences]);
  const foodDatabase = useMemo(() => buildFoodDatabase(nutriReferences, foodDatabaseFavorites, foodDatabaseCategories, foodDatabaseNutrition, foodDatabaseDeleted), [nutriReferences, foodDatabaseFavorites, foodDatabaseCategories, foodDatabaseNutrition, foodDatabaseDeleted]);
  const customFoodCategories = useMemo(
    () => uniqueSorted(Object.values(foodDatabaseCategories)).filter((item) => !defaultFoodCategories.includes(item)),
    [foodDatabaseCategories]
  );
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

  function archiveCurrentNutriWeek(reason = "manual") {
    if (!nutriEntries.length) return;
    const now = new Date();
    const label = getWeekArchiveLabel(now);
    setNutriAutoArchivePausedLabel("");
    const archive = {
      id: createId(),
      label,
      savedAt: now.toISOString(),
      entries: sortNutriEntries(nutriEntries),
    };

    setNutriWeekArchives((prev) => sortNutriWeekArchives([archive, ...prev]));
    setNutriEntries([]);
    setSelectedNutriDay("Monday");
    setNutriForm((prev) => ({ ...prev, day: "Monday" }));
    setNutriImportStatus(reason === "auto" ? `Auto-saved ${label}.` : `Saved ${label}.`);
  }

  function handleEditNutriWeek(archiveId) {
    const archive = nutriWeekArchives.find((item) => item.id === archiveId);
    if (!archive) return;
    const editableEntries = sortNutriEntries(archive.entries).map((entry) => ({ ...entry, id: entry.id || createId() }));
    const firstDay = editableEntries[0]?.day || "Monday";
    setNutriAutoArchivePausedLabel(getWeekArchiveLabel(new Date()));
    setNutriEntries(editableEntries);
    setNutriWeekArchives((prev) => prev.filter((item) => item.id !== archiveId));
    setSelectedNutriDay(firstDay);
    setNutriForm((prev) => ({ ...prev, day: firstDay }));
    setNutriImportStatus(`Reopened ${archive.label} as the current editable week. Save the week again when the changes are finished.`);
    setCurrentPage("nutriTrack");
  }

  useEffect(() => {
    if (!isDatabaseReady || !nutriEntries.length) return;
    const today = new Date();
    if (today.getDay() !== 0) return;
    const label = getWeekArchiveLabel(today);
    if (nutriAutoArchivePausedLabel === label) return;
    if (nutriWeekArchives.some((archive) => archive.label === label)) return;
    archiveCurrentNutriWeek("auto");
  }, [isDatabaseReady, nutriEntries, nutriWeekArchives, nutriAutoArchivePausedLabel]);

  useEffect(() => {
    if (!isDatabaseReady || startupSyncRanRef.current) return;
    startupSyncRanRef.current = true;
    syncPendingAiImports({ silent: true });
  }, [isDatabaseReady]);

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
  const handleExerciseFormChange = (field) => (event) => setExerciseForm((prev) => ({ ...prev, [field]: event.target.value }));
  const handleAddExercise = (event) => {
    event.preventDefault();
    if (!exerciseForm.date || !exerciseForm.activityType || !exerciseForm.duration) return;
    const duration = safeNumber(exerciseForm.duration);
    if (duration <= 0) return;
    setExerciseEntries((prev) => sortExerciseEntries([...prev, {
      id: createId(),
      date: exerciseForm.date,
      activityType: exerciseForm.activityType,
      duration,
      distance: exerciseForm.distance === "" ? "" : safeNumber(exerciseForm.distance),
      steps: exerciseForm.steps === "" ? "" : safeNumber(exerciseForm.steps),
      calories: exerciseForm.calories === "" ? "" : safeNumber(exerciseForm.calories),
      intensity: exerciseForm.intensity,
      notes: exerciseForm.notes.trim(),
    }]));
    setExerciseForm({ date: "", activityType: "Walking", duration: "", distance: "", steps: "", calories: "", intensity: "Light to moderate", notes: "" });
  };
  const handleDeleteExercise = (id) => setExerciseEntries((prev) => prev.filter((entry) => entry.id !== id));
  const handleConfirmMounjaroDate = (date, plannedStrength) => {
    const sorted = sortMounjaroEntries(mounjaroEntries);
    const previousEntry = [...sorted].reverse().find((entry) => entry.date <= date);
    const strength = plannedStrength || previousEntry?.strength || mounjaroNextStrength || "2.5 mg";
    setMounjaroEntries((prev) => sortMounjaroEntries([
      ...prev.filter((entry) => entry.date !== date),
      {
        id: createId(),
        date,
        strength,
        nextStrength: mounjaroNextStrength,
        notes: "Confirmed injection day",
      },
    ]));
  };
  const handleDeleteMounjaroEntry = (id) => setMounjaroEntries((prev) => prev.filter((entry) => entry.id !== id));
  const handleSelectNutriDay = (day) => {
    setSelectedNutriDay(day);
    setNutriForm((prev) => ({ ...prev, day }));
  };
  const handleNutriFormChange = (field) => (event) => {
    const value = event.target.value;
    setNutriForm((prev) => ({ ...prev, [field]: value }));
    if (field === "day") setSelectedNutriDay(value);
  };
  const handleAddNutriEntry = (event) => {
    event.preventDefault();
    const ingredient = nutriForm.ingredient.trim();
    const grams = safeNumber(nutriForm.grams);
    const kcal = safeNumber(nutriForm.kcal);
    if (!weekDays.includes(nutriForm.day) || !ingredient || grams <= 0 || kcal < 0) return;
    setNutriEntries((prev) => sortNutriEntries([...prev, { id: createId(), day: nutriForm.day, ingredient, grams, kcal }]));
    setNutriForm((prev) => ({ day: prev.day, ingredient: "", grams: "", kcal: "" }));
  };
  const handleDeleteNutriEntry = (id) => {
    setNutriEntries((prev) => prev.filter((entry) => entry.id !== id));
    setNutriWeekArchives((prev) => prev.map((archive) => ({
      ...archive,
      entries: sortNutriEntries((archive.entries || []).filter((entry) => entry.id !== id)),
    })));
  };
  const handleUpdateNutriEntry = (id, changes) => {
    setNutriEntries((prev) => sortNutriEntries(prev.map((entry) => (
      entry.id === id
        ? normalizeNutriEntry({
            ...(changes.grams !== undefined && safeNumber(entry.grams) > 0
              ? scaleNutriEntryPortion(entry, safeNumber(changes.grams) / safeNumber(entry.grams))
              : entry),
            ...changes,
          }, entry.day)
        : entry
    ))));
  };
  const handleScaleNutriEntries = (ids, factor) => {
    const selectedIds = new Set(ids);
    setNutriEntries((prev) => sortNutriEntries(prev.map((entry) => (
      selectedIds.has(entry.id) ? normalizeNutriEntry(scaleNutriEntryPortion(entry, factor), entry.day) : entry
    ))));
  };
  const handleNutriImportTextChange = (event) => {
    setNutriImportText(event.target.value);
    setNutriImportStatus("");
  };
  const applyDatabaseState = (databaseState) => {
    const nextState = normalizeAppState(databaseState);
    setMeals(nextState.meals);
    setHabits(nextState.habits);
    setWeights(nextState.weights);
    setBloodPressureEntries(nextState.bloodPressureEntries);
    setExerciseEntries(nextState.exerciseEntries);
    setMounjaroEntries(nextState.mounjaroEntries);
    setNutriEntries(nextState.nutriEntries);
    setNutriWeekArchives(nextState.nutriWeekArchives);
    setNutriReferences(nextState.nutriReferences);
    setFoodDatabaseFavorites(nextState.foodDatabaseFavorites);
    setFoodDatabaseCategories(nextState.foodDatabaseCategories);
    setFoodDatabaseNutrition(nextState.foodDatabaseNutrition);
    setFoodDatabaseDeleted(nextState.foodDatabaseDeleted);
    setNutriAutoArchivePausedLabel(nextState.nutriAutoArchivePausedLabel);
    setMounjaroNextStrength(nextState.mounjaroNextStrength);
    setMounjaroNextStrengthStartDate(nextState.mounjaroNextStrengthStartDate);
    setWeightGoals(nextState.weightGoals);
    setGoalForm(nextState.weightGoals);
    setBmiProfile(nextState.bmiProfile);
    setProfileForm(nextState.bmiProfile);
  };
  const syncPendingAiImports = async ({ silent = false } = {}) => {
    setIsGithubSyncing(true);
    if (!silent) setGithubSyncStatus("Syncing pending AI imports...");
    if (!silent) setNutriImportStatus("");

    try {
      const response = await fetch("/api/github/sync-nutritrack", {
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok) {
        const message = result.error || "GitHub sync failed.";
        if (!silent) setNutriImportStatus(message);
        setGithubSyncStatus(message);
        return;
      }

      const databaseState = await readDatabaseRecord(appStateStorageKey);
      if (databaseState) applyDatabaseState(databaseState);

      const syncedParts = [
        `${result.imported || 0} NutriTrack item${result.imported === 1 ? "" : "s"}`,
        `${result.weightsImported || 0} weight reading${result.weightsImported === 1 ? "" : "s"}`,
      ];
      const message = `Synced ${syncedParts.join(" and ")}.`;
      if (!silent) setNutriImportStatus(message);
      if (!silent || result.imported || result.weightsImported) {
        setGithubSyncStatus(result.message || message);
      }
      setStorageStatus("Database loaded");
      setIsDatabaseAvailable(true);
      setIsDatabaseReady(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "GitHub sync failed.";
      if (!silent) setNutriImportStatus(message);
      setGithubSyncStatus(message);
    } finally {
      setIsGithubSyncing(false);
    }
  };
  const handleSyncGithubImports = () => syncPendingAiImports();
  const handleImportNutriTrack = () => {
    try {
      const importPayload = normalizeNutriImportPayload(nutriImportText);
      if (importPayload.kind === "references") {
        setNutriReferences((prev) => mergeNutriReferences(prev, importPayload.references));
        setNutriImportText("");
        setNutriImportStatus(`Saved ${importPayload.references.length} ingredient nutrition breakdown${importPayload.references.length === 1 ? "" : "s"} for NutriAnalysis.`);
        return;
      }
      if (importPayload.kind === "singleMeal") {
        const targetDay = weekDays.includes(importPayload.day) ? importPayload.day : selectedNutriDay;
        const items = importPayload.items.map((item) => ({ ...item, day: targetDay }));
        setNutriEntries((prev) => mergeNutriEntriesForImport(prev, items));
        setNutriReferences((prev) => mergeNutriReferences(prev, buildReferencesFromNutriItems(items)));
        setSelectedNutriDay(targetDay);
        setNutriForm({ day: targetDay, ingredient: "", grams: "", kcal: "" });
        setNutriImportText("");
        setNutriImportStatus(`Imported ${items.length} item${items.length === 1 ? "" : "s"} to ${targetDay} and updated the food database.`);
        return;
      }
      setNutriEntries((prev) => mergeNutriEntriesForImport(prev, importPayload.items));
      setNutriReferences((prev) => mergeNutriReferences(prev, buildReferencesFromNutriItems(importPayload.items)));
      setSelectedNutriDay(importPayload.day);
      setNutriForm({ day: importPayload.day, ingredient: "", grams: "", kcal: "" });
      setNutriImportText("");
      setNutriImportStatus(`Imported ${importPayload.items.length} item${importPayload.items.length === 1 ? "" : "s"} to ${importPayload.day} and updated the food database.`);
    } catch (error) {
      setNutriImportStatus(error instanceof Error ? error.message : "Import failed. Check the JSON format.");
    }
  };
  const handleToggleFoodFavorite = (name) => {
    setFoodDatabaseFavorites((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const handleMoveFoodCategory = (foodName, categoryName) => {
    const name = String(foodName || "").trim();
    const nextCategory = String(categoryName || "").trim();
    if (!name || !nextCategory || nextCategory === "All") return;
    setFoodDatabaseCategories((prev) => ({ ...prev, [name]: nextCategory }));
  };
  const handleCreateFoodCategory = (categoryName) => {
    const nextCategory = String(categoryName || "").trim();
    if (!nextCategory || nextCategory === "All") return;
    setFoodDatabaseCategories((prev) => ({ ...prev, [`__category__${nextCategory}`]: nextCategory }));
  };
  const handleUpdateFoodNutrition = (foodName, key, value) => {
    const name = String(foodName || "").trim();
    if (!name || !["kcal", "protein", "carbs", "fat", "fibre", "sugar"].includes(key)) return;
    setFoodDatabaseNutrition((prev) => ({
      ...prev,
      [name]: {
        ...(prev[name] || {}),
        [key]: value === "" ? "" : roundNutritionValue(value),
      },
    }));
  };
  const handleDeleteFood = (foodName) => {
    const name = String(foodName || "").trim();
    if (!name) return;
    setFoodDatabaseDeleted((prev) => ({ ...prev, [name]: true }));
    setFoodDatabaseFavorites((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFoodDatabaseCategories((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFoodDatabaseNutrition((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setNutriImportStatus(`Deleted ${name} from the food database.`);
  };
  const handleAddFoodToNutriTrack = (food) => {
    const grams = safeNumber(food.portion, 100);
    setNutriEntries((prev) => sortNutriEntries([...prev, {
      id: createId(),
      day: selectedNutriDay,
      meal: "Food database",
      recipeName: "",
      tag: "Food",
      ingredient: food.name,
      grams,
      unit: food.unit || "g",
      kcal: Math.round(calculatePortionValue(food, "kcal")),
      ...getProductMetadata(food),
      fibrePer100g: food.fibre,
    }]));
    setCurrentPage("nutriTrack");
    setNutriImportStatus(`Added ${food.name} to ${selectedNutriDay}.`);
  };
  const handleUseFoodInRecipe = (food) => {
    const snippet = {
      day: selectedNutriDay,
      entries: [
        {
          meal: "Recipe",
          recipeName: "New recipe",
          tag: "Recipe",
          ingredients: [
            {
              name: food.name,
              brand: food.brand,
              productName: food.productName,
              nutritionSource: food.nutritionSource,
              processingLevel: food.processingLevel,
              ingredientsList: food.ingredientsList,
              brandNutritionPer100g: food.brandNutritionPer100g,
              brandNutritionPer100ml: food.brandNutritionPer100ml,
              brandNutritionPer20g: food.brandNutritionPer20g,
              brandNutritionPerServing: food.brandNutritionPerServing,
              amount: food.portion,
              unit: food.unit || "g",
              kcal: Math.round(calculatePortionValue(food, "kcal")),
              fibrePer100g: food.fibre,
            },
          ],
        },
      ],
    };
    setNutriImportText(JSON.stringify(snippet, null, 2));
    setNutriImportStatus(`${food.name} recipe starter ready to import.`);
    setCurrentPage("nutriTrack");
  };
  const handleAddRecipeToDay = (recipe, day) => {
    if (!recipe?.ingredients?.length || !weekDays.includes(day)) return;
    const recipeEntries = recipe.ingredients.map((entry) => normalizeNutriEntry({
      ...entry,
      id: createId(),
      day,
      meal: entry.meal || recipe.meal || "Recipe",
      recipeName: recipe.title,
      tag: recipe.tag || entry.tag || "Recipe",
    }, day));
    setNutriEntries((prev) => mergeNutriEntriesForImport(prev, recipeEntries));
    setNutriReferences((prev) => mergeNutriReferences(prev, buildReferencesFromNutriItems(recipeEntries)));
    setSelectedNutriDay(day);
    setNutriForm((prev) => ({ ...prev, day }));
    setNutriImportStatus(`Added ${recipe.title} to ${day}.`);
    setCurrentPage("nutriTrack");
  };
  const handleRenameRecipe = (recipe, nextName) => {
    const title = String(nextName || "").trim();
    if (!recipe?.title || !title || title === recipe.title) return "";
    const renameEntry = (entry) => {
      const entryTitle = entry.recipeName || `${entry.meal} recipe`;
      const sameRecipe = entryTitle === recipe.title
        && (entry.meal || "Meal") === recipe.meal
        && (entry.tag || "Recipe") === recipe.tag;
      return sameRecipe ? { ...entry, recipeName: title } : entry;
    };
    setNutriEntries((prev) => sortNutriEntries(prev.map(renameEntry)));
    setNutriWeekArchives((prev) => prev.map((archive) => ({
      ...archive,
      entries: sortNutriEntries((archive.entries || []).map(renameEntry)),
    })));
    setNutriImportStatus(`Renamed recipe to ${title}.`);
    return title;
  };
  const handleDeleteRecipe = (recipe) => {
    if (!recipe?.id) return;
    const removeRecipeEntries = (entries) => sortNutriEntries((entries || []).filter((entry) => getRecipeCardKey(entry) !== recipe.id));
    setNutriEntries((prev) => removeRecipeEntries(prev));
    setNutriWeekArchives((prev) => prev.map((archive) => ({
      ...archive,
      entries: removeRecipeEntries(archive.entries),
    })));
    setNutriImportStatus(`Deleted recipe ${recipe.title}.`);
  };
  const handleDeleteRecipeIngredient = (id) => {
    handleDeleteNutriEntry(id);
    setNutriImportStatus("Deleted ingredient from recipe.");
  };
  const openWeightPage = () => setCurrentPage("weight");
  const openBloodPressurePage = () => setCurrentPage("bloodPressure");
  const openExercisePage = () => setCurrentPage("exercise");
  const openMounjaroPage = () => setCurrentPage("mounjaro");
  const openNutriTrackPage = () => setCurrentPage("nutriTrack");
  const openRecipesPage = () => setCurrentPage("recipes");
  const openFoodDatabasePage = () => setCurrentPage("foodDatabase");
  const openDashboardPage = () => setCurrentPage("dashboard");
  const pageTitle = {
    dashboard: "Weight & food dashboard",
    weight: "Weight tracker",
    bloodPressure: "Blood pressure tracker",
    exercise: "Exercise tracker",
    mounjaro: "Mounjaro tracker",
    nutriTrack: "NutriTrack",
    recipes: "Recipe cards",
    foodDatabase: "Food database",
  }[currentPage];
  const pageSubtitle = {
    dashboard: "Track calories, protein, fibre, hydration, supplements and weekly weight changes in one clean view.",
    weight: "Track trends, set goals, and focus on steady progress.",
    bloodPressure: "Record blood pressure readings, pulse, notes, and trends in one dedicated view.",
    exercise: "Track walking, strength, cardio, steps, intensity and activity notes.",
    mounjaro: "Track injection days, strengths started, and next planned strengths.",
    nutriTrack: "Import ingredients by day and review fibre breakdowns with NutriAnalysis.",
    recipes: "Browse recipe cards generated from uploaded NutriTrack meals.",
    foodDatabase: "Search saved foods and reuse common portions in NutriTrack.",
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
                <span className={`h-2 w-2 rounded-full ${storageStatus.includes("Saving") || storageStatus.includes("Opening") ? "bg-amber-300" : storageStatus.includes("unavailable") || storageStatus.includes("failed") ? "bg-rose-300" : "bg-emerald-300"}`} />
                {storageStatus}
              </div>
              <div className="inline-flex max-w-full overflow-x-auto rounded-3xl border border-white/10 bg-white/10 text-sm font-semibold text-slate-200">
                <button type="button" onClick={openDashboardPage} className={`whitespace-nowrap rounded-3xl px-4 py-3 transition ${currentPage === "dashboard" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Dashboard</button>
                <button type="button" onClick={openWeightPage} className={`whitespace-nowrap rounded-3xl px-4 py-3 transition ${currentPage === "weight" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Weight</button>
                <button type="button" onClick={openBloodPressurePage} className={`whitespace-nowrap rounded-3xl px-4 py-3 transition ${currentPage === "bloodPressure" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Blood pressure</button>
                <button type="button" onClick={openExercisePage} className={`whitespace-nowrap rounded-3xl px-4 py-3 transition ${currentPage === "exercise" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Exercise</button>
                <button type="button" onClick={openMounjaroPage} className={`whitespace-nowrap rounded-3xl px-4 py-3 transition ${currentPage === "mounjaro" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Mounjaro</button>
                <button type="button" onClick={openNutriTrackPage} className={`whitespace-nowrap rounded-3xl px-4 py-3 transition ${currentPage === "nutriTrack" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>NutriTrack</button>
                <button type="button" onClick={openRecipesPage} className={`whitespace-nowrap rounded-3xl px-4 py-3 transition ${currentPage === "recipes" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Recipes</button>
                <button type="button" onClick={openFoodDatabasePage} className={`whitespace-nowrap rounded-3xl px-4 py-3 transition ${currentPage === "foodDatabase" ? "bg-white text-slate-950" : "hover:bg-white/10"}`}>Food database</button>
              </div>
              <button type="button" onClick={openNutriTrackPage} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 shadow-lg transition hover:bg-slate-100"><PlusIcon className="h-5 w-5" />Log food</button>
            </div>
          </div>
        </div>

        {currentPage === "dashboard" && (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              <StatCard icon={FlameIcon} label="Calories today" value={`${totals.kcal}`} sub={`${Math.max(0, nutritionGoals.calories - totals.kcal)} kcal left / ${totals.day}`} progress={(totals.kcal / nutritionGoals.calories) * 100} accent="bg-orange-100 text-orange-700" />
              <StatCard icon={BeefIcon} label="Protein" value={`${totals.protein}g`} sub={`Goal ${nutritionGoals.protein}g / ${totals.entries} item${totals.entries === 1 ? "" : "s"}`} progress={(totals.protein / nutritionGoals.protein) * 100} accent="bg-rose-100 text-rose-700" />
              <StatCard icon={AppleIcon} label="Fibre" value={`${totals.fibre}g`} sub={`Goal ${nutritionGoals.fibre}g / NutriTrack`} progress={(totals.fibre / nutritionGoals.fibre) * 100} accent="bg-emerald-100 text-emerald-700" />
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
                    <p className="text-sm text-slate-500">Progress to {weightGoals.goalWeight.toFixed(1)} kg goal</p>
                    <p className="mt-3 text-3xl font-bold text-slate-950">{Math.round(weightProgress)}%</p>
                    <p className="mt-2 text-sm text-slate-500">{kgLost.toFixed(1)} kg lost / {kgLeft.toFixed(1)} kg left</p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">{bodyWeightLossPercent.toFixed(1)}% body weight lost</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Ring value={Math.round(weightProgress)} max={100} label={`Progress to ${weightGoals.goalWeight.toFixed(1)} kg goal`} sub={`${bodyWeightLossPercent.toFixed(1)}% body weight lost`} />
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
              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-amber-100 p-3 text-amber-700"><SparklesIcon className="h-5 w-5" /></div>
                  <div>
                    <h2 className="text-xl font-bold">Nutrition insight</h2>
                    <p className="text-sm text-slate-500">{meals.length} dashboard meal entries</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 ring-1 ring-slate-200">{coachNote}</div>
                <button type="button" onClick={openNutriTrackPage} className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Open NutriTrack</button>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-rose-100 p-3 text-rose-700"><HeartPulseIcon className="h-5 w-5" /></div>
                  <div>
                    <h2 className="text-xl font-bold">Blood pressure</h2>
                    <p className="text-sm text-slate-500">{sortedBloodPressureEntries.length} readings saved</p>
                  </div>
                </div>
                <div className="grid gap-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-950">Latest:</span> {latestBloodPressureEntry ? `${latestBloodPressureEntry.systolic}/${latestBloodPressureEntry.diastolic} mmHg` : "No reading yet"}</p>
                  <p><span className="font-semibold text-slate-950">Average:</span> {sortedBloodPressureEntries.length ? `${bloodPressureAverage.systolic}/${bloodPressureAverage.diastolic} mmHg` : "Needs readings"}</p>
                  <p><span className="font-semibold text-slate-950">Pulse:</span> {latestBloodPressureEntry?.pulse || "--"} bpm</p>
                </div>
                <button type="button" onClick={openBloodPressurePage} className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Open blood pressure</button>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-100 p-3 text-sky-700"><FlameIcon className="h-5 w-5" /></div>
                  <div>
                    <h2 className="text-xl font-bold">Activity</h2>
                    <p className="text-sm text-slate-500">{sortedExerciseEntries.length} exercise entries</p>
                  </div>
                </div>
                <div className="grid gap-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-950">Latest:</span> {sortedExerciseEntries.length ? `${sortedExerciseEntries[sortedExerciseEntries.length - 1].activityType}, ${sortedExerciseEntries[sortedExerciseEntries.length - 1].duration} min` : "No activity yet"}</p>
                  <p><span className="font-semibold text-slate-950">Steps:</span> {sortedExerciseEntries.length ? sortedExerciseEntries[sortedExerciseEntries.length - 1].steps || "--" : "--"}</p>
                  <p><span className="font-semibold text-slate-950">Intensity:</span> {sortedExerciseEntries.length ? sortedExerciseEntries[sortedExerciseEntries.length - 1].intensity : "--"}</p>
                </div>
                <button type="button" onClick={openExercisePage} className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Open exercise</button>
              </div>

              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700"><SparklesIcon className="h-5 w-5" /></div>
                  <div>
                    <h2 className="text-xl font-bold">Mounjaro</h2>
                    <p className="text-sm text-slate-500">{sortedMounjaroEntries.length} injection day{sortedMounjaroEntries.length === 1 ? "" : "s"}</p>
                  </div>
                </div>
                <div className="grid gap-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-950">Latest:</span> {sortedMounjaroEntries.length ? formatDateNumeric(sortedMounjaroEntries[sortedMounjaroEntries.length - 1].date) : "No injection logged"}</p>
                  <p><span className="font-semibold text-slate-950">Strength:</span> {sortedMounjaroEntries.length ? sortedMounjaroEntries[sortedMounjaroEntries.length - 1].strength : "--"}</p>
                  <p><span className="font-semibold text-slate-950">Next:</span> {sortedMounjaroEntries.length ? sortedMounjaroEntries[sortedMounjaroEntries.length - 1].nextStrength || "--" : "--"}</p>
                </div>
                <button type="button" onClick={openMounjaroPage} className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Open Mounjaro</button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <h2 className="text-xl font-bold">NutriTrack</h2>
                <p className="mt-2 text-sm text-slate-500">{nutriEntries.length} ingredient entries this week.</p>
                <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                  {nutriWeekArchives.length} saved week{nutriWeekArchives.length === 1 ? "" : "s"} available.
                </div>
                <button
                  type="button"
                  onClick={handleSyncGithubImports}
                  disabled={isGithubSyncing}
                  className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {isGithubSyncing ? "Syncing..." : "Sync pending AI imports"}
                </button>
                {githubSyncStatus && <p className="mt-3 text-sm font-semibold text-slate-600">{githubSyncStatus}</p>}
                <button type="button" onClick={openNutriTrackPage} className="mt-3 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Open NutriTrack</button>
              </div>
              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <h2 className="text-xl font-bold">Recipe cards</h2>
                <p className="mt-2 text-sm text-slate-500">{recipeCards.length} recipes generated from NutriTrack meals.</p>
                <button type="button" onClick={openRecipesPage} className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Open recipes</button>
              </div>
              <div className="rounded-3xl bg-white/80 p-5 shadow-lg shadow-slate-200/60 ring-1 ring-slate-100">
                <h2 className="text-xl font-bold">Food database</h2>
                <p className="mt-2 text-sm text-slate-500">{foodDatabase.length} foods saved or available.</p>
                <button type="button" onClick={openFoodDatabasePage} className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800">Open food database</button>
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
            mounjaroDoseMarkers={mounjaroDoseMarkers}
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

        {currentPage === "exercise" && (
          <ExercisePage
            entries={sortedExerciseEntries}
            exerciseForm={exerciseForm}
            onExerciseFormChange={handleExerciseFormChange}
            onAddExercise={handleAddExercise}
            onDeleteExercise={handleDeleteExercise}
            onBack={openDashboardPage}
          />
        )}

        {currentPage === "mounjaro" && (
          <MounjaroPage
            entries={sortedMounjaroEntries}
            nextStrength={mounjaroNextStrength}
            nextStrengthStartDate={mounjaroNextStrengthStartDate}
            onSelectNextStrength={setMounjaroNextStrength}
            onSelectNextStrengthStartDate={setMounjaroNextStrengthStartDate}
            onConfirmInjectionDate={handleConfirmMounjaroDate}
            onDeleteEntry={handleDeleteMounjaroEntry}
            onBack={openDashboardPage}
          />
        )}

        {currentPage === "nutriTrack" && (
          <NutriTrackPage
            nutriEntries={nutriEntries}
            nutriWeekArchives={nutriWeekArchives}
            nutriReferences={nutriReferences}
            selectedDay={selectedNutriDay}
            nutriImportStatus={nutriImportStatus}
            onSelectDay={handleSelectNutriDay}
            onDeleteNutriEntry={handleDeleteNutriEntry}
            onUpdateNutriEntry={handleUpdateNutriEntry}
            onScaleNutriEntries={handleScaleNutriEntries}
            onSaveNutriWeek={() => archiveCurrentNutriWeek("manual")}
            onEditNutriWeek={handleEditNutriWeek}
            onBack={openDashboardPage}
          />
        )}

        {currentPage === "recipes" && (
          <RecipesPage
            recipes={recipeCards}
            onAddRecipeToDay={handleAddRecipeToDay}
            onRenameRecipe={handleRenameRecipe}
            onDeleteRecipe={handleDeleteRecipe}
            onDeleteRecipeIngredient={handleDeleteRecipeIngredient}
            onBack={openDashboardPage}
          />
        )}

        {currentPage === "foodDatabase" && (
          <FoodDatabasePage
            foods={foodDatabase}
            selectedDay={selectedNutriDay}
            customCategories={customFoodCategories}
            onAddFoodToNutriTrack={handleAddFoodToNutriTrack}
            onUseFoodInRecipe={handleUseFoodInRecipe}
            onToggleFavorite={handleToggleFoodFavorite}
            onMoveFoodCategory={handleMoveFoodCategory}
            onCreateFoodCategory={handleCreateFoodCategory}
            onUpdateFoodNutrition={handleUpdateFoodNutrition}
            onDeleteFood={handleDeleteFood}
            onBack={openDashboardPage}
          />
        )}
      </div>
    </div>
  );
}
