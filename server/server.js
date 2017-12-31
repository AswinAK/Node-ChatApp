const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT||3000;
const {isRealString} = require('./utils/validation.js');
var app = express();
var server = http.createServer(app);
var {generateMessage} = require('./utils/message');
app.use(express.static(publicPath));

var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New User Connectd!');

    
    socket.on('join',(params,callback)=>{
        console.log('join in server js');
        if(!isRealString(params.name)||!isRealString(params.room))
            callback('Name and room name are required...');

        socket.join(params.room);
        socket.emit('incomingMessage',generateMessage('Admin','Admin welcomes you to the chat'));
        socket.broadcast.to(params.room).emit('incomingMessage',generateMessage('admin',`${params.name} has joined the chat`));
    
    });

    socket.on('newMessage',(message,callback)=>{
        console.log('Message from client is ',JSON.stringify(message,undefined,2));
        message.time = new Date().getTime();
        io.emit('incomingMessage',message);
        if(callback)callback()
    });

    socket.on('userLocation',(message,callback)=>{
        console.log('Message from client is ',JSON.stringify(message,undefined,2));
        message.time = new Date().getTime();
        io.emit('incomingMessage',generateMessage('a user',`At latitude:${message.latitude} longitude:${message.longitude}`));
        io.emit('addLocation',generateMessage('a user',message));
        if(callback)callback(100)
    });

    socket.on('disconnect',()=>{
        console.log('User Disconnected!');
    });
});

try{
    server.listen(port,()=>{
        console.log('server is up on port ',port);
    })
}catch(e){

}

