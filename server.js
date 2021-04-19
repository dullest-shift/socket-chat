const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formats = require('./utils/format')
const { userj, curruser, allusers } = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3300 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

//user connects
io.on('connection', socket => {
    console.log('new user connection');

    socket.on('lists', ({ username }) => {
        console.log(username);
        const user = userj(socket.id, username);
    });
    socket.emit('message', formats('admin', 'new user hS JOINED'));



    socket.broadcast.emit('message', formats('admin', `new user named  joined`)); //to all people
    socket.on('chats', msg => {
        const user = curruser(socket.id)
        io.emit('message', formats(user.username, msg))
        console.log(user.username + "we")
    })
    socket.on('disconnect', () => {
        io.emit('message', formats('user', 'disconnected'))
    });

});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));