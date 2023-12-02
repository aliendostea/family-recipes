import style from "./Select.module.scss";

interface SelectProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: number | string;
  optionsArray: string[];
  type: string;
  error?: string | undefined;
  touched?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement, Element>) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  name,
  label,
  value,
  optionsArray,
  placeholder,
  error,
  touched,
  ...props
}: SelectProps) => {
  return (
    <div className={style["select-box"]}>
      <label
        htmlFor={name}
        className={
          error && touched
            ? `${style["select-label"]} ${style["select-label--error"]}`
            : style["select-label"]
        }
      >
        {label}
      </label>

      <select
        name={name}
        value={value}
        className={
          error && touched
            ? `${style.select} ${style["select--error"]}`
            : `${style.select}`
        }
        {...props}
      >
        <option key={placeholder} value="">
          {placeholder}
        </option>
        {optionsArray?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {error && touched && (
        <span className={style["select-span-error"]}>{error}</span>
      )}
    </div>
  );
};

export default Select;
