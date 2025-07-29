// Trail3  問題1_2
//　垂直に移動　ある位置にきたら止まる
let x = 0;  //円のx座標
let y = 0;  //円のy座標 (下辺を0とする)
let d = 20; //円の直径
let lastY = 200; //下辺を0とした止めるy座標
let speed = 1;

function setup() {
  createCanvas(250, 250);
  fill(200, 0, 0);
  noStroke();
  x = width/2;
}
function draw() {
  background(240);
  if (y >= lastY) {  //最終y座標になったら
    speed = 0;          //止める
    fill(0, 0, 200);    //青にする
  } else {
    speed = 1;          //そうでないなら1ずつ増やす
    fill(200, 0, 0);    //赤で描く
  }
  y = y + speed;
  circle(x, height-y, d);
}

function mousePressed() {
  y = 0;
}
