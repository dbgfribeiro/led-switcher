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

function setup() {
  let canvasDiv = document.getElementById('sketch-container');
  let deviceWidth = canvasDiv.offsetWidth;
  let deviceHeight = canvasDiv.offsetHeight;
  let sketchCanvas = createCanvas(deviceWidth, deviceHeight);
  console.log(sketchCanvas);
  sketchCanvas.parent("sketch-container");
  
  cam = createCapture(VIDEO);
  cam.size(1600, 800);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(cam, 0, 0, width, height);
  filter(POSTERIZE, Led1Status+2);
}