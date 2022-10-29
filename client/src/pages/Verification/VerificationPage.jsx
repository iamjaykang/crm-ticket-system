import React from "react";
import UserVerification from "../../components/UserVerification/UserVerification";

const VerificationPage = () => {
  //call api and send the _id to verify user

  return (
    <div className="h-screen text-center flex justify-center items-center text-xl bg-cyan-500">
      <UserVerification/>
    </div>
  );
};

export default VerificationPage;
