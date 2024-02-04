import styles from "./ingredients-block.module.css";
import { Fragment } from "react";

import IngredientCard from "../ingredient-card/ingredient-card";

function IngredientsBlock({ titles, ingredientsArray, handler }) {
  const renderFilteredIngredients = (blockTitle) => {
    const newArray = ingredientsArray.filter(
      (ingredient) => ingredient.type === blockTitle?.value
    );
    return newArray.map((item) => (
      <IngredientCard key={item._id} cardData={item} handler={handler} />
    ));
  };
  return (
    <>
      <div className={`${styles.container} custom-scroll mt-10`}>
        {titles.map((item) => (
          <Fragment key={item.id}>
            <h3 className={`text text_type_main-medium mb-6`} ref={item.ref}>
              {item.title}
            </h3>
            <div className={styles.block}>
              {renderFilteredIngredients(item)}
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default IngredientsBlock;
