function setup(){
  initLocalStorage();
  createCanvas(screen.width, screen.height);
}

function preload(){
  profileImg = loadImage("data/floppa.png");
}

function draw(){
  background(255);
  runHeader();
  runFooter();

  runContent();

  bMousePressed(); //run this last
}

function runContent(){
  image(profileImg, width - 500, 170);
  fill(0);
  textAlign(LEFT);
  textSize(40);
  text("About Me", 30, 170);
  textSize(30);
  text("Yooo its me Bob, I'm big time and I make games", 30, 210);
  text("I'm currently working on some big stuff, look forward to it!",30,250);


  //corruption level timer
  ellipse(400,500,300);
  fill(255);
  ellipse(400,500,250);
  strokeWeight(0);
  rect(400,500,200,200);
  strokeWeight(1);
  fill(0);
  ellipse(400,500,150);

  fill(230);
  text("Find my keys, Open the gates, Save the world.", 30, 850);
  //gray key#
  if(!getItem("greyKeyCollected")){
    fill(108, 115, 139);
    ellipse(700,850,50);
  } else {
    fill(49, 52, 63);
    ellipse(700,850,50);
  }
  if(dist( 700,850, mouseX, mouseY) < 25){
    console.log(getItem("greyKeyCollected"));
    if(bMousePressed()){
      storeItem("greyKeyCollected", true);
    }
  }


  translate(400,500);
  for (i = 0; i < 5; i++){
    currentRotation = (270/10)*i;
    rotate(currentRotation);
    stroke(255,20*i,0);
    strokeWeight(5);
    line(0,0, 150, 0);
    strokeWeight(1);
    stroke(255,0);
  }
  rotate(0);
}
