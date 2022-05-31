var firebaseConfig = {
  apiKey: "AIzaSyCpduCp0b0w9gyZm5CPV_Tm5Rudxzvb4uc",
  authDomain: "shake-n-take.firebaseapp.com",
  databaseURL: "https://shake-n-take-default-rtdb.firebaseio.com",
  projectId: "shake-n-take",
  storageBucket: "shake-n-take.appspot.com",
  messagingSenderId: "760800758161",
  appId: "1:760800758161:web:374be3498624d59fbab230",
  measurementId: "G-Y8RKZ04RXX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var Led1Status;

$(document).ready(function(){
  var database = firebase.database();

  database.ref().on("value", function(snap){
    
    Led1Status = snap.val().Led1Status;

    console.log(Led1Status);
    $( ".wrapper h1" ).html(Led1Status);
  })
});

/*----------------SKETCH---------------*/

let cam;
var capture;
let yoff = 0.0; // 2nd dimension of perlin noise

var w = 640;
var h = 480;

function setup() {
  let canvasDiv = document.getElementById('sketch-container');
  let deviceWidth = canvasDiv.offsetWidth;
  let deviceHeight = canvasDiv.offsetHeight;
  let sketchCanvas = createCanvas(deviceWidth, deviceHeight);
  console.log(sketchCanvas);
  sketchCanvas.parent("sketch-container");
  
  //cam = createCapture(VIDEO);
  //cam.size(1800, 800);

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

  image(capture, 0, 0, width, height-130);
  // fill('#f00');
  // rect(0, 0, width, height-160);
  filter(POSTERIZE, Led1Status+2);

  noStroke();
  fill(240, 223, 2, 200)
  beginShape();

  let xoff = 0;
  for (let x = 0; x <= width+10; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);

    vertex(x, y+330);
    // Noise Increment
    xoff += (Led1Status / 10);
  }
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  fill('#FFF');
  textSize(24);
  text((Led1Status * 10) + '%' , (width/2) - 10, height - 50);
}