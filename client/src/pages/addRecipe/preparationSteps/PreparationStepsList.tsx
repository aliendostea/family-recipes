import { IconX } from "@/icons";
import InputImage from "../inputImage/InputImage";
import { TextField } from "../textField";

import style from "./PreparationStepsList.module.scss";

interface PreparationListProps {
  id: string;
  label: string;
  value: string;
  photo: string;
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
      {preparationList.map((item, index) => {
        return (
          <div key={item.id} className={style.preparation}>
            <TextField
              id={item.id}
              labelTitle={item.label}
              inputName={`${inputName}-value-${index}`}
              placeholder="Añade preparation de la receta"
            />
            <input
              id={`${item.id}`}
              type="text"
              className={style["preparation-id-input-hidden"]}
              name={`${inputName}-id-${index}`}
              value={`${item.id}`}
              readOnly={true}
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
