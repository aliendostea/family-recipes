import { IconAdd, IconMenu } from "@/icons";
import { SearchBar } from "@/searchBar";

import style from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

const routeRecipes = "/recipes/search";
const routeAddRecipe = "/add-recipe";
const inputSearchName = "search-bar-header";

const Header = () => {
  const navigate = useNavigate();

  const handleOnClicGoToRecipeList = () => {
    navigate(routeAddRecipe);
  };

  return (
    <div className={style.header}>
      <p>Recetas Familia</p>

      <SearchBar
        inputName={inputSearchName}
        routeRecipes={routeRecipes}
        label="Buscar"
      />

      <button className={style.btns} onClick={handleOnClicGoToRecipeList}>
        <IconAdd width="20" height="20" color="rgb(24, 89, 49)" />
        Añadir receta
      </button>

      <button className={style.menu}>
        <IconMenu width="40" height="40" />
      </button>
    </div>
  );
};

export default Header;
