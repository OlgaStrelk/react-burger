import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import AppHeader from "../app-header/app-header";
import { fetchIngredients } from "../../services/actions/ingredients";
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
  FeedPage,
} from "../../pages";
import { modalStyle } from "../../utils/consts";
import { useLocation } from "react-router-dom";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { OnlyAuth, OnlyUnAuth } from "../protected_route/protected-route";
import { PATHS } from "../../utils/consts";
import { checkUserAuth } from "../../services/actions/user";
import MyAccountPage from "../../pages/my-account";
import OrderDetails from "../order-details/order-details";
import { useAppDispatch } from "../../services/types/hooks";
function App() {
  const dispatch = useAppDispatch();
  let location = useLocation();
  let state = location.state;
  useEffect(() => {
    dispatch(fetchIngredients());
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
    profileOrder,
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
          />
        </Route>
        <Route
          path={profileOrder}
          element={<OnlyAuth component={<OrderPage />} />}
        />
        <Route path={ordersList} element={<FeedPage />} />
        <Route path={order} element={<OrderPage />} />

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
              <Modal type='ingredient-modal' customStyle={modalStyle.ingredient} path={home}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path={order}
            element={
              <Modal type="feed-modal" path={ordersList}>
                <OrderDetails />
              </Modal>
            }
          />

          <Route
            path={profileOrder}
            element={
              <OnlyAuth
                component={
                  <Modal type='orders-history-modal' path={ordersHistory}>
                    <OrderDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
