import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getFetchingDataRecipes } from "./services";
import { useRecipeStore } from "./store/recipes";
import { AddRecipe, Home, RecipeList } from "./pages";
import { RecipeProps, ResponseAPIProps } from "./types";
import { recipeAdapterObj } from "./adapters/recipeAdapter";
import { ROUTE_ADD_RECIPE, ROUTE_RECIPES } from "./const";

function RoutesApp() {
  return (
    <Routes>
      <>
        <Route path="/">
          <Route path="/" element={<Home />} />
        </Route>
        <Route path={`${ROUTE_RECIPES}/:search`}>
          <Route path={`${ROUTE_RECIPES}/:search`} element={<RecipeList />} />
        </Route>
        <Route path={`${ROUTE_ADD_RECIPE}`}>
          <Route path={`${ROUTE_ADD_RECIPE}`} element={<AddRecipe />} />
        </Route>
        <Route path="*">
          <Route path="*" element={<div>NOT FOUND </div>} />
        </Route>
      </>
    </Routes>
  );
}

const App = () => {
  const setAllInitRecipes = useRecipeStore((state) => state.setAllInitRecipes);
  const setAllCategories = useRecipeStore((state) => state.setAllCategories);
  const setIsLoadingRecipes = useRecipeStore((state) => state.setIsLoadingRecipes);

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoadingRecipes(true);

      try {
        const { response }: ResponseAPIProps = await getFetchingDataRecipes();
        const newInitRecipes: RecipeProps[] = response.recipes.map((recipe) => recipeAdapterObj(recipe));

        setAllInitRecipes(newInitRecipes);
        setAllCategories(newInitRecipes);
      } catch (error) {
        console.log("error2", error);
      } finally {
        setIsLoadingRecipes(false);
      }
    };

    getRecipes();
  }, []);

  return <RoutesApp />;
};

export default App;
