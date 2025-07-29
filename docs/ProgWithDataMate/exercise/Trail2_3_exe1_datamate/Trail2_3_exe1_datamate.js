// Trail2  問題2-3-1

const max = 120.0;  //円の最大直径
const min = 10.0;   //円の最小直径

function setup() {
  createCanvas(700, 250);
  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定

  Datamate.make("名前", ["イカ", "マグロ", "オオサンショウウオ", "ワニ", "シロナガスクジラ"]);
  Datamate.make("寿命", [1.0, 20.0, 55.0, 70.0, 100.0]);
  Datamate.makeAreas(0, 0, width, height-50, Datamate.columnCount(), 1); //Datamate.columnCount()はデータの列数
}

function draw() {
  background(240);
  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);
  }
}

function drawData(index) {
  let area = Datamate.area(index);
  let d = map(Datamate.value("寿命", index), 0, 100, min, max);
  fill(0);
  text(Datamate.value("名前", index), area.centerX, area.bottom+15);
  if (dist(mouseX, mouseY, area.centerX, area.centerY) < d/2 && mouseIsPressed) {
    text(Datamate.value("寿命", index) +"年", area.centerX, area.centerY);
    fill(200, 100);  //円の色をグレー、アルファ値(透明度)を指定
  } else {
    fill(200, 0, 0);
  }
  circle(area.centerX, area.centerY, d);
}
