import React, { useState } from "react";
import { useRecipeStore } from "../../store/recipes";
import { TextField } from "./textField";
import { Select } from "./select";
import { SelectChips } from "./selectChips";
import { InputImage } from "./inputImage";
import { PreparationStepsList } from "./preparationSteps";
import { IconAdd } from "@/icons";
import { PreparationSteps, RecipeProps } from "@/types";
import { fetchPostRecipe } from "../../services";

import style from "./AddRecipe.module.scss";

const SELECT_OPTIONS_CATEGORIES = ["Pasta", "Sopa", "Bolognese"];

const initialInputsValues: RecipeProps = {
  id: "",
  timeStamp: "",
  title: "",
  autor: "",
  description: "",
  category: "",
  cookingTime: "",
  peopleQuantity: "",
  ingredients: [],
  preparation: [],
  mainPhoto: new Uint8Array([0, 0, 0, 0, 0]),
};

const AddRecipe = () => {
  const [selectCompValue, setSelectCompValue] = useState("");
  const setRecipes = useRecipeStore((state) => state.setRecipes);

  const [preparationSteps, setPreparationSteps] = useState([
    {
      label: "Preparación paso 1",
      description: "Pelamos el tomate para cortarlo en finas rodajas.",
      img: "img.png",
    },
  ]);

  const sendSubmitDataForm = async (recipe: RecipeProps) => {
    try {
      const res = await fetchPostRecipe(recipe);

      if (res.ok) {
        console.log("sendSubmitDataForm", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const objectFormValues: RecipeProps = {
      ...initialInputsValues,
    };
    const id = window.crypto.randomUUID();
    const timeStamp = new Date().toString();
    const formData = new FormData(e.currentTarget);

    for (const [key, value] of formData) {
      objectFormValues[key as keyof typeof objectFormValues] = value;
    }

    const preparationArray = Object.keys(objectFormValues).map((key, index) => {
      if (key.includes("preparation-key")) {
        const [, , preparationNumber] = key.split("-");

        return {
          label: `Preparación paso ${Number(preparationNumber) + 1}`,
          description: Object.values(objectFormValues)[index] as string,
          img: Object.values(objectFormValues)[index + 1] as string,
        };
      } else return null;
    });

    const preparation = preparationArray.filter(Boolean) as PreparationSteps;

    const ingredients = (objectFormValues["ingredients"] as string).split(",");
    const newRecipeValues = {
      id,
      timeStamp,
      title: objectFormValues.title,
      autor: objectFormValues.autor,
      description: objectFormValues.description,
      category: objectFormValues.category,
      cookingTime: objectFormValues.cookingTime,
      peopleQuantity: objectFormValues.peopleQuantity,
      ingredients,
      preparation,
      mainPhoto: objectFormValues.mainPhoto,
    };
    console.log("newRecipeValues", newRecipeValues);
    setRecipes(newRecipeValues);
    // input.value = "";

    sendSubmitDataForm({
      id: "NEW--999999",
      timeStamp: "string2",
      title: "Spaghetti Bolognese nombre largo!",
      autor: "Chef John 2",
      description: "A classic Italian dish with a twist.",
      category: "Pasta",
      cookingTime: "30 minutes",
      peopleQuantity: 4,
      ingredients: "Ground beef, tomatoes, pasta, onion, garlic, herbs",
      preparation: [
        {
          label: "Preparación paso 1",
          description: "Pelamos el tomate para cortarlo en finas rodajas.",
          img: "img.png",
        },
      ],
      mainPhoto:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1681&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCompValue(e.target.value);
  };

  ///// error en preparación. En la key de los elementos de preparation

  const handleClickAddPreparationStep = () => {
    const newArray = [
      ...preparationSteps,
      {
        label: `Preparación paso ${preparationSteps.length + 1}`,
        description: "Pelamos el tomate para cortarlo en finas rodajas.",
        img: "img.png",
      },
    ];

    setPreparationSteps(newArray);
  };

  const handleClickRemovePreparationStep = (index: number) => {
    const newArray = preparationSteps.toSpliced(index, 1);

    setPreparationSteps(newArray);
  };

  return (
    <div className={style["add-wrapper"]}>
      <div className={style["parent-recipes2"]}>
        <h2>Añadir nueva receta</h2>
        <form className={style["form"]} onSubmit={handleOnSubmit}>
          <InputImage
            id="user-files"
            name="mainPhoto"
            placeholder="Select Image"
            labelPhoto="Añade foto principal"
          />

          <TextField
            id="input-title"
            labelTitle="Título receta"
            inputName="title"
            placeholder="Añade título"
          />
          <TextField
            id="input-autor"
            labelTitle="Autor receta"
            inputName="autor"
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
            optionsArray={SELECT_OPTIONS_CATEGORIES}
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
            <span
              className={style["btn-add-preparation"]}
              onClick={handleClickAddPreparationStep}
            >
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
