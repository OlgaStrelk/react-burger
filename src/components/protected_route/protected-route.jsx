import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../../utils/consts";
const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  console.log(isAuthChecked)
  console.log(onlyUnAuth)

  const user = useSelector((state) => state.user.user);
  console.log(user)

  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: PATHS.home } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={PATHS.signin} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
