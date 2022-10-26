import React from "react";
import { useParams } from "react-router-dom";
import UserVerification from "../../components/UserVerification/UserVerification";

const VerificationPage = () => {
  const {_id,email} = useParams();

  //call api and send the _id to verify user

  console.log(_id,email)
  return (
    <div className="h-screen text-center flex justify-center items-center text-xl bg-cyan-600">
      <UserVerification _id={_id} email={email}/>
    </div>
  );
};

export default VerificationPage;
