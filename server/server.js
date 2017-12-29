const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT||3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));

var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New User Connectd!');

    socket.on('createEmail',(message)=>{
        console.log('Message from client is ',JSON.stringify(message,undefined,2));
        message.time = new Date().getTime();
        io.emit('newEmail',message)
    });

    socket.on('disconnect',()=>{
        console.log('User Disconnected!');
    });
});

server.listen(port,()=>{
    console.log('server is up on port ',port);
})

