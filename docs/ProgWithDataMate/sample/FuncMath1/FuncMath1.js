var r = 50;
var a = 0; //角度(度単位)
var x;
var y;
var f = false;

function setup() {
  createCanvas(150,150);
  fill(200,0,0);
  noStroke();
  background(255); 
  noLoop();
}
function draw() {
  translate(width/2, height/2);  //座標原点を画面の中央へ移動
  x = r * cos(radians(a)); //円周上a度の位置のx座標を計算
  y = r * sin(radians(a)); //円周上a度の位置のy座標を計算
  ellipse(x, y, 10, 10);  //画面中央に円
  a = (a + 1); //1度ずつ右へ回る
  if(a>360) {  //1周したら角度を0にし、今までの描画を消す
      background(255);
      a = 0;
  }
}

function mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}
