/*
    Josh Wynne, N00221586
    11/11/2022
    CA Iteration 2

	Click and drag the assets on the left side to make your snowman!
	Hold Z while holding an object to rotate it

    plans:
        DONE!!! - Make a way to remove assets

        Ajustable Snowman
            Sliders!!!!!
*/

let snowmanButtonArray = [];
let masterSnowmanButton;

let snowmanCarrotArray = [];
let masterSnowmanCarrot;

let snowmanStickArray = [];
let masterSnowmanStick;

let theBin;

let snowflakeBackground;

let mouseHolding = false; // used to make sure you only pick up one asset

let groundlevel;
// snowman vars (radius):
let snowmanTop;
let snowmanMid;
let snowmanBot;
let overlapping = 0.9;

function setup() {
	createCanvas(innerWidth, innerHeight);
	groundlevel = height * 0.9;

	snowflakeBackground = new SnowflakeManager();

	masterSnowmanButton = new SnowmanButton(100, 100, true, snowmanButtonArray);
	masterSnowmanCarrot = new SnowmanCarrot(100, 200, true, snowmanCarrotArray);
	masterSnowmanStick = new SnowmanStick(100, 300, true, snowmanStickArray);
	theBin = new AssetBin(60, height - 200, 50);

	//snowman sliders
	snowmanTop = createSlider(20, 500, 150);
	snowmanTop.position(width - width / 6, 30);
	snowmanMid = createSlider(20, 500, 200);
	snowmanMid.position(width - width / 6, 60);
	snowmanBot = createSlider(20, 500, 300);
	snowmanBot.position(width - width / 6, 90);
}

function draw() {
	background(117, 217, 255);
	snowflakeBackground.run();

	// generate better mouse inputs (first frame boolean and held boolean)
	runBMousePressed();
	
	// draw ground
	fill(230);
	ellipse(width / 2, height - height / 15, width + width / 5, height / 3);
	
	drawSnowmanTemplate();
	
	theBin.run();
	
	// run master assets
	masterSnowmanButton.masterRun();
	masterSnowmanCarrot.masterRun();
	masterSnowmanStick.masterRun();
	
	if (!bMouseHeld) {
		// fixes Z fighting so that you can only pick up one object at a time
		mouseHolding = false;
	}

	showText();
}

function showText() {
	//This shows the tool text so the user knows what everything is
	textSize(20);
	fill(0);
	textAlign(RIGHT);
	text("Top snowball: ", width - width / 6, 45);
	text("Middle snowball: ", width - width / 6, 75);
	text("Bottom snowball: ", width - width / 6, 105);

	textAlign(LEFT);
	text("Bin", 60, height - 210);

	text("Click and drag the objects to the snowman!", 60, 30);
	text("Press Z&X while holding to rotate & A&S to change the size", 60, 60);
}

function drawSnowmanTemplate() {
	// I wanna try make a connected stroke between the circles?
	fill(255);
	noStroke();
	// ellipse(width / 2, height / 3, 200);
	// ellipse(width / 2, height / 2, 250);
	// ellipse(width / 2, (height / 3) * 2, 350);

	/* 
		to draw each circle above eachother:
			anchor the bottom circle to the ground
			anchor the middle to the bottom
			anchor the top to the middle

			have ajustable sliders for each
	*/
	// due to the size of the lines an autoformatter might ajust these to multiple :)
	ellipse(width / 2, groundlevel - snowmanBot.value() / 2, snowmanBot.value());
	ellipse(width / 2, groundlevel - snowmanBot.value() * overlapping - snowmanMid.value() / 2, snowmanMid.value());
	ellipse(width / 2, groundlevel - snowmanBot.value() * overlapping - snowmanMid.value() * overlapping - snowmanTop.value() / 2, snowmanTop.value());
}

class Asset {
	/*
        an object!
        a click and drag asset, make a child class with a display()

        dragging uses a circle hitbox with the size var as radius

        if the asset is a master it cannot be dragged
        in child classes the master can create a new asset as it needs a custom array
    */
	constructor(x, y, isMaster = false) {
		this.x = x;
		this.y = y;
		this.isMaster = isMaster;
		this.init();
	}

	// made for debugging with child classes
	init() {
		this.size = 30;
		this.held = false;
		this.xOffset = 0;
		this.yOffset = 0;
		this.rotation = 0;
	}

	run() {
		this.display();
		this.drag();
		this.control();
	}

	// default display function
	display() {
		fill(255, 0, 0);
		ellipse(this.x, this.y, this.size);
	}

	// while picked up if you press Z it will rotate the asset
	control() {
		if (keyIsPressed && this.held) {
			if (key == "z") {
				this.rotation -= 0.1;
			} else if(key == "x") {
				this.rotation += 0.1;
			}

			if (key == "s") {
				this.size -= 0.05;
			} else if (key == "a") {
				this.size += 0.05;
			}
		}
	}

	drag() {
		/*
        if not master &&
        if something isnt held already &&
        if collision:
            mark as hold
            find offset
        not mouse pressed:
            not holding
        */

		if (!this.isMaster && !mouseHolding) {
			if (this.isClicked()) {
				this.held = true;
				mouseHolding = true;
				this.xOffset = this.x - mouseX;
				this.yOffset = this.y - mouseY;
			}
		} else if (!mouseIsPressed) {
			this.held = false;
		}

		if (this.held) {
			this.x = mouseX + this.xOffset;
			this.y = mouseY + this.yOffset;
		}
	}

