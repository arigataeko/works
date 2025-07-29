// Trail3  問題1_1
// 水平運動　一定の値に来たら止まり、色が変わる
let x = 0;    //円のx座標
let y = 0;    //円のy座標
let d = 20; //円の直径
let lastX = 200;
let speed = 1;

function setup() {
  createCanvas(250, 150);
  fill(200, 0, 0);
  noStroke();
  y = height/2;
}
function draw() {
  background(240);
  if (x >= lastX) {  //最終x座標になったら
    speed = 0;          //止める
    fill(0, 0, 200);    //青にする
  } else {
    speed = 1;          //そうでないなら1ずつ増やす
    fill(200, 0, 0);    //赤で描く
  }
  x = x + speed;
  circle(x, y, d);
}

function mousePressed() {
  x = 0;
}
