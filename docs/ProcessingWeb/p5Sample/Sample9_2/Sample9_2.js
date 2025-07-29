/* ===
 ml5 Example
 FaceMesh example using p5.js
 検知したポジションの鼻と目のポジションに円を描く
 === */
let facemesh;
let video;
let faces = [];

function preload() {
  // Load the faceMesh model
  facemesh = ml5.faceMesh();
}

function setup() {
  createCanvas(640, 480);  //キャプチャした画像を表示するキャンバス
  video = createCapture(VIDEO);
  video.size(width, height);  //キャプチャする画像の大きさをキャンバスと同じにする
  video.hide();  //元のビデオ画像を表示しない
  // Start detecting faces from the webcam video
  facemesh.detectStart(video, gotResult);
}

function gotResult(results) { // 新しい検知(予測)がされるごとに実行される関数を定義
  faces = results;    // 検知結果をグローバル変数facesに代入
}

function draw() {
  image(video, 0, 0, width, height);
  drawEyeMouth();  //目と唇を描く
}

// 検知された顔の上に目と唇を描く関数
function drawEyeMouth() {
  for (let i = 0; i < faces.length; i++) {
    let keypoints = faces[i].keypoints;
    //目頭間の距離 目の大きさの調整に使う
    let haba = dist(keypoints[362].x, keypoints[362].y, keypoints[133].x, keypoints[133].y);
    noStroke();
    fill(255);
    circle(keypoints[386].x, keypoints[386].y, haba); //左
    circle(keypoints[159].x, keypoints[159].y, haba); //右
    fill(0);
    circle(keypoints[386].x, keypoints[386].y, haba/2); //左
    circle(keypoints[159].x, keypoints[159].y, haba/2); //右
    
    let lipsOuter = faces[i].lips.keypoints;
    
     noFill();
    strokeWeight(10);
    stroke(200, 0, 0);
    
    for (let i=0; i<lipsOuter.length; i++) {
      point(lipsOuter[i].x, lipsOuter[i].y);
    }
  
    /*
    //唇を描く
    let lipsLower = faces[i].annotations.lipsLowerOuter;  //下唇外側の10位置の座標
    let lipsUpper = faces[i].annotations.lipsUpperOuter;  //上唇外側の11位置の座標
    noFill();
    strokeWeight(10);
    stroke(200, 0, 0);
    beginShape();  //下唇の曲線を描く
    for (let i=0; i<lipsLower.length; i++) {
      curveVertex(lipsLower[i][0], lipsLower[i][1]);
    }
    endShape();
    beginShape();   //上唇の曲線を描く
    for (let i=0; i<lipsUpper.length; i++) {
      curveVertex(lipsUpper[i][0], lipsUpper[i][1]);
    }
    endShape();
    */
  }
}
