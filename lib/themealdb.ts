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

const MAX_ATTEMPTS = 3;
const TIMEOUT_MS = 5000;
const BASE_DELAY_MS = 150;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string): Promise<Response> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const result = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 86400 },
      });
      if (result.ok) return result;
      if (attempt === MAX_ATTEMPTS) {
        throw new Error(`TheMealDB request failed: ${result.status}`);
      }
    } catch (err) {
      if (attempt === MAX_ATTEMPTS) {
        throw err instanceof Error
          ? err
          : new Error("TheMealDB request failed");
      }
    } finally {
      clearTimeout(timer);
    }
    await delay(BASE_DELAY_MS * attempt);
  }
  throw new Error("TheMealDB request failed");
}

export async function getIngredients(): Promise<Ingredient[]> {

  const result = await fetchWithRetry(`${BASE_URL}/list.php?i=list`);

  const data = (await result.json()) as IngredientListResult;
  return data.meals ?? [];

}

export async function filterMealsByIngredient(ingredient: string): Promise<Meal[]> {

  const result = await fetchWithRetry(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);

  const data = (await result.json()) as MealListResult;
  return data.meals ?? [];

}

export async function lookupMealById(id: string): Promise<MealDetail | null> {

  const result = await fetchWithRetry(`${BASE_URL}/lookup.php?i=${id}`);

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
