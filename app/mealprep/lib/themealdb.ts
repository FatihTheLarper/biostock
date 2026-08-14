export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strThumb: string;
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
