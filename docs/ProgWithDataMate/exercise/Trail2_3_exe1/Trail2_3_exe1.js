// Trail2  問題3_1
const rx = 30;  //最初の矩形の左下のx座標
const ry = 270;  //最初の矩形の左下のy座標
const max = 250.0;  //高さの最大値
const min = 10.0;   //高さ最小値
const rw = 50;      //矩形の幅
const distance = rw+45;

const name = ["イカ", "マグロ", "オオサンショウウオ", "ワニ", "シロナガスクジラ"];
const span = [1.0, 20.0, 55.0, 70.0, 100.0];

function setup() {
  createCanvas(500, 300);
  fill(200, 0, 0);
  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定
}
function draw() {
  background(240);
  for (let i=0; i<span.length; i++) {
    let rh = map(span[i], 1, 100, min, max); //矩形の高さ
    let x = rx + i*distance;   //矩形の左下x座標
    fill(200, 0, 0);
    rect(x, ry-rh, rw, rh);
    fill(0);
    text(name[i], x+rw/2, ry+15);
    if (mouseX>x && mouseX<x+rw && mouseY>ry-rh && mouseY<ry) {
      text(span[i]+"年", x+rw/2, ry-rh-8);
    }
  }
}
