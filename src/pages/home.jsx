import styles from "./home.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../hooks/useModal";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  RESET_CONSTRUCTOR,
  fetchIngredients,
} from "../services/actions/ingredients";

function HomePage() {
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients?.ingredients);
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
              <BurgerIngredients />
              <BurgerConstructor onModalOpen={onOrderModalOpen} />
            </main>
          </DndProvider>
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
