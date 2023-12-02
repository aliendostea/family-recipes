import { Route, Routes } from "react-router-dom";
import { AddRecipe, Home, RecipeList } from "./pages";

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
      </>
    </Routes>
  );
}

const App = () => {
  return <RoutesApp />;
};

export default App;
