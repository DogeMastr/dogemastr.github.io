let keyList = [];
let score = 0;
let squareList = [];
let timer = 0;
let hardMode = false;
let gameover = false;
let squareGap = -60;
let squarePos = 74.5;

let pSpriteL;
var highScore = 0;
var hardHighScore = 0;

function preLoad() {
	pSpriteL = loadImage("data\sprites\player left.png");
}

function setup() {

	if (typeof localStorage.getItem("highScoreKey") === undefined) {
		localStorage.setItem("highScoreKey", 0);
		console.log("Highscore Set to 0");
	}
	highScore = localStorage.getItem("highScoreKey");

	if (typeof localStorage.getItem("hardHighScoreKey") === undefined) {
		localStorage.setItem("hardHighScoreKey", 0);
		console.log("Hard Highscore Set to 0");
	}
	hardHighScore = localStorage.getItem("hardHighScoreKey");


	pSpriteL = loadImage("data/sprites/playerLeft.png");
	createCanvas(1400, 400);
	player1 = new Player();
	score = 0;
}

function draw() {
	if (gameover == false) {
		// background(3);
		clear();
		stroke(70);
		strokeWeight(10);
		line(0, window.height, window.width, window.height);
		line(0, 0, window.width, 0);
		strokeWeight(0);

		runSquares();
		player1.run();
		score++;
		timer++;

		//console.log(keyList);
		document.getElementById("scoreText").innerText = "Score: " + score;

		if (hardMode) {

			if (timer > 40) { //larger the number the easier the game is
				sendSquares();
				timer = 0;
			}

			if (score > hardHighScore) {
				hardHighScore = score;
			}
			document.getElementById("highScoreText").innerText = "Hard Mode High Score: " + hardHighScore;
		} else {

			if (timer > 70) { //larger the number the easier the game is
				sendSquares();
				timer = 0;
			}

			if (score > highScore) {
				highScore = score;
			}
			document.getElementById("highScoreText").innerText = "High Score: " + highScore;
		}


	} else {
		//in gamemover menu
		if (keyList.includes("r")) {
			reset();
		}
		if (keyList.includes("b")) {
			if (hardMode) {
				hardMode = false;
			} else {
				hardMode = true;
			}
			reset();
		}
	}
}

function runSquares() {
	for (i = squareList.length - 1; i > 0; i--) {
		squareList[i].run();
		if (squareList[i].outOfBounds() == true) {
			squareList.splice(i, 1);
		} else if (squareList[i].checkCollision(player1) == true) {
			squareList.splice(i, 1);
			//gameover!
			gameover = true;
		}
	}
}

let pvFN = -1; //previous formation

