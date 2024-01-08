import { useNavigate } from "react-router-dom";
import { IconSearch } from "@/icons";
import { Button } from "@/button";

import style from "./SearchBar.module.css";

interface SearchBarProps {
  inputName: string;
  routeRecipes: string;
  label: string;
}

const SearchBar = ({ inputName, routeRecipes, label }: SearchBarProps) => {
  const navigate = useNavigate();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(inputName);
    const isInput = input instanceof HTMLInputElement;

    if (!isInput || input == null) return;
    if (input.value === "") return;

    navigate(`${routeRecipes}=${input.value}`);
    input.value = "";
  };
  return (
    <form className={style.search} onSubmit={handleOnSubmit}>
      <IconSearch width="25" height="25" />
      <input type="text" name={inputName} placeholder="Intenta buscar pasta bolognese o nonna" />
      <Button label={label} type="submit" />
    </form>
  );
};

export default SearchBar;
