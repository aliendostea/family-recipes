import { RecipePropsFromAPI } from "@/types";

export function recipeAdapterObj(recipe: RecipePropsFromAPI) {
  return {
    id: recipe._id,
    createdAt: recipe.createdAt,
    mainPhoto: recipe.mainPhoto,
    title: recipe.title,
    autor: recipe.author,
    description: recipe.description,
    category: recipe.category,
    cookingTime: recipe.cookingTime,
    peopleQuantity: recipe.peopleQuantity,
    ingredients: recipe.ingredients,
    preparation: recipe.preparation,
  };
}
