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

function runHeader(){
  fill(255);
  rect(0,0,width,100);
  //logo?
  textSize(30);
  textAlign(CENTER);
  fill(0);

  //home
  if(mouseX > 130 && mouseX < 190 && mouseY < 100){
    fill(122, 177, 240);
    if(bMousePressed()){
      window.location.href = 'index.html';
    }
  } else {
    fill(0);
  }
  text("Home",160,55);

  //portfolio
  if(mouseX > 310 && mouseX < 410 && mouseY < 100){
    fill(122, 177, 240);
    if(bMousePressed()){
      window.location.href = 'portfolio.html';
    }
  } else {
    fill(0);
  }
  text("Portfolio",360,55);

  //about me
  if(mouseX > 500 && mouseX < 620 && mouseY < 100){
    fill(122, 177, 240);
    if(bMousePressed()){
      window.location.href = 'aboutme.html';
    }
  } else {
    fill(0);
  }
  text("About Me",560,55);

  //faq
  if(mouseX > 710 && mouseX < 810 && mouseY < 100){
    fill(122, 177, 240);
    if(bMousePressed()){
      console.log("what");
      window.location.href = 'faq.html';
    }
  } else {
    fill(0);
  }
  text("FAQ",760,55);
}

function runFooter(){
  fill(0);
  rect(0, height - 150, width, 150);

  //empty key slots
  fill(50);

  //red
  if(getItem("redKeyCollected")){
    fill(14,255,255);
  } else {
    fill(50);
  }
  ellipse(300,height - 75, 50);

  //green
  if(getItem("greenKeyCollected")){
    fill(14,255,255);
  } else {
    fill(50);
  }
  ellipse(370,height - 75, 50);

  //blue
  if(getItem("blueKeyCollected")){
    fill(14,255,255);
  } else {
    fill(50);
  }
  ellipse(440,height - 75, 50);

  //purple
  if(getItem("purpleKeyCollected")){
    fill(14,255,255);
  } else {
    fill(50);
  }
  ellipse(510,height - 75, 50);

  //orange
  if(getItem("orangeKeyCollected")){
    fill(253, 146, 19);
  } else {
    fill(50);
  }
  ellipse(580,height - 75, 50);

  //grey
  if(getItem("greyKeyCollected")){
    fill(108, 115, 139);
  } else {
    fill(50);
  }
  ellipse(650,height - 75, 50);
}

function initLocalStorage(){
  //init localstorage vars
  if(getItem("redKeyCollected") == null){
    storeItem("redKeyCollected", false);
  }
  if(getItem("greenKeyCollected") == null){
    storeItem("greenKeyCollected", false);
  }
  if(getItem("blueKeyCollected") == null){
    storeItem("blueKeyCollected", false);
  }
  if(getItem("purpleKeyCollected") == null){
    storeItem("purpleKeyCollected", false);
  }
  if(getItem("orangeKeyCollected") == null){
    storeItem("orangeKeyCollected", false);
  }
  if(getItem("greyKeyCollected") == null){
    storeItem("greyKeyCollected", false);
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
