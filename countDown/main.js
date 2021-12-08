// countdown page
var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 1;
function setup(){
  createCanvas(windowWidth, windowHeight);
  calculateTime();
}


function draw(){
  calculateTime();
  background(255);
  textSize(300);
  textAlign(CENTER, CENTER);
  text(days + ":" + hours + ":" + minutes + ":" + seconds, width/2, height/2);
  textSize(70);
  text("Days", width/6, height/2 + height/6);
  text("Hours", width/6 * 2.3, height/2 + height/6);
  text("Minutes", width/6 * 3.65, height/2 + height/6);
  text("Seconds", width/6 * 5, height/2 + height/6);

  text("Counting down to: December 22nd 4pm", width/2, height/10);
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
