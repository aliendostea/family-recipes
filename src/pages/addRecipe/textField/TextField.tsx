import style from "./TextField.module.scss";

interface TextFieldProps {
  id: string;
  labelTitle: string;
  inputName: string;
  placeholder: string;
  type?: string;
}
export function TextField({
  id,
  labelTitle,
  inputName,
  placeholder,
  type = "text",
}: TextFieldProps) {
  return (
    <label htmlFor={id} className={style.label}>
      {labelTitle}
      <input
        id={id}
        className={style.input}
        type={type}
        name={inputName}
        placeholder={placeholder}
      />
    </label>
  );
}
