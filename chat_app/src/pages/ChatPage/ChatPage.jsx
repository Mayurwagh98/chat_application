import React from "react";
import { user } from "../JoinPage/JoinPage";
import socketIo from "socket.io-client";
import "./ChatPage.css";
import { useEffect } from "react";
import { useState } from "react";
import { Message } from "../../Components/Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../Images/closeIcon.png";
import {SendOutlined, CloseOutlined} from "@ant-design/icons"

let socket;
// const EndPoint = "http://localhost:5000";
const EndPoint = "https://chat-backend-lyps.onrender.com";


let Chatpage = () => {
  let [id, setId] = useState("");
  let [messages, setMessage] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIo(EndPoint, { transports: ["websocket"] });
    socket.on("connect", () => {
      //recieving the data from the backend (server file)
      // alert("Connected");
      setId(socket.id);
    });
    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessage([...messages, data]);

      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessage([...messages, data]);

      console.log(data.user, data.message);
    });
    return () => {
      socket.emit("disconnected"); // sending the event 'disconnect' to the backend (server file)
      socket.off(); // as the user has left, so switching off the socket
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage([...messages, data]);

      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off(); // to avoid the multiple renders
    };
  }, [messages]); // every time someone sends the message, dom should re-render

  return (
    <>
      {/* <h1>{user}</h1> */}
      <div className="chatPage">
        <div className="chatContainer">
          <div className="header">
            <h2>Social-Desk</h2>
            {/* given anchor tag because its reloads the page, and after reloading it will direct to the home page */}
            <a href="/">
              {/* <img src={closeIcon} alt="Close" /> */}
              <CloseOutlined style={{margin:"10px", color:"white"}} />
            </a>
          </div>
          <ReactScrollToBottom className="chatBox">
            {messages.map((item, i) => (
              <Message
                user={item.id === id ? "" : item.user}
                message={item.message}
                LeftRightSection={item.id === id ? "right" : "left"}
              />
            ))}
          </ReactScrollToBottom>

          <div className="inputBox">
            <input
              onKeyDown={(event) => (event.key === "Enter" ? send() : null)}
              type="text"
              id="chatInput"
              placeholder="Enter Your Message Here"
            />
            <button onClick={send} className="sendBtn">
              <SendOutlined style={{fontSize:"25px"}}/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { Chatpage };
