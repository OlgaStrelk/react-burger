import Tabbar from "../tabbar/Tabbar";
import IngedientsBlock from "../ingredients-block/IngedientsBlock";
import styles from './burger-ingredients.module.css'

function BurgerIngredients({data}) {
  const BLOCK_TITLES = [
    { title: "Булки", value: "bun", id: 1 },
    { title: "Соусы", value: "souce", id: 2 },
    { title: "Начинки", value: "main", id: 3 },
  ];
  const filterIngredients = () => {};

  return (
    <div className={styles.wrapper}>
      <h2 className="title">Соберите бургер</h2>
      <Tabbar data={BLOCK_TITLES} />
      <IngedientsBlock data={data} titles={BLOCK_TITLES} />
    </div>
  );
}
export default BurgerIngredients;
