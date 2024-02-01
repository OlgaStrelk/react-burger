import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";

function IngredientCard({ data }) {
  return (
    <div className={`${styles.container} ml-4 mb-8`}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img
        className={`pl-4 pr-4 ${styles.image}`}
        src={data.image}
        alt={data.name}
      />
      <p
        className={`text text_type_digits-default mt-1 mb-1 ${styles.price} ${styles.centered}`}
      >
        <span className="mr-1">{data.price}</span>
        <CurrencyIcon />
      </p>
      <h4
        className={`text text_type_main-default ${styles.title} ${styles.centered}`}
      >
        {data.name}
      </h4>
    </div>
  );
}

export default IngredientCard;