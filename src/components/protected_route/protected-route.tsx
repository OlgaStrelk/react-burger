import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../../utils/consts";
import { useSelector } from "../../services/types/hooks";
import Preloader from "../preloader/preloader";

interface IProtectedRoute {
  onlyUnAuth?: boolean;
  component: ReactNode;
}
const ProtectedRoute = ({ onlyUnAuth = false, component }: IProtectedRoute) => {
  const { isAuthChecked, user } = useSelector((state) => state.user);

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: PATHS.home } };
    return <Navigate to={from.pathname} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={PATHS.login} state={{ from: location }} />;
  }

  return component;
};
export const OnlyAuth = ProtectedRoute;

type TOnlyUnAuth = { component: ReactNode };

export const OnlyUnAuth = ({ component }: TOnlyUnAuth): ReactNode => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
