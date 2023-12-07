import { Link } from "react-router-dom";
import { IconAdd, IconMenu, IconPasta } from "@/icons";
import { SearchBar } from "@/searchBar";
import {
  ROUTE_ADD_RECIPE,
  ROUTE_ALL_RECIPES_LIST,
  ROUTE_RECIPES_SEARCH,
} from "../../const";

import style from "./Header.module.scss";

const INPUT_SEARCH_NAME_HEADER = "search-bar-header";

const Header = () => {
  return (
    <div className={style.header}>
      <Link to="/">
        <p>Recetas Familia</p>
      </Link>

      <SearchBar
        inputName={INPUT_SEARCH_NAME_HEADER}
        routeRecipes={ROUTE_RECIPES_SEARCH}
        label="Buscar"
      />

      <Link to={ROUTE_ADD_RECIPE}>
        <button className={style.btns}>
          <IconAdd width="20" height="20" color="var(---color-secondary)" />
          Añadir receta
        </button>
      </Link>

      <Link to={ROUTE_ALL_RECIPES_LIST}>
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
