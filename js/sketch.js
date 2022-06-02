// Initialize Firebase
var TiltStatus;

$(document).ready(function(){
  var database = firebase.database();

  database.ref().on("value", function(snap){
    
    TiltStatus = snap.val().TiltStatus;

    console.log(TiltStatus);
    //$( ".wrapper h1" ).html(TiltStatus);
  })
});

/*----------------SKETCH---------------*/
let canvasDiv = document.getElementById('sketch-container');
let deviceWidth = canvasDiv.offsetWidth;
let deviceHeight = canvasDiv.offsetHeight;

let captureBtn = document.getElementById('capture');
var capture;
let yoff = 0.0;

var w = 640;
var h = 480;

function setup() {
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
  image(capture, 0, 0, width, height-130);
  filter(POSTERIZE, TiltStatus+2);


  /*---↓---Não mexer---↓---*/

  /*-Waves-*/
  noStroke();
  fill(240, 223, 2, 200)
  beginShape();

  let xoff = 0;
  for (let x = 0; x <= width+10; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);

    vertex(x, y+375);
    // Noise Increment
    xoff += (TiltStatus / 10);
  }
  yoff += 0.05;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  fill('#FFF');
  textSize(24);
  text((TiltStatus * 10) + '%' , (width/2) - 10, height - 50);
}