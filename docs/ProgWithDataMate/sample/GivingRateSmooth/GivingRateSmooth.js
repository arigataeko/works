const title = "世界人助け指数";
const keisu = 0.05;
let currentA = [];  //項目ごとの途中の角度
function setup() {
  createCanvas(600, 320);

  Datamate.make("Giving2023.csv");   //行ヘッダが国名
 /*
  Datamate.make("国名", ["全体", "手助け", "寄付", "ボランティア"]);
  Datamate.make("インドネシア", [68, 61, 82, 61]);
  Datamate.make("ウクライナ", [62, 78, 70, 37]);
  Datamate.make("ケニア", [60, 76, 53, 51]);
  Datamate.make("アメリカ", [58, 76, 61, 38]);
  Datamate.make("オーストラリア", [51, 65, 56, 31]);
  Datamate.make("フィリピン", [34, 57, 12, 34]);
  Datamate.make("ロシア", [43, 57, 29, 16]);
  Datamate.make("韓国", [38, 57, 40, 18]);
  Datamate.make("イタリア", [37, 53, 42, 15]);
  Datamate.make("日本", [18, 21, 16, 17]);
  */
  Datamate.makeAreas(5, 30, width-10, height-30, 5, 2);

  Datamate.play(0.2, 0); // 横方向に動かす
  Datamate.loop(true, false);

  angleMode(DEGREES);
  //Datamate.plot();// データを表示

  for (let i=0; i<Datamate.rowCount(); i++) {
    currentA[i] = 0; //最初、角度はゼロ
  }
}

function draw() {
  background(240);
  for (let i=0; i<Datamate.rowCount(); i++) {
    drawData(i);    // データiを描画
  }
}

function drawData(number) {
  const area = Datamate.area(number);   // エリアをとりだす
  const index = Datamate.focusX(0);  //今フォーカスしているデータの次のインデックス
 // const indexHokan = Datamate.focusX(0, true);   //今フォーカスしているデータと次のデータの間
  const syurui = Datamate.columnName(index); //列のヘッダ　寄付などのデータ種名
  const country = Datamate.rowName(number); //行のヘッダ
  const value = Datamate.value(country, index);
  strokeWeight(8);  //線を太く
  noFill();
  stroke(200, 0, 0);
  let targetA = map(value, 0, 100, 0, 360); //データを円の角度に換算
  currentA[number] = currentA[number] + (targetA - currentA[number]) * keisu; //角度少しずつ変化
  //顔の輪郭、円弧の長さでデータを表す。　-90度は時計の12の位置
  arc(area.centerX, area.centerY, area.width-15, area.width-15, -90, currentA[number]-90);
  strokeWeight(5);
  if (dist(mouseX, mouseY, area.centerX, area.centerY) < (area.width-15)/2) { //マウスが円内に入ったら、
    ellipse(area.centerX, area.centerY+20, 20, 10);  //口
  }else{
    arc(area.centerX, area.centerY+20, 20, 10, 0, 180);  //口
  }
  noStroke();
  fill(200, 0, 0);
  circle(area.centerX-12, area.centerY-20, 8); //目
  circle(area.centerX+12, area.centerY-20, 8);

  fill(0);
  textAlign(LEFT, CENTER);
  text(title+"("+syurui+")", 30, 30);  //データ名の表示
  textAlign(CENTER, CENTER);
  text(country + "\n" + Datamate.value(country, index) + "%", area.centerX, area.centerY);
}
