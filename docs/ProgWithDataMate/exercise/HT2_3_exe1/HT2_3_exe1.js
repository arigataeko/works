// Trail2  問題2-3-1
const cx = 80;  //最初の円の中心のx座標
const cy = 100;  //最初の円の中心のy座標
const max = 120.0;  //円の最大直径
const min = 10.0;   //円の最小直径
const distance = max+10;
const name = ["イカ", "マグロ", "オオサンショウウオ", "ワニ", "シロナガスクジラ"];
const span = [1.0, 20.0, 55.0, 70.0, 100.0];

function setup() {
  createCanvas(700, 250);
  fill(200, 0, 0);
  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定
  print(textSize());
}
function draw() {
  background(240);
  for (let i=0; i<span.length; i++) {
    let d = map(span[i], 1, 100, min, max); //円の大きさ
    let x = cx + i*distance;   //円を描くx座標
    fill(0);
    textSize(12);
    text(name[i], x, cy+max);
    if (dist(mouseX, mouseY, x, cy) < d/2 && mouseIsPressed) {
      textSize(16);
      text(span[i]+"年", x, cy);
      fill(200, 100);  //円の色をグレー、アルファ値(透明度)を指定
    } else {
      fill(200, 0, 0);
    }
    ellipse(x, cy, d, d);
  }
}
