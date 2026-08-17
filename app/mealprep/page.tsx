'use client'

import { useRef, useState } from "react";
import NavBar from "../components/navbar/navbar";
import Card from "../components/card/card";
import FloatingInput from "../components/floatinginput/floatinginput";
import type { Ingredient, Meal } from "./lib/themealdb";
import { getIngredients, filterMealsByIngredient } from "./lib/themealdb";

export default function MealPrep() {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const mealIds = results.map((meals) => new Set(meals.map((m) => m.idMeal)));

      const commonIds = mealIds.reduce((a, b) => {
        const intersection = new Set<string>();
        for (const id of a) {
          if (b.has(id)) {
            intersection.add(id);
          }
        }
        return intersection;
      }, mealIds[0]);

      const allMeals = results.flat();
      const unique = allMeals.filter((m) => commonIds.has(m.idMeal));
      const seen = new Set<string>();

      const deduped = unique.filter((m) => {
        if (seen.has(m.idMeal)) return false;
        seen.add(m.idMeal);
        return true;
      });

      if (deduped.length === 0) {
        setError("No recipes found with all these ingredients");
      } else {
        setRecipes(deduped);
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

      {loading && <p className="mt-10 text-center">Loading...</p>}
      {error && <p className="mt-10 text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">

        {ingredients.map((ingredient) => (
          <Card
            key={ingredient.idIngredient}
            title={ingredient.strIngredient}
            image={ingredient.strThumb}
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

      <FloatingInput
        onSearch={handleSearch}
        onGenerate={handleGenerate}
        showGenerate={ingredients.length > 0}
      ></FloatingInput>

    </div>
  );
}
