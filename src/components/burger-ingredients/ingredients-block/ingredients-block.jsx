import styles from "./ingredients-block.module.css";
import { Fragment, memo, useMemo, forwardRef, useState } from "react";
import { GET_MODAL_INGREDIENT } from "../../../services/actions/ingredients";

import IngredientCard from "../ingredient-card/ingredient-card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IngredientsBlock = forwardRef(({ titles, onScroll }, ref) => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const handleCardClick = (e) => {
    const id = e.currentTarget.id;
    dispatch({ type: GET_MODAL_INGREDIENT, payload: id });
  };

  const filterIngredients = (blockTitle) =>
    useMemo(() => {
      const filteredArray = ingredients.filter(
        (ingredient) => ingredient.type === blockTitle?.value
      );
      return filteredArray;
    }, [ingredients]);
    
  const renderFilteredIngredientsMarkup = (blockTitle) => {
    const newArray = filterIngredients(blockTitle);
    return newArray.map((item) => (
      <li key={item._id} id={item._id} onClick={handleCardClick}>
        <IngredientCard cardData={item} />
      </li>
    ));
  };

  const renderIngredientsMarkup = () => {
    return titles.map((item) => (
      <Fragment key={item.id}>
        <h3 className={`text text_type_main-medium mb-6`} ref={item.ref}>
          {item.title}
        </h3>
        <ul className={styles.block}>
          {renderFilteredIngredientsMarkup(item)}
        </ul>
      </Fragment>
    ));
  };

  return (
    <>
      <ul
        onScroll={(event) => onScroll(event)}
        ref={ref}
        className={`${styles.container} custom-scroll mt-10`}
      >
        {renderIngredientsMarkup()}
      </ul>
    </>
  );
});
export default memo(IngredientsBlock);
