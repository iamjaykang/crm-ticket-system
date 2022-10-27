import React from "react";
import { useParams } from "react-router-dom";
import UserVerification from "../../components/UserVerification/UserVerification";

const VerificationPage = () => {
  //call api and send the _id to verify user

  return (
    <div className="h-screen text-center flex justify-center items-center text-xl bg-cyan-600">
      <UserVerification/>
    </div>
  );
};

export default VerificationPage;
