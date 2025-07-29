const title = "世界中の鳥の”渡り”距離";
const myname = "- YOSHIDA MAO -";
let w = 60; //画像の幅
let h = 60; //画像の高さ
let currentX = []; //鳥ごとの画像の位置

const keisu = 0.005;

let aderipenginImg, hasibosoImg, houkurosigiImg, inndoganImg, koobasigiImg, kyokuazarasiImg, oohakutyouImg, oosorihasisigiImg, oozisigiImg;     //画像データ用の変数
let aderi_b, hasibo_b, houkuro_b, inndo_b, kooba_b, kyoku_b, oohaku_b, oosori_b, oozisi_b;

function preload() { //画像のロード
  aderipenginImg = loadImage("./images/aderipengin.png");
  hasibosoImg = loadImage("./images/hasiboso.png");
  houkurosigiImg = loadImage("./images/houkurosigi.png");
  inndoganImg = loadImage("./images/inndogan.png");
  koobasigiImg = loadImage("./images/koobasigi.png");
  kyokuazarasiImg = loadImage("./images/kyokuazarasi.png");
  oohakutyouImg = loadImage("./images/oohakutyou.png");
  oosorihasisigiImg = loadImage("./images/oosorihasisigi.png");
  oozisigiImg = loadImage("./images/oozisigi.png");

  aderi_b = loadImage("./images/aderipengin_b.png");
  hasibo_b = loadImage("./images/hasiboso_b.png");
  houkuro_b = loadImage("./images/houkurosigi_b.png");
  inndo_b = loadImage("./images/inndogan_b.png");
  kooba_b = loadImage("./images/koobasigi_b.png");
  kyoku_b = loadImage("./images/kyokuazarasi_b.png");
  oohaku_b = loadImage("./images/oohakutyou_b.png");
  oosori_b = loadImage("./images/oosorihasisigi_b.png");
  oozisi_b = loadImage("./images/oozisigi_b.png");
}

function setup() {
  createCanvas(1000, 1840);

  //単位はkmとg
  Datamate.make("種名", ["飛行距離", "体重"]);
  Datamate.make("オオハクチョウ", [2500, 9200]);
  Datamate.make("ホウクロシギ", [3000, 1047]);
  Datamate.make("インドガン", [4000, 3000]);
  Datamate.make("オオジシギ", [5000, 200]);
  Datamate.make("オオソリハシシギ", [11000, 400]);
  Datamate.make("コオバシギ", [15000, 135]);
  Datamate.make("アデリーペンギン", [17600, 4990]);
  Datamate.make("ハシボソミズナギドリ", [30000, 800]);
  Datamate.make("キョクアジサシ", [90000, 100]);

  Datamate.makeArea(0, 30, width, height-70, 1, 9);
  Datamate.bindAreas([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  //Datamate.plot();

  for (let i=0; i<10; i++) {
    currentX[i] = 220; //ベジエ曲線の始まりの位置
  }
}


function draw() {
  background(137, 195, 235);

  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER);
  fill(255);

  //データタイトルの表示
  text(title, 500, 50);

  //名前の表示
  textSize(15);
  fill(25, 68, 142);
  text(myname, 500, 1800);

  //drawData()を描画する＞あとでfor文で直す必要あり
  drawData(1, oohakutyouImg, oohaku_b);
  drawData(2, houkurosigiImg, houkuro_b);
  drawData(3, inndoganImg, inndo_b);
  drawData(4, oozisigiImg, oozisi_b);
  drawData(5, oosorihasisigiImg, oosori_b);
  drawData(6, koobasigiImg, kooba_b);
  drawData(7, aderipenginImg, aderi_b);
  drawData(8, hasibosoImg, hasibo_b);
  drawData(9, kyokuazarasiImg, kyoku_b);
}


function drawData(index, img, img2) { //引数にimgも設定＞紐付け
  const area = Datamate.area(index);   // 割り当てられたエリアをとりだす
  const distance = Datamate.current(area.name, 0); //飛行距離データ
  const omosa = Datamate.value(area.name, 1); //体重データ

  //ベジエ曲線を描く
  noFill();
  stroke(2, 135, 96);
  strokeWeight(4);
  bezier(area.left+220, area.centerY, area.left+270, area.top+30, area.left+320, area.bottom-30, 370, area.centerY);
  bezier(370, area.centerY, 420, area.top+30, 470, area.bottom-30, 520, area.centerY);
  bezier(520, area.centerY, 570, area.top+30, 620, area.bottom-30, 670, area.centerY);
  bezier(670, area.centerY, 720, area.top+30, 770, area.bottom-30, 820, area.centerY);
  bezier(820, area.centerY, 870, area.top+30, 920, area.bottom-30, 970, area.centerY);

  //鳥の名前を表示
  noStroke();
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(15);
  text(area.name, area.left+30, area.centerY);

  //飛行距離の算出
  const flydis = map(distance, 1500, 89000, area.left+360, 900);
  currentX[index-1] = currentX[index-1] + (flydis - currentX[index-1]) * keisu; //右に動くようにする

  //画像と飛行距離を表示
  image(img, currentX[index-1], area.centerY-30, w, h);
  textAlign(CENTER, BOTTOM);
  fill(255);
  text(distance+"km", currentX[index-1]+28, area.centerY+50); //画像の下に文字を表示

  //体重の表示（マウスをかざしたとき）
  if (dist(mouseX, mouseY, flydis, area.centerY)<60) {
    //文字の表示変更
    fill(137, 195, 235);
    text(distance+"km", currentX[index-1]+28, area.centerY+50);
    fill(25, 68, 142);
    text(omosa+"g", currentX[index-1]+28, area.centerY+50); //画像の下に文字を表示

    //画像の表示変更
    image(img2, currentX[index-1], area.centerY-30, w, h);
  }
}
