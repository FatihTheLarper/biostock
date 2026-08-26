import { z } from "zod";

export const IngredientSchema = z.object({
  idIngredient: z.string().min(1),
  strIngredient: z.string().min(1),
  strThumb: z.string().optional().default(""),
  strDescription: z.string().optional().default(""),
});

export const IngredientsBody = z.array(IngredientSchema).min(1);

export const RecipeSchema = z.object({
  idMeal: z.string().min(1),
  strMeal: z.string().min(1),
  strMealThumb: z.string().min(1),
});

export const RecipesBody = z.array(RecipeSchema).min(1);

export const GenerateBody = z.object({
  ingredients: z.array(z.string().min(1)).min(1),
});
