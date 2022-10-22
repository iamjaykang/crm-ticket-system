import React from "react";

const SigninForm = (props) => {
  const { email, password, onChangeHandler, onSubmitHandler, formSwitcher } =
    props;
  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-2xl p-2">Client Login</h1>
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
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
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
              placeholder="******************"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-400 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker cursor-pointer"
              href="#"
              onClick={() => formSwitcher("reset")}
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
