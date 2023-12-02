import { RecipeProps } from "@/types";
import { create } from "zustand";

const initialRecipesTest: RecipeProps[] = [
  {
    id: window.crypto.randomUUID(),
    timeStamp: "string2",
    title: "Spaghetti Bolognese nombre largo!",
    autor: "Chef John 2",
    description: "A classic Italian dish with a twist.",
    category: "Pasta",
    cookingTime: "30 minutes",
    peopleQuantity: 4,
    ingredients: "Ground beef, tomatoes, pasta, onion, garlic, herbs",
    preparation: [
      {
        label: "Preparación paso 1",
        description: "Pelamos el tomate para cortarlo en finas rodajas.",
        img: "img.png",
      },
    ],
    mainPhoto:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: window.crypto.randomUUID(),
    timeStamp: "string2",
    title: "Spaghetti Bolognese",
    autor: "Chef John 2",
    description: "A classic Italian dish with a twist.",
    category: "Bologna",
    cookingTime: "30 minutes",
    peopleQuantity: 4,
    ingredients: "Ground beef, tomatoes, pasta, onion, garlic, herbs",
    preparation: [
      {
        label: "Preparación paso 1",
        description: "Pelamos el tomate para cortarlo en finas rodajas.",
        img: "img.png",
      },
    ],
    mainPhoto:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: window.crypto.randomUUID(),
    timeStamp: "string2",
    title: "Spaghetti Bolognese 2",
    autor: "Nonna",
    description: "A classic Italian dish with a twist.",
    category: "Bologna",
    cookingTime: "30 minutes",
    peopleQuantity: 4,
    ingredients: "Ground beef, tomatoes, pasta, onion, garlic, herbs",
    preparation: [
      {
        label: "Preparación paso 1",
        description: "Pelamos el tomate para cortarlo en finas rodajas.",
        img: "img.png",
      },
    ],
    mainPhoto:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function getAllCategories(recipes: RecipeProps[]) {
  const categories = recipes.map((recipe) => {
    return recipe.category;
  });

  return Array.from(new Set(categories));
}

interface RecipeState {
  recipes: RecipeProps[];
  categories: string[];
  setRecipes: (recipe: RecipeProps) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => {
  return {
    recipes: [...initialRecipesTest],
    categories: [],

    setRecipes: async (recipe) => {
      const { recipes } = get();
      const newRecipes = structuredClone(recipes);

      set({ recipes: [...newRecipes, recipe] });
    },
  };
});

useRecipeStore.setState({
  categories: getAllCategories(useRecipeStore.getState().recipes),
});
