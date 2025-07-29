// Trail1  リスト3_2
let x = 35;  //画像の中心のx座標
let y = 35;  //画像の中心のy座標
let catImg;  //画像データ用の変数

function preload() {
  catImg = loadImage("./images/catB25.png");
}

function setup() {
  createCanvas(300, 300);
  imageMode(CENTER);    //画像の中心位置を指定して描く設定
}
function draw() {
  background(255);
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      image(catImg, x+i*catImg.width, y+j*catImg.height);  //画像の中心の座標を指定
    }
  }
}
