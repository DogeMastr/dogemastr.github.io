function setup(){
  initLocalStorage();
  createCanvas(screen.width, screen.height + 400);

  initLoop();
}

function draw(){
  background(255);
  runHeader();
  runFooter();

  runContent();

  bMousePressed(); //run this last
}

function runContent(){
  textAlign(LEFT);
  // fill(0,0,255);
  textSize(30);
  text("Yoooo this is where you can be better at the games I made than me", 30, 150);

  loopKey();
  fill(0);
  textSize(40);
  text("The Loop", 30, 220);
  textSize(30);
  text("This is like my 'Hello World' for when I learn something new this is the first thing I make in it!", 30, 260);
  theLoop(30, 270);
  textSize(40);
  text("Tid bits about The Loop:", 1100, 80);
  textSize(30);
  text("The first version I made was in 3 days!", 1100, 120);
  text("I have since updated that version with cool features and a hard mode", 1100, 160);
  text("Its loosly based off of a mini game in Terry Cavanagh's VVVVVV", 1100, 200);
}



let orangeKeyUnlock = false;
let keyList = [];
let loopWidth = 1000;
let loopHeight = 400;
let score = 0;
let loopHighscore = 0;
let squareList = [];
let timer = 0;
let gameover = false;
let squareGap = -75;
let squarePos = 74.5;
function initLoop(){
  if(getItem("loopHighScoreKey") == null){
    storeItem("loopHighScoreKey", 1584);
  }
  loopHighscore = localStorage.getItem("loopHighScoreKey");
  loopPlayer = new LoopPlayer();
  score = 0;
  gameover = false;
  squareList = [];
}

function theLoop(x, y){
  translate(x, y);
  fill(75);
  rect(0,0,loopWidth,loopHeight+2);
  if(!gameover){
    score++;
    timer++;
    runSquares();
    loopPlayer.run();

    if (timer > 60) { //larger the number the easier the game is
      sendSquares();
      timer = 0;
    }
    strokeWeight(0);
    fill(255);
    rect(loopWidth,-3,loopWidth,loopHeight + 30);
    strokeWeight(1);
    if(score > loopHighscore) {
      loopHighscore = score;
      orangeKeyUnlock = true;
    }
  } else {
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("You lose!", loopWidth/2, loopHeight/2 - 60);
    text("Your score was: " + score, loopWidth/2, loopHeight/2);
    text("press R to try again!", loopWidth/2, loopHeight/2 + 60);
    if(keyList.includes('r')){
      initLoop();
    }
  }
  fill(0);
  textAlign(LEFT);
  text("Your Score: " + score, 10 , loopHeight + 40);
  text("High Score: " + loopHighscore, loopWidth - 300 , loopHeight + 40);
  if(score >= loopHighscore) {
    storeItem("loopHighScoreKey", loopHighscore);
  }
}

class LoopPlayer {
  constructor() {
    this.x = 400;
    this.y = 0;
    this.xSpeed = 10;
    this.ySpeed = 10;
    this.pWidth = 30;
  }

  run() {
    this.display();
    this.move();
  }

  display() {
    fill(255);

    rect(this.x, this.y, this.pWidth, this.pWidth);
    //image(pSpriteL, this.x, this.y, this.pWidth, this.pWidth);
  }
  move() {
    if (keyList.includes('a')) {
      this.x -= this.xSpeed;
    }
    if (keyList.includes('d')) {
      this.x += this.xSpeed;
    }
    //bouncing on the top and bottom of the screen:
    if (this.y > loopHeight - this.pWidth || this.y < 0) {
      this.ySpeed = this.ySpeed * -1;
    }
    this.y += this.ySpeed;
    //loopingd
    if (this.x > loopWidth - this.pWidth) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = loopWidth - this.pWidth;
    }
  }
}

function keyTyped() {
	if (!keyList.includes(key)) {
		keyList.push(key);
	}
}

function keyReleased() {
	if (keyList.includes(key)) {
		var i = keyList.indexOf(key);
		if (i != -1) {
			keyList.splice(i, 1);
		}
	}
}

class Square {
	constructor(_sqX, _sqY, _speed) {
		this.sqX = _sqX;
		this.sqY = _sqY;
		this.speed = _speed;
		this.sWidth = 30;
	}

