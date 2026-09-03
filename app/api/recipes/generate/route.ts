import { z } from "zod";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { filterMealsByIngredient, lookupMealById } from "@/lib/themealdb";
import { GenerateBody } from "@/lib/schemas";

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>
): Promise<PromiseSettledResult<R>[]> {
  const results: PromiseSettledResult<R>[] = new Array(items.length);
  let cursor = 0;

  async function runOne() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index])
        .then((value) => ({ status: "fulfilled", value }) as PromiseFulfilledResult<R>)
        .catch((reason) => ({ status: "rejected", reason }) as PromiseRejectedResult);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => runOne());
  await Promise.all(workers);
  return results;
}

export async function POST(request: Request) {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = GenerateBody.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request",
        details: z.flattenError(parsed.error).fieldErrors
      },
      { status: 400 });
  }

  const { ingredients } = parsed.data;

  const filterResults = await mapWithConcurrency(ingredients, 10, (i) =>
    filterMealsByIngredient(i)
  );

  const allMealIds = new Set<string>();
  for (const r of filterResults) {
    if (r.status === "fulfilled") {
      for (const m of r.value) allMealIds.add(m.idMeal);
    }
  }

  const idList = [...allMealIds];

  const detailResults = await mapWithConcurrency(idList, 10, (id) =>
    lookupMealById(id)
  );

  const userIngredients = new Set(ingredients.map((i) => i.toLowerCase()));
  const matching: { idMeal: string; strMeal: string; strMealThumb: string }[] = [];

  for (const r of detailResults) {
    if (r.status !== "fulfilled") continue;

    const d = r.value;
    if (!d || d.ingredients.length === 0) continue;

    const missing = d.ingredients.filter((ing) => !userIngredients.has(ing));

    if (missing.length <= 1) {
      matching.push({ idMeal: d.idMeal, strMeal: d.strMeal, strMealThumb: d.strMealThumb });
    }
  }

  return NextResponse.json(matching);
}
