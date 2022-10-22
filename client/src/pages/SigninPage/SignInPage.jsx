import React, { useState } from "react";
import PasswordResetForm from "../../components/PasswordResetForm/PasswordResetForm";
import SigninForm from "../../components/Signin/SigninForm";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoad, setFormLoad] = useState("login");

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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Fill up all the required fields");
    }

    //TODO call api to submit the form

    console.log(email, password);
  };

  const onResetSubmitHandler = (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Fill up all the required fields");
    }

    //TODO call api to submit the form

    console.log(email);
  };

  const formSwitcher = (formType) => {
    setFormLoad(formType);
  };

  return (
    <div className="h-screen text-center flex justify-center items-center text-xl">
      {formLoad === "login" && (
        <SigninForm
          formSwitcher={formSwitcher}
          onSubmitHandler={onSubmitHandler}
          onChangeHandler={onChangeHandler}
          email={email}
          password={password}
        />
      )}

      {formLoad === "reset" && (
        <PasswordResetForm
          formSwitcher={formSwitcher}
          onResetSubmitHandler={onResetSubmitHandler}
          onChangeHandler={onChangeHandler}
          email={email}
        />
      )}
    </div>
  );
};

export default SignInPage;
