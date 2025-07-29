//【問題T2-1-2】11年間の猫と犬の飼育推計数
let title = "猫と犬の飼育推計数(千頭)";
let titleX = 120;  //この↑表題を表示するx座標

function setup() {
  createCanvas(1100, 320);

  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定

  Datamate.make("年", ["2013年", "2014年", "2015年", "2016年", "2017年",
    "2018年", "2019年", "2020年", "2021年", "2022年", "2023年"]);
  Datamate.make("猫", [8409, 8425, 8297, 8333, 8672, 8849, 8764, 8628, 8946, 8837, 9069]);
  Datamate.make("犬", [8714, 8200, 7994, 8008, 7682, 7616, 7579, 7341, 7106, 7053, 6844]);
  Datamate.makeAreas(0, 0, width-10, height, Datamate.columnCount(), 2); //Datamate.columnCount()はデータの列数
}

function draw() {
  background(240);
  fill(0);
  textSize(15);
  text(title, titleX, 20);  //表題の表示]
  for (let i=0; i<Datamate.columnCount(); i++) {
    fill(0);
    textSize(12);
    let area = Datamate.area(i);          //表示エリアをとりだす
    text(Datamate.columnName(i), area.centerX, area.bottom);  //年の表示
    drawData("猫", Datamate.columnName(i), i);  //猫の表示
    drawData("犬", Datamate.columnName(i), i+Datamate.columnCount());  //犬の表示
  }
}

function drawData(syurui, year, index) {
  let area = Datamate.area(index);
  //データを円の直径に換算
  let value = map(Datamate.value(syurui, year), 6000, 10000, 10, area.width);  
  fill(200, 0, 0);
  circle(area.centerX, area.centerY, value);
  textSize(10);
  fill(255, 255, 0);
  //データの種類と頭数の表示   ps.js  v1.5.0だと "\n" を正しく処理しない
  text(syurui + "\n" + Datamate.value(syurui, year), area.centerX, area.centerY); 
}
