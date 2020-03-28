let keyList = [];
let score = 0;
let squareList = [];

let gameover = false;

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
		//console.log(keyList);
		document.getElementById("scoreText").innerText = "Score: " + score;

		if (keyList.includes(" ")) {
			squareList.push(new Square(-90, 185, 10))
		}
	} else {
		//in gamemover menu
		if (keyList.includes("r")) {

			reset();
		}
	}
}

function reset() {
	//check highscores:

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
		this.x = 0;
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