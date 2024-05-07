import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { Link, useLocation } from "react-router-dom";
import { memo } from "react";
import { useDrag } from "react-dnd";
import { TIngredient } from "../../../utils/types";

function IngredientCard(cardData: TIngredient) {
  const [, dragRef] = useDrag({
    type: "ingredients",
    item: cardData,
  });
  const location = useLocation();
  return (
    <Link
      className={styles.link}
      to={`/ingredients/${cardData._id}`}
      state={{ backgroundLocation: location }}
    >
      <div ref={dragRef} className={`${styles.container} ml-4 mb-8`}>
        <Counter count={cardData.quantity} size="default" extraClass="m-1" />
        <img
          className={`pl-4 pr-4 ${styles.image}`}
          src={cardData.image}
          alt={cardData.name}
        />
        <p
          className={`text text_type_digits-default mt-1 mb-1 ${styles.price} ${styles.centered}`}
        >
          <span className="mr-1">{cardData.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <h4
          className={`text text_type_main-default ${styles.title} ${styles.centered}`}
        >
          {cardData.name}
        </h4>
      </div>
    </Link>
  );
}

export default memo(IngredientCard);
