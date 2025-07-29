//最終課題　一人当たりの米の消費量の推移
let max = 250.0;  //矩形の高さの最大値
let min = 0.0;   //矩形の高さの最小値
let rw = 50;      //矩形の幅
let currentH = [];  //項目ごとの途中の高さ
let henka = 1.0;    //矩形が伸びるスピード
let Img;  //画像データ用の変数

function preload() {
  Img = loadImage("./images/ochawan.png");
}

function setup() {
  createCanvas(500, 320); //250×250ピクセルの画面を用意
  imageMode(CENTER);    //画像の中心位置を指定して描く設定
  Datamate.make("年", ["1962", "1970", "1980", "1990", "2000", "2010", "2020"]);
  Datamate.make("消費量", 　["118.3", "95.1", "78.9", "70", "64.6", "59.5", "50.8"]);
  Datamate.makeAreas(0, 0, width, height-50, 7, 1);
  //                ↑x座標, y座標, 幅, 高さ, 横方向のエリア数, 縦方向のエリア数
  for (let i=0; i<Datamate.columnCount(); i++) {
    currentH[i] = 0.0;  //矩形の高さを最初は0にしておく
  }
  noStroke();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(200);
  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);
  }
  image(Img, 35, 260);//描く画像データ, 画像の中心のx座標, y座標 1962
  image(Img, 35+73, 260);//1970
  image(Img, 179, 260);//1980
  image(Img, 31+73*3, 260);//1990
  image(Img, 30+73*4, 260);//2000
  image(Img, 28+73*5, 260);//2010
  image(Img, 26+73*6, 260);//2020
}

function drawData(index) {
  let area = Datamate.area(index);              //表示エリアをとりだす
  let value = Datamate.value("消費量", index);
  let h = map(Datamate.value("消費量", index), 0, 120, min, max); //矩形の高さを計算
  if (currentH[index] >= h) {  //消費量を表す高さになったら、成長を止め、色を変え、寿命を表示
    henka = 0;
    fill(250, 250, 250);
    text(value +"kg", area.centerX, area.bottom+30);
    text(Datamate.value("消費量", index)+"kg", area.centerX, area.bottom+30);//
  } else {
    fill(250, 250, 250);
    henka = 1;
  }
  currentH[index] = currentH[index] + henka;  //新しい高さ
  //rect(area.centerX-rw/2, area.bottom-currentH[index], rw, currentH[index]);//矩形
  //   ↑左上の角（x，y）、　　　　　　　　　　　　　　　　　　　　　幅、高さ

  ellipse(area.centerX, area.bottom-currentH[index]/2, rw, currentH[index])//楕円　初めからの設定
    //　　　　↑中心（x，y）、幅、高さ

    fill(0);//文字色
  text(Datamate.value("年", index)+"年", area.centerX, area.bottom+15);//文字
}

function mousePressed() {
  for (let i=0; i<currentH.length; i++) {
    currentH[i] = 0.0;  //矩形の高さを初期化
  }
  return false;
}
