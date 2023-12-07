import { Link } from "react-router-dom";
import { IconAdd, IconMenu, IconPasta } from "@/icons";
import { SearchBar } from "@/searchBar";

import style from "./Header.module.scss";

const routeRecipes = "/recipes/search";
const routeAllRecipesList = "/recipes/search=";
const routeAddRecipe = "/add-recipe";
const inputSearchName = "search-bar-header";

const Header = () => {
  return (
    <div className={style.header}>
      <Link to="/">
        <p>Recetas Familia</p>
      </Link>

      <SearchBar
        inputName={inputSearchName}
        routeRecipes={routeRecipes}
        label="Buscar"
      />

      <Link to={routeAddRecipe}>
        <button className={style.btns}>
          <IconAdd width="20" height="20" color="var(---color-secondary)" />
          Añadir receta
        </button>
      </Link>

      <Link to={routeAllRecipesList}>
        <button className={style.btns}>
          <IconPasta width="20" height="20" color="var(---color-secondary)" />
          Ver recetas
        </button>
      </Link>

      <button className={style.menu}>
        <IconMenu width="40" height="40" />
      </button>
    </div>
  );
};

export default Header;
