import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MealPrepClient from "./MealPrepClient";

export const metadata: Metadata = {
  title: "Meal Prep",
  description:
    "Manage your ingredients and generate personalized, zero-waste recipes with BioStock's AI.",
};

export default async function MealPrepPage() {
  const { isAuthenticated, sessionClaims } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return <MealPrepClient name={sessionClaims.firstName ?? "Guest"} />;
}
