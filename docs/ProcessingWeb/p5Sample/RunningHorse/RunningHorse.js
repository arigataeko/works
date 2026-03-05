let bImg;       // 背景画像用
let character;  // キャラクタ用
let mic;        // マイク入力用
let btn;
let started = false;
let worldX = 0; // 進んだ総距離
let goalImg; //ゴール用
let goalX = 1300;
let vol;

// タイム計測用
let startTime = 0;
let endTime = 0;
let finalTime = 0;

function setup() {
  createCanvas(800, 500);
  bImg = loadImage("data/fieldH.png");
  goalImg = loadImage("data/ninjin.png");
  
  // マイク入力を開始
  mic = new p5.AudioIn();
  mic.start();
  
  character = new Character(); // キャラクタオブジェクト生成
  
  //リトライボタン
  btn = createButton('リトライ');
  btn.position(width-150, height-50);
  btn.mousePressed(resetGame)
  
  
}

function draw() {
  // 背景(進んだ距離に応じてループさせる)
  let x = -(worldX % bImg.width); 
  for (let i = x; i < width; i += bImg.width) {
    image(bImg, i, 0, bImg.width, height);
  }
  
  if (!started) {
    fill(0);
    textAlign(CENTER);
    textSize(30);
    text("press to start", width/2, height/2);
    return;
  }

  // 音量を取得
  vol = mic.getLevel();
  
  // 音量に基づいてスピードを計算し、進む
  let speed = character.calculateSpeed(vol);
  worldX += speed;
  
  // キャラクターの描画
  drawGoal();
  character.show(vol);
  print(vol);
  
  
  // 現在のスピードを表示
 /* fill(0);
  textAlign(LEFT);
  textSize(16);
  text("Speed: " + nfc(speed, 2), 20, 30);
  */
  
  
  //ゴールしたかの判定
  if (worldX > goalX) {
    endTime = millis();
    finalTime = (endTime - startTime) / 1000; // 秒に変換
    
    //クリア表示
    text("クリアタイム" + nf(finalTime, 0, 1) + "秒", width/2, height/3)
    showclear();
    noLoop();
  }
  
}


function drawGoal(){
  //ゴール画像表示
  let goalScreenX = (goalX - worldX) + character.x;
  image(goalImg, goalScreenX + 140, height - 170, 80, 80);
  
  //文字表示
  fill(255, 100, 0);
  textAlign(CENTER);
  textSize(16);
  text("GOAL!!", goalScreenX + 190, height - 180);
}


//クリアの文字表示
function showclear(){
  fill(255, 0, 0);
  textSize(60);
  textAlign(CENTER);
  text("クリア！", width / 2, height / 2); 
}

//リトライの処理
function resetGame(){
  worldX = 0;　//背景の初期化
  startTime = millis(); //タイムの初期化
  endTime = 0;
  finalTime = 0;
  loop();　//最初からにする
}

function mousePressed() {
  userStartAudio(); // ブラウザの音声再生制限を解除
  started = true;
}
