// Trail1  リスト3_2
let x = 35;  //画像の中心のx座標
let y = 35;  //画像の中心のy座標
let catImg;  //画像データ用の変数Li

function preload() {
  catImg = loadImage("./images/catB25.png");
}

function setup() {
  createCanvas(250, 250);
  imageMode(CENTER);    //画像の中心位置を指定して描く設定
}
function draw() {
  background(240);
  image(catImg, x, y);  //(x, y)に画像の中心をおく
}
