class Circle {
  constructor(x, y, r, img) {
    let options = {
      friction: 0.3,
      restitution: 0.8
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    this.img = img;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;

    push();
    translate(pos.x-10, pos.y-10);//落ちてくる場所を変更
    rectMode(CENTER);
    strokeWeight(1);
    stroke(0);
    fill(200, 0, 0);
    //ellipse(0, 0, this.r * 2);
    image(this.img, 0, 0, this.r * 2, this.r * 2);
    pop();
  }
  
  removeFromWorld(){
     World.remove(world, this.body); 
  }
}
