'use client'

import { useState } from "react";
import NavBar from "../components/navbar/navbar";
import Card from "../components/card/card";
import FloatingInput from "../components/floatinginput/floatinginput";
import type { Ingredient } from "./lib/themealdb";

export default function MealPrep() {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    console.log(query);
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
            description={`${ingredient.strDescription.slice(0, 150)}...`}
          ></Card>
        ))}

        <FloatingInput onSearch={handleSearch}></FloatingInput>

      </div>

    </div>
  );
}
