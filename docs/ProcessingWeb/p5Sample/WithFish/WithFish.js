let video;
let num = 0;
let swimFish = [];
let poseNet;
let poses = [];
let pSystem;

function preload() {  //createCaptureの処理終了後にsizeを指定
  video = createCapture(VIDEO, () => {
    video.size(640, 480);
  }
  );
}

function setup() {
  createCanvas(640, 480);

  // poseNet の初期化
  poseNet = ml5.poseNet(video, modelReady); //入力元とコールバック関数を指定
  // コールバック関数の指定
  poseNet.on('pose', (results) => {
    poses = results;
  }
  );
  video.hide();  //元のビデオ画像を表示しない
  pixelDensity(1);  //高解像度ディスプレイへの対応

  //泡が出る中心 最初は枠外
  pSystem = new ParticleSystem(createVector(-100, -100));

  let y = 0;
  num = height/12;
  for (let i=0; i<=num; i++) { //魚の位置が端になるまでオブジェクトをつくる
    y = y + num;
    swimFish[i] = new Fish(round(random(1, 20)), y, round(random(1, 3)), round(random(2, 5)), round(random(0, 1)));
  }
}

function modelReady() {
  console.log("Model loaded");
}


function draw() {
  image(video, 0, 0, width, height);

  drowSnorkelEye(); //マスクを描く
  drawParticles(); //泡を描く
  drowSnorkelMouse();

  for (let i=0; i<num; i++) {
    swimFish[i].update();  //魚を描く
  } 
  //海フィルター
  rectMode(CORNER);
  fill(65, 105, 225, 100);
  rect(0, 0, 640, 480);
}

function drawParticles() { //泡を描く
  for (let i = 0; i < poses.length; i++) {  // 検知されたポーズごとにループ
    let pose = poses[i].pose;
    if (pose.score > 0.2) {  //ポーズの精度の平均が0.2以上の時だけ
      let awaX = pose.keypoints[0].position.x;  //x
      let awaY = pose.keypoints[0].position.y + 30;  //y

      pSystem.origin.x = awaX;
      pSystem.origin.y = awaY;
      if (second() % 4 == 0) {
        pSystem.addParticle();
      }
      pSystem.run();
    }
  }
}

function drowSnorkelEye() { //シュノーケル(ゴーグル部分)を描く
  for (let i = 0; i < poses.length; i++) {
    　// 検知されたポーズごとにループ
      let pose = poses[i].pose;
    if (pose.score > 0.2) {
      　//ポーズの精度が0.2以上のときだけ
        let noseX = pose.keypoints[0].position.x;
      　//鼻のx座標
        let noseY = pose.keypoints[0].position.y;
      　//鼻のy座標
        let eyeLX = pose.keypoints[1].position.x;
      　//左目のx座標
        let eyeLY = pose.keypoints[1].position.y;
      　//左目のy座標
        let eyeRX = pose.keypoints[2].position.x;
      　//右目のx座標
        let eyeRY = pose.keypoints[2].position.y;
      　//右目のy座標

        let haba = dist(eyeLX, eyeLY, eyeRX, eyeRY);

      rectMode(CENTER);
      stroke(65, 105, 225);
      strokeWeight(10);
      fill(240, 248, 255, 100);
      rect(eyeRX + haba/2, eyeLY, haba*2, haba, haba/6); //目
      noStroke();
      fill(65, 105, 225);
      triangle(noseX, noseY-haba/2, noseX-haba/2.2, noseY+haba/3.5, noseX+haba/2.2, noseY+haba/3.5); //鼻
    }
  }
}

function drowSnorkelMouse() { //シュノーケル(口部分)を描く
  for (let i = 0; i < poses.length; i++) {
    　// 検知されたポーズごとにループ
      let pose = poses[i].pose;
    if (pose.score > 0.2) {
      　//ポーズの精度が0.2以上のときだけ
        let noseX = pose.keypoints[0].position.x;
      　//鼻のx座標
        let noseY = pose.keypoints[0].position.y;
      　//鼻のy座標
        let eyeLX = pose.keypoints[1].position.x;
      　//左目のx座標
        let eyeLY = pose.keypoints[1].position.y;
      　//左目のy座標
        let eyeRX = pose.keypoints[2].position.x;
      　//右目のx座標
        let eyeRY = pose.keypoints[2].position.y;
      　//右目のy座標

        let haba = dist(eyeLX, eyeLY, eyeRX, eyeRY);

      noStroke()
      fill(25, 25, 112);
      ellipse(noseX, noseY+haba/1.5, haba/1.2, haba/1.2); //口円
      fill(240, 248, 255, 200);
      rect(noseX+haba/1.2, noseY+haba/1.5, haba*1.2, haba/2.2, haba/6); //空気口横
      rect(noseX+haba*1.2, noseY+haba/1.8-haba/1.1, haba/2.2, haba*2.5, haba/6); //空気口縦
      fill(25, 25, 112);
      rect(noseX, noseY+haba/1.5, haba, haba/2); //口四角
    }
  }
}
