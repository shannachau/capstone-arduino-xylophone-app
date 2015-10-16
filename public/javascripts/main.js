$(function(){
  var socket = io.connect('http://localhost:8081');

  $('.a').click(function(){
    socket.emit('testing', 'this is a test');
    console.log("i think this works");
  });
});
