import { useState, useRef, useEffect } from "react";
import styles from "./app.module.css";
import { getIngredients } from "../utils/Api";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = () => {
    getIngredients().then((data) => setIngredients(data.data));
  };
  useEffect(() => {
    setIsLoading(true);
    fetchIngredients();
    return setIsLoading(false);
  }, []);

  console.log(ingredients);
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Бургерная</h1>
      {ingredients &&
        ingredients.map((item) => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}

export default App;