function sendSquares() {
	let formationNo = Math.floor(Math.random() * 23);
	if (formationNo == pvFN) {
		formationNo = Math.floor(Math.random() * 23);
	} else {
		pvFN = formationNo;
	}

	console.log(formationNo);

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
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -2 + window.width, squarePos * 3, -10));
			squareList.push(new Square(squareGap * -3 + window.width, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -4 + window.width, squarePos * 5, -10));
			break;
		case 11: //top gap leaning right going left
			squareList.push(new Square(squareGap * -4 + window.width, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -3 + window.width, squarePos * 3, -10));
			squareList.push(new Square(squareGap * -2 + window.width, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 5, -10));
			break;
		case 12: //bottom gap leaning left going left
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -2 + window.width, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -3 + window.width, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -4 + window.width, squarePos * 3, -10));
			break;
		case 13: //bottom gap leaning right going left
			squareList.push(new Square(squareGap * -4 + window.width, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -3 + window.width, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -2 + window.width, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 3, -10));
			break;
		case 14: //middle gap leaning right going left
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -2 + window.width, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -5 + window.width, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -6 + window.width, squarePos * 5, -10));
			break;
		case 15: //middle gap leaning left going left
			squareList.push(new Square(squareGap * -6 + window.width, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -5 + window.width, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -2 + window.width, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 5, -10));
			break;
		case 16: //big gap going left
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 0, -10));
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 5, -10));
			break;
		case 17: //medium gap going left
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 4, -10));
			break;
		case 18: //small gap going left
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 3, -10));
			break;
		case 19: //classic going left
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -1 + window.width, squarePos * 3, -10));
			squareList.push(new Square(squareGap * -1.5 + window.width, squarePos * 1, -10));
			squareList.push(new Square(squareGap * -1.5 + window.width, squarePos * 4, -10));
			squareList.push(new Square(squareGap * -2 + window.width, squarePos * 2, -10));
			squareList.push(new Square(squareGap * -2 + window.width, squarePos * 3, -10));
			break;
		case 20: //random 2
			i = Math.floor(Math.random() * 2);
			if (i > 1) {
				squareList.push(new Square(squareGap * 1, squarePos * Math.floor(Math.random() * 5), 10));
				squareList.push(new Square(squareGap * 2, squarePos * Math.floor(Math.random() * 5), 10));
			} else {
				squareList.push(new Square(squareGap * -1 + window.width, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -2 + window.width, squarePos * Math.floor(Math.random() * 5), -10));
			}
			break;
		case 21: //random 3
			i = Math.floor(Math.random() * 2);
			if (i > 1) {
				squareList.push(new Square(squareGap * 1, squarePos * Math.floor(Math.random() * 5), 10));
				squareList.push(new Square(squareGap * 2, squarePos * Math.floor(Math.random() * 5), 10));
				squareList.push(new Square(squareGap * 3, squarePos * Math.floor(Math.random() * 5), 10));
			} else {
				squareList.push(new Square(squareGap * -1 + window.width, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -2 + window.width, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -3 + window.width, squarePos * Math.floor(Math.random() * 5), -10));
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
				squareList.push(new Square(squareGap * -1 + window.width, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -2 + window.width, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -3 + window.width, squarePos * Math.floor(Math.random() * 5), -10));
				squareList.push(new Square(squareGap * -4 + window.width, squarePos * Math.floor(Math.random() * 5), -10));
			}
			break;
	} //random 5 could be a hard mode formation?
}

function reset() {
	//check highscores:
	localStorage.setItem("highScoreKey", highScore);
	localStorage.setItem("hardHighScoreKey", hardHighScore);

	//changing backgrounds
	if (hardMode) {
		document.getElementById("titleCard").src = "titleCard2.png";
		document.body.style.backgroundImage = "url('background2.png')";
	} else {
		document.getElementById("titleCard").src = "titleCard.png";
		document.body.style.backgroundImage = "url('background.png')";
	}

	//reset game
	player1 = new Player();
	score = 0;
	squareList = [];
	gameover = false;
	draw();
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

class Player {
	constructor() {
		this.x = window.width / 2;
		this.y = 0;
		this.xSpeed = 10;
		this.ySpeed = 10;
		this.pWidth = 30;
	}

	run() {
		this.show();
		this.move();
	}

	show() {
		fill(255);
		rect(this.x, this.y, this.pWidth, this.pWidth);
	}
	move() {
		if (keyList.includes("a")) {
			this.x -= this.xSpeed;
		}
		if (keyList.includes("d")) {
			this.x += this.xSpeed;
		}
		//bouncing on the top and bottom of the screen:
		if (this.y > window.height - this.pWidth || this.y < 0) {
			this.ySpeed = this.ySpeed * -1;
		}
		this.y += this.ySpeed;
		//looping
		if (this.x > width + this.pWidth) {
			this.x = 0 - this.pWidth;
		}
		if (this.x < 0 - this.pWidth) {
			this.x = width + this.pWidth;
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
		if (hardMode) {
			fill(203, 70, 220);
		} else {
			fill(255, 56, 103);
		}
		rect(this.sqX, this.sqY, this.sWidth, this.sWidth);
	}
	move() {
		this.sqX = this.sqX + this.speed;
	}
	outOfBounds() {
		if (this.sqX > window.width + this.sWidth + 600) {
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
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}