// **COMMENTS** ARE FOR ADVANCED/CUSTOMIZATION SET UP

$(function(){
  $('.button-collapse').sideNav();

  // for muting audio
  $('.volume').click(function(){
    var text = $(this).text();
    var all_audio = $('audio');
    if (text == 'volume_up') {
      $(this).text('volume_off');
      for(var i = 0; i < all_audio.length; i++){
        all_audio[i].muted = true;
      }
    } else {
      $(this).text('volume_up');
      for(var i = 0; i < all_audio.length; i++){
        all_audio[i].muted = false;
      }
    }
  });

  // connect to server
  var socket = io.connect('https://still-sands-6354.herokuapp.com', {
    'reconnectionAttempts': 10
  });
  // ** USE COMMENTED LINES BELOW INSTEAD IF HOSTING APP ON LOCAL MACHINE **
  //var socket = io.connect('http://localhost:8081', {
  //  'reconnectionAttempts': 10
  //});


  // moves servo if key is clicked or triggered by keypress
  function keyPressOrClick(servo, keyCode, element){
    $(document).on('keypress', function(event){
      if (event.keyCode == keyCode){
        moveServo(servo);
        expandAnimation(element);
        playAudio(element);
      }
    });

    $(element).on('click', function(){
      moveServo(servo);
      expandAnimation(element);
      playAudio(element);
    })
  }

  // emits an event to server which will move the servo
  function moveServo(servo){
    socket.emit('moveServo', servo);
    console.log('Moving ' + servo);
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

  function playAudio(element){
    var id = element.replace('.', 'audio')
    var audio = document.getElementById(id);
    audio.currentTime = 0;
    audio.play();
  }

  keyPressOrClick('Servo2', 49, '.1');
  keyPressOrClick('Servo3', 50, '.2');
  keyPressOrClick('Servo4', 51, '.3');
  keyPressOrClick('Servo5', 52, '.4');
  keyPressOrClick('Servo6', 53, '.5');
  keyPressOrClick('Servo8', 54, '.6');
  keyPressOrClick('Servo9', 55, '.7');
  keyPressOrClick('Servo10', 56, '.8');
  // ** ADD ADDITIONAL SERVOS HERE **


  // PROGRAMMING SONGS ---------------------------------------------------------

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

  // plays a song that's formatted as an array of integers with delay
  function playSong(song, speed){
    for(var i = 0; i < song.length; i++){
      var timeout = function(x) {
                      setTimeout(function(){
                        var num = song[x];
                        if (num != 0) {
                          numToKey[num]();

                            var element = '.' + num;
                            expandAnimation(element);
                            playAudio(element);
                        }
                      }, i * speed);
                    }
      timeout(i);
    }
  }

  var maryHadLamb = [3,2,1,2,3,3,3,0,2,2,2,0,3,5,5,0,3,2,1,2,3,3,3,3,2,2,3,2,1];

  var wreckingBall = [6,0,2,0,6,0,2,0,6,0,1,0,6,0,1,0,1,3,0,2,3,2,3,4,0,2,0,0,0,6,0,2,0,6,0,2,0,6,0,1,0,6,0,1,0,1,3,0,2,3,2,3,4,0,2,0];

  var trapQueen = [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,5,0,0,3,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,
                  1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,5,0,0,3,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,
                  1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,5,0,0,3,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,
                  1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,5,0,0,3];

  var rainbow = [1,0,0,0,0,8,0,0,0,0,7,0,0,5,6,7,0,0,8,0,0,1,0,0,0,0,1,0,0,6,0,0,5,0,0]

  $('.mary').on('click', function(){
    playSong(maryHadLamb, 500);
  })

  $('.miley').on('click', function(){
    playSong(wreckingBall, 375);
  })

  $('.fetty').on('click', function(){
    playSong(trapQueen, 105);
  })

  $('.rainbow').on('click', function(){
    playSong(rainbow, 200);
  })
});
