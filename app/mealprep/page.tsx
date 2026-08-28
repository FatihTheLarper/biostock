import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MealPrepClient from "./MealPrepClient";

export default async function MealPrepPage() {
  const { isAuthenticated, sessionClaims } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return <MealPrepClient name={sessionClaims.firstName} />;
}
