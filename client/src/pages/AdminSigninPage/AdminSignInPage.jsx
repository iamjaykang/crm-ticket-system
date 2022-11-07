import React from "react";
import { Link } from "react-router-dom";
import AdminSigninForm from "../../components/AdminSignin/AdminSigninForm";

const AdminSignInPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-xl bg-cyan-500">
      <div>
        <div className="text-center">
          <AdminSigninForm />
        </div>
        <div className="items-start justify-start">
          <Link
            to='/'
            className="mx-2 text-black font-bold hover:text-blue-800 text-lg underline"
          >
            Client Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignInPage;
