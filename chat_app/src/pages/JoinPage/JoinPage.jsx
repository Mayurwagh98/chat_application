import React, { useState } from "react";
import "./JoinPage.css";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};
let JoinPage = () => {
  let [userName, setUserName] = useState("");
  return (
    <div>
      <div className="JoinPage">
        <div className="JoinContainer">
          <h1>Joining Page</h1>
          <img src={logo} alt="logo" />
          <h1>Social-Desk</h1>
          <input
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter Your Name"
            type="text"
            id="joinInput"
          />
          <Link
            onClick={(event) => (!userName ? event.preventDefault() : null)}
            to="/chat"
          >
            <button onClick={sendUser} className="joinbtn">
              Start Chatting
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { JoinPage };
export { user };
