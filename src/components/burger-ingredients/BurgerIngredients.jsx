import Tabbar from "../tabbar/Tabbar";
import IngedientsBlock from "../ingredients-block/IngedientsBlock";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
  const BLOCK_TITLES = [
    { title: "Булки", value: "bun", id: 7 },
    { title: "Соусы", value: "sauce", id: 8 },
    { title: "Начинки", value: "main", id: 9 },
  ];
  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-large mt-10">
        Соберите бургер
      </h2>
      <Tabbar data={BLOCK_TITLES} />
      <IngedientsBlock data={data} titles={BLOCK_TITLES} />
    </div>
  );
}
export default BurgerIngredients;
