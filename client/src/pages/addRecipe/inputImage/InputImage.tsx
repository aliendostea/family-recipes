import { useState } from "react";
import style from "./InputImage.module.scss";
import { IconAdd } from "@/icons";

interface InputFilesImageProps {
  id?: string;
  objectURL: string;
  file: Blob | Uint8Array | ArrayBuffer;
}

interface InputImageProps {
  id: string;
  name: string;
  labelPhoto: string;
  label?: string;
  placeholder: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  ///onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const InputImage = ({ id, name, labelPhoto, ...props }: InputImageProps) => {
  const [inputFilesImage, setInputFilesImage] = useState<InputFilesImageProps>({
    objectURL: "",
    file: new Uint8Array([0, 0, 0, 0, 0]),
  });

  const handleOnChangeInputFiles = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const uploadImg: InputFilesImageProps = {
        objectURL: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      };

      setInputFilesImage(uploadImg);
      /// setEmptyFileInputError(false);
    }
  };

  return (
    <div className={style["parent-input-image"]}>
      <input
        id={id}
        name={name}
        type="file"
        multiple
        className={style["input-image"]}
        onChange={handleOnChangeInputFiles}
        {...props}
      />
      {inputFilesImage.objectURL === "" ? (
        <figure className={style["figure-image"]}>
          <IconAdd width="20" height="20" />
        </figure>
      ) : (
        <figure className={style["figure-image"]}>
          <img
            src={inputFilesImage.objectURL}
            alt="Select image"
            loading="lazy"
          />
        </figure>
      )}
      <span className={style["label"]}> {labelPhoto} </span>
    </div>
  );
};

export default InputImage;
