import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";

function IngredientCard({ data }) {
  return (
    <div className={styles.container}>
      <Counter count={1} size="default" extraClass="m-1" />{" "}
      <img src={data.image} />
      <span className={`text text_type_digits-default ${styles.price}`}>
        {data.price}
        <CurrencyIcon />
      </span>
      <h4 className={`${styles.title} "text text_type_main-default"`}>
        {data.name}
      </h4>
    </div>
  );
}

export default IngredientCard;
