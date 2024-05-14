import styles from "./home.module.css";
// import { useModal } from "../hooks/useModal";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  RESET_CONSTRUCTOR,
  RESET_INGREDIENT_QUANTITY,
} from "../services/actions/ingredients";
import { modalStyle } from "../utils/consts";
import { useState } from "react";
import Preloader from "../components/preloader/preloader";
import { useAppSelector } from "../hooks/types";

function HomePage() {
  const { ingredients, ingredientsRequest: isLoading } = useAppSelector(
    (state) => state.ingredients
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {ingredients.length > 0 ? (
        isLoading ? (
          <Preloader />
        ) : (
          <>
            <DndProvider backend={HTML5Backend}>
              <main className={styles.main}>
                <BurgerIngredients />
                <BurgerConstructor onModalOpen={onOpen} />
              </main>
            </DndProvider>
            {isOpen && (
              <Modal
                onClose={onClose}
                action={[RESET_CONSTRUCTOR, RESET_INGREDIENT_QUANTITY]}
                customStyle={modalStyle.order}
              >
                <OrderDetails />
              </Modal>
            )}
          </>
        )
      ) : (
        <main className={styles.main_error}>
          <h2 className={styles.title}>
            Не&nbsp;удалось загрузить данные. Проверте соединение
            с&nbsp;интернетом или попробуйте позже
          </h2>
        </main>
      )}
    </>
  );
}

export default HomePage;
