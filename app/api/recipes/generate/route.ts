import { NextResponse } from "next/server";
import { filterMealsByIngredient, lookupMealById } from "@/lib/themealdb";

export async function POST(request: Request) {
  const { ingredients } = (await request.json()) as { ingredients: string[] };

  if (!ingredients || ingredients.length === 0) {
    return NextResponse.json([]);
  }

  const results = await Promise.all(
    ingredients.map((i) => filterMealsByIngredient(i))
  );

  const allMealIds = [...new Set(results.flat().map((m) => m.idMeal))];

  const details = await Promise.all(allMealIds.map((id) => lookupMealById(id)));

  const userNames = new Set(ingredients.map((i) => i.toLowerCase()));
  const matching: { idMeal: string; strMeal: string; strMealThumb: string }[] = [];

  for (const d of details) {

    if (!d || d.ingredients.length === 0) continue;

    const missing = d.ingredients.filter((ing) => !userNames.has(ing));

    if (missing.length <= 1) {
      matching.push({ idMeal: d.idMeal, strMeal: d.strMeal, strMealThumb: d.strMealThumb });
    }

  }

  return NextResponse.json(matching);
}
