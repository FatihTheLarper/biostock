import { z } from "zod";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import SavedRecipe from "../../../app/mealprep/lib/models/SavedRecipe";
import { RecipesBody } from "@/lib/schemas";

export async function GET() {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const recipes = await SavedRecipe.find({ userId }).lean();
    return NextResponse.json(recipes);
  } catch {
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }

}

export async function POST(request: Request) {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = RecipesBody.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid recipes data",
        details: z.flattenError(parsed.error).fieldErrors
      },
      { status: 400 });
  }

  try {
    await connectToDatabase();
    const items = parsed.data.map((item) => ({ ...item, userId }));
    await SavedRecipe.insertMany(items, { ordered: false }).catch(() => { });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save recipes" }, { status: 500 });
  }

}

export async function DELETE(request: Request) {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const idMeal = searchParams.get("idMeal");

  if (!idMeal) {
    return NextResponse.json({ error: "Missing idMeal" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    await SavedRecipe.deleteOne({ userId, idMeal });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }

}
