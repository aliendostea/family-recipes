import { useNavigate } from "react-router-dom";
import { IconMenu, IconSearch } from "@/icons";

import style from "./Header.module.scss";

const routeRecipes = "/recipes/search";
const inputSearchName = "search-input";

const Header = () => {
  const navigate = useNavigate();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(inputSearchName);
    const isInput = input instanceof HTMLInputElement;

    if (!isInput || input == null) return;
    if (input.value === "") return;

    navigate(`${routeRecipes}=${input.value}`);
    input.value = "";
  };

  return (
    <div className={style.header}>
      <p>Recetas mi Familia</p>
      {/* <figure>
        <img src="/path/to/logo.png" alt="App Logo" />
      </figure> */}
      <form className={style.form} onSubmit={handleOnSubmit}>
        <IconSearch width="25" height="25" />
        <input
          type="text"
          name={inputSearchName}
          placeholder="Intenta buscar pasta bolognese o nonna"
        />
        <button type="submit">Search</button>
      </form>

      <button className={style.menu}>
        <IconMenu width="40" height="40" />
      </button>
    </div>
  );
};

export default Header;
