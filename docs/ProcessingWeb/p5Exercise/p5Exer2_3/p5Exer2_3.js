//円がらせん上を運動
var x = 0.0;
var y = 0.0;
var r = 0.0;
var a = 0.0; //3時の位置からの角度(度単位)
var speed = 2.0;
var angle = 0.0;
function setup() {
  createCanvas(250, 250);
  background(255);
  fill(200,0,0);
  noStroke();
  noLoop(); // Web上で最初停止しておく
}

function draw() {
    translate(width/2, height/2);  //座標原点を画面の中央へ移動
    x =  r * cos(radians(a));     
    y =  r * sin(radians(a));
   //らせん状に動かすため、半径に当たる部分を変化。3.0は係数。大きいと大きく広がる
    r = 3.0 * radians(a); 
    ellipse(x, y, 10, 10); 
    a = a + speed; //角度を変化させる
    if(r>=180) {
      a = 0;
      background(255);
    }
}

// 以下はWeb上で開始停止をするため
var f = false;
function mouseClicked() {  //mousePressedでも同じ動作
  if (f) {
    noLoop();
    f = false;
  } else {
    loop();
    f = true;
  }
}
