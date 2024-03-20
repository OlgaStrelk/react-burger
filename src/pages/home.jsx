import styles from "./home.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../hooks/useModal";
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
  const modalStyle = { ingredient: "_card", order: "_order" };
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients?.ingredients);
  const [isIngredientModalOpen, onIngredientModalOpen, onIngredientModalClose] =
    useModal();
  const [isOrderModalOpen, onOrderModalOpen, onOrderModalClose] = useModal();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      {ingredients && (
        <>
          <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients onModalOpen={onIngredientModalOpen} />
              <BurgerConstructor onModalOpen={onOrderModalOpen} />
            </main>
          </DndProvider>
          {isIngredientModalOpen && (
            <Modal
              onClose={onIngredientModalClose}
              customStyle={modalStyle.ingredient}
              action={RESET_MODAL_INGREDIENT}
            >
              <IngredientDetails />
            </Modal>
          )}
          {isOrderModalOpen && (
            <Modal
              onClose={onOrderModalClose}
              customStyle={modalStyle.order}
              action={RESET_CONSTRUCTOR}
            >
              <OrderDetails />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
