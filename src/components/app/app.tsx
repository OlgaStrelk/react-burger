import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import AppHeader from "../app-header/app-header";
import {
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
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { OnlyAuth, OnlyUnAuth } from "../protected_route/protected-route";
import { PATHS } from "../../utils/consts";
import { checkUserAuth } from "../../services/actions/user";
import MyAccountPage from "../../pages/my-account";
import { useDispatch } from "../../hooks/types";
import { RESET_MODAL_INGREDIENT } from "../../services/constants/ingredients";
function App() {
  const dispatch = useDispatch();
  let location = useLocation();
  let state = location.state;
  useEffect(() => dispatch(fetchIngredients()), [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);
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
        <Route path={ingredient} element={<IngredientPage />} />
        <Route
          path={profile}
          element={<OnlyAuth component={<MyAccountPage />} />}
        >
          <Route path="" element={<OnlyAuth component={<ProfilePage />} />} />
          <Route
            path={ordersHistory}
            element={<OnlyAuth component={<OrdersHistoryPage />} />}
          >
            <Route
              path={order}
              element={<OnlyAuth component={<OrderPage />} />}
            />
          </Route>
        </Route>

        <Route
          path={ordersList}
          element={<OnlyAuth component={<OrdersListPage />} />}
        />

        <Route
          path={login}
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path={register}
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path={forgotPassword}
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path={resetPassword}
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />

        <Route path={notFound} element={<NotFoundPage />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path={ingredient}
            element={
              <Modal
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
