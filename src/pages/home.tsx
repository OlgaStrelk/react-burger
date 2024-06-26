import styles from "./home.module.css";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import Modal from "../components/modal/modal";
import OrderResponse from "../components/order-response/order-response";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { modalStyle } from "../utils/consts";
import Preloader from "../components/preloader/preloader";
import { useSelector } from "../services/types/hooks";
import {
  RESET_CONSTRUCTOR,
  RESET_INGREDIENTS_QUANTITY,
} from "../services/constants/ingredients";
import { FETCHING_FAILED_ERROR_TEXT } from "../utils/errors";
import { useModal } from "../hooks/useModal";

function HomePage() {
  const { ingredients, ingredientsRequest: isLoading } = useSelector(
    (state) => state.ingredients
  );

  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      {ingredients.length == 0 && isLoading ? (
        <main className={styles.main_preload}>
          <Preloader />
        </main>
      ) : ingredients.length == 0 ? (
        <main className={styles.main_error}>
          <h2 className={styles.error_text}>
            {FETCHING_FAILED_ERROR_TEXT.main}
          </h2>
        </main>
      ) : (
        <>
          <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <h1 className={styles.title}>Соберите бургер</h1>
              <div className={styles.container}>
                <BurgerIngredients />
                <BurgerConstructor onModalOpen={onOpen} />
              </div>
            </main>
          </DndProvider>
          {isOpen && (
            <Modal
              type="order-modal"
              onClose={onClose}
              action={[RESET_CONSTRUCTOR, RESET_INGREDIENTS_QUANTITY]}
              customStyle={modalStyle.order}
            >
              <OrderResponse />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
