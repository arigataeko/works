//【問題T3-2-1】　横に画像が動く
let title = "水生生物の寿命";
let titleH = 20;
let max = 300.0;  //移動の最大値
let min = 0.0;   //移動の最小値
let d  = 50;      //画像サイズ
let layoutX = 120;  //レイアウトスペースの左x座標
let currentX = [];  //項目ごとの途中の高さ
let gazou = [];
let speed = 1;

function preload() {
  gazou[0] = loadImage("./images/ika.png");
  gazou[1] = loadImage("./images/maguro.png");
  gazou[2] = loadImage("./images/sansyo.png");
  gazou[3] = loadImage("./images/wani.png");
  gazou[4] = loadImage("./images/kujira.png");
}

function setup() {
  createCanvas(500, 300);

  noStroke();
  imageMode(CENTER);
  Datamate.make("名前", ["イカ", "マグロ", "オオサンショウウオ", "ワニ", "シロナガスクジラ"]);
  Datamate.make("寿命", [1.0, 20.0, 55.0, 70.0, 100.0]);
  Datamate.makeAreas(layoutX, titleH, width-layoutX, height-titleH, 1, Datamate.columnCount()); //Datamate.columnCount()はデータの列数

  for (let i=0; i<Datamate.columnCount(); i++) {
    currentX[i] = 0;  //最初は0
  }
}

function draw() {
  background(240);
  textSize(14);
  textAlign(LEFT, CENTER);
  text(title, 10, titleH);
    textAlign(RIGHT, CENTER); //文字を表示する際、中心の座標を指定
  for (let i=0; i<Datamate.columnCount(); i++) {
    moveLeft(i);
  }
}

function moveLeft(index) {
  const area = Datamate.area(index);
  let w = map(Datamate.value("寿命", index), 0, 100, min, max); 
    
  if (currentX[index] >= w) {  //最終距離まで動いたら
      speed = 0;          //x座標を変えない
        text(Datamate.value("寿命", index) +"年", area.left-5, area.centerY+15);
    } else {
      speed = 1;          //そうでないなら1ずつ増やす
    }
    currentX[index] = currentX[index] + speed;
    image(gazou[index], area.left+currentX[index]+20, area.centerY, d, d);

  text(Datamate.value("名前", index), area.left-5, area.centerY);

}

function mousePressed() {
  for (let i=0; i<10; i++) {
    currentX[i] = 0;  //初期化
  }
}
