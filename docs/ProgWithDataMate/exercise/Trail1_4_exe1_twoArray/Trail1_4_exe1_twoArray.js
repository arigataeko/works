// 練習問題　Trail1 4-1 二次元配列使う
const x = 35;
const y = 35;
let catImg, dogImg;
let img;
const data = [ ["猫と犬の飼育推計割合(2011年)", 9606000, 11936000],
  ["猫と犬の飼育推計割合(2020年)", 9644000, 8489000]];
let ratio = [];
function preload() {
  catImg = loadImage("./images/catB25.png");
  dogImg = loadImage("./images/dogW25.png");
}

function setup() {
  createCanvas(600, 300);
  textSize(14);
  //比率を計算しておく
  for (let i=0; i<data.length; i++) {
    ratio[i] = round(data[i][1] / (data[i][1] + data[i][2]) * 100);
  }
}
function draw() {
  background(255);
  let cx = x - catImg.width/2;  //左上画像の位置
  let cy = y - catImg.height/2+10;
  for (let k=0; k<data.length; k++) {
    text(data[k][0], 10+k*300, 20);  //データ名の表示

    let n = 0;   //何個目の円を描いているか
    for (let j=0; j<10; j++) {
      for (let i=0; i<10; i++) {
        n++;
        if (n <= ratio[k]) {  //描いた円の数がratioになるまでは猫
          img = catImg;
        } else {  //残りは犬
          img = dogImg;
        }
        image(img, cx+i*img.width+k*300, cy+j*img.height);
      }
    }
  }
}
