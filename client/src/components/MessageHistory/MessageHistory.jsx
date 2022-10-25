import React from "react";

const MessageHistory = (props) => {
  const { messages } = props;
  
  if (!messages) return null;
  return messages.map((message, i) => (
    <div
      key={i}
      className={
        message.sender === "client"
          ? "mt-5 flex flex-row justify-between text-base"
          : "mt-5 flex flex-row-reverse justify-between text-base"
      }
    >
      <div className="send">
        <div className="font-bold text-start">{message.sender}</div>
        <div className="date">{message.msgAt}</div>
      </div>
      <div className="message w-4/5 border p-4">{message.message}</div>
    </div>
  ));
};

export default MessageHistory;
