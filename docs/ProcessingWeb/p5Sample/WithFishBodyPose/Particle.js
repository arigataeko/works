// A simple Particle class
class Particle {
  constructor(position) {
    this.acceleration = createVector(0, -0.05);  //粒子の運動ベクトル
    this.velocity = createVector(random(-1, 1), random(-1, -2));
    this.position = position.copy();
    this.lifespan = 155;  // 2ずつ減る 透明度にも使う
    this.size = random(2, 20);
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  // Method to display
  display() {
    stroke(240, 248, 255, this.lifespan);
    strokeWeight(2);
    fill(173, 216, 230, this.lifespan);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  // Is the particle still useful?
  isDead () {
    return this.lifespan < 0;
  }
}
