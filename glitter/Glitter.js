class Glitter {
	constructor(pos, momentum, gravity, colour) {
		this.pos = pos;
		this.momentum = momentum;
		this.gravity = gravity;
		this.colour = colour;

		this.animationFrame = 0;
		this.animationLength = 30 + random(-10, 10);

		this.size = 10;
		this.gravityFactor = 0.02; // how fast it points down
	}

	run() {
		this.render();
		this.update();
	}
	render() {
		this.zroty = map(
			this.animationFrame,
			0,
			this.animationLength,
			-this.size,
			this.size
		);

		this.zrotx = this.size;
		// planning to do rotation based on the x momentum

		this.animationFrame = this.animationFrame % this.animationLength;

		fill(this.colour);
		if (this.zroty > 10) {
			fill(lerpColor(color(this.colour), color(255), 0.85));
		}
		// rect(this.pos.x, this.pos.y, this.zrotx, this.zroty);
		ellipse(this.pos.x, this.pos.y, this.zrotx, this.zroty);
	}

	update() {
		this.animationFrame++;
		this.pos.y++;

		this.pos.add(this.momentum);

		// slowly lerp momentum to be pointing downwards with a mag of the gravity factor

		this.momentum.lerp(this.gravity, this.gravityFactor);

		if (
			this.pos.y > height + this.size * 2 ||
			this.pos.x > width + this.size * 2 ||
			this.pos.x < -this.size * 2
		) {
			this.outOfBounds = true;
		}
		// Im keeping the ones above the screen in bounds because they will fall into the screen
	}
}
