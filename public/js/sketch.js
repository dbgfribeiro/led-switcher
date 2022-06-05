/*----------------SET FILTER---------------*/
let selectedFilter;
let filters = document.querySelector('.filters-list');
filters.querySelectorAll('button').forEach(el => {
  el.addEventListener('click', (e) => {
    selectedFilter = el.id;
    filters.style.display = 'none';
  })
})

// Update Tilt Status
var TiltStatus;

$(document).ready(function(){
  var database = firebase.database();
  database.ref().on("value", function(snap){
    TiltStatus = snap.val().TiltStatus;
    console.log(TiltStatus);
  })
});

/*----------------SKETCH---------------*/
var capture;
var w = 480;
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
  if(selectedFilter === 'posterize') {
    posterizeFilter();
  }
  else if(selectedFilter === 'threshold') {
    thresholdFilter();
  }
  else {
    noFilter();
  }
}

/*------------------------------------Posterize------------------------------------*/
function posterizeFilter() {
  background('#000');
  image(capture, 0, 0, width, height);
  filter(POSTERIZE, (-TiltStatus) +12);
}

/*------------------------------------Threshold------------------------------------*/
function thresholdFilter() {
  background(255);
  fill(0);
  noStroke();

  capture.loadPixels();
  
  let threshold = map((TiltStatus*20) + 50, 0, width, 0, 1);
  
  for (let x = 0; x < capture.width; x++) {
    for (let y = 0; y < capture.height; y++) {
      let i = (x + y * capture.width) * 4;
      let r = capture.pixels[i+0];
      let g = capture.pixels[i+1];
      let b = capture.pixels[i+2];
      let a = capture.pixels[i+3];
      
      let pixelColor;
      if ((r / 255) > threshold) {
        pixelColor = 255;
      } else {
        pixelColor = 0;
      }
      
      capture.pixels[i+0] = pixelColor;
      capture.pixels[i+1] = pixelColor;
      capture.pixels[i+2] = pixelColor;
    }
  }
  capture.updatePixels();
  
  image(capture, 0, 0, width, height);
}

/*------------------------------------No Filter------------------------------------*/
function noFilter() {
  background('#000');
  image(capture, 0, 0, width, height);
}
