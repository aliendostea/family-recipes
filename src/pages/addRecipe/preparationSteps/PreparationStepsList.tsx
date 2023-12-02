import { IconX } from "@/icons";
import InputImage from "../inputImage/InputImage";
import { TextField } from "../textField";

import style from "./PreparationStepsList.module.scss";

interface PreparationListProps {
  label: string;
  description: string;
  img: string;
}

const PreparationStepsList = ({
  preparationList,
  inputName,
  onClickRemovePreparationStep,
}: {
  preparationList: PreparationListProps[];
  inputName: string;
  onClickRemovePreparationStep: (id: number) => void;
}) => {
  return (
    <>
      {preparationList.map((items, index) => {
        return (
          <div key={items.label} className={style.preparation}>
            <TextField
              id="input-preparation"
              labelTitle={items.label}
              inputName={`${inputName}-key-${index}`}
              placeholder="Añade preparation de la receta"
            />
            <InputImage
              id="user-files"
              name={`${inputName}-photo-${index}`}
              placeholder="Select Image"
              labelPhoto="¿Quieres añadir una foto?"
            />
            <button
              className={style["btn-detele"]}
              onClick={() => onClickRemovePreparationStep(index)}
            >
              <IconX width="17" height="17" />
              <span>Eliminar paso</span>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default PreparationStepsList;
