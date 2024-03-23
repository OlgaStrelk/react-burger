import { Routes, Route, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import { RESET_MODAL_INGREDIENT } from "../../services/actions/ingredients";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage,
} from "../../pages";
import { modalStyle } from "../../utils/consts";
import { useLocation } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  let location = useLocation();
  let state = location.state;
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(-1);
  };
  const [isOpen, onOpen, onIngredientModalClose] = useModal();
console.log(state)
  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                onClose={onIngredientModalClose}
                customStyle={modalStyle.ingredient}
                action={RESET_MODAL_INGREDIENT}
                handler={handleNavigation}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
