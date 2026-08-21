import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import SavedRecipe from "../../../app/mealprep/lib/models/SavedRecipe";

export async function GET() {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const recipes = await SavedRecipe.find({ userId }).lean();

  return NextResponse.json(recipes);

}

export async function POST(request: Request) {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const items = body.map((item: Record<string, string>) => ({ ...item, userId }));

  await connectToDatabase();
  await SavedRecipe.insertMany(items, { ordered: false }).catch(() => { });

  return NextResponse.json({ ok: true });

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

  await connectToDatabase();

  await SavedRecipe.deleteOne({ userId, idMeal });

  return NextResponse.json({ ok: true });

}
