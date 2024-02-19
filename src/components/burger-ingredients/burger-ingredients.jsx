import styles from "./burger-ingredients.module.css";

import Tabbar from "../tabbar/tabbar";
import IngredientsBlock from "./ingredients-block/ingredients-block";
import { useRef, useState, memo } from "react";

import PropTypes from "prop-types";
import { cardDataShape } from "../../utils/shapes";

function BurgerIngredients({ handler }) {
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

  return (
    <section className={`custom-scroll`}>
      <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
      <Tabbar
        data={BLOCK_TITLES}
        currentTab={currentTab}
        handler={onTabClick}
      />
      <IngredientsBlock titles={BLOCK_TITLES} handler={handler} />
    </section>
  );
}

BurgerIngredients.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default BurgerIngredients;
