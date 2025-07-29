
let currentD = [];  //項目ごとの途中の高さ
let henka = 1.0;    //矩形が伸びるスピード

function setup() {
  createCanvas(700, 250);
  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定
  Datamate.make("名前", ["イカ", "マグロ", "オオサンショウウオ", "ワニ", "シロナガスクジラ"]);
  Datamate.make("寿命", [1.0, 20.0, 55.0, 70.0, 100.0]);
  Datamate.makeAreas(0, 0, width-10, height-50, Datamate.columnCount(), 1); //Datamate.columnCount()はデータの列数
  for (let i=0; i<Datamate.columnCount(); i++) {
    currentD[i] = 0.0;  //矩形の高さを最初は0にしておく
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
  let d = map(value, 0, 100, 10, area.width);
  if (currentD[index] >= d) {  //寿命を表す直径になったら、成長を止め、色を変え、寿命を表示
    henka = 0;
    fill(200, 0, 0);
  } else {
    henka = 1;
    fill(0, 0, 200);
  }
  currentD[index] = currentD[index] + henka;  //新しい高さ
  circle(area.centerX, area.centerY,currentD[index]);
  fill(0);
  text(Datamate.value("名前", index), area.centerX, area.bottom+15);
  text(value +"年", area.centerX, area.bottom+30);
}

function mousePressed(){
  for (let i=0; i<Datamate.columnCount(); i++) {
    currentD[i] = 0.0;  //矩形の高さを最初は0にしておく
  }
}
