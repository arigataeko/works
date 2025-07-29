//【問題T2-1-1】　帯グラフをDatamate.jsを使って書く

let max = 250.0;  //矩形の幅の最大値
let min = 0.0;   //矩形の幅の最小値
let rh = 50;      //矩形の幅
let layoutX = 120;  //レイアウトスペースの左x座標

function setup() {
  createCanvas(400, 300);

  noStroke();
  textAlign(RIGHT, CENTER); //文字を表示する際、中心の座標を指定

  Datamate.make("名前", ["イカ", "マグロ", "オオサンショウウオ", "ワニ", "シロナガスクジラ"]);
  Datamate.make("寿命", [1.0, 20.0, 55.0, 70.0, 100.0]);
  Datamate.makeAreas(layoutX, 0, width-layoutX, height, 1, Datamate.columnCount()); //Datamate.columnCount()はデータの列数
}

function draw() {
  background(240);
  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);
  }
}

function drawData(index) {
  const area = Datamate.area(index);
  let w = map(Datamate.value("寿命", index), 0, 100, min, max); 
  print(w);
  fill(200, 0, 0);
  rect(area.left, area.centerY-rh/2, w, rh);
  fill(0);
  text(Datamate.value("名前", index), area.left-5, area.centerY);
  text(Datamate.value("寿命", index) +"年", area.left-5, area.centerY+15);
}
