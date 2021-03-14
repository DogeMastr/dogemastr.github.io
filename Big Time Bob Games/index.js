let profileImg;


function preload(){
  profileImg = loadImage("data/floppa.png");
}

function setup() {

  initLocalStorage();

  // put setup code here
  createCanvas(screen.width,screen.height);
  profileImg.resize(220,220);
  imageMode(CENTER);
}

function draw() {
  // put drawing code here
  background(255);

  runHeader();
  runProfile();
  runContent();
  runFooter();
  // if(mouseIsPressed){ // will lag the site?
  //   console.log(mouseY);
  //   console.log(mouseX);
  // }

  bMousePressed(); //must run at the end
}

let profileX = screen.width/15;
let profileY = 250;
function runProfile(){
  fill(0);
  rect(0,100,screen.width,300); //replace with background image
  fill(255);
  textAlign(LEFT);
  textSize(50);
  text("It's me!", 330,230);
  text("I'm Bob from Big Time Bob Games", 330,300);

  if(!getItem("blueKeyCollected")){
    fill(14,255,255);
    ellipse(screen.width/15,250,50);
  } else {
    fill(8,110,110);
    ellipse(screen.width/15,250,50);
  }
  if(dist(profileX, profileY, screen.width/15, 250) > 135){
    if(dist( screen.width/15, 250, mouseX, mouseY) < 25){
      if(bMousePressed()){
        storeItem("blueKeyCollected", true);
      }
    }
  }

  image(profileImg, profileX, profileY); //replace with profile picture
  if(dist(profileX, profileY, mouseX, mouseY) < 110){
    if(mouseIsPressed){
      profileX = profileX + movedX;
      profileY = profileY + movedY;
    }
  }

}

function runContent(){
  fill(0);
  textSize(50);
  text("Welcome to my website!", 30, 470);
  textSize(30);
  text("I made this site to put all of my small projects into one place", 30, 520);
  text("You can check out some of my stuff on the portfolio page!", 30, 560);
  text("~~Embed video here~~", 30,620);
}
