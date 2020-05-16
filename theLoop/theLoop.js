let keyList = [];
let score = 0;
let squareList = [];
let timer = 0;
let hardMode = false;
let invisMode = false;
let slowMode = false;
let gameover = false;
let squareGap = -75;
let squarePos = 74.5;

let pSpriteL;
var highScore = 0;
var hardHighScore = 0;

let pvFN = -1; //previous formation

let pause = true;
let kpress = false;

let controlList = ['a', 'd', 'r', 'p'];

let mouse1fPress = false;
// let leaderboardTxt;

function preload() {
	//leaderboardTxt = loadStrings('data/leaderboard/leaderboard.txt');
}

function setup() {

	if (typeof localStorage.getItem("highScoreKey") === undefined || localStorage.getItem("highScoreKey") == "null") {
		localStorage.setItem("highScoreKey", 0);
		console.log("Highscore Set to 0");
	}
	highScore = localStorage.getItem("highScoreKey");

	if (typeof localStorage.getItem("hardHighScoreKey") === undefined || localStorage.getItem("hardHighScoreKey") == "null") {
		localStorage.setItem("hardHighScoreKey", 0);
		console.log("Hard Highscore Set to 0");
	}
	hardHighScore = localStorage.getItem("hardHighScoreKey");

	var canvas = createCanvas(1400, 400);
	canvas.parent('game');
	updateHTML();
	player1 = new Player();
	score = 0;
	textAlign(CENTER, CENTER);

	pSpriteL = loadImage("data/sprites/playerLeft.png");

	//loadLeaderboard();
}

function draw() {

	if (keyList.includes(controlList[3]) && !kpress) {
		pause = !pause;
		kpress = true;
	} else if (!keyList.includes(controlList[3])) {
		kpress = false;
	}

	if (gameover == false) {

		if (pause) {
			clear();
			textSize(40);
			fill(255);
			text(controlList[0] + " - MOVE LEFT", window.width / 3, window.height / 5);
			text(controlList[1] + " - MOVE RIGHT", window.width / 3, window.height / 5 * 2);
			text(controlList[2] + " - RETRY", window.width / 3, window.height / 5 * 3);
			text(controlList[3] + " - START GAME", window.width / 3, window.height / 5 * 4);

			if (mouseX > (window.width / 3 * 2) - 200 && mouseX < (window.width / 3 * 2) + 200 && mouseY > window.height / 5 - 25 && mouseY < window.height / 5 + 25) {
				rectMode(CENTER);
				rect(window.width / 3 * 2, window.height / 5, 400, 50);
				rectMode(CORNER);
				fill(0);

				if (mouse1fPress) {
					input = prompt("Change the Move Left key from: " + controlList[0] + ", to:");
					if (input !== null) {
						controlList[0] = input.charAt(0);
					}
				}
			}
			text("CHANGE KEY", window.width / 3 * 2, window.height / 5);
			fill(255);

			if (mouseX > (window.width / 3 * 2) - 200 && mouseX < (window.width / 3 * 2) + 200 && mouseY > window.height / 5 * 2 - 25 && mouseY < window.height / 5 * 2 + 25) {
				rectMode(CENTER);
				rect(window.width / 3 * 2, window.height / 5 * 2, 400, 50);
				rectMode(CORNER);
				fill(0);

				if (mouse1fPress) {
					input = prompt("Change the Move Left key from: " + controlList[1] + ", to:");
					if (input !== null) {
						controlList[1] = input.charAt(0);
					}
				}
			}
			text("CHANGE KEY", window.width / 3 * 2, window.height / 5 * 2);
			fill(255);

			if (mouseX > (window.width / 3 * 2) - 200 && mouseX < (window.width / 3 * 2) + 200 && mouseY > window.height / 5 * 3 - 25 && mouseY < window.height / 5 * 3 + 25) {
				rectMode(CENTER);
				rect(window.width / 3 * 2, window.height / 5 * 3, 400, 50);
				rectMode(CORNER);
				fill(0);

				if (mouse1fPress) {
					input = prompt("Change the Move Left key from: " + controlList[2] + ", to:");
					if (input !== null) {
						controlList[2] = input.charAt(0);
					}
				}
			}
			text("CHANGE KEY", window.width / 3 * 2, window.height / 5 * 3);
			fill(255);

			if (mouseX > (window.width / 3 * 2) - 200 && mouseX < (window.width / 3 * 2) + 200 && mouseY > window.height / 5 * 4 - 25 && mouseY < window.height / 5 * 4 + 25) {
				rectMode(CENTER);
				rect(window.width / 3 * 2, window.height / 5 * 4, 400, 50);
				rectMode(CORNER);
				fill(0);

				if (mouse1fPress) {
					input = prompt("Change the Move Left key from: " + controlList[3] + ", to:");
					if (input !== null) {
						controlList[3] = input.charAt(0);
					}
				}
			}
			text("CHANGE KEY", window.width / 3 * 2, window.height / 5 * 4);
			fill(255);

		} else {
			rectMode(CORNER);
			if (!invisMode) {
				clear();
				stroke(70);
				strokeWeight(10);
				line(0, window.height, window.width, window.height);
				line(0, 0, window.width, 0);
				strokeWeight(0);
			} else {
				strokeWeight(1);
			}
			runSquares();
			player1.run();
			score++;
			timer++;
			updateHTML();
		}
	} else {
		//in gamemover menu
		if (keyList.includes(controlList[2])) {
			reset();
		}
		// 	if (keyList.includes("v")) {
		// 		invisMode = !invisMode;
		// 		clear();
		// 		reset();
		// 	}
		// 	if (keyList.includes("b")) {
		// 		hardMode = !hardMode;
		// 		reset();
		// 	}
		// 	if (keyList.includes("s")) {
		// 		slowMode = !slowMode;
		// 		reset();
		// 	}
	}
}

