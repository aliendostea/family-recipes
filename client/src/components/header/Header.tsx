import { IconMenu } from "@/icons";
import { SearchBar } from "@/searchBar";

import style from "./Header.module.scss";

const routeRecipes = "/recipes/search";
const inputSearchName = "search-bar-header";

const Header = () => {
  return (
    <div className={style.header}>
      <p>Recetas Familia</p>

      <SearchBar
        inputName={inputSearchName}
        routeRecipes={routeRecipes}
        label="Buscar"
      />

      <button className={style.menu}>
        <IconMenu width="40" height="40" />
      </button>
    </div>
  );
};

export default Header;
