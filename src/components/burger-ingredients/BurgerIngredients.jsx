import Tabbar from "../tabbar/Tabbar";
import IngredientsBlock from "../ingredients-block/IngredientsBlock";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { cardDataShape } from "../../utils/shapes";


function BurgerIngredients({ ingredientsArray, handler }) {
  const BLOCK_TITLES = [
    { title: "Булки", value: "bun", id: 7 },
    { title: "Соусы", value: "sauce", id: 8 },
    { title: "Начинки", value: "main", id: 9 },
  ];
  return (
    <section className={`${styles.container} custom-scroll`}>
      <h2 className="text text_type_main-large mt-10">
        Соберите бургер
      </h2>
      <Tabbar data={BLOCK_TITLES} />
      <IngredientsBlock handler={handler} ingredientsArray={ingredientsArray} titles={BLOCK_TITLES} />
    </section>
  );
}


BurgerIngredients.propTypes = {
  ingredientsArray: PropTypes.arrayOf(PropTypes.shape(cardDataShape)),
  handler: PropTypes.func
}; 

export default BurgerIngredients;
