import { RecipeProps } from "./types";

export async function getFetchingDataRecipes() {
  return fetch("https://family-recipes-api.vercel.app/api/v1")
    .then((res) => res.json())
    .then((res) => {
      if (res.ok === false) {
        console.log("res", res.status);

        throw new Error("Error en petición");
      }

      return res;
    })
    .catch((error) => {
      console.log("Error occurred", error);
      throw new Error("Error en petición");
    });
}

export function getAllCategories(recipes: RecipeProps[]) {
  const categories = recipes.map((recipe) => {
    return recipe.category;
  });

  return Array.from(new Set(categories));
}

export const promiseForTesting = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const promiseErrorForTesting = async (time: number) =>
  new Promise((_, reject) => setTimeout(reject, time));
