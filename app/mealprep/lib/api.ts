import type { Ingredient, Meal } from "./themealdb";

export async function fetchSavedIngredients(): Promise<Ingredient[]> {
  const res = await fetch("/api/ingredients");
  if (!res.ok) throw new Error("Failed to load ingredients");
  return res.json();
}

export async function saveIngredients(ingredients: Ingredient[]): Promise<void> {
  await fetch("/api/ingredients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingredients),
  });
}

export async function fetchSavedRecipes(): Promise<Meal[]> {
  const res = await fetch("/api/recipes");
  if (!res.ok) throw new Error("Failed to load recipes");
  return res.json();
}

export async function saveRecipes(recipes: Meal[]): Promise<void> {
  await fetch("/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipes),
  });
}
