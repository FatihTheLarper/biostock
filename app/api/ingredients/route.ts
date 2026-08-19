import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "../../../lib/mongodb";
import SavedIngredient from "../../../app/mealprep/lib/models/SavedIngredient";

export async function GET() {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const ingredients = await SavedIngredient.find({ userId }).lean();

  return NextResponse.json(ingredients);

}

export async function POST(request: Request) {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const items = body.map((item: Record<string, string>) => ({ ...item, userId }));

  await connectToDatabase();

  await SavedIngredient.insertMany(items, { ordered: false }).catch(() => { });

  return NextResponse.json({ ok: true });

}
