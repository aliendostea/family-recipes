import { PreparationProps, PreparationPropsFromAPI, RecipePropsFromAPI } from "@/types";

function preparationAdapterObj(preparation: PreparationPropsFromAPI): PreparationProps {
  return {
    id: preparation._id,
    label: preparation.label,
    value: preparation.value,
    photo: preparation.photo,
  };
}

export function recipeAdapterObj(recipe: RecipePropsFromAPI) {
  const preparation = recipe.preparation.map((item) => preparationAdapterObj(item));

  return {
    id: recipe._id,
    createdAt: recipe.createdAt,
    mainPhoto: recipe.mainPhoto,
    title: recipe.title,
    author: recipe.author,
    description: recipe.description,
    category: recipe.category,
    cookingTime: recipe.cookingTime,
    peopleQuantity: recipe.peopleQuantity,
    ingredients: recipe.ingredients,
    preparation: preparation,
  };
}
