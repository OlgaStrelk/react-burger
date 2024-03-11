import styles from "./home.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../components/app-header/app-header";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import OrderDetails from "../components/order-details/order-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  RESET_CONSTRUCTOR,
  RESET_MODAL_INGREDIENT,
  fetchIngredients,
} from "../services/actions/ingredients";

function HomePage() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients?.ingredients);

  const [isOrderModalOpened, setIsOrderModalOpened] = useState(false);
  const [isIngredientModalOpened, setIsIngredientModalOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const handleCardModalOpen = () => {
    setIsIngredientModalOpened(true);
  };

  const handleOrderModalOpen = () => {
    setIsOrderModalOpened(true);
  };

  const handleCardModalClose = (modal, action) => {
    dispatch({ type: RESET_MODAL_INGREDIENT });
    setIsIngredientModalOpened(false);
  };

  const handleOrderModalClose = () => {
    dispatch({ type: RESET_CONSTRUCTOR });
    setIsOrderModalOpened(false);
  };

  return (
    <>
      {ingredients && (
        <>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients onModalOpen={handleCardModalOpen} />
              <BurgerConstructor onModalOpen={handleOrderModalOpen} />
            </main>
          </DndProvider>
          {isIngredientModalOpened && (
            <Modal onClose={handleCardModalClose} customStyle={"_card"}>
              <IngredientDetails />
            </Modal>
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

export default HomePage;
