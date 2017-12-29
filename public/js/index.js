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
});

jQuery("#loc-button").on('click',function(event){
    if(!navigator.geolocation){
        return alert('Geo Location not supported by your browser :(')
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log('location fetched is '+JSON.stringify(position,undefined,2));
    }
    ,function(err){
            alert('Unable to get location :( :(')
    });
});