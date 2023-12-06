import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { getFetchingDataRecipes } from "./services";
import { useRecipeStore } from "./store/recipes";
import { AddRecipe, Home, RecipeList } from "./pages";
import { ResponseAPIProps } from "./types";

function RoutesApp() {
  return (
    <Routes>
      <>
        <Route path="/">
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/recipes/:search">
          <Route path="/recipes/:search" element={<RecipeList />} />
        </Route>
        <Route path="/add-recipe">
          <Route path="/add-recipe" element={<AddRecipe />} />
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
  const setIsLoadingRecipes = useRecipeStore(
    (state) => state.setIsLoadingRecipes
  );

  useEffect(() => {
    const getRecipes = async () => {
      setIsLoadingRecipes(true);

      try {
        ///  await promiseForTesting(4000);
        const { response }: ResponseAPIProps = await getFetchingDataRecipes();

        setAllInitRecipes(response);
        setAllCategories(response);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoadingRecipes(false);
      }
    };

    getRecipes();
  }, []);

  return <RoutesApp />;
};

export default App;
