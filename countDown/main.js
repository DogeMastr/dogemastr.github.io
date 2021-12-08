// countdown page
var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 1;
var uiscale = 1;
<<<<<<< HEAD
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
=======
>>>>>>> 8fbdc72866be9f53bbb09158a0a2db8560d6167a
function setup(){
  createCanvas(windowWidth - 20, windowHeight - 20);
  calculateTime();
}

function drawLandscape(){
  background(255);
  textSize(uiscale*300);
  textAlign(CENTER, CENTER);
  text(days + ":" + hours + ":" + minutes + ":" + seconds, width/2, height/2);
  textSize(uiscale*70);
  text("Days", width/6, height/2 + height/6);
  text("Hours", width/6 * 2.3, height/2 + height/6);
  text("Minutes", width/6 * 3.65, height/2 + height/6);
  text("Seconds", width/6 * 5, height/2 + height/6);

  text("Counting down to: December 22nd 4pm", width/2, height/10);
}

function drawPortrait(){
  background(255);
  textSize(uiscale*30);
  text("Counting down to: December 22nd 4pm", width/12, height/10);
  textAlign(LEFT);
  textSize(uiscale*90);
  text("Days: "+ days, width/12, height/6 *2);
  text("Hours: "+ hours, width/12, height/6 * 3);
  text("Minutes: "+ minutes, width/12, height/6 * 4);
  text("Seconds: "+ seconds, width/12, height/6* 5);

}

function draw(){
  calculateTime();
<<<<<<< HEAD
  if(width < height || isMobile){
=======
  if(width < height){
>>>>>>> 8fbdc72866be9f53bbb09158a0a2db8560d6167a
    drawPortrait();
    uiscale = map(height, 0, 1080, 0, 1);
  } else {
    drawLandscape();
    uiscale = map(width, 0, 1920, 0, 1);
  }
}
var unixTimeStamp = 1640188800;
function calculateTime(){
  const unixTime = Math.floor(Date.now() / 1000);
  var unixDifference = unixTimeStamp - unixTime;
  days = Math.floor(unixDifference / 86400);
  hours = Math.floor((unixDifference / 3600) - days*24);
  minutes = Math.floor((unixDifference / 60) - days*24*60 - hours*60);
  seconds = Math.floor((unixDifference / 1) - days*24*60*60 - hours*60*60 - minutes*60);
  // console.log(days);
}

window.addEventListener('resize', function(event) {
    setup();
}, true);
