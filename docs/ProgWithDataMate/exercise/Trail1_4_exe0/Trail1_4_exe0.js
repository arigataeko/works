const x = 35;
const y = 35;
let catImg, dogImg;
let img;

const data =  ["猫と犬の飼育数(2020年)", 9644000, 8489000];

function preload() {
  catImg = loadImage("./images/cat25.png");
  dogImg = loadImage("./images/dog25.png");
}

function setup() {
  createCanvas(580, 580);
  fill(0);
  textSize(14);
  ratio = round(data[1] / (data[1] + data[2]) * 100);  //比率を計算しておく
}
function draw() {
  background(255);
  text(data[0], 10, 20);  //データ名の表示
  let cx = x - catImg.width/2;
  let cy = y - catImg.height/2
    let n = 0;   //何個目の円を描いているか
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if (n <= ratio) {  //描いた円の数がratioになるまでは猫
        img = catImg;
      } else {  //残りは犬
        img = dogImg;
      }
      image(img, cx+i*img.width, cy+j*img.height);
    }
  }
}
