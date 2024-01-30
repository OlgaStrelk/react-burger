import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";

function IngredientCard({ data }) {
  return (
    <>
      <div className={styles.counter}>1</div>
      <img src={data.image} />
      <span className={styles.price}>{data.price}</span>
      <CurrencyIcon />
      <h4 className={styles.title}></h4>
      <h4>{data.name}</h4>
    </>
  );
}

export default IngredientCard;
