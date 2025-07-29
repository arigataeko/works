// Trail3  リスト1_2
let d = 20;  //円の直径
let x = d/2;   //円の最初のx座標
let speed = 1; //スピード
let a = 0.1; //加速度
let move = true;
function setup() {
  createCanvas(250, 150);
  fill(200, 0, 0);
  noStroke();
}
function draw() {
  background(240);
  speed = speed + a;
  x = x + speed;
  circle(x, height/2, d);
  if (x >= width) { 
     speed = 1; //速度を元に戻す
     x = d/2;   //円を左壁上に置く
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
