import { RecipeProps } from "@/types";
import { IconPeople, IconPerson, IconWatch } from "@/icons";

import style from "./Card.module.scss";

interface CardProps {
  recipe: RecipeProps;
}

const Card = ({ recipe }: CardProps) => {
  return (
    <div className={style.card}>
      <figure className={style.photo}>
        <img src={recipe.mainPhoto} alt={recipe.title} />
      </figure>
      <p className={style.title}>{recipe.title}</p>
      <span className={style.creator}>
        <IconPerson width="19" height="19" />
        <span>
          <b> Autor:</b> {recipe.autor}
        </span>
      </span>
      <span className={style.time}>
        <IconWatch width="15" height="15" />
        <span>
          <b>Tiempo:</b> {recipe.cookingTime}
        </span>
      </span>
      <span className={style.quantity}>
        <IconPeople width="20" height="20" />
        <span>
          <b>Personas:</b> {recipe.peopleQuantity}
        </span>
      </span>
    </div>
  );
};

export default Card;
