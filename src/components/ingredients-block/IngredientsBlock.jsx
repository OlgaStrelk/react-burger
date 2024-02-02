import { Fragment } from "react";
import PropTypes from "prop-types";
import { titlesArrayShape, cardDataShape } from "../../utils/shapes";

import styles from "./ingredients-block.module.css";
import IngredientCard from "../ingredient-card/IngredientCard";

function IngredientsBlock({ titles, ingredientsArray }) {
  const renderFilteredIngredients = (blockTitle) => {
    const newArray = ingredientsArray.filter(
      (ingredient) => ingredient.type === blockTitle?.value
    );
    return newArray.map((item) => (
      <IngredientCard key={item._id} cardData={item} />
    ));
  };

  return (
    <div className={`${styles.container} mt-10`}>
      {titles.map((item) => (
        <Fragment key={item.id}>
          <h3 className={`text text_type_main-medium mb-6`}>{item.title}</h3>
          <div className={styles.block}>{renderFilteredIngredients(item)}</div>
        </Fragment>
      ))}
    </div>
  );
}

IngredientsBlock.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape(titlesArrayShape)),
  ingredientsArray: PropTypes.arrayOf(PropTypes.shape(cardDataShape)),
};

export default IngredientsBlock;
