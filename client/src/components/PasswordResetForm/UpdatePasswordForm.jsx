import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updatePassword } from "./passwordResetAction";

// const initialState = {
//   pin: "",
//   password: "",
//   confirmPass: "",
// };

const passVerification = {
  isLengthy: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  confirmPass: false,
};

const UpdatePasswordForm = () => {
  const { pin, email } = useParams();
  const initialState = {
    email: email,
    pin: pin,
    password: "",
    confirmPass: "",
  };
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerification);

  //   const { isLoading, status, message } = useSelector(
  //     (state) => state.userRegistration
  //   );

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setNewPassword({ ...newPassword, [name]: value });
    if (name === "password") {
      const isLengthy = value.length > 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);

      setPasswordError({
        ...passwordError,
        isLengthy,
        hasUpper,
        hasLower,
        hasNumber,
      });
    }
    console.log(newPassword);
    if (name === "confirmPass") {
      setPasswordError({
        ...passwordError,
        confirmPass: newPassword.password === value,
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { pin, password, email } = newPassword;

    const newPassObj = {
      pin,
      newPassword: password,
      email,
    };
    console.log(newPassObj)

    dispatch(updatePassword(newPassObj));
  };

  useEffect(() => {}, [newPassword]);

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-2xl p-2">Reset Password</h1>
        <form autoComplete="Off" onSubmit={onSubmitHandler}>
          <div className="my-4">
            <label
              className="block text-grey-darker text-base font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              name="password"
              value={newPassword.password}
              onChange={onChangeHandler}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="my-4">
            <label
              className="block text-grey-darker text-base font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              name="confirmPass"
              onChange={onChangeHandler}
              value={newPassword.confirmPass}
              type="password"
              placeholder="••••••••"
              required
            />
            {!passwordError.confirmPass && (
              <div className="text-red-600 text-base">
                Password doesn't match!
              </div>
            )}
          </div>
          <div className="mb-6 text-left">
            <ul>
              <li
                className={
                  passwordError.isLengthy
                    ? "text-green-600 text-base"
                    : "text-red-600 text-base"
                }
              >
                • Min 8 characters
              </li>
              <li
                className={
                  passwordError.hasUpper
                    ? "text-green-600 text-base"
                    : "text-red-600 text-base"
                }
              >
                • At least one upper case
              </li>
              <li
                className={
                  passwordError.hasLower
                    ? "text-green-600 text-base"
                    : "text-red-600 text-base"
                }
              >
                • At least one lower case
              </li>
              <li
                className={
                  passwordError.hasNumber
                    ? "text-green-600 text-base"
                    : "text-red-600 text-base"
                }
              >
                • At least one one number
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-400 w-full hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={Object.values(passwordError).includes(false)}
            >
              Create an account
            </button>
          </div>
          {/* {message &&
            (message !=
            ("this email is already registered" ||
              "Unable to create a new account at the moment, please try again later") ? (
              <div
                className="p-4 my-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-greeen-200 dark:text-green-800"
                role="alert"
              >
                {message}
              </div>
            ) : (
              <div
                className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                {message}
              </div>
            ))} */}
          <div className="inline-block align-baseline font-bold text-base text-blue hover:text-blue-darker cursor-pointer mt-4">
            Already have an account?
            <Link to="/" className="mx-2 text-base text-blue-400 underline">
              Sign in instead
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePasswordForm;
