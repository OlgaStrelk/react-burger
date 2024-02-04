import styles from "./burger-ingredients.module.css";

import Tabbar from "../tabbar/tabbar";
import IngredientCard from "./ingredient-card/ingredient-card";
import { Fragment, useRef, useState } from "react";

import PropTypes from "prop-types";
import { cardDataShape } from "../../utils/shapes";

function BurgerIngredients({ ingredientsArray, handler }) {
  const titleBunRef = useRef(null);
  const titleMainRef = useRef(null);
  const titleSaucesRef = useRef(null);
  const BLOCK_TITLES = [
    { title: "Булки", value: "bun", id: 7, ref: titleBunRef },
    { title: "Соусы", value: "sauce", id: 8, ref: titleSaucesRef },
    { title: "Начинки", value: "main", id: 9, ref: titleMainRef },
  ];

  const [currentTab, setCurrentTab] = useState(BLOCK_TITLES[0].value);

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    if (tab === "bun")
      titleBunRef.current?.scrollIntoView({ behavior: "smooth" });

    if (tab === "main")
      titleMainRef.current?.scrollIntoView({ behavior: "smooth" });

    if (tab === "sauce")
      titleSaucesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderFilteredIngredients = (blockTitle) => {
    const newArray = ingredientsArray.filter(
      (ingredient) => ingredient.type === blockTitle?.value
    );
    return newArray.map((item) => (
      <IngredientCard key={item._id} cardData={item} handler={handler} />
    ));
  };

  return (
    <section className={`custom-scroll`}>
      <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
      <Tabbar
        data={BLOCK_TITLES}
        currentTab={currentTab}
        handler={onTabClick}
      />
      <div className={`${styles.container} custom-scroll mt-10`}>
        {BLOCK_TITLES.map((item) => (
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
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredientsArray: PropTypes.arrayOf(PropTypes.shape(cardDataShape)),
  handler: PropTypes.func,
};

export default BurgerIngredients;
