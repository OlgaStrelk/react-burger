import { Fragment } from "react";
import styles from './ingredients-block.module.css'
import IngredientCard from "../ingredient-card/IngredientCard";
function IngredientsBlock({ titles, data }) {
    console.log(data)
  const renderFilteredIngredients = (blockTitle) => {
    const newArray = data.filter(
      (ingredient) => ingredient.type === blockTitle?.value
    );
    return newArray.map((item) => (
      <IngredientCard key={item._id} data={item} />
    ));
  };

  return (
    <div className={`${styles.container} mt-10`}>
      {titles.map((item) => (
        <Fragment key={item.id}>
          <h3 style={{display:"block"}}>{item.title}</h3>
          <div className={styles.block}>{renderFilteredIngredients(item)}</div>
        </Fragment>
      ))}
    </div>
  );
}
export default IngredientsBlock;
