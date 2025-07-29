// 棒グラフが成長

let max = 250.0;  //矩形の高さの最大値
let min = 0.0;   //矩形の高さの最小値
let rw = 50;      //矩形の幅
let currentH = [];  //項目ごとの途中の高さ
let henka = 1.0;

function setup() {
  createCanvas(500, 320);

  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定

  Datamate.make("名前", ["イカ", "マグロ", "オオサンショウウオ", "ワニ", "シロナガスクジラ"]);
  Datamate.make("寿命", [1.0, 20.0, 55.0, 70.0, 100.0]);
  Datamate.makeAreas(0, 0, width, height-50, Datamate.columnCount(), 1); //Datamate.columnCount()はデータの列数

  for (let i=0; i<Datamate.columnCount(); i++) {
    currentH[i] = 0.0;  //最初は0
  }
}

function draw() {
  background(240);
  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);
  }
}

function drawData(index) {
  let area = Datamate.area(index);
  let value = Datamate.value("寿命", index);
  let h = map(value, 0, 100, min, max);

  if (currentH[index] >= h) {
    henka = 0;
    fill(200, 0, 0);
    text(value +"年", area.centerX, area.bottom+30);
  } else {
    henka = 1;
    fill(0, 0, 200);
  }
  currentH[index] = currentH[index] + henka;  //新しい高さ
  rect(area.centerX-rw/2, area.bottom-currentH[index], rw, currentH[index]);
  fill(0);
  text(Datamate.value("名前", index), area.centerX, area.bottom+15);
}

function mousePressed() {
  for (let i=0; i<currentH.length; i++) {
    currentH[i] = 0.0;  //初期化
  }
  return false;
}
