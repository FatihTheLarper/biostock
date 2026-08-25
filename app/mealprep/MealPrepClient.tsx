'use client'

import { showToast } from "nextjs-toast-notify";
import { Skeletonize } from "react-layout-skeletonizer";
import { useRef, useEffect, useState } from "react";
import NavBar from "../components/navbar/navbar";
import Card from "../components/card/card";
import FloatingInput from "../components/floatinginput/floatinginput";
import type { Ingredient, Meal } from "./lib/themealdb";
import { getIngredients, filterMealsByIngredient, lookupMealById } from "./lib/themealdb";
import { fetchSavedIngredients, fetchSavedRecipes, saveIngredients, saveRecipes, deleteIngredient, deleteRecipe } from "./lib/api";

export default function MealPrep() {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchSavedIngredients().then(setIngredients),
      fetchSavedRecipes().then(setRecipes),
    ]).finally(() => setLoading(false));
  }, []);

  const allIngredients = useRef<Ingredient[]>([]);

  const handleSearch = async (query: string) => {

    setError(null);

    if (allIngredients.current.length === 0) {
      setLoading(true);
      try {
        allIngredients.current = await getIngredients();
      }
      catch (e) {
        setLoading(false);
        setError(e instanceof Error ? e.message : "Failed to load ingredients");
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
      setError(`No ingredient found for "${query}"`);
      showToast.error(`No ingredient found for "${query}"`, {
        duration: 2000, // 2 seconds
        position: "top-center",
        transition: "bounceIn",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
        sound: false,
        progress: true
      });

      return;
    }

    const existingIds = new Set(ingredients.map((i) => i.idIngredient));
    const newIngredients = matches.filter((m) => !existingIds.has(m.idIngredient));

    if (newIngredients.length === 0) return;

    setIngredients((prev) => [...prev, ...newIngredients]);

    saveIngredients(newIngredients);

    showToast.success("Ingredient added to inventory!", {
      duration: 2000, // 2 seconds
      position: "top-center",
      transition: "bounceIn",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      sound: false,
      progress: true
    });

  };

  const handleGenerate = async () => {

    setError(null);
    setRecipes([]);

    if (ingredients.length === 0) return;

    setLoading(true);

    try {
      const results = await Promise.all(
        ingredients.map((i) => filterMealsByIngredient(i.strIngredient))
      );

      const userIngredientNames = new Set(
        ingredients.map((i) => i.strIngredient.toLowerCase())
      );

      const allMealIds = [...new Set(results.flat().map((m) => m.idMeal))];

      const details = await Promise.all(
        allMealIds.map((id) => lookupMealById(id))
      );

      const matching: { idMeal: string; strMeal: string; strMealThumb: string }[] = [];

      for (const d of details) {
        if (!d) continue;
        if (d.ingredients.length === 0) continue;
        const hasAll = d.ingredients.every((ing) => userIngredientNames.has(ing));
        if (hasAll) {
          matching.push({ idMeal: d.idMeal, strMeal: d.strMeal, strMealThumb: d.strMealThumb });
        }
      }

      if (matching.length === 0) {
        setError("No recipes found with all these ingredients");
        showToast.error("No recipes found with all these ingredients", {
          duration: 2000, // 2 seconds
          position: "top-center",
          transition: "bounceIn",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
          sound: false,

        });
      } else {
        setRecipes(matching);
        saveRecipes(matching);
        showToast.success("Recipe added to inventory!", {
          duration: 2000, // 2 seconds
          position: "top-center",
          transition: "bounceIn",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
          sound: false,
          progress: true
        });
      }
    }
    catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch recipes");
    }

    setLoading(false);

  };

  const handleDeleteIngredient = async (idIngredient: string) => {
    await deleteIngredient(idIngredient);
    setIngredients((prev) => prev.filter((i) => i.idIngredient !== idIngredient));

    showToast.success("Ingredient Deleted!", {
      duration: 2000, // 2 seconds
      position: "top-center",
      transition: "bounceIn",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      sound: false,
      progress: true
    });
  };

  const handleDeleteRecipe = async (idMeal: string) => {
    await deleteRecipe(idMeal);
    setRecipes((prev) => prev.filter((r) => r.idMeal !== idMeal));
    showToast.success("Recipe Deleted!", {
      duration: 2000, // 2 seconds
      position: "top-center",
      transition: "bounceIn",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      sound: false,
      progress: true
    });
  };

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "mailto:support@example.com" }
  ];

  return (
    <div className="w-full p-4 font-sans">

      <NavBar items={navItems}></NavBar>

      <Skeletonize isLoading={loading}>

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
          <>
            <h2 className="text-2xl font-bold mt-10 mb-4 text-center">Generated Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {recipes.map((meal) => (
                <Card
                  onDelete={() => handleDeleteRecipe(meal.idMeal)}
                  key={meal.idMeal}
                  title={meal.strMeal}
                  image={meal.strMealThumb}
                  description=""
                ></Card>
              ))}
            </div>
          </>
        )}

      </Skeletonize>

      <FloatingInput
        onSearch={handleSearch}
        onGenerate={handleGenerate}
        showGenerate={ingredients.length > 0}
      ></FloatingInput>

    </div>
  );
}
