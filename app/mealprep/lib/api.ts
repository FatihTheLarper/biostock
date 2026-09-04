import type { Ingredient, Meal } from "@/lib/themealdb";

export async function fetchSavedIngredients(): Promise<Ingredient[]> {
  const res = await fetch("/api/ingredients");
  if (!res.ok) throw new Error("Failed to load ingredients");
  return res.json();
}

export async function saveIngredients(ingredients: Ingredient[]): Promise<void> {
  const res = await fetch("/api/ingredients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingredients),
  });

  if (!res.ok) throw new Error("Failed to save ingredient to database");
}

export async function fetchSavedRecipes(): Promise<Meal[]> {
  const res = await fetch("/api/recipes");
  if (!res.ok) throw new Error("Failed to load recipes");
  return res.json();
}

export async function saveRecipes(recipes: Meal[]): Promise<void> {
  const res = await fetch("/api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(recipes),
  });

  if (!res.ok) throw new Error("Failed to save recipes to database");
}

export async function deleteIngredient(idIngredient: string): Promise<void> {
  const res = await fetch(`/api/ingredients?idIngredient=${encodeURIComponent(idIngredient)}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed to delete ingredients");

}

export async function deleteRecipe(idMeal: string): Promise<void> {
  const res = await fetch(`/api/recipes?idMeal=${encodeURIComponent(idMeal)}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed  to delete recipes");

}

export async function generateRecipes(ingredients: string[]): Promise<Meal[]> {
  const res = await fetch("/api/recipes/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  if (!res.ok) throw new Error("Failed to generate recipes");
  return res.json();
}
