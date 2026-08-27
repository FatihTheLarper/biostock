'use client'

import { showToast } from "nextjs-toast-notify";
import { useRef, useEffect, useState } from "react";
import NavBar from "../components/navbar/navbar";
import Card from "../components/card/card";
import FloatingInput from "../components/floatinginput/floatinginput";
import type { Ingredient, Meal } from "@/lib/themealdb";
import { getIngredients } from "@/lib/themealdb";
import { fetchSavedIngredients, fetchSavedRecipes, saveIngredients, saveRecipes, deleteIngredient, deleteRecipe, generateRecipes } from "./lib/api";

export default function MealPrep() {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchSavedIngredients().then(setIngredients),
      fetchSavedRecipes().then(setRecipes),
    ]).finally(() => setLoading(false));
  }, []);

  const allIngredients = useRef<Ingredient[]>([]);

  const errorToast = (message: string) => {
    showToast.error(message, {
      duration: 2000,
      position: "top-center",
      transition: "bounceIn",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
      sound: false,
    });
  };

  const successToast = (message: string, progress: boolean) => {
    showToast.success(message, {
      duration: 2000,
      position: "top-center",
      transition: "bounceIn",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      sound: false,
      progress,
    });
  };

  const handleSearch = async (query: string) => {

    if (allIngredients.current.length === 0) {
      setLoading(true);
      try {
        allIngredients.current = await getIngredients();
      }
      catch {
        setLoading(false);
        errorToast("Failed to load ingredients");
        return;
      }
      setLoading(false);
    }

    if (!query) return;

    const q = query.toLowerCase();

    const exact = allIngredients.current.filter(
      (i) => i.strIngredient.toLowerCase() === q
    );

    const matches = exact.length > 0
      ? exact
      : allIngredients.current.filter(
        (i) => i.strIngredient.toLowerCase().includes(q)
      );

    if (matches.length === 0) {
      errorToast(`No ingredient found for "${query}"`);
      return;
    }

    const existingIds = new Set(ingredients.map((i) => i.idIngredient));
    const newIngredients = matches.filter((m) => !existingIds.has(m.idIngredient));

    if (newIngredients.length === 0) return;

    setIngredients((prev) => [...prev, ...newIngredients]);

    try {
      await saveIngredients(newIngredients);
      successToast("Ingredient added to inventory!", true);
    }
    catch {
      errorToast("Failed to save ingredient to inventory");
    }

  };

  const handleGenerate = async () => {

    if (ingredients.length === 0) return;

    setLoading(true);

    try {
      const matching = await generateRecipes(ingredients.map((i) => i.strIngredient));

      if (matching.length === 0) {
        errorToast("No recipes found with these ingredients");
      } else {
        setRecipes(matching);
        await saveRecipes(matching);
        successToast("Recipe added to inventory!", true);
      }
    }
    catch {
      errorToast("Failed to fetch recipes");
    }

    setLoading(false);

  };

  const handleDeleteIngredient = async (idIngredient: string) => {
    try {
      await deleteIngredient(idIngredient);
      setIngredients((prev) => prev.filter((i) => i.idIngredient !== idIngredient));
      successToast("Ingredient Deleted!", true);
    }
    catch {
      errorToast("Failed to delete ingredient");
    }
  }

  const handleDeleteRecipe = async (idMeal: string) => {
    try {
      await deleteRecipe(idMeal);
      setRecipes((prev) => prev.filter((r) => r.idMeal !== idMeal));
      successToast("Recipe Deleted!", true);
    }
    catch {
      errorToast("Failed to delete recipe");
    }
  }

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "mailto:support@example.com" }
  ];

  return (
    <div className="w-full p-4 font-sans">

      <NavBar items={navItems}></NavBar>

      {loading && ingredients.length === 0 && recipes.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {ingredients.length <= 0 && (
            <div className="flex justify-center items-center">
              <h1 className="text-xl md:text-2xl font-semibold mt-40 mb-4 text-center">No ingredients added to your inventory</h1>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">

            {ingredients.map((ingredient) => (
              <Card
                onDelete={() => handleDeleteIngredient(ingredient.idIngredient)}
                key={ingredient.idIngredient}
                title={ingredient.strIngredient}
                image={ingredient.strThumb ?? "/images/not-found.jpg"}
                description={`${(ingredient.strDescription ?? "A versatile component that enhances the overall profile of a dish, offering complementary notes that elevate the dining experience while integrating seamlessly with other elements to create a cohesive whole").slice(0, 150)}...`}
              ></Card>
            ))}

          </div>

          {recipes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mt-10 mb-4 text-center">Generated Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {recipes.map((meal) => (
                  <Card
                    onDelete={() => handleDeleteRecipe(meal.idMeal)}
                    key={meal.idMeal}
                    title={meal.strMeal}
                    image={meal.strMealThumb}
                  ></Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <FloatingInput
        onSearch={handleSearch}
        onGenerate={handleGenerate}
        showGenerate={ingredients.length > 0}
        loading={loading}
      ></FloatingInput>

    </div>
  );
}
