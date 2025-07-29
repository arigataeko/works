//【問題T2-2-1】
let title = "猫と犬の飼育推計数";
let titleX = 120;  //この↑表題を表示するx座標
let catImg, dogImg;
let move = true;
function preload() {
  catImg = loadImage("./images/catB100.png");
  dogImg = loadImage("./images/dogW100.png");
}

function setup() {
  createCanvas(450, 250);
  Datamate.make("inuneko.csv");
  Datamate.makeAreas(0, 0, width, height, 2, 1);

  Datamate.play(0.3, 0);  //横方向に動かす
  Datamate.loop(true, false);    //ループする
  noStroke();
  textAlign(CENTER, CENTER);
  imageMode(CENTER);  //画像を描く際に中心座標を指定
}

function draw() {
  background(220);
  drawData('猫', 0, catImg);    // 表示域0に'猫'データを表示
  drawData('犬', 1, dogImg);    // 表示域1に'犬'データを表示
}

function drawData(syurui, block, img) {
  let area = Datamate.area(block);  // エリアをとりだす
  let dataIndex = Datamate.focusX(0);  //今フォーカスしているデータのインデックス
  let indexHokan = Datamate.focusX(0, true);   //今フォーカスしているデータと次のデータの間
  let year = Datamate.columnName(dataIndex);    //列のヘッダ
  let value = Datamate.value(syurui, indexHokan);
  let w = map(value, 6000, 10000, 30, 200);   //データを画像の大きさに換算
  image(img, area.centerX, area.centerY, w, w);

  text(title+"("+year+")", titleX, 30);  //データ名の表示
  text(Datamate.value(syurui, dataIndex) + "千頭", area.centerX, area.bottom-20);
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
