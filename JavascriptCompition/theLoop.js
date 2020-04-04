let keyList = [];
let score = 0;
let squareList = [];
let timer = 0;
let difficulty = 1;
let gameover = false;
let squareGap = -60;
let squarePos = 74.5;

if (typeof localStorage.getItem("highScoreKey") === undefined) {
	localStorage.setItem("highScoreKey", 0);
	console.log("Highscore Set to 0")
}
var highScore = localStorage.getItem("highScoreKey");


function setup() {
	createCanvas(1400, 400);
	player1 = new Player();
	score = 0;
}

function draw() {
	if (gameover == false) {
		background(30);

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

		player1.run();
		score++;
		timer++;
		if (timer > 60) { //larger the number the easier the game is
			sendSquares();
			timer = 0;
		}
		if (score > highScore) {
			highScore = score;
		}

		//console.log(keyList);
		document.getElementById("scoreText").innerText = "Score: " + score;
		document.getElementById("highScoreText").innerText = "High Score: " + highScore;


	} else {
		//in gamemover menu
		if (keyList.includes("r")) {

			reset();
		}
	}
}

function sendSquares() {
	let formationNo = Math.floor(Math.random() * 20);
	switch (formationNo) {
		case -1:
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
	}
}

function reset() {
	//check highscores:
	localStorage.setItem("highScoreKey", highScore);

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
		fill(255, 0, 0);
		rect(this.sqX, this.sqY, this.sWidth, this.sWidth);
	}
	move() {
		this.sqX = this.sqX + this.speed;
	}
	outOfBounds() {
		if (this.sqX > window.width + this.sWidth + 300) {
			console.log("outOfBounds");
			return true;
		} else if (this.sqX < -300 - this.sWidth) {
			console.log("outOfBounds");
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

						console.log("checkCollision");
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