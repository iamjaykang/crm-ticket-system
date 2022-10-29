import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { userVerification } from "./userVerificationAction";

const UserVerification = () => {
  const dispatch = useDispatch();
  const [pin, setPin] = useState('');

  const onChangeHandler = (e) => {
    const { value } = e.target;

    setPin(value)
  };

  const onVerifySubmitHandler = (e) => {
    e.preventDefault();

    
    dispatch(userVerification(formData));
  };

  const { isLoading, status, message } = useSelector(
    (state) => state.userVerification
  );
  const { _id } = useParams();
  const formData = { _id, pin };
  useEffect(() => {}, [dispatch]);
  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-3xl p-2">User Verification</h1>
        <form autoComplete="Off" onSubmit={onVerifySubmitHandler}>
          <div className="my-4">
            <label
              className="block text-grey-darker font-bold mb-2"
              htmlFor="pin"
            >
              Pin number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              name="pin"
              value={pin}
              onChange={onChangeHandler}
              placeholder="Pin"
              required
            />
          </div>
          <div className="mb-6"></div>
          {status === "success" && (
          <div
            className="p-4 my-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-greeen-200 dark:text-green-800"
            role="alert"
          >
            {message}
          </div>
        )}
        {status === "error" && (
          <div
            className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            {message}
          </div>
        )}
          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-600 flex-1 hover:bg-cyan-700 text-xl py-2 text-white font-bold px-4 mx-4 rounded"
              type="submit"
            >
              Verify account
            </button>
            <Link
              className="inline-block flex-1 align-baseline font-bold text-xl text-blue hover:text-blue-darker cursor-pointer"
              to="/"
            >
              Sign in now
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserVerification;
