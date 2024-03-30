import { Routes, Route, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import {
  RESET_MODAL_INGREDIENT,
  fetchIngredients,
} from "../../services/actions/ingredients";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage,
  OrderPage,
  OrdersHistoryPage,
  OrdersListPage,
} from "../../pages";
import { modalStyle } from "../../utils/consts";
import { useLocation } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProtectedRoute from "../protected_route/protected-route";
import { PATHS } from "../../utils/consts";
import { useEffect } from "react";

function App() {
  let location = useLocation();
  let state = location.state;
  const [__, _, onClose] = useModal();
  useEffect(() => fetchIngredients(), []);
  const {
    home,
    profile,
    login,
    register,
    forgotPassword,
    resetPassword,
    ingredient,
    ordersHistory,
    order,
    notFound,
    ordersList,
  } = PATHS;
  return (
    <>
      <AppHeader />
      <Routes location={state?.backgroundLocation || location}>
        <Route path={home} element={<HomePage />} />

        <Route
          path={profile}
          element={
            // <ProtectedRoute>
            <ProfilePage />
            // </ProtectedRoute>
          }
        />
        <Route
          path={ordersHistory}
          element={
            <ProtectedRoute>
              <OrdersHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={order}
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route path={login} element={<LoginPage />} />
        <Route path={register} element={<RegisterPage />} />
        <Route path={forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={resetPassword} element={<ResetPasswordPage />} />
        <Route path={ingredient} element={<IngredientPage />} />
        <Route path={notFound} element={<NotFoundPage />} />
        <Route path={ordersList} element={<OrdersListPage />} />
        <Route path={forgotPassword} element={<ForgotPasswordPage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={ingredient}
            element={
              <Modal
                onClose={onClose}
                customStyle={modalStyle.ingredient}
                action={RESET_MODAL_INGREDIENT}
                path={home}
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
