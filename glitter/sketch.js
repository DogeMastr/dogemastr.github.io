/*
	GLITTER

	get mouse momentum 
	make glitter

*/
let glitterList = [];

let momentum;
let mouseVector;
let gravity;

let colourList = [
	"#f24640",
	"#c39666",
	"#33bb91",
	"#1cdbff",
	"#1871f2",
	"#af36e5",
	"#a60fc3",
];
function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	gravity = createVector(0, 2);

	rectMode(CENTER);
	noStroke();
}

function draw() {
	background(0);
	momentum = createVector(mouseX - pmouseX, mouseY - pmouseY);
	mouseVector = createVector(mouseX, mouseY);

	glitterList.forEach((g) => {
		g.run();
	});
	glitterList = glitterList.filter((g) => !g.outOfBounds);
	fill(colourList[0]);
	text(glitterList.length, 20, 20);
	if (mouseIsPressed) {
		for (let i = 0; i < 3; i++) {
			let rand = createVector(random(-20, 20), random(-20, 20));
			glitterList.push(
				new Glitter(
					p5.Vector.add(mouseVector, rand),
					p5.Vector.add(momentum, rand.setMag(1)),
					p5.Vector.add(gravity, rand.setMag(0.5)),
					random(colourList)
				)
			);
		}
	}
}
