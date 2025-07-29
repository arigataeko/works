
const title = "各国の食肉一人当たりの年間消費量(2024年）";
const d = 3;
const number = 36; //国の種類の数
let count = [];  //円の個数
let countDone = []; //国ごとにすでに作った円の数

// Matter.jsのクラスを使う時、Matter.を省略するための指定
const Engine = Matter.Engine,
  　  World = Matter.World,
  　  Bodies = Matter.Bodies;
let engine;
let world;
let circles = [];
let grounds = [];
let BGColor = ["#D178AD", "#4D8DCB", "#B89B66", "#75BFEB"];

let prev; //今フォーカスしている肉種

let ImgX = [];
let ImgY = [];
let ImgZ = [];

function preload() {
  ImgX[0] = loadImage("./images/ushisan.png");
  ImgX[1] = loadImage("./images/butasan.png");
  ImgX[2] = loadImage("./images/torisan.png");
  ImgX[3] = loadImage("./images/hitsujisan.png");

  ImgY[0] = loadImage("./images/America.png");
  ImgY[1] = loadImage("./images/Canada.png");
  ImgY[2] = loadImage("./images/Mexico.png");
  ImgY[3] = loadImage("./images/Colombia.png");
  ImgY[4] = loadImage("./images/Brazil.png");
  ImgY[5] = loadImage("./images/Perou.png");
  ImgY[6] = loadImage("./images/Chile.png");
  ImgY[7] = loadImage("./images/Paraguay.png");
  ImgY[8] = loadImage("./images/Argentina.png");
  ImgY[9] = loadImage("./images/Norway.png");
  ImgY[10] = loadImage("./images/Russia.png");
  ImgY[11] = loadImage("./images/Ukraine.png");
  ImgY[12] = loadImage("./images/United-Kingdom.png");
  ImgY[13] = loadImage("./images/European-Union.png");
  ImgY[14] = loadImage("./images/Switzerland.png");
  ImgY[15] = loadImage("./images/Ethiopia.png");
  ImgY[16] = loadImage("./images/South-Africa.png");
  ImgY[17] = loadImage("./images/Philippines.png");
  ImgY[18] = loadImage("./images/Australia.png");
  ImgY[19] = loadImage("./images/New-Zealand.png");
  ImgY[20] = loadImage("./images/South-Korea.png");
  ImgY[21] = loadImage("./images/Kazakhstan.png");
  ImgY[22] = loadImage("./images/Turkey.png");
  ImgY[23] = loadImage("./images/Iran.png");
  ImgY[24] = loadImage("./images/Saudi-Arabia.png");
  ImgY[25] = loadImage("./images/Pakistan.png");
  ImgY[26] = loadImage("./images/Egypt.png");
  ImgY[27] = loadImage("./images/Nigeria.png");
  ImgY[28] = loadImage("./images/Malaysia.png");
  ImgY[29] = loadImage("./images/Indonesia.png");
  ImgY[30] = loadImage("./images/Israel.png");
  ImgY[31] = loadImage("./images/India.png");
  ImgY[32] = loadImage("./images/Thailand.png");
  ImgY[33] = loadImage("./images/Vietnam.png");
  ImgY[34] = loadImage("./images/China.png");
  ImgY[35] = loadImage("./images/Japan.png");

  ImgZ[0] = loadImage("./images/ushi.png");
  ImgZ[1] = loadImage("./images/buta.png");
  ImgZ[2] = loadImage("./images/tori.png");
  ImgZ[3] = loadImage("./images/hitsuji.png");
}


function setup() {
  imageMode(CENTER);
  createCanvas(800, 1500);
  Datamate.make("MeatConsumption.csv");
  Datamate.makeAreas(0, 25, width, height-15, 6, 6);
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

    count[i] = 0;
    countDone[i] = 0;
  }


  World.add(world, grounds);
  //engine.gravity.y = 1; //スピードを緩めるため


  Datamate.play(0.03, 0);  //横方向に動かす

  prev = Datamate.columnName(0); //牛を入れておく

  /*for (let i=0; i<number; i++) {
   countDone[i] = 0;
   }
   for (let circle of circles) {
   circle.removeFromWorld();
   }
   circles.splice(0);*/


  //Datamate.loop(false, false);    //ループする
}

function draw() {
  background(BGColor[Datamate.focusX(0)]);
  for (let i=0; i<number; i++) {  //種類ごとに順に見ていく

    count[i] = calcCount(Datamate.rowName(i), i);  //個数を計算しておく

    if (countDone[i] < count[i]) {  //count分のcircleを作り終えていない時
      drawData(Datamate.rowName(i), i); //circleを作る
    }
  }

  Engine.update(engine);
  for (let circle of circles) {
    circle.show();
  }
  for (let ground of grounds) {
    ground.show();
  }
  for (let i=0; i<number; i++) {  //種類とデータ値、線を描く
    drawCountryName(Datamate.rowName(i), i);
  }

  fill("#edde7b");
  noStroke();
  rect(0, 0, 1500, 26);
  fill(0);
  stroke(0);
  strokeWeight(1);
  textAlign(LEFT, CENTER);
  textSize(14);
  text(title + Datamate.columnName(Datamate.focusX(0))+"肉", 35, 15);  //データ名の表示
  noStroke();
  image(ImgZ[Datamate.focusX(0)], 18, 13, 26, 26);

  if (Datamate.focusX(0)) {
  }

  if (prev != Datamate.columnName(Datamate.focusX(0))) {  //次の肉種に移動したら粒子をクリア
    for (let i=0; i<number; i++) {
      countDone[i] = 0;
    }
    for (let circle of circles) {
      circle.removeFromWorld();
    }
    circles.splice(0);
    prev = Datamate.columnName(Datamate.focusX(0));
  }
}

function calcCount(country, block) { //デーブルから値を取り出し、円の個数を計算
  const index = Datamate.focusX(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(country, index)
    return floor(map(value, 0, 43, 0, 400)); //円の個数
}

function drawData(country, block) {
  const area = Datamate.area(block);  //エリアをとりだす
  //print(animal + " index: " + block + " count : " + count[block] + "  area: " + (area.height/d) + "  " + (area.width/d));

  //circles.push(new Circle(area.centerX, area.top+20, d));  //円を作る
  circles.push(new Circle(area.centerX, area.top+20, d, ImgX[Datamate.focusX(0)]));
  countDone[block] = countDone[block] + 1;
}

function drawCountryName(country, block) {
  const area = Datamate.area(block);  //エリアをとりだす
  const index = Datamate.focusX(0);  //今フォーカスしているデータのインデックス
  const value = Datamate.value(country, index)

    image(ImgY[block], area.centerX, area.centerY-100, 80, 50);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(country, area.centerX, area.bottom-32);
  text(value + "kg", area.centerX, area.bottom-17);

  //text(Datamate.columnName(Datamate.focusX(0)) +" " +value + "kg", area.centerX, area.bottom-10);
}


function mousePressed() {
  for (let i=0; i<number; i++) {
    countDone[i] = 0;
  }
  for (let circle of circles) {
    circle.removeFromWorld();
  }
  //Datamate.move(0);
  //マウスプレスで次の肉種へ移動
  Datamate.move((Datamate.focusX(0)+1)%Datamate.columnCount());
  Datamate.play(0.03, 0);
  circles.splice(0);  //要素を全削 (インデックス0以降のすべての要素を削除)
}
