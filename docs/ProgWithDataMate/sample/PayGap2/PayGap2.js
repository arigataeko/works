const dataTitle = "男性の賃金を100とした時の女性の賃金(2022)";
const roundCircle = 60; //周りの円の直径
let kankaku;  //周りの円の間隔(度数)
function setup() {
  createCanvas(600, 630);
  Datamate.make("GenderWageGap.csv");   //行ヘッダが国名
  Datamate.makeAreas(0, 30, width, height-30, 1, 1);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  noStroke();
  kankaku = 360 /Datamate.columnCount();
}

function draw() {
  background(255);
  fill(0);
  textSize(14);
  textAlign(LEFT, CENTER);
  text(dataTitle, 10, 20);  //データ名の表示
  const area = Datamate.area(0);   // エリアをとりだす
  translate(area.centerX, area.centerY); //エリアの中心に座標原点を移動
  fill(220);
  circle(0, 0, area.width-roundCircle*2);  //中央に大きな円を描く
  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i, (area.width/2-roundCircle/2), kankaku*i);    // 国ごとの円とパイ型を描く
  }
}

function drawData(number, radius, angle) { //データ番号, 周りの円が載る円の半径, データごとの角度
  const country = Datamate.columnName(number); //列のヘッダ
  const value = Datamate.value(0, number);
  let paiColor;
  let circleColor;
  let charColor;
  textAlign(CENTER, CENTER);
  textSize(9);
  if (dist(mouseX-width/2, mouseY-height/2, radius*cos(angle), radius*sin(angle)) < roundCircle/2) {
    //周りの円の中にマウスが入った時　座標原点を画面中央に移動しているが、mouseX, mouseYの原点は左上隅
    circleColor = color(255);  //周りの円の色
    charColor = color(0);      //文字の色
    paiColor = color(0, 0, 200);  //円弧の色
  } else {
    circleColor = color(100);
    charColor = color(255);
    paiColor = color(300, 255/23*number, 78);
  }
  fill(circleColor);
  circle(radius*cos(angle), radius*sin(angle), roundCircle);  //周りの円
  fill(charColor);
  text(country+"\n"+(100-value)+"%", radius*cos(angle), radius*sin(angle));
  fill(paiColor);
  const arcR = (radius*2-roundCircle)*(100-value)/100;  //パイ型の円弧の直径
  arc(0, 0, arcR, arcR, angle-kankaku/2, (angle-kankaku/2)+kankaku);
}
