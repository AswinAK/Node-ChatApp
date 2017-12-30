var socket = io();
var map;
var locationButton = jQuery("#loc-button");
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

socket.on('addLocation',function(data){
    console.log('addLocation ',data);
    console.log('map is ',map);
    var myLatLng = {lat: data.text.latitude, lng: data.text.longitude}
    console.log('adding ',myLatLng);

    if(map==undefined){
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: myLatLng
        });
    }
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        label:'dodo',
        title: 'Hello World!'
    });
});


jQuery("#message-form").on('submit',function(event){
    event.preventDefault();
    socket.emit('newMessage',{
        from:"abc@xyz.com",
        text:jQuery("#message-text").val()
    }, function(){
        console.log('ack received');
        jQuery("#message-text").val('');
    });
});

locationButton.on('click',function(event){
    if(!navigator.geolocation){
        return alert('Geo Location not supported by your browser :(')
    }
    locationButton.attr('disabled','disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('userLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },function(){
            locationButton.removeAttr('disabled').text('Send Location');;
        });
    }
    ,function(err){
            alert('Unable to get location :( :(')
    });
});

function initMap() {

}
