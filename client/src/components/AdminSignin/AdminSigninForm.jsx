import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSigninPending, adminSigninSuccess, adminSigninFail } from "./adminSigninSlice";
import { adminSignin } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../pages/Dashboard/userAction";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const AdminSigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isAdmin, error } = useSelector((state) => state.adminSignin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Fill up all the required fields");
    }

    dispatch(adminSigninPending());

    try {
      const isAdmin = await adminSignin({ email, password });
      if (isAdmin.status === "error") {
        return dispatch(adminSigninFail(isAdmin.message));
      }
      dispatch(adminSigninSuccess());
      dispatch(getUserProfile());
      navigate("/dashboard");
    } catch (error) {
      dispatch(adminSigninFail(error.message));
    }
  };

  useEffect(() => {
    sessionStorage.getItem("accessJWT") && navigate("/dashboard");
  }, [navigate, isAdmin]);
  return (
    <div>
      <div className="bg-white max-w-sm shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-3xl p-2">Admin Login</h1>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}
        <form autoComplete="Off" onSubmit={onSubmitHandler}>
          <div className="my-4">
            <label
              className="block text-grey-darker font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              name="password"
              value={password}
              onChange={onChangeHandler}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center whitespace-nowrap justify-between text-xl">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 text-white no font-bold py-2 px-10 rounded"
              type="submit"
            >
              Sign In
            </button>
            {isLoading && <Spinner />}
            <Link
              className="inline-block align-baseline font-bold text-blue text-lg mx-4 hover:text-blue-darker cursor-pointer"
              to="/reset-password"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSigninForm;
