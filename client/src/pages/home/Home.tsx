import { SearchBar } from "@/searchBar";
import { ROUTE_RECIPES_SEARCH } from "../../const";

import style from "./Home.module.scss";

const Home = () => {
  return (
    <div className={style.home}>
      <h2>Busca o añade nuestras recetas familiares</h2>

      <SearchBar inputName="search-bar-home" routeRecipes={ROUTE_RECIPES_SEARCH} label="Buscar receta" />
    </div>
  );
};

export default Home;