	run() {
		this.display();
		this.move();
	}

	display() {
		fill(255, 56, 103);
		rect(this.sqX, this.sqY, this.sWidth, this.sWidth);
	}
	move() {
		this.sqX = this.sqX + this.speed;
	}
	outOfBounds() {
		if (this.sqX > loopWidth + this.sWidth + 600) {
			return true;
		} else if (this.sqX < -600 - this.sWidth) {
			return true;
		} else {
			return false;
		}
	}
	checkCollision(checkingPlayer) {
		if (checkingPlayer.x < this.sqX + this.sWidth) {
			if (checkingPlayer.x + checkingPlayer.pWidth > this.sqX) {
				if (checkingPlayer.y < this.sqY + this.sWidth) {
					if (checkingPlayer.y + checkingPlayer.pWidth > this.sqY) {
						return true;
					}
				}
			}
		}
		return false;
	}
}

function runSquares() {
	for (i = squareList.length - 1; i > 0; i--) {
		squareList[i].run();
		if (squareList[i].outOfBounds() == true) {
			squareList.splice(i, 1);
		} else if (squareList[i].checkCollision(loopPlayer) == true) {
			squareList.splice(i, 1);
			//gameover!
			gameover = true;
		}
	}
}

let pvFM = 1;
function sendSquares() {
	let formationNo = Math.floor(Math.random() * 23);
	if (formationNo == pvFM) { //if you get the same pattern twice in a row it rolls again (ala next peice nes tetris)
		formationNo = Math.floor(Math.random() * 23);
	}
  pvFM = formationNo;

	switch (formationNo) {
		case -1: //example case
			squareList.push(new Square(squareGap * 1, squarePos * 0, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 1, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 2, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 3, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 4, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 5, 10));
			break;
		case 0: //top gap leaning right going right
			squareList.push(new Square(squareGap * 1, squarePos * 2, 10));
			squareList.push(new Square(squareGap * 2, squarePos * 3, 10));
			squareList.push(new Square(squareGap * 3, squarePos * 4, 10));
			squareList.push(new Square(squareGap * 4, squarePos * 5, 10));
			break;
		case 1: //top gap leaning left going right
			squareList.push(new Square(squareGap * 4, squarePos * 2, 10));
			squareList.push(new Square(squareGap * 3, squarePos * 3, 10));
			squareList.push(new Square(squareGap * 2, squarePos * 4, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 5, 10));
			break;
		case 2: //bottom gap leaning right going right
			squareList.push(new Square(squareGap * 1, squarePos * 0, 10));
			squareList.push(new Square(squareGap * 2, squarePos * 1, 10));
			squareList.push(new Square(squareGap * 3, squarePos * 2, 10));
			squareList.push(new Square(squareGap * 4, squarePos * 3, 10));
			break;
		case 3: //bottom gap leaning left going right
			squareList.push(new Square(squareGap * 4, squarePos * 0, 10));
			squareList.push(new Square(squareGap * 3, squarePos * 1, 10));
			squareList.push(new Square(squareGap * 2, squarePos * 2, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 3, 10));
			break;
		case 4: //middle gap leaning left going right
			squareList.push(new Square(squareGap * 1, squarePos * 0, 10));
			squareList.push(new Square(squareGap * 2, squarePos * 1, 10));
			squareList.push(new Square(squareGap * 5, squarePos * 4, 10));
			squareList.push(new Square(squareGap * 6, squarePos * 5, 10));
			break;
		case 5: //middle gap leaning right going right
			squareList.push(new Square(squareGap * 6, squarePos * 0, 10));
			squareList.push(new Square(squareGap * 5, squarePos * 1, 10));
			squareList.push(new Square(squareGap * 2, squarePos * 4, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 5, 10));
			break;
		case 6: //big gap going right
			squareList.push(new Square(squareGap * 1, squarePos * 0, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 5, 10));
			break;
		case 7: //medium gap going right
			squareList.push(new Square(squareGap * 1, squarePos * 1, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 4, 10));
			break;
		case 8: //small gap going right
			squareList.push(new Square(squareGap * 1, squarePos * 2, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 3, 10));
			break;
		case 9: //classic going right
			squareList.push(new Square(squareGap * 1, squarePos * 2, 10));
			squareList.push(new Square(squareGap * 1, squarePos * 3, 10));
			squareList.push(new Square(squareGap * 1.5, squarePos * 1, 10));
			squareList.push(new Square(squareGap * 1.5, squarePos * 4, 10));
			squareList.push(new Square(squareGap * 2, squarePos * 2, 10));
			squareList.push(new Square(squareGap * 2, squarePos * 3, 10));
			break;
		case 10: //top gap leaning left going left
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * 3, -10));
			squareList.push(new Square(squareGap * -3 + loopWidth, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -4 + loopWidth, squarePos * 5, -10));
			break;
		case 11: //top gap leaning right going left
			squareList.push(new Square(squareGap * -4 + loopWidth, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -3 + loopWidth, squarePos * 3, -10));
			squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 5, -10));
			break;
		case 12: //bottom gap leaning left going left
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -3 + loopWidth, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -4 + loopWidth, squarePos * 3, -10));
			break;
		case 13: //bottom gap leaning right going left
			squareList.push(new Square(squareGap * -4 + loopWidth, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -3 + loopWidth, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 3, -10));
			break;
		case 14: //middle gap leaning right going left
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -5 + loopWidth, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -6 + loopWidth, squarePos * 5, -10));
			break;
		case 15: //middle gap leaning left going left
			squareList.push(new Square(squareGap * -6 + loopWidth, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -5 + loopWidth, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 5, -10));
			break;
		case 16: //big gap going left
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 5, -10));
			break;
		case 17: //medium gap going left
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 4, -10));
			break;
		case 18: //small gap going left
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 3, -10));
			break;
		case 19: //classic going left
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * 3, -10));
			squareList.push(new Square(squareGap * -1.5 + loopWidth, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -1.5 + loopWidth, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * 3, -10));
			break;
		case 20: //random 2
			i = Math.floor(Math.random() * 2);
			if (i > 1) {
				squareList.push(new Square(squareGap * 1, squarePos * Math.floor(Math.random() * 5), 10));
				squareList.push(new Square(squareGap * 2, squarePos * Math.floor(Math.random() * 5), 10));
			} else {
				squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * Math.floor(Math.random() * 5), -10));
			}
			break;
		case 21: //random 3
			i = Math.floor(Math.random() * 2);
			if (i > 1) {
				squareList.push(new Square(squareGap * 1, squarePos * Math.floor(Math.random() * 5), 10));
				squareList.push(new Square(squareGap * 2, squarePos * Math.floor(Math.random() * 5), 10));
				squareList.push(new Square(squareGap * 3, squarePos * Math.floor(Math.random() * 5), 10));
			} else {
				squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -3 + loopWidth, squarePos * Math.floor(Math.random() * 5), -10));
			}
			break;
		case 22: //random 4
			i = Math.floor(Math.random() * 2);
			if (i > 1) {
				squareList.push(new Square(squareGap * 1, squarePos * Math.floor(Math.random() * 5), 10));
				squareList.push(new Square(squareGap * 2, squarePos * Math.floor(Math.random() * 5), 10));
				squareList.push(new Square(squareGap * 3, squarePos * Math.floor(Math.random() * 5), 10));
				squareList.push(new Square(squareGap * 4, squarePos * Math.floor(Math.random() * 5), 10));
			} else {
				squareList.push(new Square(squareGap * -1 + loopWidth, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -2 + loopWidth, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -3 + loopWidth, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -4 + loopWidth, squarePos * Math.floor(Math.random() * 5), -10));
			}
			break;
	} //random 5 could be a hard mode formation?
}

function loopKey(){
  if(orangeKeyUnlock){
    if(!getItem("orangeKeyCollected")){
      fill(253, 146, 19);
      ellipse(1200, 600,50);
    } else {
      fill(176, 101, 13);
      ellipse(1200, 600,50);
    }
    if(dist(1200, 600, mouseX, mouseY) < 50){
      if(bMousePressed()){
        storeItem("orangeKeyCollected", true);
      }
    }
  }
}
