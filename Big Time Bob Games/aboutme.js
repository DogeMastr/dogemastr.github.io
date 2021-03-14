function setup(){
  initLocalStorage();
  createCanvas(screen.width, screen.height);
}

function draw(){
  background(255);
  runHeader();
  runFooter();

  bMousePressed(); //run this last
}
