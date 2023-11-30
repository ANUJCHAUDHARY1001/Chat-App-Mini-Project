// Node server which will handle socket io connections

//Requiring socket.io at server 8102 in instance io it will listen incomming events
const io = require('socket.io')(8000)

const users = {};

//Socket is a particular connection and io.on is a instance of socket.io it listen many connections that is a new user connects to it , it listens that thing

// and socket.on handles that is new user just connected with it, it decides what should be done with that new user like as here if new-user-joined event occures give users socket.id means append new user in that const users

// socket.broadcast.emit if there are 2 user chatting and if new user join so it broadcast to other all the participants of that chat that who is the new user joins except that new user who  joined the chat
io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // If someone leaves the chat, let others know 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})