import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecipeStore } from "../../store/recipes";
import { Card, CardSkeleton } from "@/card";
import { IconEmpty, IconX } from "@/icons";
import { ROUTE_RECIPES_SEARCH } from "../../const";

import style from "./RecipeList.module.scss";
import { Button } from "@/button";

interface ButtonCategoreyProps {
  category: string;
  className: string;
  onClick: () => void;
  children?: JSX.Element;
}

function ButtonCategorey({ category, className, onClick, children }: ButtonCategoreyProps) {
  return (
    <button className={className} onClick={onClick}>
      {children && children}
      {category}
    </button>
  );
}

function NotFoundRecipeListRoute({ handleOnClickGoBack }: { handleOnClickGoBack: () => void }) {
  return (
    <div className={style["recipe-list-wrapper"]}>
      <div className={style["category"]}>
        {Array.from(Array(3).keys()).map((key) => (
          <ButtonCategorey
            key={`ButtonCategorey-loading${key}`}
            category=""
            className={`${style["category-btn"]} ${style["category-btn--loading"]}`}
            onClick={() => ""}
          />
        ))}
      </div>

      <div className={style["parent-recipes2"]}>
        <h2>Lista de recetas</h2>
        <div className={style["wrapper-recipes"]}>
          <div className={style["box-empty-recipes"]}>
            <IconEmpty width="80" height="80" />
            <p>No se pudo encontrar la receta, por favor, inténtalo de nuevo o ve atrás.</p>
            <Button label="Ir a la home" onClick={handleOnClickGoBack} />
          </div>
        </div>
      </div>
    </div>
  );
}

const RecipeList = () => {
  const paramUrl = useParams();
  const navigate = useNavigate();
  const recipes = useRecipeStore((state) => state.recipes);
  const categories = useRecipeStore((state) => state.categories);
  const isLoadingRecipes = useRecipeStore((state) => state.isLoadingRecipes);
  const [selectedCategory, setselectedCategory] = useState("");

  const [, search] = paramUrl?.search?.split("=") ?? "";

  const handleOnClickAllRecipes = () => {
    setselectedCategory("");
    navigate(`${ROUTE_RECIPES_SEARCH}=`);
  };

  const handleOnClickGoBack = () => {
    navigate("/");
  };

  if (search === undefined) {
    return <NotFoundRecipeListRoute handleOnClickGoBack={handleOnClickGoBack} />;
  }

  const recipesFiltered = recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().search(search.toLowerCase()) !== -1 ||
      recipe.author.toLowerCase().search(search.toLowerCase()) !== -1
    );
  });

  const recipesFilteredByCategory = recipes.filter((recipe) => {
    return recipe.category.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase();
  });

  const selectedCategoryClicked = selectedCategory !== "" ? recipesFilteredByCategory : recipesFiltered;

  if (recipesFiltered.length === 0 && isLoadingRecipes === false) {
    return <NotFoundRecipeListRoute handleOnClickGoBack={handleOnClickGoBack} />;
  }

  return (
    <div className={style["recipe-list-wrapper"]}>
      <div className={style["category"]}>
        <span className={style["category-title"]}>Filtrar por:</span>

        {isLoadingRecipes &&
          recipesFiltered.length === 0 &&
          Array.from(Array(3).keys()).map((key) => (
            <ButtonCategorey
              key={`ButtonCategorey-loading${key}`}
              category=""
              className={`${style["category-btn"]} ${style["category-btn--loading"]}`}
              onClick={() => setselectedCategory("")}
            />
          ))}

        {isLoadingRecipes === false && (
          <>
            {categories.map((category) => (
              <ButtonCategorey
                key={`ButtonCategorey${category}`}
                category={category}
                className={`${style["category-btn"]} ${
                  category === selectedCategory ? style["category-btn--active"] : ""
                }`}
                onClick={() => setselectedCategory(category)}
              />
            ))}
            <ButtonCategorey
              key={`ButtonCategorey-all`}
              category="Ver todas las recetas"
              className={`${style["category-btn"]} ${style["category-btn--x"]}`}
              onClick={handleOnClickAllRecipes}
            />

            <ButtonCategorey
              key={`ButtonCategorey-x`}
              category="Quitar Filtros"
              className={`${style["category-btn"]} ${style["category-btn--x"]}`}
              onClick={() => setselectedCategory("")}
            >
              <IconX width="18" height="18" />
            </ButtonCategorey>
          </>
        )}
      </div>
      <div className={style["parent-recipes2"]}>
        <h2>Lista de recetas</h2>
        <div className={style["wrapper-recipes"]}>
          {selectedCategoryClicked.map((recipe, index) => (
            <Card key={index} recipe={recipe} />
          ))}

          {isLoadingRecipes && recipesFiltered.length === 0 && (
            <>
              <p className={style["title-loading"]}>Se están cargando las recetas, por favor, espera.</p>
              {Array.from(Array(3).keys()).map((key) => (
                <CardSkeleton key={`CardSkeleton-${key}`} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
