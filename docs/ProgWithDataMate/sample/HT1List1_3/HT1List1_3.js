let x = 35;
function setup() {
  createCanvas(250, 250); //250×250ピクセルの画面を用意
  noStroke();  //輪郭線は描かない
  fill(0);     //黒で塗る
}

function draw() {
  background(220);  //背景はグレー
  circle(x, 35, 20); //円を描く
  circle(x+20, 35, 20); //円を描く
  circle(x+40, 35, 20); //円を描く
  
  print(x + "  ");
}
