import React from "react";

const UpdateTicket = (props) => {
  const { message, onChangeHandler, onSubmitHandler } = props;
  return (
    <div className="text-base">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="detail" className="font-bold text-lg">
          Reply
        </label>
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
