// Initialize Firebase
var TiltStatus;

// Waves Design
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

    console.log(TiltStatus);
    siriWave.speed += TiltStatus/200
    siriWave.amplitude += TiltStatus/100;
    siriWave.frequency += TiltStatus*10;
  })
});

/*----------------SKETCH---------------*/
var capture;
var w = 640;
var h = 480;

function setup() {
  let canvasDiv = document.getElementById('sketch-container');
  let deviceWidth = canvasDiv.offsetWidth;
  let deviceHeight = canvasDiv.offsetHeight;
  let sketchCanvas = createCanvas(deviceWidth, deviceHeight);
  sketchCanvas.parent("sketch-container");

  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    console.log('capture ready.')
  });
  capture.elt.setAttribute('playsinline', '');
  capture.hide();
  capture.size(w, h);
}

function draw() {
  background('#000');

  /*-Camera-*/
  image(capture, 0, 0, width, height);
  filter(POSTERIZE, TiltStatus+2);
}