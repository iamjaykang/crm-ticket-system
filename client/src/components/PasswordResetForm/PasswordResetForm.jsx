import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { resetPassword } from "./passwordResetAction";

const PasswordResetForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { isLoading, status, message } = useSelector((state) => state.password);

  const onResetSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(resetPassword(email));
  };

  const onChangeHandler = (e) => {
    const { value } = e.target;

    setEmail(value);
  };
  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-2xl p-2">Reset Password</h1>
        {message && <div>{message}</div>}
        {isLoading && <Spinner />}
        <form autoComplete="Off" onSubmit={onResetSubmitHandler}>
          <div className="my-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="email"
              name="email"
              value={email}
              onChange={onChangeHandler}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6"></div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-400 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Reset Password
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker cursor-pointer"
              to="/"
            >
              Sign in now instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
