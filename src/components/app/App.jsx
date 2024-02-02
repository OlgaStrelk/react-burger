import { useState, useRef, useEffect } from "react";
import styles from "./app.module.css";
import { getIngredients } from "../../utils/Api";
import AppHeader from "../app-header/AppHeader";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = () => {
    getIngredients()
      .then((data) => {
        setIngredients(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsLoading(true);
    fetchIngredients();
    return setIsLoading(false);
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredientsArray={ingredients} />
        <BurgerConstructor ingredientsArray={ingredients} />
      </main>
      {/* <OverLay/> */}
    </>
  );
}

export default App;
