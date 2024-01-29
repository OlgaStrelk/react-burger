import { useState, useRef, useEffect } from "react";
import styles from "./app.module.css";
import { getIngredients } from "../utils/Api";
import AppHeader from "../app-header/AppHeader";

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

  return (
    <div className={styles.app}>
      <AppHeader />
      {ingredients &&
        ingredients.map((item) => <div key={item._id}>{item.name}</div>)}
    </div>
  );
}

export default App;
