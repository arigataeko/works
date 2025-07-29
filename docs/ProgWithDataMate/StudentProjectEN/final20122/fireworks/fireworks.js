const rx = 80;    //最初の花火のx座標
const ry = 550;  //花火が一番下にある時の上辺からの距離
const max = 220;  //y座標の最大値
const min = 0;    //y座標の最小値
const d = 40;      //花火の幅、高さ
const distance = d+50; //花火と花火の間
let a = 0.2;

const name = ["福井","大分","静岡","岡山", "北海道1","高知", "鹿児島", "北海道2", "群馬", "茨城"];
const data = [3300, 5000, 5000, 5000, 6000, 6000, 8000, 8000, 15000, 20000];
let lastY = [];  //項目ごとの最終y座標
let currentY = [];  //項目ごとの途中のy座標
let x = [];
let speed = 1;
let banzaiImg;
let sitImg;
let dispImg;
function preload() {
  sitImg = loadImage("./images/fireworks1.png");
  banzaiImg = loadImage("./images/fireworks2.gif");
}
function setup() {
  createCanvas(1000, 600);
  fill(200, 0, 0);
  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定
  for (let i=0; i<data.length; i++) {
    lastY[i] = map(data[i], 0, 10000, min, max); //円のy座標
    currentY[i] = 0;  //最初は0
    speed = 0;
    x[i] = rx + i*distance;   //円のx座標
  }
  imageMode(CENTER);
  dispImg = sitImg;
}
function draw() {
  background(106, 90,205);
  for (let i=0; i<data.length; i++) {
    if (currentY[i] >= lastY[i]) { 
      speed = 0;         
      dispImg = banzaiImg;    //
    } else {
      speed = 1;         //そうでないなら1ずつ増やす
      dispImg = sitImg; 
    }
    
     currentY[i] = currentY[i] + speed;
    image(dispImg, x[i], ry-currentY[i], 70,70);
    fill(255, 255, 255);
    text(name[i], x[i], ry+15);
    if (speed == 0){
      text(data[i]+"発", x[i], ry-currentY[i]-50);
    }
  }
}

function mousePressed() {
  for (let i=0; i<data.length; i++) {
    currentY[i] = 0; 
  }
}
