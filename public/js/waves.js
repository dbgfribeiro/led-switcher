/*----------------WAVES---------------*/
var TiltStatus;

var wavesContainer = document.getElementById("waves-container");
var siriWave = new SiriWave({
  container: wavesContainer,
  color: '#F0DF02',
  width: wavesContainer.offsetWidth + 4,
  height: wavesContainer.offsetHeight,
  speed: 0.05,
  amplitude: 0.05,
  frequency: 10
});


// Update Tilt Status
$(document).ready(function(){
  var database = firebase.database();
  database.ref().on("value", function(snap){
    TiltStatus = snap.val().TiltStatus;

    if(TiltStatus > 0) {
      siriWave.speed += TiltStatus/200
      siriWave.amplitude += TiltStatus/100;
      siriWave.frequency += TiltStatus*10;
    }
    else {
      siriWave.speed = 0.05;
      siriWave.amplitude = 0.05;
      siriWave.frequency = 10;
    }
  })
});