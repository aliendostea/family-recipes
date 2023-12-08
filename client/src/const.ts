import { RecipeProps } from "./types";

export const ROUTE_ADD_RECIPE = "/add-recipe";
export const ROUTE_RECIPES = "/recipes";
export const ROUTE_RECIPES_SEARCH = `${ROUTE_RECIPES}/search`;
export const ROUTE_ALL_RECIPES_LIST = `${ROUTE_RECIPES}/search=`;

export const initialInputsRecipeValues: RecipeProps = {
  id: "",
  timeStamp: "",
  title: "",
  autor: "",
  description: "",
  category: "",
  cookingTime: "",
  peopleQuantity: "",
  ingredients: [],
  preparation: [],
  mainPhoto: new Uint8Array([0, 0, 0, 0, 0]),
};
