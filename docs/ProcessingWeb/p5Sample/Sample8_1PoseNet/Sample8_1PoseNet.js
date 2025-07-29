/* ===
ml5 Example
PoseNet example using p5.js
=== */
let poseNet;
let video;   //キャプチャするカメラ映像
let poses = [];  //検知したポーズ

function setup() {
  createCanvas(640, 480);  //キャプチャした画像を表示するキャンバス
  video = createCapture(VIDEO);
  video.size(width, height);  //キャプチャする画像の大きさをキャンバスと同じにする
  // poseNet の初期化
  poseNet = ml5.poseNet(video, modelReady); //入力元とコールバック関数を指定
  // onメソッドで、新しいポーズが検知される度に、呼び出される関数を指定
  poseNet.on('pose', gotResult);
  video.hide();  //元のビデオ画像を表示しない
}

function modelReady() {
  console.log("Model loaded");
}

function gotResult(results){ // 検知結果をグローバル変数posesに代入
    poses = results;
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();    // 検知されたキーポイントを描く
  drawSkeleton();     // 検知された骨格skeletonを描く
}

//検知されたキーポイントの位置に円を描く
function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {  // 検知されたポーズごとにループ
    let pose = poses[i].pose;      
    for (let j = 0; j < pose.keypoints.length; j++) {  //体の部位(キーポイント)のループ
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {  // ポーズの信頼度が0.2以上の時に円を描く
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}
// 骨格skeletonを描く
function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) { // 検知されたポーズごとにループ
    let skeleton = poses[i].skeleton;
    // skeletonごとに、全てのbody connectionsのループ
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
