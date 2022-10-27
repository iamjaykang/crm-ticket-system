import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userVerification } from "./userVerificationAction";

const UserVerification = () => {
  const dispatch = useDispatch();

  const { isLoading, status, message } = useSelector(
    (state) => state.userVerification
  );
  const { _id, email } = useParams();
  const formData = { _id, email };
  useEffect(() => {
    dispatch(userVerification(formData));
  }, [dispatch]);
  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-2xl p-2">User Registration</h1>
        {status === "success" && (
          <div
            className="p-4 my-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-greeen-200 dark:text-green-800"
            role="alert"
          >
            {message}
          </div>
        )}
        {status === "error" && (
          <div
            className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default UserVerification;
