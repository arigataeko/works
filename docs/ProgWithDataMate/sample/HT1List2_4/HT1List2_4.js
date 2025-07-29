// Trail1 List2_4

let x = 35;  //最初の円のx座標
let y = 50;  //最初の円のy座標
let data =  ["大学生男女比", 1294320, 1621285];
let ratio = 0;
function setup() {
  createCanvas(250, 250);
  noStroke();
  ratio = round(data[1] / (data[1] + data[2]) * 100);  //比率を計算しておく
  print(ratio);
}

function draw() {
  background(230);
  drawDataCircles(data[0], ratio, 10, 20, x, y);
}

function drawDataCircles(title, r, titleX, titleY, startX, startY){
  fill(0);
  text(title, titleX, titleY);
  let n = 0;
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if (n <= r) {
        fill(102, 0, 153);   // 塗りを紫にする
      } else {
        fill(51, 153, 0);     // 塗りを緑にする
      }
      circle(startX+i*20, startY+j*20, 20);
    }
  }
}
