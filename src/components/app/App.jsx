import { useState, useRef, useEffect } from "react";
import styles from "./app.module.css";
import { getIngredients } from "../../utils/Api";
import AppHeader from "../app-header/AppHeader";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import CardModal from "../card-modal/CardModal";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isCardModalOpened, setIsCardModalOpened] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

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

  const getCurrentCardData = (e) => {
    setCurrentCard(ingredients.find((item) => item._id === e.currentTarget.id));
  };

  const handleModalOpen = (e) => {
    setIsCardModalOpened(true);
    getCurrentCardData(e);
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          handler={handleModalOpen}
          ingredientsArray={ingredients}
        />
        <BurgerConstructor
          handler={handleModalOpen}
          ingredientsArray={ingredients}
        />
      </main>
      {isCardModalOpened && (
        <ModalOverlay ingredientsArray={ingredients}>
          <CardModal cardData={currentCard} />
        </ModalOverlay>
      )}
    </>
  );
}

export default App;
