const express = require("express");
const socketio = require("socket.io");
const { addUser, removeUser, getUser, getRoomUsers } = require("./entity");

const app = express();
const port = 4000;

var server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


const io = socketio(server ,{cors: { origin: '*' }})

 
app.get("/", (req, res) => {
  res.send("Hello World!"); 
});

io.on('connection', (socket) => {
  console.log("connection"); // x8WIv7-mJelg7on_ALbx

  socket.on('join',({name,room},callback) => {
    console.log(name,room , 'room name')
      const {response , error} = addUser({id: socket.id , user:name, room: room})

      console.log(response ,' responce')

      if(error) {
        callback(error)
        return;
      }
      socket.join(response.room);
      socket.emit('message', { user: 'admin' , text: `Welcome ${response.user} ` });
      socket.broadcast.to(response.room).emit('message', { user: 'admin', text : `${response.user} has joined` })

      io.to(response.room).emit('roomMembers', getRoomUsers(response.room))
  })

  socket.on('sendMessage',(message,callback) => {
    
    const user = getUser(socket.id)

    io.to(user.room).emit('message',{ user: user.user, text : message })

    callback()
})

  socket.on('disconnect',() => {
    console.log("User disconnected");
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message',{ user: 'admin', text : `${user.user} has left` })
    }
  })

});


