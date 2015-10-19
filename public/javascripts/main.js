$(function(){
  var socket = io.connect('http://localhost:8081');

  function keyPressOrClick(servo, keyCode, element){
    $(document).on('keypress', function(event){
      if (event.keyCode == keyCode){
        socket.emit('moveServo', servo);
      }
      console.log('Moving ' + servo);
    });

    $(element).on('click', function(){
      socket.emit('moveServo', servo);
      console.log('Moving ' + servo);
    })
  }

  keyPressOrClick('Servo2', 49, '.a');
  keyPressOrClick('Servo3', 50, '.s');
  keyPressOrClick('Servo4', 51, '.d');
  keyPressOrClick('Servo5', 52, '.f');
  keyPressOrClick('Servo6', 53, '.g');
  keyPressOrClick('Servo8', 54, '.h');
  keyPressOrClick('Servo9', 55, '.j');
  keyPressOrClick('Servo10', 56, '.k');

});
