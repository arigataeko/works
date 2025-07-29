// 練習問題　Trail1 4-1 二次元配列使わない
const x = 35;
const y = 35;
let catImg, dogImg;
let img;

const data2011 = ["猫と犬の飼育推計割合(2011年)", 9606000, 11936000];
const data2020 = ["猫と犬の飼育推計割合(2020年)", 9644000, 8489000];
let ratio = [];

function preload() {
  catImg = loadImage("./images/catB25.png");
  dogImg = loadImage("./images/dogW25.png");
}

function setup() {
  createCanvas(600, 300);
  textSize(14);
  //比率を計算しておく
  ratio[0] = round(data2011[1] / (data2011[1] + data2011[2]) * 100);
  ratio[1] = round(data2020[1] / (data2020[1] + data2020[2]) * 100);
}
function draw() {
  background(255);
  let cx = x - catImg.width/2;  //左上画像の位置
  let cy = y - catImg.height/2+10;
  text(data2011[0], 10, 20);  //データ名の表示
  let n = 0;   //何個目の円を描いているか
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if (n <= ratio[0]) {  //描いた円の数がratioになるまでは猫
        img = catImg;
      } else {  //残りは犬
        img = dogImg;
      }
      image(img, cx+i*img.width, cy+j*img.height);
    }
  }

  text(data2020[0], 10+300, 20);  //データ名の表示
  n = 0;   //何個目の円を描いているか
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if (n <= ratio[1]) {  //描いた円の数がratioになるまでは猫
        img = catImg;
      } else {  //残りは犬
        img = dogImg;
      }
      image(img, cx+i*img.width+300, cy+j*img.height);
    }
  }
}
