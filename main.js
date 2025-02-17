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

let particles = [];
let spacing = 50;

function preload() {
	nameplatelong = loadImage("data/nameplatelong.png");
	font = loadFont("data/AzeretMono.ttf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	for(let i =0; i < windowWidth/spacing; i++){
		for(let j =0; j < windowHeight/spacing; j++){
			particles.push(new Particle(i*spacing + spacing/2, j * spacing + spacing/2));
		}
	}
}

function draw() {
	background(0);
	particles.forEach((p) => {p.render()});

	let momentum = createVector(mouseX - pmouseX, mouseY - pmouseY);
	let mouseVector = createVector(mouseX, mouseY);
	push();
	stroke(255, 0, 0);
	strokeWeight(30)
	line(mouseX, mouseY, momentum.x + mouseX, momentum.y + mouseY);
	pop();

	particles.forEach((p) => {p.update(mouseVector, momentum)});

}

