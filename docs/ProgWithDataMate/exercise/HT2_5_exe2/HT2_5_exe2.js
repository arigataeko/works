// 【問題T2-5-2】
let titleX = 120;  //タイトルの表示位置
let title = "SNSユーザ数の変化";
let move = true;
function setup() {
  createCanvas(600, 250);
  Datamate.make("SNS-JP.csv");
  Datamate.makeAreas(0, 0, width, height, 6, 1);
  Datamate.play(0, 0.3);  //縦方向に動かす
  Datamate.loop(false, true);    //ループする
  noStroke();
  textAlign(CENTER, CENTER);
  //Datamate.plot();// データを表示
}

function draw() {
  background(220);
  for (let i=0; i<Datamate.columnCount(); i++) { //Datamate.columnCount()はデータテーブルの列数(6)を返す
    drawData(Datamate.columnName(i), i);
  }
}

function drawData(syurui, number) {
  let area = Datamate.area(number);  //エリアをとりだす
  let index = Datamate.focusY(1);  //今フォーカスしているデータの次のインデックス
  let indexHokan = Datamate.focusY(0, true);   //今フォーカスしているデータと次のデータの間
  let year = Datamate.rowName(index); //行のタイトル

  let value = Datamate.value(indexHokan, syurui);

  let h = map(value, 0, 100, 0, area.height-60);   //データを棒の高さに換算
  fill(200, 0, 0);
  rect(area.left+area.width/4, area.bottom-h-50, area.width/2, h);
  fill(0);
  text(title+"("+year+")", titleX, 30);  //データ名の表示
  text(syurui + "\n" +  Datamate.value(index, syurui) + "%", area.centerX, area.height-30);
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
