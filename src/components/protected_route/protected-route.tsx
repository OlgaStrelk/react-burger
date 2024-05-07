import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../../utils/consts";

interface IProtectedRoute {
  onlyUnAuth?: boolean;
  component: ReactNode;
}
const ProtectedRoute = ({ onlyUnAuth = false, component }: IProtectedRoute) => {
  //@ts-ignore
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  //@ts-ignore
  const user = useSelector((state) => state.user.user);

  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: PATHS.home } };
    return <Navigate to={from} />;
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
