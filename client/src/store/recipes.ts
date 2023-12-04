import { getAllCategories } from "../services";
import { RecipeProps } from "@/types";
import { create } from "zustand";

interface RecipeState {
  recipes: RecipeProps[];
  isLoadingRecipes: boolean;
  categories: string[];
  setRecipes: (recipe: RecipeProps) => void;
  setIsLoadingRecipes: (loading: boolean) => void;
  setAllInitRecipes: (recipes: RecipeProps[]) => void;
  setAllCategories: (recipes: RecipeProps[]) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => {
  return {
    recipes: [],
    isLoadingRecipes: false,
    categories: [],

    setRecipes: async (recipe) => {
      const { recipes } = get();
      const newRecipes = structuredClone(recipes);

      set({ recipes: [...newRecipes, recipe] });
    },

    setIsLoadingRecipes: async (loading) => {
      set({ isLoadingRecipes: loading });
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
