import React, { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPass: "",
};

const passVerification = {
  isLengthy: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  confirmPass: false,
};

const RegistrationForm = () => {
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerification);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });
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

    if (name === "confirmPass") {
      setPasswordError({
        ...passwordError,
        confirmPass: newUser.password === value,
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(newUser);
  };

  console.log(newUser);

  useEffect(() => {}, [newUser]);

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-2xl p-2">User Registration</h1>
        <form autoComplete="Off" onSubmit={onSubmitHandler}>
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
              value={newUser.email}
              onChange={onChangeHandler}
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="my-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              value={newUser.name}
              onChange={onChangeHandler}
              name="name"
              placeholder="Your name"
              required
            />
          </div>
          <div className="my-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              name="password"
              value={newUser.password}
              onChange={onChangeHandler}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="my-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              name="confirmPass"
              onChange={onChangeHandler}
              value={newUser.confirmPass}
              type="password"
              placeholder="••••••••"
              required
            />
            {!passwordError.confirmPass && (
              <div className="text-red-600">Password doesn't match!</div>
            )}
          </div>
          <div className="mb-6 text-left">
            <ul>
              <li
                className={
                  passwordError.isLengthy ? "text-green-600" : "text-red-600"
                }
              >
                • Min 8 characters
              </li>
              <li
                className={
                  passwordError.hasUpper ? "text-green-600" : "text-red-600"
                }
              >
                • At least one upper case
              </li>
              <li
                className={
                  passwordError.hasLower ? "text-green-600" : "text-red-600"
                }
              >
                • At least one lower case
              </li>
              <li
                className={
                  passwordError.hasNumber ? "text-green-600" : "text-red-600"
                }
              >
                • At least one one number
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-400 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={Object.values(passwordError).includes(false)}
            >
              Submit
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker cursor-pointer"
              href="#"
            >
              Sign in now instead
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
