let keyList = [];

function setup() {
	createCanvas(700, 300);
	player1 = new Player();
}

function draw() {
	background(75);
	fill(30);
	rect(0, 0, 700, 200); //player stays in this box
	player1.show();
	player1.move();
	//console.log(keyList);
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
		this.xSpeed = 5;
		this.ySpeed = 5;
		this.pWidth = 15;
	}
	show() {
		fill(255);
		rect(this.x, this.y, this.pWidth, this.pWidth);
	}

	move() {
		if (keyList.includes("a")) {
			console.log("test");
			this.x -= this.xSpeed;
		}
		if (keyList.includes("d")) {
			this.x += this.xSpeed;
		}
		//bouncing on the top and bottom of the screen:
		if (this.y > 200 - this.pWidth || this.y < 0) {
			this.ySpeed = this.ySpeed * -1;
		}
		this.y += this.ySpeed;
		console.log(this.ySpeed);
		//looping
		if (this.x > width + this.pWidth) {
			this.x = 0 - this.pWidth;
		}
		if (this.x < 0 - this.pWidth) {
			this.x = width + this.pWidth;
		}
	}
}