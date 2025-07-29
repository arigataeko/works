const title = "";
const d = 4; //円の直径
const number = 8; //動物の種類の数
let count = [];  //円の個数
let countDone = []; //動物ごとにすでに作った円の数

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
  foodImg = loadImage("./images/gomi.PNG");
}


function setup() {
  createCanvas(900, 600);
  Datamate.make("Garbage.csv");
  Datamate.makeAreas(0, 0, width, height, 8, 1);
  
  engine = Engine.create();
  world = engine.world;
  print("start");
  engine.enableSleeping = true; //静止している物体を無視
  world.positionIterations = 3; // 位置修正の反復回数 デフォルトは6
  //world.constraintIterations = 1; // 制約の反復回数  デフォルトは2
  
   for (let i=0; i<number; i++) { 
    let area = Datamate.area(i);  //エリアをとりだす
   // print(area.left);
    grounds.push(new Boundary(area.left, area.centerY, 10, area.height));  //左側
    grounds.push(new Boundary(area.right, area.centerY, 10, area.height));  //右側
    grounds.push(new Boundary(area.centerX, area.bottom-20, area.width, 40));  //下

    count[i] = calcCount(Datamate.columnName(i), i);  //個数を計算しておく
    countDone[i] = 0;
  }
    //  print("end");
  World.add(world, grounds);
  engine.gravity.y = 0.5; //スピードを緩めるため
}

function draw() {
  background(500);
  /*for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);
  }*/
  
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
    drawAnimalName(Datamate.columnName(i), i);
  }
  
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(20);
  //print(title);
  text(title, 30, 15);  //データ名の表示
}

function calcCount(animal, block) { //デーブルから値を取り出し、円の個数を計算
  const index = Datamate.focusY(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(index, animal)
    return floor(map(value, 1600000, 15000000, 100, 1000)); //円の個数
}

function drawData(animal, block) {
  const area = Datamate.area(block);  //エリアをとりだす
  //print(animal + " index: " + block + " count : " + count[block] + "  area: " + (area.height/d) + "  " + (area.width/d));

  circles.push(new Circle(area.centerX, area.top-100, d, foodImg ));  //円を作る
  countDone[block] = countDone[block] + 1;
}

function drawAnimalName(animal, block) {
  const area = Datamate.area(block);  //エリアをとりだす
  const index = Datamate.focusY(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(index, animal)

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(13);
  text(animal, area.centerX, area.bottom-25);
  text(value + "t", area.centerX, area.bottom-10);
}

function mousePressed() {
  for (let i=0; i<number; i++) {
    countDone[i] = 0;
  }
  for (let circle of circles) {
    circle.removeFromWorld();
  }
  circles.splice(0);  //要素を全削 (インデックス0以降のすべての要素を削除)
}



/*function drawData(index) {
  const area = Datamate.area(index);
  const name = Datamate.columnName(index);//列のヘッダ
  const value = Datamate.value(0, index);
  const count = map(value, 1, 15501177, 1, 3000); //円の個数
  stroke(200);
  noFill();
  rect(area.left, area.top, area.width, area.height);  // エリアの矩形を描画
  noStroke();
  fill(200, 0, 0);
  let n = 0;
  out:   //個数分の円を描き終わったら、二重ループを抜けるために先頭にoutというラベルをつけた
  for (let j=0; j<area.height/d; j++) { 
    for (let i=0; i<area.width/d-1; i++) { //area.width/dで、areaの幅に並べられる直径dの円の個数を計算
      n++;
      if (n>count) {
        break out;  //円をcountの個数まで書いたらoutというラベルがついている二重ループを終了
      }
      circle(area.left+(i+1)*d, area.bottom-(j+1)*d-30, d);  //円を書く
    }
  }
  fill(0);
  textAlign(CENTER, CENTER);
  text(name, area.centerX, area.bottom-25);
  text(value+"t", area.centerX, area.bottom-10);
}*/
