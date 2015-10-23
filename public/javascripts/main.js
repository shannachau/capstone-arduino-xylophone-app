$(function(){
  // connect to server
  var socket = io.connect('http://localhost:8081');

  // emits an event to server if key is clicked or triggered by keypress
  function keyPressOrClick(servo, keyCode, element){
    $(document).on('keypress', function(event){
      if (event.keyCode == keyCode){
        socket.emit('moveServo', servo);
        expandAnimation(element);
        console.log('Moving ' + servo);
      }
    });

    $(element).on('click', function(){
      socket.emit('moveServo', servo);
      expandAnimation(element);
      console.log('Moving ' + servo);
    })
  }

  // animation for keypress or click
  function expandAnimation(element){
    $(element).addClass('expand');
    $(element).removeClass('lighten-1');
    $(element).on('animationend', function(){
      $(element).removeClass('expand');
      $(element).addClass('lighten-1');
    });
  }

  keyPressOrClick('Servo2', 49, '.1');
  keyPressOrClick('Servo3', 50, '.2');
  keyPressOrClick('Servo4', 51, '.3');
  keyPressOrClick('Servo5', 52, '.4');
  keyPressOrClick('Servo6', 53, '.5');
  keyPressOrClick('Servo8', 54, '.6');
  keyPressOrClick('Servo9', 55, '.7');
  keyPressOrClick('Servo10', 56, '.8');

  // mapping integers to keyPressorClick function to easily program songs
  var numToKey = {};
  numToKey[1] = keyPressOrClick.bind(numToKey, 'Servo2', 49, '.1');
  numToKey[2] = keyPressOrClick.bind(numToKey, 'Servo3', 50, '.2');
  numToKey[3] = keyPressOrClick.bind(numToKey, 'Servo4', 51, '.3');
  numToKey[4] = keyPressOrClick.bind(numToKey, 'Servo5', 52, '.4');
  numToKey[5] = keyPressOrClick.bind(numToKey, 'Servo6', 53, '.5');
  numToKey[6] = keyPressOrClick.bind(numToKey, 'Servo8', 54, '.6');
  numToKey[7] = keyPressOrClick.bind(numToKey, 'Servo9', 55, '.7');
  numToKey[8] = keyPressOrClick.bind(numToKey, 'Servo10', 56, '.8');

  var maryHadLamb = [3,2,1,2,3,3,3,2,2,2,3,5,5,3,2,1,2,3,3,3,3,2,2,3,2,1];

  function playSong(song){
    // setting 1000 ms delay while shifting through array
    var loopSong = setInterval(function(){
      // calling keyPressOrClick function
      numToKey[song.shift()]();

      // stop the loop once you have looped through entire array
      if (song.length == 0){
        clearInterval(loopSong);
      }
    }, 1000);
  }



});
