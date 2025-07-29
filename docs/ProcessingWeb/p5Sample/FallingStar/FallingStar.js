let bodyPose;
let poses = []; // 検知したポーズ
let video;
let num = 0;
let fallObj = [];
let rip;
let star;
let colorStar; // 色付きの星画像
let starSky; // 背景用のGIF
let starSound; // 音声ファイル
let backW = 1000;
let backH = 563;

function preload() {
  bodyPose = ml5.bodyPose();
  rip = loadImage("data/rip.png");
  star = loadImage("data/star.png");       // 通常の星画像
  colorStar = loadImage("data/colorStar.png"); // 色付きの星画像
  starSky = loadImage("data/StarSky.png"); // 背景用GIFのロード
  starSound = loadSound("data/StarSound.mp3"); // 音声ファイルのロード
}

function setup() {
  createCanvas(backW, backH+20);
  video = createCapture(VIDEO, () => {
    video.size(backW, backH);
  });
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  let x = 0;
  for (let i = 0; i <= width; i += 50) { // 間隔を調整
    num++;
    fallObj.push(new FallingImage(random(width), random(-200, 0), 3)); // ランダム位置から落下
  }
  //noStroke();
  imageMode(CENTER);
  textAlign(RIGHT);
  textFont('Courier New', 10);
}

function gotPoses(results) {
  poses = results; // ポーズを検出して保存
}

function draw() {
  //image(video, 0, 0, width, height);
  // 背景に画像を描画
  image(starSky, 0, 0, width*2, height*2);

  let lipX = 0;
  let lipY = 0;

  // ポーズデータが存在する場合
  if (poses.length > 0) {
    let pose = poses[0]; // 最初のポーズを取得
    if (pose.confidence > 0.1) { // 検出信頼度が高い場合のみ実行
      lipX = width - pose.keypoints[0].x; // 上唇のx座標(鼻)
      lipY = pose.keypoints[0].y+100; // 上唇のy座標

      // 唇の位置に画像を描画
      image(rip, lipX, lipY, 70, 50); // サイズを調整
    }
  }

  // 落下オブジェクトを更新
  for (let i = 0; i < num; i++) {
    fallObj[i].update(lipX, lipY); // 唇の位置を当たり判定に使用
  }
  text("効果音：音人", width-10, height-10); 
}
