//【リストT2-3-2】　マウスインタラクション

let max = 250.0;  //矩形の高さの最大値
let min = 0.0;   //矩形の高さの最小値
let rw = 50;      //矩形の幅

function setup() {
  createCanvas(500, 320);

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
  let h = map(Datamate.value("寿命", index), 0, 100, min, max);
  fill(200, 0, 0);
  rect(area.centerX-rw/2, area.bottom-h, rw, h);
  fill(0);
  text(Datamate.value("名前", index), area.centerX, area.bottom+15);

  
  if (mouseX>area.centerX-rw/2 && mouseX<area.centerX+rw/2 && 
              mouseY<area.bottom && mouseY>area.bottom-h) {
  text(Datamate.value("寿命", index) +"年", area.centerX, area.bottom-h-10);
    }
}
