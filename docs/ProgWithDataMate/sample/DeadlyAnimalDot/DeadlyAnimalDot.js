// 人を殺す動物
const title = "死を招く動物とその被害者数(2015年)";
const d = 4;

function setup() {
  createCanvas(750, 770);
  Datamate.make("DeadlyAnimal.csv");
  Datamate.makeAreas(0, 0, width, height, 6, 3);
  //Datamate.bindAreas([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ,15]);
}

function draw() {
  background(240);
  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);
  }
  textAlign(LEFT, CENTER);
  print(title);
  text(title, 30, 15);  //データ名の表示
}

function drawData(index) {
  const area = Datamate.area(index);
  const name = Datamate.columnName(index);//列のヘッダ
  const value = Datamate.value(0, index);
  const count = map(value, 1, 830000, 1, 1500); //円の個数
  //print(index + "  " + (area.height/d) + "  " + (area.width/d));
  stroke(200);
  noFill();
  rect(area.left, area.top, area.width, area.height);  // エリアの矩形を描画
  noStroke();
  fill(200, 0, 0);
  let n = 0;
  out:   //二重ループの先頭にoutというラベルをつけた
  for (let j=0; j<area.height/d; j++) {  
    for (let i=0; i<area.width/d-1; i++) {
                 //↑area.width/dはareaの幅に並べられる直径dの円の個数を計算している
      n++;
      if (n>count) {
        break out;  //円をcountの個数まで書いたらoutというラベルがついている二重ループを終了
      }
      circle(area.left+(i+1)*d, area.bottom-(j+1)*d-30, d);  //円を書く
    }
  }
  fill(0);
  textAlign(CENTER, CENTER);
  text(name, area.centerX, area.bottom-25);
  text(value+"人", area.centerX, area.bottom-10);
}
