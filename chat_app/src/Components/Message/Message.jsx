import React from "react";
import "./Message.css";

let Message = ({ user, message, LeftRightSection }) => {
  if (user) {
    return (
      <div
        className={`messageBox ${LeftRightSection}`}
      >{`${user}: ${message}`}</div>
    );
  } else {
    return (
      <div
        className={`messageBox ${LeftRightSection}`}
      >{`You: ${message}`}</div>
    );
  }
};

export { Message };