let mouse1frame = true; //if true the user is allowed to click

function mousePressed() {
	if (mouse1frame == true) {
		mouse1fPress = true;
		console.log("clicked");
	} else {
		mouse1fPress = false;
	}
}

function mouseReleased() {
	mouse1frame = true;
	mouse1fPress = false;
	console.log("Released");
}

function updateHTML() {
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
			//checkLeaderboard();
		}
	}
}

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
		slowMode = false; //no slowmode in hard mode :)
		document.getElementById("titleCard").src = "titleCard2.png";
		document.body.style.backgroundImage = "url('background2.png')";
	} else {
		document.getElementById("titleCard").src = "titleCard.png";
		document.body.style.backgroundImage = "url('background.png')";
	}

	if (slowMode) {
		frameRate(30);
	} else {
		frameRate(60);
	}

	//reset game
	gameover = false;
	player1 = new Player();
	score = 0;
	squareList = [];
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
		this.display();
		this.move();
	}

	display() {
		fill(255);

		rect(this.x, this.y, this.pWidth, this.pWidth);
		//image(pSpriteL, this.x, this.y, this.pWidth, this.pWidth);
	}
	move() {
		if (keyList.includes(controlList[0])) {
			this.x -= this.xSpeed;
		}
		if (keyList.includes(controlList[1])) {
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
					}
				}
			}
		}
		return false;
	}
}

/*
	Leaderboard stuff

 	saved in a text file

 	Name ^Score


let splitLeaderboard;
let leaderboardNames = [];
let leaderboardScores = [];

function loadLeaderboard() {

	for (i = 0; i < 5; i++) {
		let splitLeaderboard = split(leaderboardTxt[i], '^');
		console.log(splitLeaderboard);
		leaderboardNames[i] = splitLeaderboard[0];
		leaderboardScores[i] = splitLeaderboard[1];
	}

	document.getElementById("lb0").innerText = "1." + leaderboardNames[0] + ":" + leaderboardScores[0];
	document.getElementById("lb1").innerText = "2." + leaderboardNames[1] + ":" + leaderboardScores[1];
	document.getElementById("lb2").innerText = "3." + leaderboardNames[2] + ":" + leaderboardScores[2];
	document.getElementById("lb3").innerText = "4." + leaderboardNames[3] + ":" + leaderboardScores[3];
	document.getElementById("lb4").innerText = "5." + leaderboardNames[4] + ":" + leaderboardScores[4];
}

function checkLeaderboard() {
	//this will check your score and add it to the leaderboard if its in the top 5

	if (score > leaderboardScores[0]) { //if its the new top score
		currentName = prompt("You just got 1st place on the Leaderboard! Enter your name");
		leaderboardNames[0] = currentName;
		leaderboardScores[0] = score;
	} else if (score > leaderboardScores[1]) {
		currentName = prompt("You just got 2nd place on the Leaderboard! Enter your name");
		leaderboardNames[1] = currentName;
		leaderboardScores[1] = score;
	} else if (score > leaderboardScores[2]) {
		currentName = prompt("You just got 3rd place on the Leaderboard! Enter your name");
		leaderboardNames[2] = currentName;
		leaderboardScores[2] = score;
	} else if (score > leaderboardScores[3]) {
		currentName = prompt("You just got 4th place on the Leaderboard! Enter your name");
		leaderboardNames[3] = currentName;
		leaderboardScores[3] = score;
	} else if (score > leaderboardScores[4]) {
		currentName = prompt("You just got 5th place on the Leaderboard! Enter your name");
		leaderboardNames[4] = currentName;
		leaderboardScores[4] = score;
	}

	saveLeaderboard();
}

function saveLeaderboard() {
	for (i = 0; i < 5; i++) {
		leaderboardTxt[i] = leaderboardNames[i] + "^:" + leaderboardScores[i];
	}
	//leaderboardTxt = saveStrings("data/leaderboard/leaderboard.txt");
}

*/