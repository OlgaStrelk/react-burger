import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from "./ingredient.module.css"

function IngredientPage() {

  return (
    <div className={styles.container}>
      <IngredientDetails style={styles.centered}/>
    </div>
  );
}

export default IngredientPage;
