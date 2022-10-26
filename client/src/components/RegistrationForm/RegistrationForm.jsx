import React, { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPass: "",
};

const RegistrationForm = () => {
  const [newUser, setNewUser] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });
  };

  console.log(newUser);

  useEffect(() => {}, [newUser]);

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-2xl p-2">User Registration</h1>
        <form autoComplete="Off">
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
              placeholder="******************"
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
              placeholder="******************"
              required
            />
          </div>
          <div className="mb-6 text-left">
            <ul>
              <li className="">Min 8 characters</li>
              <li className="">At least one upper case</li>
              <li className="">At least one lower case</li>
              <li className="">At least one one case</li>
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-400 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
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
