import { useState, useEffect } from "react";
import { IconX } from "@/icons";

import style from "./SelectChips.module.scss";

interface SelectChipsProps {
  id: string;
  labelTitle: string;
  inputName: string;
  placeholder: string;
  type?: string;
}
export function SelectChips({
  id,
  labelTitle,
  inputName,
  placeholder,
  type = "text",
}: SelectChipsProps) {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsFocus(true);
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setIsFocus(true);
  };

  const handleOnClickAdd = () => {
    if (inputValue === "") return;
    const newIngredient = inputValue.includes(",")
      ? inputValue.split(",").join(" ")
      : inputValue;

    setIngredients((prevState) => [...prevState, newIngredient]);
    setIsFocus(false);
    setInputValue("");
  };

  const handleOnClickChipX = (ingredient: string) => {
    const index = ingredients.indexOf(ingredient);
    const newArray = ingredients.toSpliced(index, 1);
    setIngredients(newArray);
  };

  useEffect(() => {
    function onKeyPressEnter(e: KeyboardEvent) {
      if (inputValue === "") return;

      if (e.key === "Enter" && isFocus) {
        setIsFocus(false);
        setInputValue("");
      }
    }
    window.addEventListener("keypress", onKeyPressEnter);

    return () => {
      window.removeEventListener("keypress", onKeyPressEnter);
    };
  }, []);

  return (
    <div className={style["select-chip-parent"]}>
      <label htmlFor={id} className={style.label}>
        {labelTitle}
      </label>
      <div className={style.box}>
        {ingredients.map((item) => {
          return (
            <span key={`${item}-ingredients`} className={style.chip}>
              <p>{item}</p>
              <span onClick={() => handleOnClickChipX(item)}>
                <IconX width="18" height="18" />
              </span>
            </span>
          );
        })}
        <input
          id={id}
          className={style.input}
          type={type}
          name={`visible-input-${inputName}`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleOnChange}
          onFocusCapture={handleOnFocus}
        />
        <input
          id={`hidden-${id}`}
          className={style["input-hidden"]}
          type={type}
          name={inputName}
          onChange={handleOnChange}
          value={ingredients}
        />
        {isFocus && inputValue !== "" && (
          <button className={style["btn-add"]} onClick={handleOnClickAdd}>
            Añadir
          </button>
        )}
      </div>
    </div>
  );
}
