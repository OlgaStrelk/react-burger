import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { cardDataShape } from "../../../utils/shapes";
import { memo } from "react";
import { useDrag } from "react-dnd";

function IngredientCard({ cardData }) {
  const [, dragRef] = useDrag({
    type: "ingredients",
    item: cardData,
  });
  return (
    <div ref={dragRef} className={`${styles.container} ml-4 mb-8`}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img
        className={`pl-4 pr-4 ${styles.image}`}
        src={cardData.image}
        alt={cardData.name}
      />
      <p
        className={`text text_type_digits-default mt-1 mb-1 ${styles.price} ${styles.centered}`}
      >
        <span className="mr-1">{cardData.price}</span>
        <CurrencyIcon />
      </p>
      <h4
        className={`text text_type_main-default ${styles.title} ${styles.centered}`}
      >
        {cardData.name}
      </h4>
    </div>
  );
}

IngredientCard.propTypes = {
  cardData: PropTypes.shape(cardDataShape).isRequired,
};

export default memo(IngredientCard);
