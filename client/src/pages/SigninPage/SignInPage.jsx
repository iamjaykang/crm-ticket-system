import React, { useState } from "react";
import PasswordResetForm from "../../components/PasswordResetForm/PasswordResetForm";
import SigninForm from "../../components/Signin/SigninForm";

const SignInPage = () => {
  const [formLoad, setFormLoad] = useState("login");

  const formSwitcher = (formType) => {
    setFormLoad(formType);
  };

  return (
    <div className="h-screen text-center flex justify-center items-center text-xl bg-cyan-600">
      {formLoad === "login" && (
        <SigninForm
          formSwitcher={formSwitcher}
        />
      )}

      {/* {formLoad === "reset" && (
        <PasswordResetForm
          formSwitcher={formSwitcher}
          onResetSubmitHandler={onResetSubmitHandler}
          onChangeHandler={onChangeHandler}
          email={email}
        />
      )} */}
    </div>
  );
};

export default SignInPage;
