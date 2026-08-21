'use client'

import { Skeletonize } from "react-layout-skeletonizer";
import { useRef, useEffect, useState } from "react";
import NavBar from "../components/navbar/navbar";
import Card from "../components/card/card";
import FloatingInput from "../components/floatinginput/floatinginput";
import type { Ingredient, Meal } from "./lib/themealdb";
import { getIngredients, filterMealsByIngredient, lookupMealById } from "./lib/themealdb";
import { fetchSavedIngredients, fetchSavedRecipes, saveIngredients, saveRecipes } from "./lib/api";

export default function MealPrep() {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedIngredients().then(setIngredients).catch(() => { });
    fetchSavedRecipes().then(setRecipes).catch(() => { });
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
      return;
    }

    const existingIds = new Set(ingredients.map((i) => i.idIngredient));
    const newIngredients = matches.filter((m) => !existingIds.has(m.idIngredient));

    setIngredients((prev) => [...prev, ...newIngredients]);

    saveIngredients(newIngredients);

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
      } else {
        setRecipes(matching);
        saveRecipes(matching);
      }
    }
    catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch recipes");
    }

    setLoading(false);

  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "mailto:support@example.com" }
  ];

  return (
    <div className="w-full p-4 font-sans">

      <NavBar items={navItems}></NavBar>

      {error && <p className="mt-10 text-center text-red-500">{error}</p>}

      <Skeletonize isLoading={loading}>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">

          {ingredients.map((ingredient) => (
            <Card
              key={ingredient.idIngredient}
              title={ingredient.strIngredient}
              image={ingredient.strThumb ?? "/images/not-found.jpg"}
              description={`${(ingredient.strDescription ?? "").slice(0, 150)}...`}
            ></Card>
          ))}

        </div>

        {recipes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-10 mb-4 text-center">Generated Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {recipes.map((meal) => (
                <Card
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
