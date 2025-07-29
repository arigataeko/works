// 練習問題　Trail1 3-1
let x = 35;
let y = 50;

let catImg, dogImg;
let img;
let data = [ ["猫と犬の飼育推計割合(2013年)", 8409000, 8714000],
  ["猫と犬の飼育推計割合(2020年)", 8628000, 7341000],
  ["猫と犬の飼育推計割合(2023年)", 9069000, 6844000]  
  ];

function preload() {
  catImg = loadImage("./images/catB25.png");
  dogImg = loadImage("./images/dogW25.png");
}

function setup() {
  createCanvas(900, 300);
  imageMode(CENTER);    //画像の中心位置を指定して描く設定
  textSize(14);  //文字を大きく
}

function draw() {
  background(255);
  for (let i=0; i<data.length; i++) {
    let ratio = round(data[i][1] / (data[i][1] + data[i][2]) * 100);
    drawDataImage(data[i][0], ratio, i*300+10, 20, x+i*300, y);
    
  }
}

function drawDataImage(title, r, titleX, titleY, startX, startY) {
  fill(0);
  text(title, titleX, titleY);
  let n = 0;
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if (n <= r) {  //描いた数がratioになるまでは猫
        img = catImg;
      } else {  //残りは犬
        img = dogImg;
      }
      image(img, startX+i*img.width, startY+j*img.height);
    }
  }
}
