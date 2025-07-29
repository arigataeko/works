// Trail3  リスト1_1
let d = 20;  //円の直径
let x = d/2;   //円の最初のx座標
let speed = 1; //スピード
let move = true;

function setup() {
  createCanvas(250, 150);
  fill(200, 0, 0);
  noStroke();
}
function draw() {
  background(240);
  x = x + speed;
  circle(x, height/2, d);
  if (x >= width-d/2 || x < d/2) { 
     speed = -speed; 
  }
}

function mousePressed() {
  if (move) {
    move = false;
    noLoop();
  } else {
    move = true;
    loop();
  }
}
