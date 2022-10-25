import React, { useState } from "react";
import PasswordResetForm from "../../components/PasswordResetForm/PasswordResetForm";
import SigninForm from "../../components/Signin/SigninForm";

const SignInPage = () => {
  const [formLoad, setFormLoad] = useState("login");



  // const onResetSubmitHandler = (e) => {
  //   e.preventDefault();

  //   if (!email) {
  //     return alert("Fill up all the required fields");
  //   }

  //   //TODO call api to submit the form
  // };

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
