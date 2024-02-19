import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ModalOverlay from "../modal/modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { DndProvider } from "react-dnd";
import { fetchIngredients } from "../../services/actions/ingredients";
function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredientsReducer.ingredients);
  const [isOrderModalOpened, setisOrderModalOpened] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    dispatch(fetchIngredients());
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
          {/* <DndProvider backend={HTML5Backend}> */}
          <main className={styles.main}>
            <BurgerIngredients handler={handleCardModalOpen} />
            <BurgerConstructor handler={handleOrderModalOpen} />
          </main>
          {/* </DndProvider> */}
          {currentCard && (
            <ModalOverlay>
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
