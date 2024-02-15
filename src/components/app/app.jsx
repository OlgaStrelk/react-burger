import { useState, useEffect } from "react";
import styles from "./app.module.css";
import { getIngredients } from "../../utils/api";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { DndProvider } from "react-dnd";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
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
      {ingredients && (
        <>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
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
          </DndProvider>
          {currentCard && (
            <ModalOverlay ingredientsArray={ingredients}>
              <Modal onClose={handleCardModalClose} customStyle={"_card"}>
                <IngredientDetails cardData={currentCard} />
              </Modal>
            </ModalOverlay>
          )}
          {isOrderModalOpened && (
            <Modal onClose={handleOrderModalClose} customStyle={"_order"}>
              <OrderDetails />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default App;
