$(function(){
  var socket = io.connect('http://localhost:8081');

  function keyPressOrClick(servo, keyCode, element){
    $(document).on('keypress', function(event){
      if (event.keyCode == keyCode){
        socket.emit(servo, 'this is a test');
      }
      console.log('Moving ' + servo);
    });

    $(element).on('click', function(){
      socket.emit(servo, 'this is a test');
      console.log('Moving ' + servo);
    })
  }

  keyPressOrClick('servo2', 49, '.a');
  keyPressOrClick('servo3', 50, '.s');
  keyPressOrClick('servo4', 51, '.d');
  keyPressOrClick('servo5', 52, '.f');
  keyPressOrClick('servo6', 53, '.g');
  keyPressOrClick('servo8', 54, '.h');
  keyPressOrClick('servo9', 55, '.j');
  keyPressOrClick('servo10', 56, '.k');

});
