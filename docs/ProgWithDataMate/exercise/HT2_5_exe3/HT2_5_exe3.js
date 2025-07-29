// 【問題T2-5-3】
let titleX = 120;  //タイトルの表示位置
let title = "SNSユーザ数の変化";
let move = true;

function setup() {
  createCanvas(600, 250);
  Datamate.make("SNS-JP.csv");
  Datamate.makeAreas(0, 0, width, height, 6, 1);
  Datamate.play(0, 0.3);  //縦方向に動かす
  Datamate.loop(false, true);    //ループする
  textAlign(CENTER, CENTER);
  rectMode(CORNERS);
}

function draw() {
  background(255);
  for (let i=0; i<Datamate.columnCount(); i++) { //Datamate.columnCount()はデータテーブルの列数(6)を返す
    drawData(Datamate.columnName(i), i);
  }
}

function drawData(syurui, number) {
  let area = Datamate.area(number);  //エリアをとりだす
  let index = Datamate.focusY(0);  //今フォーカスしているデータのインデックス
  let year = Datamate.rowName(index); //行のタイトル
  //print("syurui: " + syurui + " number: " + number+ " index: " + index);
  let value = Datamate.value(index, syurui);

  stroke(220);
  noFill();
  rect(area.left, area.top+40, area.right, area.bottom); //枠を描く
  noStroke();
  fill(200, 0, 0);  //赤の円
  for (let i=0; i<value*10; i++) {  //valueの最大値は100で、そのままだと円の数が少ないため10倍
    const x = map(random(), 0, 1, area.left, area.right);
    const y = map(random(), 0, 1, area.top+40, area.bottom);
    circle(x, y, 5);
  }

  fill(0);
  text(title+"("+year+")", titleX, 30);  //データ名の表示
  text(syurui + "\n" + value + "%", area.centerX, area.height-30);
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
