const title = "男性の時間の使い方";
const keisu = 0.05;
let currentA = [];  //項目ごとの途中の角度
let imgSleep, imgWork, imgHouse, imgCare, imgLeisure;

function preload() {
  imgSleep = loadImage('./images/sleep.png');
  imgWork = loadImage('./images/work.png');
  imgHouse = loadImage('./images/house.png');
  imgCare = loadImage('./images/care.png');
  imgLeisure = loadImage('./images/leisure.png');
}

function setup() {
  createCanvas(600, 300);
  Datamate.make("./data/maletime.csv");  //行ヘッダが国名
  Datamate.makeAreas(0, 30, width, height, 5, 2);
  Datamate.play(0.1, 0); // 横方向に動かす
  Datamate.loop(true, false);
  angleMode(DEGREES);  //角度の単位を度単位にする
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
  const syurui = Datamate.columnName(index); //列のヘッダ　データ種名
  const country = Datamate.rowName(number); //行のヘッダ
  const value = Datamate.value(country, index);
  strokeWeight(8);  //線を太く
  noFill();
  stroke(0, 0, 200);
  let targetA = map(value, 0, 1440, 0, 360); //データを円の角度に換算
  currentA[number] = currentA[number] + (targetA - currentA[number]) * keisu; //角度少しずつ変化
  //顔の輪郭、円弧の長さでデータを表す。 -90度は時計の12の位置
  arc(area.centerX, area.centerY, area.width-15, area.width-15, -90, currentA[number]-90);
  strokeWeight(5);
  if (dist(mouseX, mouseY, area.centerX, area.centerY) < (area.width-15)/2) { //マウスが円内に入ったら、
    ellipse(area.centerX, area.centerY+20, 20, 10);  //口

    // 対応する画像を表示する
    let imgToShow = null;
    if (syurui === "睡眠") imgToShow = imgSleep;
    else if (syurui === "仕事") imgToShow = imgWork;
    else if (syurui === "家事") imgToShow = imgHouse;
    else if (syurui === "家族の世話(育児・介護)") imgToShow = imgCare;
    else if (syurui === "余暇") imgToShow = imgLeisure;
    if (imgToShow) {
      imageMode(CENTER);
      image(imgToShow, area.centerX +40, area.centerY, 50, 50);
      // 画像は顔の右横あたりに表示
      }

  }else{
    arc(area.centerX, area.centerY+20, 20, 10, 0, 180);  //口
    textSize(13);
    textStyle(BOLD);
  }
  noStroke();
  fill(0, 0, 200);
  circle(area.centerX-12, area.centerY-20, 8); //目
  circle(area.centerX+12, area.centerY-20, 8);
	fill(0, 103, 192);
	
	// 画像を常にタイトル前に表示
    let imgToShow = null;
    if (syurui === "睡眠") imgToShow = imgSleep;
    else if (syurui === "仕事") imgToShow = imgWork;
    else if (syurui === "家事") imgToShow = imgHouse;
    else if (syurui === "家族の世話(育児・介護)") imgToShow = imgCare;
    else if (syurui === "余暇") imgToShow = imgLeisure;
    if (imgToShow) {
      imageMode(CENTER);
      image(imgToShow, 30, 30, 45, 45);
      // 画像は顔の右横あたりに表示
      }
  textAlign(LEFT, CENTER);
  text(title+"("+syurui+")", 70, 30);  //データ名の表示
	
  textAlign(CENTER, CENTER);
  text(country + "\n" + Datamate.value(country, index) + "分", area.centerX, area.centerY);
}
