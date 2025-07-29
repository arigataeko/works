// Trail1 List2_3

let x = 35;  //最初の円のx座標
let y = 50;  //最初の円のy座標
let data =  ["大学生男女比", 1314354, 1631245];
let ratio = 0;
function setup() {
  createCanvas(250, 250);
  noStroke();
  ratio = round(data[1] / (data[1] + data[2]) * 100);  //比率を計算しておく
  print(ratio);
}
function draw() {
  background(230);
  fill(0);
  text(data[0], 10, 20);
  let n = 0;
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if (n <= ratio) {
        fill(102, 0, 153);   // 塗りを紫にする
      } else {
        fill(51, 153, 0);     // 塗りを緑にする
      }
      circle(x+i*20, y+j*20, 20);
    }
  }
}
