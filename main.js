let nameplate;
let bMouseFirstFrame = false;
function bMousePressed() {
	if (mouseIsPressed && bMouseFirstFrame == false) {
		bMouseFirstFrame = true;
		return true;
	}
	if (!mouseIsPressed) {
		bMouseFirstFrame = false;
	}
	return false;
}
function preload() {
	nameplatelong = loadImage("data/nameplatelong.png");
	font = loadFont("data/AzeretMono.ttf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	initBackground();
}

function draw() {
	drawBackground();

	drawTitleCard();
	drawTheLoopInfoPlate(50, 250);
	drawBTBGInfoPlate(550, 250);
}

function drawTheLoopInfoPlate(x, y) {
	translate(x, y);
	if (mouseX - x > 0 && mouseX - x < 400 && mouseY - y > 0 && mouseY - y < 500) {
		fill(122, 177, 240);
		if (bMousePressed()) {
			window.location.href = "theLoop/index.html";
		}
	} else {
		fill(175);
	}
	stroke(120);
	strokeWeight(15);
	rect(0, 0, 400, 500, 15);

	fill(0);
	strokeWeight(0);
	textSize(70);
	text("The Loop", 15, 70);
	text("<<image>>", 15, 200);
	textSize(30);
	text("Click here to play", 25, 450);
	translate(-x, -y);
}

function drawBTBGInfoPlate(x, y) {
	translate(x, y);
	if (mouseX - x > 0 && mouseX - x < 400 && mouseY - y > 0 && mouseY - y < 500) {
		fill(122, 177, 240);
		if (bMousePressed()) {
			window.location.href = "btbg/index.html";
		}
	} else {
		fill(175);
	}
	stroke(120);
	strokeWeight(15);
	rect(0, 0, 400, 500, 15);

	fill(0);
	strokeWeight(0);
	textSize(70);
	text("BTBG", 15, 70);
	text("<<image>>", 15, 200);
	textSize(30);
	text("Click here to view", 25, 450);
	translate(-x, -y);
}

function drawTitleCard() {
	//my name will fade in from the top corner and look cool
	fill(255);
	image(nameplatelong, 50, 50);
	textSize(50);
	textFont(font);
	text("DogeMastr's Website of cool things", 140, 120);
	textSize(30);
	text("Currently under construction!", 140, 200);
}

// code to make the background look cool
let pointList = [];
let unit = 30;
let pointListSize;
let adj = unit / 2;
let mode = Math.floor(Math.random() * 3);

function initBackground() {
	createCanvas(window.innerWidth, window.innerHeight);
	noStroke();

	let widthCount = window.innerWidth / unit;
	let heightCount = window.innerHeight / unit;
	//pointListSize = widthCount * heightCount;
	let index = 0;
	for (let x = -1; x < widthCount + 1; x++) {
		for (let y = -1; y < heightCount + 1; y++) {
			pointList[index++] = new Point(x * unit + adj, y * unit + adj, unit * 1.5, unit / 5);
		}
	}
	pointListSize = index;
}

function getAngle(targetX, targetY, xPos, yPos) {
	//target and pos are two points on a line with an angle, this gets that angle
	let angleX = targetX - width / 2 - (xPos - width / 2);
	let angleY = targetY - height / 2 - (yPos - height / 2);

	return atan2(angleY, angleX);
}

function drawBackground() {
	noStroke();
	switch (mode) {
		case 0:
		default:
		case 2:
			background(0);
			break;
		case 1:
			background(175);
			break;
	}

	for (let i = 0; i < pointListSize; i++) {
		pointList[i].update();
		pointList[i].draw();
	}
}

class Point {
	constructor(x, y, distance, size) {
		this.givenX = x;
		this.givenY = y;
		this.x = x;
		this.y = y;
		this.distance = distance;
		this.size = size;

		this.adjX = 0;
		this.adjY = 0;

		this.colour = 0;
	}

	update() {
		switch (mode) {
			default:
			case 0:
				let angle = getAngle(this.givenX, this.givenY, mouseX, mouseY);
				this.x = this.givenX + (this.distance / 10) * cos(angle);
				this.y = this.givenY + (this.distance / 10) * sin(angle);
				break;
			case 1:
				this.size = dist(mouseX, mouseY, this.x, this.y);
				this.size = (this.size / dist(0, 0, width, height)) * 400;
				break;
			case 2:
				if (dist(mouseX, mouseY, this.x, this.y) < this.distance / 2) {
					this.colour = 175;
				}
				this.colour--;
				break;
		}
	}

	draw() {
		switch (mode) {
			default:
			case 0:
				fill(175);
				ellipse(this.x, this.y, this.size, this.size);
				break;
			case 1:
				fill(0);
				ellipse(this.x, this.y, this.size, this.size);
			case 2:
				fill(this.colour);
				ellipse(this.x, this.y, this.size, this.size);
		}
	}
}
