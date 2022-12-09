import io  from "socket.io-client";
import React, { useState, useEffect } from "react";
import './Login.css'
import { Link ,useParams } from 'react-router-dom'


let socket;
export default function Login() {

  const [name , setName ] = useState('')
  const [room , setRoom ] = useState('')

  const onSubmit = (e) => {
    if (name || room ){
      return null
    }else{
      e.preventDefault()
      return alert("Name and Room is Required")
    }
  }



  useEffect(() => {
   socket = io("http://localhost:4000/");
   // socket.emit("connect");
  },[]);

  return (
    <div className="loginClass">
      <div className="container vh-100">
        <div className="h-100 w-100">
          <div className="body-container">
            <div className="body-form">
              <img
                id="profile-img"
                className="rounded-circle profile-img-card"
                src="https://i.imgur.com/6b6psnA.png"
              />
              <p id="profile-name" className="profile-name-card"></p>
              <form className="form-signin">
                <input
                  type="text" onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="inputPassword"
                  className="form-control form-group"
                  placeholder="Name"
                  required
                  autoFocus
                />
                 <input
                  type="text" onChange={(e) => setRoom(e.target.value)}
                  name="room"
                  id="inputPassword"
                  className="form-control form-group"
                  placeholder="Room"
                  required
                  autoFocus
                />
                <Link to={`/chat/${name}/${room}`}>
                <button
                  className="btn btn-lg btn-primary btn-block btn-signin"
                  type="submit" onClick={onSubmit}
                >
                  enter
                </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
