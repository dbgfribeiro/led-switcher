// Initialize Firebase
var Led1Status;

$(document).ready(function(){
  var database = firebase.database();

  database.ref().on("value", function(snap){
    
    Led1Status = snap.val().Led1Status;

    console.log(Led1Status);
    //$( ".wrapper h1" ).html(Led1Status);
  })
});

/*----------------SKETCH---------------*/

// var capture;
// var w = 640;
// var h = 480;

// function setup() {
//   let canvasDiv = document.getElementById('sketch-container');
//   let deviceWidth = canvasDiv.offsetWidth;
//   let deviceHeight = canvasDiv.offsetHeight;
//   let sketchCanvas = createCanvas(deviceWidth, deviceHeight);
//   sketchCanvas.parent("sketch-container");

//   capture = createCapture({
//     audio: false,
//     video: {
//       width: w,
//       height: h
//     }
//   }, function() {
//     console.log('capture ready.')
//   });
//   capture.elt.setAttribute('playsinline', '');
//   capture.hide();
//   capture.size(w, h);
// }

// function draw() {
//   background('#000');

//   image(capture, 0, 0, width, height);
//   filter(POSTERIZE, Led1Status+2);
// }

let captureBtn = document.getElementById('capture');
var capture;
let yoff = 0.0; // 2nd dimension of perlin noise

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

  captureBtn.onclick = function(){
    savedImg = sketchCanvas.get(0, 0, width, height-130);
    savedImg.save('my-painting', 'png');
  };
  
}

function draw() {
  background('#000');

  image(capture, 0, 0, width, height-130);
  filter(POSTERIZE, Led1Status+2);

  noStroke();
  fill(240, 223, 2, 200)
  beginShape();

  let xoff = 0;
  for (let x = 0; x <= width+10; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);

    vertex(x, y+375);
    // Noise Increment
    xoff += (Led1Status / 10);
  }
  yoff += 0.05;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  fill('#FFF');
  textSize(24);
  text((Led1Status * 10) + '%' , (width/2) - 10, height - 50);
}