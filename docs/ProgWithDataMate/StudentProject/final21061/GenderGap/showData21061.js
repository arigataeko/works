const title = "各国のジャンダーギャップ指数";
const keisu = 0.05;
let currentA = [];  //項目ごとの途中の角度
let move = true;

function setup() {
  createCanvas(600, 600);
  Datamate.make("GenderGap.csv");
  
  Datamate.makeAreas(10, 30, width-10, height-30, 5, 4);
  Datamate.bindAreas([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
  Datamate.play(0.5, 0); // 横方向に動かす
  Datamate.loop(true, false);
  angleMode(DEGREES);
  noStroke();
  //Datamate.plot();// データを表示
  for (let i=0; i<Datamate.rowCount(); i++) {
    currentA[i] = 0; //最初、角度はゼロ
  }
}


function draw() {
  background(245);
  for (let i=0; i<Datamate.rowCount(); i++) {
    drawData(i);
  }
}


function drawData(number) {
  const area = Datamate.area(number);   // エリアをとりだす
  const index = Datamate.focusX(0);  //今フォーカスしているデータの次のインデックス
  const indexHokan = Datamate.focusX(0, true);   //今フォーカスしているデータと次のデータの間
  const year = Datamate.columnName(index); //列のヘッダ　年
  const country = Datamate.rowName(number); //行のヘッダ　国名
  const value = Datamate.value(country, indexHokan);

  //青円
  fill(65, 105, 225);
  ellipse(area.centerX, area.centerY, area.width-15, area.width-15);

  //赤円
  let targetA = map(value, 0, 1, 0, 180); //データを円の角度に換算
  currentA[number] = currentA[number] + (targetA - currentA[number]) * keisu; //角度少しずつ変化
  fill(225, 65, 105);
  arc(area.centerX, area.centerY, area.width-15, area.width-15, -90, currentA[number]-90);

  //文字
  fill(0);
  textAlign(LEFT, CENTER);
  text(title+"("+year+"年)"+"　　クリックで停止/作動", 30, 30);  //データ名の表示
  fill(255);
  textAlign(CENTER, CENTER);
  text("\n" +　country + "\n" + Datamate.value(country, index), area.centerX, area.centerY);
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
