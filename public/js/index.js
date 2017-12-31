var socket = io();
var map;
var locationButton = jQuery("#loc-button");
socket.on('connect',function(){
    console.log('connection established..');
    
});
socket.on('disconnect',function(){
    console.log('connection disconnected..');
});

function scrollToBottom(){
    var messages = jQuery('#mview');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('incomingMessage',function(data){
    var formattedTime = moment(data.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        message: data.text,
        from:data.from,
        time:formattedTime
    });
    jQuery('#mview').append(html);
    scrollToBottom();
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
        label:'User X',
    });
    scrollToBottom();
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
