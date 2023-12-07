import style from "./Button.module.scss";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

const Button = ({ label, onClick, type = "button" }: ButtonProps) => {
  return (
    <button className={style["btn"]} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
