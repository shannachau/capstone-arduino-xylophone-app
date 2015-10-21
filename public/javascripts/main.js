$(function(){
  // connect to server
  var socket = io.connect('http://localhost:8081');
  console.log(socket);

  // emits an event to server if key is clicked or triggered by keypress
  function keyPressOrClick(servo, keyCode, element){
    $(document).on('keypress', function(event){
      if (event.keyCode == keyCode){
        socket.emit('moveServo', servo);
        expandAnimation(element);
      }
      console.log('Moving ' + servo);
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

  keyPressOrClick('Servo2', 49, '.a');
  keyPressOrClick('Servo3', 50, '.s');
  keyPressOrClick('Servo4', 51, '.d');
  keyPressOrClick('Servo5', 52, '.f');
  keyPressOrClick('Servo6', 53, '.g');
  keyPressOrClick('Servo8', 54, '.h');
  keyPressOrClick('Servo9', 55, '.j');
  keyPressOrClick('Servo10', 56, '.k');



  // mapping integers to keyPressorClick function to easily program songs
  var numToKey = {};
  numToKey[1] = keyPressOrClick.bind(numToKey, 'Servo2', 49, '.a');
  numToKey[2] = keyPressOrClick.bind(numToKey, 'Servo3', 50, '.s');
  numToKey[3] = keyPressOrClick.bind(numToKey, 'Servo4', 51, '.d');
  numToKey[4] = keyPressOrClick.bind(numToKey, 'Servo5', 52, '.f');
  numToKey[5] = keyPressOrClick.bind(numToKey, 'Servo6', 53, '.g');
  numToKey[6] = keyPressOrClick.bind(numToKey, 'Servo8', 54, '.h');
  numToKey[7] = keyPressOrClick.bind(numToKey, 'Servo9', 55, '.j');
  numToKey[8] = keyPressOrClick.bind(numToKey, 'Servo10', 56, '.k');

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
