// 【問題T2-5-1】
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
}

function draw() {
  background(220);
  for(let i=0; i<Datamate.columnCount(); i++){ //Datamate.columnCount()はデータテーブルの列数(6)を返す
     drawData(Datamate.columnName(i), i); 
  }     
}

function drawData(syurui, number) {
  const area = Datamate.area(number);  //エリアをとりだす
  const index = Datamate.focusY(1);  //今フォーカスしているデータの次のインデックス
  const indexHokan = Datamate.focusY(0, true);   //今フォーカスしているデータと次のデータの間
  const year = Datamate.rowName(index); //行のヘッダ
  
  const value = Datamate.value(indexHokan, syurui);
  
  //print(syurui + "   " + number + "  index:" + index + " " + Datamate.value(index, syurui));
  const d = map(value, 0, 100, 0, area.width);   //データを円の直径に換算
  fill(200, 0, 0);
  circle(area.centerX, area.centerY, d);
  fill(0);
  text(title+"("+year+")", titleX, 30);  //行ヘッダの表示
  text(syurui + "\n" + Datamate.value(index, syurui) + "%", area.centerX, area.height-30);
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
