$(function(){
  var socket = io.connect('http://localhost:8081');

  $('.a').click(function(){
    socket.emit('servo2', 'this is a test');
    console.log('Moving servo2');
  });

  $('.s').click(function(){
    socket.emit('servo3', 'this is a test');
    console.log('Moving servo3');

  });

  $('.d').click(function(){
    socket.emit('servo4', 'this is a test');
    console.log('Moving servo4');

  });

  $('.f').click(function(){
    socket.emit('servo5', 'this is a test');
    console.log('Moving servo5');

  });

  $('.g').click(function(){
    socket.emit('servo6', 'this is a test');
    console.log('Moving servo6');

  });

  $('.h').click(function(){
    socket.emit('servo8', 'this is a test');
    console.log('Moving servo8');

  });

  $('.j').click(function(){
    socket.emit('servo9', 'this is a test');
    console.log('Moving servo9');

  });

  $('.k').click(function(){
    socket.emit('servo10', 'this is a test');
    console.log('Moving servo10');

  });
  //
  // clickKey('a');
  // clickKey('s');
  // clickKey('d');
  // clickKey('f');
  // clickKey('g');
  // clickKey('h');
  // clickKey('j');
  // clickKey('k');

  // function clickKey(key){
  //   $('.' + key).click(function(){
  //     socket.emit(key, 'Move servo' + key);
  //   });
  // }
});
