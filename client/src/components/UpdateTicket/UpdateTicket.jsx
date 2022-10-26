import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replyOnTicket } from "./updateTicketAction";

const UpdateTicket = ({ _id }) => {
  const dispatch = useDispatch();
  const {
    user: { name },
  } = useSelector((state) => state.user);
  const { replyMsg, replyTicketError } = useSelector(
    (state) => state.replyTicket
  );
  const [message, setMessage] = useState("");

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const msgObj = {
      message,
      sender: name,
    };
    dispatch(replyOnTicket(_id, msgObj));
    setMessage("");
  };

  return (
    <div className="text-base">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="detail" className="font-bold text-lg">
          Reply
        </label>
        {replyMsg && (
          <div
            className="p-4 my-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-greeen-200 dark:text-green-800"
            role="alert"
          >
            {replyMsg}
          </div>
        )}
        {replyTicketError && (
          <div
            className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            {replyTicketError}
          </div>
        )}
        <textarea
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker my-3"
          name="detail"
          rows="5"
          onChange={onChangeHandler}
          value={message}
          placeholder="Please type your message here ..."
        />
        <div className="text-right">
          <button
            className="bg-blue-400 hover:bg-blue-dark text-white text-base font-bold py-2 px-4 rounded"
            type="submit"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTicket;
