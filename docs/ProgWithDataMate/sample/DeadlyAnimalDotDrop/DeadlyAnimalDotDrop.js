// 人を殺す動物
const title = "動物に殺された人間の数(2015年）";
const d = 3;
const number = 16; //動物の種類の数
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


function setup() {
  createCanvas(750, 750);
  Datamate.make("DeadlyAnimal.csv");
  Datamate.makeAreas(0, 25, width, height-25, 8, 2);
 // Datamate.bindAreas([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

  engine = Engine.create();
  world = engine.world;
  //（蠢くのを軽減)
  engine.enableSleeping = true; //静止している物体を無視
  world.positionIterations = 3; // 位置修正の反復回数 デフォルトは6
  //world.constraintIterations = 1; // 制約の反復回数  デフォルトは2

  for (let i=0; i<number; i++) {
    const area = Datamate.area(i);  //エリアをとりだす
    grounds.push(new Boundary(area.left, area.centerY, 6, area.height));  //左側
    grounds.push(new Boundary(area.right, area.centerY, 6, area.height));  //右側
    grounds.push(new Boundary(area.centerX, area.bottom-20, area.width, 40));  //下

    count[i] = calcCount(Datamate.columnName(i), i);  //個数を計算しておく
    countDone[i] = 0;
  }
  World.add(world, grounds);
  engine.gravity.y = 0.5; //スピードを緩めるため
}

function draw() {
  background(240);

  for (let i=0; i<number; i++) {  //動物ごとに順に見ていく
    if (countDone[i] < count[i]) {  //count分のcircleを作り終えていない時
      drawData(Datamate.columnName(i), i); //circleを作る
    }
  }

  Engine.update(engine);
  for (let circle of circles) {
    circle.show();
  }
  for (let ground of grounds) {
    ground.show();
  }
  for (let i=0; i<number; i++) {  //動物名とデータ値、線を描く
    drawAnimalName(Datamate.columnName(i), i);
  }
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(14);
  text(title, 30, 15);  //データ名の表示
}

function calcCount(animal, block) { //デーブルから値を取り出し、円の個数を計算
  const index = Datamate.focusY(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(index, animal)
    return floor(map(value, 1, 830000, 1, 1000)); //円の個数
}

function drawData(animal, block) {
  const area = Datamate.area(block);  //エリアをとりだす
  //print(animal + " index: " + block + " count : " + count[block] + "  area: " + (area.height/d) + "  " + (area.width/d));

  circles.push(new Circle(area.centerX, area.top+20, d));  //円を作る
  countDone[block] = countDone[block] + 1;
}

function drawAnimalName(animal, block) {
  const area = Datamate.area(block);  //エリアをとりだす
  const index = Datamate.focusY(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(index, animal)

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(animal, area.centerX, area.bottom-25);
  text(value + "人", area.centerX, area.bottom-10);

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
