// // Initialize Firebase
// $(document).ready(function(){
//   var database = firebase.database();
//   var test;

//   database.ref().on("value", function(snap){
//     test = snap.val().Led1Status;
//     console.log(test);
//   })

//   var wavesContainer = document.getElementById("waves-container");
//   var siriWave = new SiriWave({
//     container: wavesContainer,
//     color: '#F0DF02',
//     width: wavesContainer.offsetWidth + 4,
//     height: wavesContainer.offsetHeight,
//     speed: 0.05,
//     amplitude: 0.05,
//     frequency: 10
//   });
// });