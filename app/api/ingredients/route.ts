import { z } from "zod";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "../../../lib/mongodb";
import SavedIngredient from "../../../app/mealprep/lib/models/SavedIngredient";
import { IngredientsBody } from "@/lib/schemas";

export async function GET() {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const ingredients = await SavedIngredient.find({ userId }).lean();
    return NextResponse.json(ingredients);
  } catch {
    return NextResponse.json({ error: "Failed to fetch ingredients" }, { status: 500 });
  }

}

export async function POST(request: Request) {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = IngredientsBody.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid ingredients data",
        details: z.flattenError(parsed.error).fieldErrors
      },
      { status: 400 });
  }

  try {
    await connectToDatabase();
    const items = parsed.data.map((item) => ({ ...item, userId }));
    await SavedIngredient.insertMany(items, { ordered: false }).catch(() => { });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save ingredients" }, { status: 500 });
  }

}

export async function DELETE(request: Request) {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const idIngredient = searchParams.get("idIngredient");

  if (!idIngredient) {
    return NextResponse.json({ error: "Missing idIngredient" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    await SavedIngredient.deleteOne({ userId, idIngredient });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete ingredient" }, { status: 500 });
  }

}
