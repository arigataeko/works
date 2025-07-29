let facemesh;
let video;
let faces = [];
let fallingY = []; // 各パーツの初期落下位置（画面外）
let targetY = [];// パーツが止まる目標位置（右目, 左目, 口, 鼻, リボン）
let fallSpeed = 4; // 落ちる速度
let currentPart = []; // 現在落ちているパーツのインデックス
let eyeImage1, eyeImage2, eyeImage3, eyeImage4, eyeImage5; // 各パーツの画像
let canvasWidth = 640; // キャンバスとビデオの幅
let canvasHeight = 480; // キャンバスとビデオの高さ
let faceDetected = false; // 顔が検出されているかどうか
let yOffset = -20; // 全体のオフセット（上方向）

let options = { maxFaces: 3, refineLandmarks: false, flipped: true };

function preload() {
  facemesh = ml5.faceMesh(options); // FaceMesh
  eyeImage1 = loadImage('img/eye1-02.png'); // 右目
  eyeImage2 = loadImage('img/eye1-01.png'); // 左目
  eyeImage3 = loadImage('img/mouth.png'); // 口
  eyeImage4 = loadImage('img/nose.png'); // 鼻
  eyeImage5 = loadImage('img/ribon.png'); // リボン
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  video = createCapture(VIDEO); // カメラ映像の取得
  video.size(canvasWidth, canvasHeight); // カメラ映像のサイズをキャンバスに合わせる
  video.hide(); // 元のビデオ映像を非表示
  facemesh.detectStart(video, gotResult); // FaceMeshの検出を開始
  
  for(let i=0; i<3; i++){
    targetY[i] = [0, 0, 0, 0, 0]; 
    fallingY[i] = [-150, -150, -150, -150, -150];
    currentPart[i] = 0;
  }
}

function gotResult(results) {
  faces = results; // 検知結果を保存
  if (faces.length > 0) {
    faceDetected = true; // 顔が検出された
    for (let i = 0; i<faces.length; i++) {
      // 各パーツのy座標を目標位置に設定
      targetY[i][0] = faces[i].keypoints[159].y + yOffset; // 右目
      targetY[i][1] = faces[i].keypoints[386].y + yOffset; // 左目
      targetY[i][2] = faces[i].keypoints[0].y + yOffset; // 口
      targetY[i][3] = faces[i].keypoints[5].y + yOffset; // 鼻
      targetY[i][4] = faces[i].keypoints[297].y; // リボン
     }
  } else {
    faceDetected = false; // 顔が検出されていない
  }
}

function draw() {
  push();  //左右反転
  translate(width, 0);  // 右端へ移動
  scale(-1, 1);         // 左右反転
　image(video, 0, 0, canvasWidth, canvasHeight);
  pop();
  
  if (faceDetected) {
       for (let i = 0; i<faces.length; i++) {

      let keypoints = faces[i].keypoints;

      // 両目の距離を計算
      let eyeWidth = dist(keypoints[362].x, keypoints[362].y, keypoints[133].x, keypoints[133].y);

      // パーツの落下アニメーション
      if (fallingY[i][currentPart[i]] < targetY[i][currentPart[i]]) {
        fallingY[i][currentPart[i]] += fallSpeed;
      } else if (currentPart[i] < 5) {
        currentPart[i]++; // 次のパーツ
      }

      // 右目の描画
      let eye1Width = eyeWidth * 1.2; // サイズ調整
      let rightEyeY = currentPart[i] > 0 ? keypoints[159].y + yOffset : fallingY[i][0];
      image(eyeImage1, keypoints[159].x - eye1Width / 2, rightEyeY, eye1Width, eye1Width);

      // 左目の描画
      let eye2Width = eyeWidth * 1.2;
      let leftEyeY = currentPart[i] > 1 ? keypoints[386].y + yOffset : fallingY[i][1];
      image(eyeImage2, keypoints[386].x - eye2Width / 2, leftEyeY, eye2Width, eye2Width);

      // 口の描画
      let mouthWidth = eyeWidth * 1.5;
      let mouthY = currentPart[i] > 2 ? keypoints[0].y + yOffset : fallingY[i][2];
      image(eyeImage3, keypoints[0].x - mouthWidth / 2, mouthY, mouthWidth, mouthWidth);

      // 鼻の描画
      let noseWidth = eyeWidth * 1.2;
      let noseY = currentPart[i] > 3 ? keypoints[5].y + yOffset : fallingY[i][3];
      image(eyeImage4, keypoints[5].x - noseWidth / 2, noseY, noseWidth, noseWidth);

      // リボンの描画
      let ribbonWidth = eyeWidth * 2;
      let ribbonY = currentPart[i] > 4 ? keypoints[297].y + yOffset : fallingY[i][4];
      image(eyeImage5, keypoints[297].x - ribbonWidth / 2, ribbonY, ribbonWidth, ribbonWidth);
      }
  } else {
    // 顔が検出されていない場合はリセット
    resetParts();
  }
}

function resetParts() {
  for(let i=0; i<3; i++){
    fallingY[i] = [-150, -150, -150, -150, -150];  // 各パーツの落下位置を初期化（画面外）
    currentPart[i] = 0;  // 現在のパーツインデックスを初期化
  }
}
