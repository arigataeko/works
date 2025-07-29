//スムーズに円の大きさが変化

let title = "猫と犬の飼育推計数";
let titleX = 120;  //この↑表題を表示するx座標
let move = true;
function setup() {
  createCanvas(450, 250);
  Datamate.make("年", ["2013年", "2014年", "2015年", "2016年", "2017年",
    "2018年", "2019年", "2020年", "2021年", "2022年", "2023年"]);
  Datamate.make("猫", [8409, 8425, 8297, 8333, 8672, 8849, 8764, 8628, 8946, 8837, 9069]);
  Datamate.make("犬", [8714, 8200, 7994, 8008, 7682, 7616, 7579, 7341, 7106, 7053, 6844]);
  Datamate.makeAreas(0, 0, width, height, 2, 1);

  Datamate.play(0.3, 0);  //横方向に動かす
  Datamate.loop(true, false);    //ループする。

  noStroke();
  textAlign(CENTER, CENTER);
}
function draw() {
  background(210);
  drawData('猫', 0);    // 表示域0に'猫'データを表示  drawData(Datamate.name(0), 0);
  drawData('犬', 1);    // 表示域1に'犬'データを表示  drawData(Datamate.name(1), 1);
}
function drawData(syurui, number) {
  let area = Datamate.area(number);              //表示エリアをとりだす
  let dataIndex = Datamate.focusX();            //今フォーカスしているデータのインデックス
  let indexHokan = Datamate.focusX(0, true);  //今フォーカスしているデータと次のデータとの間のインデックス
  let year = Datamate.columnName(dataIndex);    //列のヘッダ
  let value = Datamate.value(syurui, indexHokan);
  let w = map(value, 6000, 10000, 30, area.width);  //データを円の直径に換算
  fill(200, 0, 0);
  circle(area.centerX, area.centerY, w);
  fill(0);
  text(title+"("+year+")", titleX, 30);  //表題と年の表示
  fill(255);
  text(syurui, area.centerX, area.centerY); //データの種類の表示
  if (dist(mouseX, mouseY, area.centerX, area.centerY) < w/2) { //マウスが円内に入ったら、
    text(Datamate.value(syurui, dataIndex) + "千頭", area.centerX, area.centerY+15); //頭数の表示
  }
}

function mousePressed() {
  if (move) {
    move = false;
    noLoop();
  } else {
    move = true;
    loop();
  }
}
