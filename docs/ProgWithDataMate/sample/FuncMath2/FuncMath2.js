var w = 80; //四角形の幅
var h = 10; //四角形の高さ
function setup() {
  createCanvas(150,150);
}

function draw() {
  background(255);
  translate(width/2, height/2);  //座標原点を画面の中央へ移動
  var a = atan2(mouseY-height/2, mouseX-width/2); //画面中央からみた角度を計算。
  //引数は、画面中央を原点としたマウスの位置。
  rotate(a);  //マウスの位置に応じて回転
  rect(-w/2, -h/2, w, h);  //長方形を描く。長方形がマウスで回転する。
  ellipse(0, 0, 10, 10);  //画面中央に円
}
