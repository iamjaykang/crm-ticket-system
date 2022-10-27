import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinPending, signinSuccess, signinFail } from "./signInSlice";
import { userSignin } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../pages/Dashboard/userAction";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isAuth, error } = useSelector((state) => state.signin);

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

    dispatch(signinPending());

    try {
      const isAuth = await userSignin({ email, password });
      if (isAuth.status === "error") {
        return dispatch(signinFail(isAuth.message));
      }
      dispatch(signinSuccess());
      dispatch(getUserProfile());
      navigate("/dashboard");
    } catch (error) {
      dispatch(signinFail(error.message));
    }
    //TODO call api to submit the form
  };

  useEffect(() => {
    sessionStorage.getItem("accessJWT") && navigate("/dashboard");
  }, [navigate, isAuth]);
  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-3xl p-2">Client Login</h1>
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
          <div className="flex items-center justify-between text-xl">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-10 rounded"
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
          <div className="inline-block align-baseline font-bold text-blue text-lg hover:text-blue-darker cursor-pointer mt-4">
            Are you new here?{" "}
            <Link
              to="/registration"
              className="mx-2 text-blue-400 hover:text-blue-500 text-lg underline"
            >
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
