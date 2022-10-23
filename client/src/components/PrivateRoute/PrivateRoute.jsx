import React from "react";
import { Route, redirect, Navigate } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuth = true;
  return (
    <div>
      {isAuth ? (
        <DefaultLayout>{children}</DefaultLayout>
      ) : (
        <Navigate replace to="/" />
      )}
    </div>
  );
};

export default PrivateRoute;
