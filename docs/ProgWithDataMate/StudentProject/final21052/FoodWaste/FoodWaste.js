// 食品ロス世界ランキング
const title = "家庭で廃棄された食べ物の量（2021年)";
const d = 10;
const number = 16;  //国の数
let count = [];  //円(食べ物の画像)の個数
let countDone = [];  //国ごとにすでに作った円の数

// Matter.jsのクラスを使う時、Matter.を省略するための指定
const Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
let engine;
let world;
let circles = [];
let grounds = [];

//画像データ用の変数
let foodImg;

function preload() {
  foodImg = loadImage("./images/food.png");
}


function setup() {
  createCanvas(1000, 750);
  Datamate.make("FoodWaste.csv");
  Datamate.makeAreas(0, 25, width, height-25, 8, 2);

  engine = Engine.create();
  world = engine.world;

  engine.enableSleeping = true;  //静止している物体を無視
  world.positionIterations = 3;  //位置修正の反復回数

  for (let i=0; i<number; i++) {
    const area = Datamate.area(i);
    grounds.push(new Boundary(area.left, area.centerY, 10, area.height));
    grounds.push(new Boundary(area.right, area.centerY, 10, area.height));
    grounds.push(new Boundary(area.centerX, area.bottom-20, area.width, 40));

    count[i] = calcCount(Datamate.columnName(i), i);  //個数を計算しておく
    countDone[i] = 0;
  }
  World.add(world, grounds);
  engine.gravity.y = 0.5;
}

function draw() {
  background(240);

  for (let i=0; i<number; i++) {  //国ごとに順に見ていく
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
  for (let i=0; i<number; i++) {  //国名とデータ値、線を描く
    drawCountryName(Datamate.columnName(i), i);
  }
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(14);
  text(title, 30, 15);  //データ名の表示
}

function calcCount(country, block) { //テーブルから値を取り出し、円の個数を計算
  const index = Datamate.focusY(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(index, country)
    return floor(map(value, 7300000, 92000000, 20, 100));  //円の個数
    //中国はベトナムの約12倍だが、minの値が小さいと食品廃棄量も少ない印象になってしまうので20に設定
}

function drawData(country, block) {
  const area = Datamate.area(block);  //エリアをとりだす

  circles.push(new Circle(area.centerX, area.top+100, d, foodImg));  //円を作る
  countDone[block] = countDone[block] + 1;
}

function drawCountryName(country, block) {
  const area = Datamate.area(block);  //エリアをとりだす
  const index = Datamate.focusY(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(index, country);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(country, area.centerX, area.bottom-25);
  text(value + "トン", area.centerX, area.bottom-10);
}

function mousePressed() {//マウスボタンが押されたら要素を全部消す
  for (let i=0; i<number; i++) {
    countDone[i] = 0;
  }
  for (let circle of circles) {
    circle.removeFromWorld();
  }
  circles.splice(0);
}
