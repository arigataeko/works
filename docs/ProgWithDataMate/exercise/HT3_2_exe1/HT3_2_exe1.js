// Trail3  練習問題1
// Total early-stage Entrepreneurial Activity (TEA) 総合起業活動指数
// 十カ国を上に動くカエルで表現

let countryNameY = 15;    //国名下辺からの距離
let lowY = 40;    //カエルが一番下にある時の下辺からの距離
let d = 40;      //カエルの幅、高さ
let speed = 1;
let currentY = [];  //項目ごとの途中の移動距離

let sitImg;
let banzaiImg;
let dispImg;   //今表示している画像

function preload() {
  sitImg = loadImage("./images/frogsit.png");
  banzaiImg = loadImage("./images/frogbanzai.png");
}

function setup() {
  createCanvas(520, 300);
  Datamate.make("国", ["Italy", "Japan", "Germany", "Norway", "China", "Australia", "Korea", "India", "USA", "Brazil"]);
  Datamate.make("企業活動指数", [2.8, 5.4, 7.6, 8.4, 8.7, 10.5, 14.9, 15.0, 17.4, 23.3]);
  Datamate.makeAreas(0, 0, width, height, 10, 1);

  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定
  for (let i=0; i<Datamate.columnCount(); i++) {
    currentY[i] = 0;  //最初は0
  }
  
  imageMode(CENTER);
  dispImg = sitImg;  //最初は座った画像
}

function draw() {
  background(240);
  for(let i=0; i<Datamate.columnCount(); i++){
    moveUpFrog(i);
  }
}

function moveUpFrog(number){
    let area = Datamate.area(number);  // エリアをとりだす
    let country = Datamate.columnName(number);//列のヘッダ
    let value = Datamate.value(0, number); //Datamate.value("企業活動指数", number)としても同じ
    let position = map(value, 0, 28, 0, height-lowY); //カエルの最終y座標を計算しておく
    
    if (currentY[number] >= position) {  //最終距離まで動いたら
      speed = 0;          //y座標を変えない
      dispImg = banzaiImg;  //万歳画像にする
    } else {
      speed = 1;          //そうでないなら1ずつ増やす
      dispImg = sitImg;
    }
    currentY[number] = currentY[number] + speed;
    image(dispImg, area.centerX, area.bottom-currentY[number]-lowY, d, d);
   //     circle(area.centerX, area.bottom-currentY[number]-lowY, d, d);
    
    fill(0);
    text(country, area.centerX, area.bottom-countryNameY); //国名表示
    if (speed == 0) {  //数値表示
      text(value + "%", area.centerX, area.bottom-currentY[number]-lowY-20);
    }
}

function mousePressed() {
  for (let i=0; i<10; i++) {
    currentY[i] = 0;  //初期化
  }
}
