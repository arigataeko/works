// 動物がどれくらい寝てるのか見てみよう
//const title = "動物の睡眠時間";
const d = 10;
const number = 10;  //動物の数
let count = [];  //円(食べ物の画像)の個数
let countDone = [];  //すでに作った落ちてくる円の数

// Matter.jsのクラスを使う時、Matter.を省略するための指定
const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
let engine;
let world;
let circles = [];
let grounds = [];
//画像データ用の変数
let foodImg, breadImg, porkImg, carrotImg, aaaImg;
let gazo=[];//下に配置する画像を入れる


function preload() {

  
  koaraImg = loadImage("./images/koara.png");
  toraImg = loadImage("./images/tora.png");
  risuImg = loadImage("./images/risu.png");
  usagiImg =loadImage("./images/usagi.png");
  tinpanjiImg =loadImage("./images/tinpanji.png");
  guppiImg = loadImage("./images/guppi.png");
  yagiImg = loadImage("./images/yagi.png");
  hitujiImg = loadImage("./images/hituji.png");
  kirinImg = loadImage("./images/kirin.png");
  hitoImg = loadImage("./images/hito.png");
  zzzImg = loadImage("./images/zzz.png");

}


            
function setup() {
  createCanvas(1000, 600);//y座標で表の縦の長さが変わる
  Datamate.make("SleepAnimal1.csv");
  //Datamate.makeAreas(0, 0, width, height-25, 5, 2);//レイアウトスペースの分割など
  Datamate.makeAreas(0, 0, width, height-50, 5, 2);

  gazo = [koaraImg, toraImg, risuImg, usagiImg, tinpanjiImg, 
          guppiImg, yagiImg, hitujiImg, kirinImg, hitoImg, ];//gazoの中に画像を入れる

  engine = Engine.create();
  world = engine.world;

  engine.enableSleeping = true;  //静止している物体を無視
  world.positionIterations = 3;  //位置修正の反復回数
  
  

  for (let i=0; i<number; i++) {
    const area = Datamate.area(i);
    grounds.push(new Boundary(area.left+50, area.centerY, 60, area.height));
    grounds.push(new Boundary(area.right, area.centerY, 120, area.height));//幅の調節
    grounds.push(new Boundary(area.centerX, area.bottom-20, area.width, 120));

    count[i] = calcCount(Datamate.columnName(i), i);  //個数を計算しておく
    countDone[i] = 0;
  }
  World.add(world, grounds);
  engine.gravity.y = 0.5;
}

function draw() {
  background(215,230,250);//背景色

  for (let i=0; i<number; i++) {  //各動物ごとに順に見ていく
    if (countDone[i] < count[i]) {  //count分のcircleを作り終えていない時
      drawData(Datamate.columnName(i), i);  //circleを作る
    }
  }

  Engine.update(engine);
  for (let circle of circles) {
    circle.show();
  }
  for (let ground of grounds) {
    ground.show();
  }
  for (let i=0; i<number; i++) {  //動物の名前とデータ値、線を描く
    drawAnimalName(Datamate.columnName(i), i, gazo[i]);//function drawAnimalName(animal, block, img)
  }
  fill(0);
  textAlign(LEFT, CENTER);
  //textSize(40);
  textSize(20);
  //text(title, 135, 15);
 // text(title, 370, 340);  //データ名の表示
}

function calcCount(animal, block) { //テーブルから値を取り出し、円の個数を計算
  const index = Datamate.focusY(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(index, animal)
    return floor(map(value, 1, 22, 1, 50));  //落ちてくるものの個数

}

function drawData(animal, block) {
  const area = Datamate.area(block);  //エリアをとりだす

  circles.push(new Circle(area.centerX, area.top+100, d, zzzImg));  //落ちてくる中身について
  countDone[block] = countDone[block] + 1;//無限に湧き出るのを防ぐ
}



function drawAnimalName(animal, block, img) {
  const area = Datamate.area(block);  //エリアをとりだす
  const index = Datamate.focusY(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(index, animal);

  fill(0);//動物名と時間の文字色
  image(img, area.centerX-24,area.bottom-80, 70,70);//寝ている動物の位置
  //image()
  textAlign(CENTER, CENTER);
  textSize(13);
  text(animal, area.centerX+10, area.bottom+14);//動物の名前部分の位置
  text(value + "時間", area.centerX+8, area.bottom);//時間の位置
}



function mousePressed() {//マウスボタンが押されたら要素を全部消す（繰り返すための関数）
  for (let i=0; i<number; i++) {
    countDone[i] = 0;
  }
  for (let circle of circles) {
    circle.removeFromWorld();
  }
  circles.splice(0);
}