	isOnBin(bin) {
		// bin is of AssetBin class
		// collide this.etc with bin.etc
		// account for any overlap? (yeah lets do that)

		/*
			this.x is center point of the shape
			bin.x,y is top left corner
			bin size is 1:2 w:h
		*/
		if (this.x + this.size / 2 > bin.x) {
			if (this.x - this.size / 2 < bin.x + bin.size) {
				if (this.y + this.size / 2 > bin.y) {
					if (this.y - this.size / 2 < bin.y + bin.size * 2) {
						return true;
					}
				}
			}
		}
		return false;
	}
	// could make a boolean to toggle rect collision?
	isClicked() {
		if (dist(this.x, this.y, mouseX, mouseY) < this.size / 2) {
			if (bMousePressed) {
				return true;
			}
		}
		return false;
	}
}

// these are child classes because they are the same as asset just with a different display
class SnowmanButton extends Asset {
	constructor(x, y, isMaster = false, array = []) {
		// last two have default options
		super(x, y, isMaster);
		this.array = array;
	}

	display() {
		fill(0);
		ellipse(this.x, this.y, this.size);
	}

	masterRun() {
		if (this.isClicked()) {
			this.array.push(new SnowmanButton(mouseX, mouseY));
			//I tried doing push(new this(x, y)) but that did not work!!!!
			//if it did this entire funtion would be in asset and not the child class
		}
		this.run();
		for (let i = 0; i < this.array.length; i++) {
			this.array[i].run();
			if (this.array[i].isOnBin(theBin)) {
				theBin.hovering = true;
				if (!bMouseHeld) {
					this.array.splice(i, 1);
					i--;
				}
			}
		}
	}
}

class SnowmanCarrot extends Asset {
	constructor(x, y, isMaster = false, array = []) {
		super(x, y, isMaster);
		this.array = array;
	}

	display() {
		fill(255, 157, 63);
		push();
		translate(this.x, this.y); // change origin for rotation
		rotate(this.rotation); // rotate!
		triangle(0 - this.size / 2, 0 + this.size / 2, 0, 0 - this.size / 2, 0 + this.size / 2, 0 + this.size / 2);
		pop();
	}

	masterRun() {
		if (this.isClicked()) {
			this.array.push(new SnowmanCarrot(mouseX, mouseY));
		}
		this.run();
		for (let i = 0; i < this.array.length; i++) {
			this.array[i].run();
			if (this.array[i].isOnBin(theBin)) {
				theBin.hovering = true;
				if (!bMouseHeld) {
					this.array.splice(i, 1);
					i--;
				}
			}
		}
	}
}

class SnowmanStick extends Asset {
	constructor(x, y, isMaster = false, array = []) {
		super(x, y, isMaster);
		this.array = array;
		this.size = 45;

		this.rotation = 0;
	}

	display() {
		push();
		stroke(135, 82, 62);
		strokeWeight(this.size / 3);
		translate(this.x, this.y);
		rotate(this.rotation);
		line(-this.size / 2, 0, this.size / 2, 0);
		pop();
	}

	masterRun() {
		if (this.isClicked()) {
			this.array.push(new SnowmanStick(mouseX, mouseY));
		}
		this.run();
		for (let i = 0; i < this.array.length; i++) {
			this.array[i].run();
			if (this.array[i].isOnBin(theBin)) {
				theBin.hovering = true;
				if (!bMouseHeld) {
					this.array.splice(i, 1);
					i--;
				}
			}
		}
	}
}

class AssetBin {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size; // ("1:2")
		this.hovering = false;
	}

	run() {
		this.display();
		this.hovering = false;
	}

	display() {
		fill(51);
		if (this.hovering) {
			fill(106);
		}
		rect(this.x, this.y, this.size, this.size * 2);
	}
}

// bMousePressed is true for the first frame that the mouse is pressed
let bMouseHeld = false;
let bMousePressed = false;

function runBMousePressed() {
	if (mouseIsPressed && !bMouseHeld) {
		// if the mouse is pressed down but is not held, its the first frame of the click
		bMouseHeld = true;
		bMousePressed = true;
	} else if (!mouseIsPressed && bMouseHeld) {
		// the mouse has been let go of, no longer held
		bMouseHeld = false;
	} else {
		bMousePressed = false;
	}
}

class SnowflakeManager {
	constructor() {
		this.flakeArray = [];
		this.padding = 30; // for objects origin off screen
		this.flakeDensity = 1; // how many snowflakes per 1000 pixels width
	}

	run() {
		this.runSnowflake();
	}

	runSnowflake() {
		// console.log(this.flakeArray.length);
		// console.log(width);

		for (let j = 0; j < width; j += 1000 / this.flakeDensity) {
			// add more flakes when the screen is wider to keep the density, look & feel the same
			this.flakeArray.push(new Snowflake(Math.random() * width, -this.padding));
			// console.log(j);
		}

		// for(let i = 0; i < flakeArray.length; i++){
		for (let i = this.flakeArray.length - 1; i >= 0; i--) {
			// run through the array backwards as we are removing them here too
			this.flakeArray[i].run();

			if (this.flakeArray[i].y > height + this.padding) {
				// if the flake is past the bottom of the screen
				this.flakeArray.splice(i, 1);
			}
		}
	}
}

class Snowflake {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.weight = 1 + Math.random() * 3; // tells how fast the flake should be falling
		this.size = map(this.weight, 1, 4, 10, 30); // the faster it falls the bigger it is, gives a paralax illusion
	}

	run() {
		this.display();
		this.move();
	}

	display() {
		noStroke();
		fill(255, 80);
		ellipse(this.x, this.y, this.size, this.size);
	}

	move() {
		// increase y due to gravity!!!
		this.y += this.weight;
		// maybe a spin later? // its a circle
	}
}