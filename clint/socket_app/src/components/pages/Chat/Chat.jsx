import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { Link, useParams } from "react-router-dom";

export default function Chat() {
  const [user, setUser] = useState("");
  const [rooms, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const { name, room } = useParams();
  console.log(name, room);

  const socket = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(socket.current);
    socket.current.emit("sendMessage", message, () => setMessage(""));
    setTimeout(() => {
      var div = document.getElementById("chat_body");
      div.scrollTop = div.scrollHeight;
    }, 100);
  };

  useEffect(() => {
    socket.current = io("http://localhost:4000/");
    setUser(name);
    setRoom(room);
    socket.current.emit("join", { name: name, room: room }, (err) => {
      if (err) {
        alert(err);
      }
    });

    socket.current.on("message", (msg) => {
      setMessages((prevMsg) => [...prevMsg, msg]);
    });

    socket.current.on("roomMembers", (usrs) => {
      setUsers(usrs);
    });
    return () => {
      socket.current.disconnect();
      socket.current.off();
    };
  }, []);

  return (
    <div>
      <div className="chatclass">
        <div className="container" ng-app="chatApp">
          <h1>Room Chat</h1>
          <div className="chatbox" ng-controller="MessageCtrl as chatMessage">
            <div className="chatbox__user-list">
              <h1>Friends Online</h1>
              {users.map((e, i) => (
                <div key={i} class="chatbox__user--active">
                  <p>{e.user}</p>
                </div>
              ))}
            </div>

            <div class="chatbox__messages" ng-repeat="message in messages">
              {messages?.map((val, i) => {
                if (val.user === user?.toLowerCase()) {
                  return (
                    <div key={i} class="chatbox__messages__user-message">
                      <div class="chatbox__messages__user-message--ind-message sender">
                        <p class="name">{val.text}</p>
                        <br />
                        <p class="message">{val.user}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} class="chatbox__messages__user-message">
                      <div class="chatbox__messages__user-message--ind-message">
                        <p class="name">{val.text}</p>
                        <br />
                        <p class="message">{val.user}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <form>
              <input
                type="text"
                placeholder="Type Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(event) =>
                  event.key === "Enter" ? sendMessage(event) : null
                }
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
