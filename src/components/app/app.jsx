import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  RESET_CONSTRUCTOR,
  RESET_MODAL_INGREDIENT,
  fetchIngredients,
  addIngredient,
  INCREASE_INGREDIENT_QUANTITY,
} from "../../services/actions/ingredients";
function App() {
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

  const handleCardModalClose = (e) => {
    setIsIngredientModalOpened(false);
    dispatch({ type: RESET_MODAL_INGREDIENT });
  };

  const handleOrderModalClose = () => {
    dispatch({ type: RESET_CONSTRUCTOR });
    setIsOrderModalOpened(false);
  };

  const onDropHandler = (ingredient) => {
    dispatch({ type: INCREASE_INGREDIENT_QUANTITY, payload: ingredient });
    dispatch(addIngredient(ingredient));
  };

  return (
    <>
      {ingredients && (
        <>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients handler={handleCardModalOpen} />
              <BurgerConstructor
                onDropHandler={onDropHandler}
                onModalOpen={handleOrderModalOpen}
              />
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

export default App;
