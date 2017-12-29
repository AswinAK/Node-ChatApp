var socket = io();
socket.on('connect',function(){
    console.log('connection established..');
    socket.emit('createEmail',{
        from:"abc@xyz.com",
        text:"this is the email text"
    });
    
});
socket.on('disconnect',function(){
    console.log('connection disconnected..');
});

socket.on('newEmail',function(data){
    console.log('Email received is ',data.text);
});