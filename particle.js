class Particle {
	constructor(x, y) {
		this.pos = createVector(x, y);

		this.size = 10;
		this.effectiverange = 100;
		this.acceleration = 0;
	}

	render() {
		fill(220);
		ellipse(this.pos.x, this.pos.y, this.size);
	}

	update(pos, momentum) {
		//both vectors, depending on how close the pos is add the momentum and bounce back
		if (pos.dist(this.pos) < this.effectiverange) {
			let intensity = map(
				pos.dist(this.pos),
				0,
				this.effectiverange,
				-1,
				1
			);
			this.acceleration = momentum.mult(intensity);
			this.pos.add(this.acceleration);
			if (bMousePressed()) {
				console.log(momentum);
			}
		}

		//bounce back
	}
}
