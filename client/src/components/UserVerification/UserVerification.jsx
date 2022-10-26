import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userVerification } from "./userVerificationAction";

const UserVerification = ({ _id, email }) => {
  const dispatch = useDispatch();
  const formData = { _id, email };
  useEffect(() => {
    dispatch(userVerification(formData));
  });
  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-2xl p-2">User Registration</h1>
      </div>
    </>
  );
};

export default UserVerification;
