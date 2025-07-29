function setup() {
  createCanvas(400, 125);  
  background(200);  
  noFill();
  var d = 10;
  for (var i=1; i<=10; i=i+1) {
    ellipse(50, height/2, d*i, d*i);
  }
  for (var i=1; i<=10; i=i+1) {
    ellipse(150, height/2, d*i, d*i);
  }
  for (var i=1; i<=10; i=i+1) {
    ellipse(250, height/2, d*i, d*i);
  }
  for (var i=1; i<=10; i=i+1) {
    ellipse(350, height/2, d*i, d*i);
  }
}
