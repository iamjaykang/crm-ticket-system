import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchNewAccessJWT } from "../../api/userApi";
import AdminLayout from "../../layout/Admin/AdminLayout";
import { adminSigninSuccess } from "../AdminSignin/adminSigninSlice";

const AdminPrivateRoute = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.adminSignin);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateAccessJWT = async () => {
      const result = await fetchNewAccessJWT();
      result && dispatch(adminSigninSuccess());
    };
    !sessionStorage.getItem("accessJWT") &&
      localStorage.getItem("crmSite") &&
      updateAccessJWT();
      
    !isAdmin && sessionStorage.getItem("accessJWT") && dispatch(adminSigninSuccess());
  }, [isAdmin, dispatch]);
  return (
    <>
      {isAdmin ? <AdminLayout>{children}</AdminLayout> : <Navigate to="/" />}
    </>
  );
};

export default AdminPrivateRoute;
