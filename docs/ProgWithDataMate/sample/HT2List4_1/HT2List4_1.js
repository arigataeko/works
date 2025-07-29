function setup() {
  createCanvas(250, 125);
  stroke(200, 0, 0);
  background(240);
}

function draw() {
}

function mouseMoved() {
  circle(mouseX, mouseY, 10);
  return false;  //予期しないデフォルト処理を防ぐため、これを入れる
}
