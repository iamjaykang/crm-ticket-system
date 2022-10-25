import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchNewAccessJWT } from "../../api/userApi";
import DefaultLayout from "../../layout/DefaultLayout";
import { signinSuccess } from "../Signin/signInSlice";

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.signin);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateAccessJWT = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(signinSuccess());
    };
    !sessionStorage.getItem("accessJWT") &&
      localStorage.getItem("crmSite") &&
      updateAccessJWT();
      
    !isAuth && sessionStorage.getItem("accessJWT") && dispatch(signinSuccess());
  }, [isAuth, dispatch]);
  return (
    <>
      {isAuth ? <DefaultLayout>{children}</DefaultLayout> : <Navigate to="/" />}
    </>
  );
};

export default PrivateRoute;
