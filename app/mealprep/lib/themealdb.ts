export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strThumb: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail extends Meal {
  ingredients: string[];
}

interface MealListResult {
  meals: Meal[] | null;
}

interface MealDetailResult {
  meals: Record<string, string>[] | null;
}

interface IngredientListResult {
  meals: Ingredient[] | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_THEMEALDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_THEMEALDB_API_KEY;

export async function getIngredients(): Promise<Ingredient[]> {

  const result = await fetch(`${BASE_URL}/list.php?i=list&apiKey=${API_KEY}`);

  if (!result.ok) {
    throw new Error(`TheMealDB request failed: ${result.status}`);
  }

  const data = (await result.json()) as IngredientListResult;
  return data.meals ?? [];

}

export async function filterMealsByIngredient(ingredient: string): Promise<Meal[]> {

  const result = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}&apiKey=${API_KEY}`);

  if (!result.ok) {
    throw new Error(`TheMealDB request failed: ${result.status}`);
  }

  const data = (await result.json()) as MealListResult;
  return data.meals ?? [];

}

export async function lookupMealById(id: string): Promise<MealDetail | null> {

  const result = await fetch(`${BASE_URL}/lookup.php?i=${id}&apiKey=${API_KEY}`);

  if (!result.ok) {
    throw new Error(`TheMealDB request failed: ${result.status}`);
  }

  const data = (await result.json()) as MealDetailResult;
  const raw = data.meals?.[0];

  if (!raw) return null;

  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = raw[`strIngredient${i}`];
    if (name && name.trim()) {
      ingredients.push(name.trim().toLowerCase());
    }
  }

  return {
    idMeal: raw.idMeal,
    strMeal: raw.strMeal,
    strMealThumb: raw.strMealThumb,
    ingredients,
  };

}
