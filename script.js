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

$(document).ready(function(){
  var database = firebase.database();
var Led1Status;

database.ref().on("value", function(snap){
  Led1Status = snap.val().Led1Status;
  if(Led1Status == "1"){    // check from the firebase
    //$(".Light1Status").text("The light is off");
    document.getElementById("unact").style.display = "none";
    document.getElementById("act").style.display = "block";
  } else {
    //$(".Light1Status").text("The light is on");
    document.getElementById("unact").style.display = "block";
    document.getElementById("act").style.display = "none";
  }
});

  $(".toggle-btn").click(function(){
  var firebaseRef = firebase.database().ref().child("Led1Status");

  if(Led1Status == "1"){    // post to firebase
    firebaseRef.set("0");
    Led1Status = "0";
  } else {
    firebaseRef.set("1");
    Led1Status = "1";
  }
})
});