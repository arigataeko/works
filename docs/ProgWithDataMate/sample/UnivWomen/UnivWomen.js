const title = "女性への学部学位授与課程への入学許可年";
const d = 30;   //円の直径
const titleX = 30;   //タイトルx座標(左端位置)
const titleY = 30;   //タイトルy座標（上下中央値)
const redC = 340;    //タイトル横赤い円のx座標
let currentX = [];   //大学ごとの赤円の位置
function setup() {
  createCanvas(700, 500);
  Datamate.make("UnivWomen.csv");
  Datamate.makeAreas(0, 50, width, height-50, 1, 10);
  //Datamate.bindAreas([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // Datamate.plot();// データを表示
  textAlign(LEFT, CENTER);
  print(Datamate.columnCount());
  for (let i=0; i<Datamate.columnCount(); i++) {
    currentX[i] = 0; //最初、赤円の位置は左端
  }
}

function draw() {
  background(240);
  //タイトル部分
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(15);
  text(title, titleX, titleY);  //データタイトルの表示
  fill(200, 0, 0);
  circle(redC, titleY, d);  //赤い円
  fill(0);
  circle(redC+d, titleY, d);  //黒い円
  textAlign(CENTER, CENTER);
  textSize(8);  //文字サイズを8ピクセルにする
  fill(255);
  text("開学年", 370, 30);  //黒い円の上に文字を描く

  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);    // データiを描画
  }
}

function drawData(index) {
  const area = Datamate.area(index);   // 割り当てられたエリアをとりだす
  const open = Datamate.value(Datamate.rowName(0), index);
  const women = Datamate.value(Datamate.rowName(1), index);
  // print(Datamate.columnName(index) + "  " +  open + "  "+ women);

  strokeWeight(5);  //線を太く
  noFill();
  stroke(0);
  line(area.left+140, area.centerY, area.right-10, area.centerY); //横線を描く
  noStroke();
  textSize(8);
  //開学の年　黒い円
  const openPos = map(open, 1100, 2020, area.left+140, area.right-10);
  fill(0);
  circle(openPos, area.centerY, d);
  textAlign(CENTER, CENTER);
  fill(255);
  text(open, openPos, area.centerY); //円の上に文字を描く
  //女子学生入学年 赤い円
  const womenPos = map(women, 1100, 2020, area.left+140, area.right-10);
  fill(200, 0, 0);
  currentX[index] = lerp(currentX[index], womenPos, 0.02);  //右へ少しずつ動く
  circle(currentX[index], area.centerY, d);

  textAlign(CENTER, CENTER);
  fill(255);
  text(women, currentX[index], area.centerY); //円の上に文字を描く
  //黒円上で、マウス押下すると、赤円が開学のところまで戻り、移動を再開
  if (mouseIsPressed && dist(mouseX, mouseY, openPos, area.centerY)<d/2) {
    currentX[index] = openPos;  //赤円の位置を開学のところへ
    fill(0); //黒円を書く準備
    circle(openPos, area.centerY, d);
    textAlign(CENTER, CENTER);
    fill(255);
    text(open, openPos, area.centerY); //円の上に文字を描く
  }
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(12);
  text(Datamate.columnName(index)+"大学", area.left+10, area.centerY);
}

function mousePressed() {
  if (dist(mouseX, mouseY, redC, titleY)<d/2) { // タイトル横の赤円上でマウス押下で
    for (let i=0; i<Datamate.columnCount(); i++) {  //赤い円が左から動く
      currentX[i] = 0; //最初、赤円の位置は左端  
    }
  }
}
