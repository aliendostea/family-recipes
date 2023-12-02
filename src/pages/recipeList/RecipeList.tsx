import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecipeStore } from "../../store/recipes";
import { Card } from "@/card";
import { IconX } from "@/icons";

import style from "./RecipeList.module.scss";

interface ButtonCategoreyProps {
  category: string;
  className: string;
  onClick: () => void;
  children?: JSX.Element;
}

function ButtonCategorey({
  category,
  className,
  onClick,
  children,
}: ButtonCategoreyProps) {
  return (
    <button className={className} onClick={onClick}>
      {children && children}
      {category}
    </button>
  );
}

const RecipeList = () => {
  const paramUrl = useParams();
  const recipes = useRecipeStore((state) => state.recipes);
  const categories = useRecipeStore((state) => state.categories);

  const [selectedCategory, setselectedCategory] = useState("");
  const [, search] = paramUrl?.search?.split("=") ?? "";

  const recipesFiltered = recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().search(search.toLowerCase()) !== -1 ||
      recipe.autor.toLowerCase().search(search.toLowerCase()) !== -1
    );
  });

  const recipesFilteredByCategory = recipes.filter((recipe) => {
    return (
      recipe.category.toLocaleLowerCase() ===
      selectedCategory.toLocaleLowerCase()
    );
  });

  const selectedCategoryClicked =
    selectedCategory !== "" ? recipesFilteredByCategory : recipesFiltered;

  return (
    <div className={style["recipe-list-wrapper"]}>
      <div className={style["category"]}>
        <span className={style["title"]}>Filtrar por:</span>
        {categories.map((category) => (
          <ButtonCategorey
            key={`ButtonCategorey${category}`}
            category={category}
            className={`${style["btn"]} ${
              category === selectedCategory ? style["btn--active"] : ""
            }`}
            onClick={() => setselectedCategory(category)}
          />
        ))}

        <ButtonCategorey
          key={`ButtonCategorey-`}
          category="Quitar Filtros"
          className={`${style["btn"]} ${style["btn--x"]}`}
          onClick={() => setselectedCategory("")}
        >
          <IconX width="18" height="18" />
        </ButtonCategorey>
      </div>
      <div className={style["parent-recipes2"]}>
        <h2>Lista de recetas</h2>
        <div className={style["wrapper-recipes"]}>
          {selectedCategoryClicked.map((recipe, index) => (
            <Card key={index} recipe={recipe} />
          ))}

          {recipesFiltered.length === 0 && <h3>Empty</h3>}
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
