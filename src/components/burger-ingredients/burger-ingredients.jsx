import styles from "./burger-ingredients.module.css";

import Tabbar from "../tab-bar/tab-bar";
import IngredientsBlock from "./ingredients-block/ingredients-block";
import { useRef, useState } from "react";

import PropTypes from "prop-types";

function BurgerIngredients(props) {
  const titleBunRef = useRef(null);
  const titleMainRef = useRef(null);
  const titleSaucesRef = useRef(null);
  const containerRef = useRef(null);
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

  const handleScroll = (event) => {   
    if (event.currentTarget.scrollTop < 250) {
      setCurrentTab("bun");
    }
    if (event.currentTarget.scrollTop > 250) {
      setCurrentTab("sauce");
    }
    if (event.currentTarget.scrollTop > 800) {
      setCurrentTab("main");
    }
  };

  return (
    <section>
      <h2 className={styles.title}>Соберите бургер</h2>
      <Tabbar
        data={BLOCK_TITLES}
        currentTab={currentTab}
        onTabClick={onTabClick}
      />
      <IngredientsBlock
        ref={containerRef}
        titles={BLOCK_TITLES}
        onScroll={handleScroll}
      />
    </section>
  );
}


export default BurgerIngredients;
