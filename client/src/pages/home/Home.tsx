import { SearchBar } from "@/searchBar";

import style from "./Home.module.scss";

const Home = () => {
  return (
    <div className={style.home}>
      <h2>Busca o añade nuestras recetas familiares</h2>

      <SearchBar
        inputName="search-bar-home"
        routeRecipes="/recipes/search"
        label="Buscar receta"
      />
    </div>
  );
};

export default Home;
