import React, { useState } from "react";
import { useRecipeStore } from "../../store/recipes";
import { TextField } from "./textField";
import { Select } from "./select";
import { SelectChips } from "./selectChips";
import { InputImage } from "./inputImage";
import { PreparationStepsList } from "./preparationSteps";
import { IconAdd } from "@/icons";
import { RecipeProps, ResponseAPIProps } from "@/types";
import { initialInputsRecipeValues } from "../../const";
import { fetchPostRecipe } from "../../services";
import { recipeAdapterObj } from "../../adapters/recipeAdapter";

import style from "./AddRecipe.module.scss";

const raString =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime earum qui suscipit, saepe, at facilis soluta nesciunt reprehenderit quae id molestiae cum natus velit provident quo! Odio eveniet fuga libero";

function getRandomNumber() {
  const [, randomNumber] = Math.random().toString().split(".");
  return randomNumber;
}
function getProvitionalIDPreparationStepsList() {
  const randomString = raString.split(" ").join("");
  const randomNumberString = getRandomNumber();
  const randomNumberString2 = getRandomNumber()[0];
  const first = randomNumberString[0];
  const date = `${Date.now().toString().substring(9, 12)}`;
  const other = `${randomString[randomNumberString2 as keyof typeof randomString]}`;
  return `input-preparation-${date}-${other}-${
    randomString[first as keyof typeof randomString]
  }-${randomNumberString.substring(0, 2)}-${randomNumberString.substring(4, 6)}`;
}

// const recipeTest = {
//   id: "",
//   createdAt: "",
//   title: "Spaghetti Bolognese nombre largo! 2",
//   author: "Chef John 2",
//   description: "A classic Italian dish with a twist.",
//   category: "Pasta",
//   cookingTime: "30 minutes",
//   peopleQuantity: "4",
//   ingredients: "Ground beef, tomatoes, pasta, onion, garlic, herbs",
//   preparation: [
//     {
//       id: "134578",
//       label: "Preparación paso 1",
//       value: "Pelamos el tomate para cortarlo en finas rodajas.",
//       photo: "img.png",
//     },
//   ],
//   mainPhoto:
//     "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// };

function getPreparationValuesFromInputs({
  objectFormValues,
  key,
  index,
}: {
  objectFormValues: RecipeProps;
  key: string;
  index: string;
}) {
  return objectFormValues[`preparation-${key}-${index}` as keyof typeof objectFormValues];
}

