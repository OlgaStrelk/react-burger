import { useDispatch } from "react-redux";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useEffect } from "react";
import { fetchIngredients } from "../services/actions/ingredients";
import styles from "./ingredient.module.css"

function IngredientPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);
  return (
    <div className={styles.container}>
      <IngredientDetails style={styles.centered}/>
    </div>
  );
}

export default IngredientPage;
