const dataTitle = "男性の賃金を100とした時の女性の賃金(2022)";
function setup() {
  createCanvas(770, 550);
  Datamate.make("GenderWageGapEng.csv");   //行ヘッダが国名

  Datamate.makeAreas(0, 30, width, height-30, 6, 4);
  noStroke();
}

function draw() {
  background(240);
  fill(0);
  textSize(14);
  text(dataTitle, 10, 20);  //データ名の表示
  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);    // データiを描画
  }
}

function drawData(number) {
  const area = Datamate.area(number);   // エリアをとりだす
  const country = Datamate.columnName(number); //列のヘッダ
  const value = Datamate.value(0, number);

  if (mouseX>area.left && mouseX<area.right && mouseY>area.top && mouseY<area.bottom) {
    //マウスがエリアに入ったら円の色は薄い紫で円を描く
    drawCircles(country, 100-value, area.left+10, area.top+10, area.left+20, area.top+20, color(187, 183, 218));
    textSize(20);  //マウスがエリアに入ったら円の上に値を描く
    fill(0);
    textAlign(CENTER, CENTER);
    text((100-value) + "%", area.centerX, area.centerY);
  } else {
    drawCircles(country, 100-value, area.left+10, area.top+10, area.left+20, area.top+20, color(110, 69, 152));
  }
}
//引数は、国名、値、国名のx座標、国名のy座標、最初の円のx座標、最初の円のy座標、円の色
function drawCircles(title, r, titleX, titleY, startX, startY, circleColor) {
  fill(0);
  textSize(10);
  textAlign(LEFT, CENTER);
  text(title, titleX, titleY);
  let n = 0;
  for (let j=9; j>=0; j--) {  //円は下の行から描く
    for (let i=0; i<10; i++) {
      n++;
      if (n <= r) {
        fill(circleColor);   // 塗りを紫にする
      } else {
        fill(200);     // 塗りをグレーにする
      }
      circle(startX+i*10, startY+j*10, 10);
    }
  }
}
