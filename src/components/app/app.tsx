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
import { useDispatch } from "../../services/types/hooks";
function App() {
  const dispatch = useDispatch();
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

        {/* <Route
          path={profile}
          element={<OnlyUnAuth component={<MyAccountPage />} />}
        >
          <Route path="" element={<OnlyUnAuth component={<ProfilePage />} />} />
          <Route
            path={ordersHistory}
            element={<OnlyUnAuth component={<OrdersHistoryPage />} />}
          >
            <Route
              path={order}
              element={<OnlyUnAuth component={<OrderPage />} />}
            />
          </Route>
        </Route> */}

        <Route path={ordersList} element={<OrdersListPage />} />
        <Route path={order} element={<OrderPage />} />
        <Route
          path={profileOrder}
          element={<OnlyAuth component={<OrderPage />} />}
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
              <Modal customStyle={modalStyle.ingredient} path={home}>
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
