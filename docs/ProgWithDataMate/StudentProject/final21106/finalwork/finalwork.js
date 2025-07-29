// 10種類の金属の比重をバネばかりで表現
const countryNameY = 15;    //上辺からの距離
const circleY = 50;    //一番上にある時の上辺からの距離
const d = 25;      //直径
let speed = [];
let a =0.1; //加速度

let lastY = [];  //項目ごとの最終y座標
let currentY = [];  //項目ごとの途中のy座標

let dispImg;
let kinzokuImg;
let kinzokuGif;

function preload() {
  kinzokuImg = loadImage("./images/gif-01.png");
  kinzokuGif = loadImage("./images/kinzoku.gif");
}

function setup() {
  createCanvas(650, 300);
  Datamate.make("hijuu.csv");
  
  Datamate.makeAreas(0, 0, width, height, 10, 1);
  Datamate.bindAreas([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定
  for (let i=0; i<Datamate.columnCount(); i++) {
    currentY[i] = 0;  //最初は0
    lastY[i] = map(Datamate.value(0, i), 0, 25, 0, height-circleY);//円の最終y座標を計算しておく
    speed[i] = 1
  }
  
  imageMode(CENTER);
  dispImg = kinzokuImg;
  
}

function draw() {
  background(240);
  
  for(let i=0; i<Datamate.columnCount(); i++){
    moveUpCircle(i);
  }
}

function moveUpCircle(number){
    const area = Datamate.area(number);  // エリアをとりだす
    const country = Datamate.columnName(number);//列のヘッダ
    const value = Datamate.value(0, number);
    
    if (currentY[number] >= lastY[number]) {  //最終y座標になったら
      speed[number] = 0;          //y座標を変えない
      dispImg = kinzokuGif; 
    } else {
      speed[number] = speed[number]+a          //そうでないなら1ずつ減らす
      dispImg = kinzokuImg; 
    }
    currentY[number] = currentY[number] + speed[number];
    stroke(150)
    line(area.centerX, area.top+40, area.centerX, area.top+currentY[number]+circleY);
    noStroke();
    fill(100)
    //ellipse(area.centerX, area.top+currentY[number]+circleY, d, d);
    image(dispImg,area.centerX, area.top+currentY[number]+circleY, d, 50);
    
    noStroke();
    fill(0);
    text(country, area.centerX, area.top+countryNameY); 
    text(value+"g/cm3", area.centerX, area.top+countryNameY+15);
    /*
    if (speed == 0) {  //数値表示
      text(value+"%", area.centerX, area.bottom-currentY[number]-circleY-20);
    }
    */
}

function mousePressed() {
  for (let i=0; i<10; i++) {
    currentY[i] = 0;  //初期化
  }
}
