import style from "./Card.module.scss";

const CardSkeleton = () => {
  return (
    <div className={style.skeleton}>
      <span className={style.box1}></span>
      <span className={style.box2}></span>
      <span className={style.box3}></span>
    </div>
  );
};

export default CardSkeleton;
