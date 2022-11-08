import React from "react";

const MessageHistory = ({ messages }) => {
  if (!messages) return null;

  return messages.map((message, i) => (
    <div
      key={i}
      className={`mt-5 flex ${
        message.type === "client" ? "flex-row" : "flex-row-reverse"
      } justify-between text-base`}
    >
      <div className="send">
        <div className="font-bold text-start">{message.sender}</div>
        <div className="date">
          {message.msgAt && new Date(message.msgAt).toLocaleDateString()}
        </div>
      </div>
      <div className="message w-4/5 border p-4">{message.message}</div>
    </div>
  ));
};

export default MessageHistory;
