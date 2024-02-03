import { useState, useRef, useEffect } from "react";
import styles from "./app.module.css";
import { getIngredients } from "../../utils/Api";
import AppHeader from "../app-header/AppHeader";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderDetails from "../order-details/OrderDetails";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isCardModalOpened, setIsCardModalOpened] = useState(false);
  const [isOrderModalOpened, setisOrderModalOpened] = useState(false);
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

  const handleCardModalOpen = (e) => {
    setIsCardModalOpened(true);
    getCurrentCardData(e);
  };

  const handleOrderModalOpen = () => {
    setisOrderModalOpened(true);
  };

  const handleCardModalClose = (e) => {
    setCurrentCard(null);
  };

  const handleOrderModalClose = () => {
    setisOrderModalOpened(false);
  };
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          handler={handleCardModalOpen}
          ingredientsArray={ingredients}
        />
        <BurgerConstructor
          handler={handleOrderModalOpen}
          ingredientsArray={ingredients}
        />
      </main>
      {currentCard && (
        <ModalOverlay ingredientsArray={ingredients}>
          <Modal onClose={handleCardModalClose}>
            <IngredientDetails cardData={currentCard} />
          </Modal>
        </ModalOverlay>
      )}
      {isOrderModalOpened && (
        <Modal onClose={handleOrderModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
