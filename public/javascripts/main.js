$(function(){
  $('.button-collapse').sideNav();

  // connect to server
  var socket = io.connect('https://localhost:8081', {
    'secure': true,
    'reconnectionAttempts': 10
  });

  // emits an event to server which will move the servo
  function moveServo(servo){
    socket.emit('moveServo', servo);
    console.log('Moving ' + servo);
  }

  // moves servo if key is clicked or triggered by keypress
  function keyPressOrClick(servo, keyCode, element){
    $(document).on('keypress', function(event){
      if (event.keyCode == keyCode){
        moveServo(servo);
        expandAnimation(element);
      }
    });

    $(element).on('click', function(){
      moveServo(servo);
      expandAnimation(element);
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
  numToKey[1] = moveServo.bind(numToKey, 'Servo2');
  numToKey[2] = moveServo.bind(numToKey, 'Servo3');
  numToKey[3] = moveServo.bind(numToKey, 'Servo4');
  numToKey[4] = moveServo.bind(numToKey, 'Servo5');
  numToKey[5] = moveServo.bind(numToKey, 'Servo6');
  numToKey[6] = moveServo.bind(numToKey, 'Servo8');
  numToKey[7] = moveServo.bind(numToKey, 'Servo9');
  numToKey[8] = moveServo.bind(numToKey, 'Servo10');


  var maryHadLamb = [3,2,1,2,3,3,3,2,2,2,3,5,5,3,2,1,2,3,3,3,3,2,2,3,2,1];

  // plays a song that's formatted as an array of integers
  function playSong(song){
    // setting 1000 ms delay while shifting through array
    var loopSong = setInterval(function(){
      // calling moveServo function
      var num = song.shift();
      numToKey[num]();

      // do the animation
      var element = '.' + num.toString();
      expandAnimation(element);

      // stop the loop once you have looped through entire array
      if (song.length == 0){
        clearInterval(loopSong);
      }
    }, 1000);

  }

  $('.mary').on('click', function(){
    playSong(maryHadLamb);
  })
});
