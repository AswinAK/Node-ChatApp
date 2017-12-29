var socket = io();
socket.on('connect',function(){
    console.log('connection established..');
    
});
socket.on('disconnect',function(){
    console.log('connection disconnected..');
});

socket.on('incomingMessage',function(data){
    console.log('Message received is ',JSON.stringify(data,undefined,2));
    var li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    jQuery('#mview').append(li);
});


jQuery("#message-form").on('submit',function(event){
    event.preventDefault();
    socket.emit('newMessage',{
        from:"abc@xyz.com",
        text:jQuery("#message-text").val()
    }, function(ack){
        console.log('ACK returned is '+ack)
    });
})