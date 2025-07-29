function setup() {
  createCanvas(250, 250);  
  background(200);  
  noFill();
  var r = 20;
  for (var i=1; i<=10; i=i+1) {
    ellipse(width/2, height/2, r*i, r*i);
  }
}
