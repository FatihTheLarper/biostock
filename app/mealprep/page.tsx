import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MealPrepClient from "./MealPrepClient";

export default async function MealPrepPage() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return <MealPrepClient />;
}
