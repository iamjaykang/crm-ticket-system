import React from "react";
import PasswordResetForm from "../../components/PasswordResetForm/PasswordResetForm";
import UpdatePasswordForm from "../../components/PasswordResetForm/UpdatePasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="h-screen text-center flex justify-center items-center text-xl bg-cyan-600">
      <PasswordResetForm />

      <UpdatePasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