const AddRecipe = () => {
  const [selectCompValue, setSelectCompValue] = useState("");
  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const categories = useRecipeStore((state) => state.categories);

  const [preparationSteps, setPreparationSteps] = useState([
    {
      id: "134578",
      label: "Preparación paso 1",
      value: "Pelamos el tomate para cortarlo en finas rodajas.",
      photo: "img.png",
    },
  ]);

  const sendSubmitDataForm = async (recipe: RecipeProps) => {
    try {
      const resAPI: ResponseAPIProps = await fetchPostRecipe(recipe);

      if (resAPI.ok) {
        const [recipeAdded] = resAPI.response.recipes.map((recipe) => recipeAdapterObj(recipe));

        setRecipes(recipeAdded);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const objectFormValues: RecipeProps = {
      ...initialInputsRecipeValues,
    };
    const formData = new FormData(e.currentTarget);

    for (const [key, value] of formData) {
      objectFormValues[key as keyof typeof objectFormValues] = value;
    }

    for (const key in objectFormValues) {
      if (key.includes("preparation-value")) {
        const [, , index] = key.split("-");
        const id = getPreparationValuesFromInputs({
          objectFormValues,
          key: "id",
          index,
        });
        const value = getPreparationValuesFromInputs({
          objectFormValues,
          key: "value",
          index,
        });
        // const photo = getPreparationValuesFromInputs({
        //   objectFormValues,
        //   key: "photo",
        //   index,
        // });

        const newPreparationObj = {
          id,
          label: `Preparación paso ${Number(index) + 1}`,
          value,
          photo: "provisional photo value", //// provisional value - error -
        };

        objectFormValues.preparation = [...objectFormValues.preparation, newPreparationObj];
      }
    }

    const ingredients = (objectFormValues["ingredients"] as string).split(",");
    const newRecipeValues = {
      id: "",
      createdAt: "",
      title: objectFormValues.title,
      author: objectFormValues.author,
      description: objectFormValues.description,
      category: objectFormValues.category,
      cookingTime: objectFormValues.cookingTime,
      peopleQuantity: objectFormValues.peopleQuantity,
      ingredients,
      preparation: objectFormValues.preparation,
      mainPhoto:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", //// provisional value - error - tiene que ser objectFormValues.mainPhoto
    };

    sendSubmitDataForm(newRecipeValues);
    // input.value = "";
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCompValue(e.target.value);
  };

  const handleClickAddPreparationStep = () => {
    const id = getProvitionalIDPreparationStepsList();

    const newArray = [
      ...preparationSteps,
      {
        id,
        label: `Preparación paso ${preparationSteps.length + 1}`,
        value: "",
        photo: "",
      },
    ];

    setPreparationSteps(newArray);
  };

  const handleClickRemovePreparationStep = (index: number) => {
    const arrayDeletedElement = preparationSteps.toSpliced(index, 1);

    const arrayLabelUpdated = arrayDeletedElement.map((recipe, index) => {
      return {
        ...recipe,
        label: `Preparación paso ${index + 1}`,
      };
    });

    setPreparationSteps(arrayLabelUpdated);
  };

  return (
    <div className={style["add-wrapper"]}>
      <div className={style["parent-recipes2"]}>
        <h2>Añadir nueva receta</h2>
        <form className={style["form"]} onSubmit={handleOnSubmit}>
          <InputImage id="user-files" name="mainPhoto" placeholder="Select Image" labelPhoto="Añade foto principal" />

          <TextField id="input-title" labelTitle="Título receta" inputName="title" placeholder="Añade título" />
          <TextField
            id="input-author"
            labelTitle="Autor receta"
            inputName="author"
            placeholder="Añade autor de la receta"
          />
          <TextField
            id="input-description"
            labelTitle="Description receta"
            inputName="description"
            placeholder="Añade descripción de la receta"
          />

          <Select
            key="input-category"
            id="input-category"
            name="category"
            type="text"
            value={selectCompValue}
            label="Categoria receta"
            optionsArray={categories}
            placeholder="Selecciona la categoria"
            /// onBlur={handleBlur}
            /// touched={touched.expirationYear}
            /// error={errors?.expirationYear}
            onChange={handleChangeCategory}
          />

          <div className={style["box-number-inputs"]}>
            <TextField
              id="input-cookingTime"
              labelTitle="Minutos preparación"
              inputName="cookingTime"
              type="number"
              placeholder="Minutos aprox."
            />
            <TextField
              id="input-peopleQuantity"
              labelTitle="Cantidad de personas"
              inputName="peopleQuantity"
              type="number"
              placeholder="Cantidad aprox."
            />
          </div>

          <SelectChips
            id="SelectChips-ingredients"
            labelTitle="Ingredients receta"
            inputName="ingredients"
            placeholder="Añade ingredients de la receta"
          />

          <PreparationStepsList
            inputName="preparation"
            preparationList={preparationSteps}
            onClickRemovePreparationStep={handleClickRemovePreparationStep}
          />

          <div className={style["btn-add-preparation-box"]}>
            <span className={style["btn-add-preparation"]} onClick={handleClickAddPreparationStep}>
              <IconAdd width="30" height="30" />
              {preparationSteps.length > 0 ? (
                <span>Añadir otro paso de preparación</span>
              ) : (
                <span>Añadir paso de preparación</span>
              )}
            </span>
          </div>

          <button className={style["btn-submit-form"]} type="submit">
            Enviar receta
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
