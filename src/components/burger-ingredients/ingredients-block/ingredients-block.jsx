import styles from "./ingredients-block.module.css";
import { Fragment, memo, useMemo } from "react";

import IngredientCard from "../ingredient-card/ingredient-card";

function IngredientsBlock({ titles, ingredientsArray, handler }) {
  const filterIngredients = (blockTitle) =>
    useMemo(() => {
      const filteredArray = ingredientsArray.filter(
        (ingredient) => ingredient.type === blockTitle?.value
      );
      return filteredArray;
    }, [ingredientsArray]);

  const renderFilteredIngredients = (blockTitle) => {
    const newArray = filterIngredients(blockTitle);
    return newArray.map((item) => (
      <li key={item._id} id={item._id} onClick={handleCardClick}>
        <IngredientCard cardData={item} />
      </li>
    ));
  };

  const handleCardClick = (e) => {
    handler(e);
  };

  return (
    <>
      <ul className={`${styles.container} custom-scroll mt-10`}>
        {titles.map((item) => (
          <Fragment key={item.id}>
            <h3 className={`text text_type_main-medium mb-6`} ref={item.ref}>
              {item.title}
            </h3>
            <ul className={styles.block}>{renderFilteredIngredients(item)}</ul>
          </Fragment>
        ))}
      </ul>
    </>
  );
}

export default memo(IngredientsBlock);
