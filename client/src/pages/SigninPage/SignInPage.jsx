import React, { useState } from "react";
import SigninForm from "../../components/Signin/SigninForm";

const SignInPage = () => {
  return (
    <div className="h-screen text-center flex justify-center items-center text-xl bg-cyan-500">
      <SigninForm />
    </div>
  );
};

export default SignInPage;
