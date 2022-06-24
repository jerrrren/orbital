import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { Routes } from "../constants/routes";
import { ROLE } from "../constants/roles";

const PrivateRoute = (props) => {
  const location = useLocation();

  const isAuth = useAuth((state) => state.isAuth);
  //useAuth((state) => state.token.isAuth);
  const hasRequiredRole = isAuth === ROLE.User;

  
  if (isAuth && hasRequiredRole) {
    return props.children;
  }

  return <Navigate to={Routes.login} state={{ from: location }} />;
};

export default PrivateRoute;
