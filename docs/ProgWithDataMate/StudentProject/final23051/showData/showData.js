let titleX = 200;
let title = "１人あたりの電力消費量とGDP"
let Img;
//国旗の画像
let canada;
let usa;
let korea;
let japan;
let russia;
let france;
let germany;
let china;
let italy;
let uk;
let brazil;
let india;

let max = 50.0;
let min = 0.0;
let rw = 50;
let d = 60
let Step = 0;
let flags = [];

function preload(){
  Img = loadImage("bulb.png");
  canada = loadImage("canada.gif");
  usa = loadImage("usa.gif");
  korea = loadImage("korea.gif");
  japan = loadImage("japan.gif");
  russia = loadImage("russia.gif");
  france = loadImage("france.gif");
  germany = loadImage("germany.gif");
  china = loadImage("china.gif");
  italy = loadImage("italy.gif");
  uk = loadImage("uk.gif");
  brazil = loadImage("brazil.gif");
  india = loadImage("india.gif");
  
  flags = [canada, usa, korea, japan, russia, france, germany, china, italy, uk, brazil, india];
}

function setup() {
  createCanvas(800, 900);
  imageMode(CENTER);
  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定
  Datamate.make("国", ["カナダ", "アメリカ", "韓国", "日本", "ロシア", "フランス", "ドイツ", "中国", "イタリア", "イギリス", "ブラジル", "インド"]);
  Datamate.make("電力", [14591, 12986, 11503, 7813, 7219, 6638, 6285, 6112, 5216, 4323, 2723, 1081]);
  Datamate.make("GDP", [56252, 77178, 34822, 34112, 15445, 41075, 49686, 12663, 35636, 46063, 9281, 2353]);
  
  // 1行あたり6カ国
  let cols = 6;
  let rows = ceil(Datamate.columnCount() / cols);
  
  Datamate.makeAreas(0, 0, width-10, 800, cols, rows);
}

function draw() {
  background(25, 25, 112);
  fill(255);
  textSize(25);
  text(title, titleX, 50);
  
  if(frameCount % 40 === 0 && Step < 4){ //アニメーション更新
    Step++;
  }
  
  for (let i=0; i<Datamate.columnCount(); i++) {
    fill(255);
    textSize(15);
    let area = Datamate.area(i);
    text(Datamate.columnName(i), area.centerX, area.bottom-80);
    drawData("電力", Datamate.columnName(i), i);
  }
}

function drawData(syurui, data, index) {
  let area = Datamate.area(index);
  let value = map(Datamate.value(syurui, data), 0, 80000, 10, area.width);  //データを円の直径に換算  
  fill(255, 255, 100, 80);
  for (let i = 1; i <= Step; i++) {
    circle(area.centerX, area.centerY, value * i);
  }
  let size = map(Datamate.value("GDP", data), 10, 100000, 40, area.width);
  image(Img, area.centerX, area.centerY+8, size, size); //電球の画像のサイズをGDPの値によって変える
  image(flags[index], area.centerX, area.centerY+200, 60, 60);
  textSize(12);
  fill(255);
  text("消費電力" + "\n" + Datamate.value(syurui, data) + "kWh/人口", area.centerX, area.centerY-80);
  text("GDP" + "\n" + Datamate.value("GDP", data) + "ドル/人口", area.centerX, area.centerY+80);
}

function mousePressed() { //画面をクリックするとアニメーションを初期化する
  Step = 0;
}
