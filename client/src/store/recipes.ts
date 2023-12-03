import { getAllCategories } from "../services";
import { RecipeProps } from "@/types";
import { create } from "zustand";

interface RecipeState {
  recipes: RecipeProps[];
  categories: string[];
  setRecipes: (recipe: RecipeProps) => void;
  setAllInitRecipes: (recipes: RecipeProps[]) => void;
  setAllCategories: (recipes: RecipeProps[]) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => {
  return {
    recipes: [],
    categories: [],

    setRecipes: async (recipe) => {
      const { recipes } = get();
      const newRecipes = structuredClone(recipes);

      set({ recipes: [...newRecipes, recipe] });
    },

    setAllInitRecipes: async (recipes) => {
      set({ recipes });
    },

    setAllCategories: async (recipes) => {
      const categories = getAllCategories(recipes);

      set({ categories });
    },
  };
});
