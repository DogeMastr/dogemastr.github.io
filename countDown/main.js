// countdown page
var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 1;
var uiscale = 1;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var darkMode = true;
var cBacking;
var cText;

let bulbWhite;
let bulbBlack;
let bulbCurrent;

function preload(){
  bulbWhite = loadImage('data/bulbWhite.png');
  bulbBlack = loadImage('data/bulbBlack.png');
}

function setup(){
  imageMode(CENTER);
  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  runDarkMode();
  createCanvas(windowWidth, windowHeight + 50);
  calculateTime();
  unloadScrollBars();
  noStroke();
}

function runDarkMode(){
  if(darkMode){
    cText = color(197, 201, 221);
    cBacking = color(38, 40, 49);
    bulbCurrent = bulbBlack;
  } else {
    cText = color(80, 80, 80);
    cBacking = color(220, 218, 224);
    bulbCurrent = bulbWhite;
  }
}

function darkModeButton(x, y, size){
  if(darkMode){
    fill(197, 201, 221);
  } else {
    fill(80, 80, 80);
  }
  ellipse(x, y, size);
  image(bulbCurrent, x, y, size/1.4, size/1.4);
  if(dist(x, y, mouseX, mouseY) < size/2){
    if(bMousePressed()){
      darkMode = !darkMode;
    }
  }
}

function drawLandscape(){
  background(cBacking);
  textSize(uiscale*300);
  textAlign(CENTER, CENTER);
  fill(cText);
  text(formatTimeToString(days) + ":" + formatTimeToString(hours) + ":" + formatTimeToString(minutes) + ":" + formatTimeToString(seconds), width/2, height/2);
  textSize(uiscale*70);
  text("Days", width/6, height/2 + height/6);
  text("Hours", width/6 * 2.3, height/2 + height/6);
  text("Minutes", width/6 * 3.65, height/2 + height/6);
  text("Seconds", width/6 * 5, height/2 + height/6);

  text("Counting down to: December 22nd 4pm", width/2, height/10);

  darkModeButton(width - width/15, height/10, uiscale*70);
}

function drawPortrait(){
  background(cBacking);
  fill(cText);
  textSize(uiscale*50);
  text("Counting down to:", width/12, height/10);
  text("December 22nd 4pm", width/12, height/10 * 2);
  textAlign(LEFT);
  textSize(uiscale*90);
  text("Days: "+ days, width/12, height/6 *2);
  text("Hours: "+ hours, width/12, height/6 * 3);
  text("Minutes: "+ minutes, width/12, height/6 * 4);
  text("Seconds: "+ seconds, width/12, height/6* 5);

  darkModeButton(width - width/8, height/10, uiscale*80);
}

function draw(){
  runDarkMode();
  calculateTime();
  if(width < height || isMobile){
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

let bMouseFirstFrame = false;
function bMousePressed(){
  if(mouseIsPressed && bMouseFirstFrame == false){
    bMouseFirstFrame = true;
    return true;
  }
  if(!mouseIsPressed){
    bMouseFirstFrame = false;
  }
  return false;
}

function formatTimeToString(n){
    return n > 9 ? "" + n: "0" + n;
}

function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie only
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}

window.addEventListener('resize', function() {
    setup();
}, true);
