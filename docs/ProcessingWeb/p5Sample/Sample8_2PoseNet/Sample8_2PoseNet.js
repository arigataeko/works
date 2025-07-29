/* ===
 ml5 Example
 PoseNet example using p5.js
 検知したポジションの鼻と目のポジションに円を描く
 === */

let video;
let poseNet;
let poses = [];

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

  // 目と鼻を描く
  drawEyeNose();
}

//検知されたキーポイントの目と鼻の位置に図形を描く
function drawEyeNose() {
  for (let i = 0; i < poses.length; i++) {  // 検知されたポーズごとにループ
    let pose = poses[i].pose;
    //print("score " + pose.score);
    if (pose.score > 0.2) {  //ポーズの精度の平均が0.2以上の時だけ
      let noseX = pose.keypoints[0].position.x;  //鼻x
      let noseY = pose.keypoints[0].position.y;  //鼻y
      let eyeLX = pose.keypoints[1].position.x;  //左目x
      let eyeLY = pose.keypoints[1].position.y;  //左目y
      let eyeRX = pose.keypoints[2].position.x;  //右目x
      let eyeRY = pose.keypoints[2].position.y;  //右目x
      //目の間の距離habaに合わせて、描く円の大きさを変える
      let haba = dist(eyeLX, eyeLY, eyeRX, eyeRY);
      noStroke();
      fill(200, 0, 0);
      ellipse(noseX, noseY+haba/4, haba/2, haba);
      //print("nose " + keypoint.position.x  + "  "  + keypoint.position.y);

      fill(255);
      ellipse(eyeLX, eyeLY, haba/2, haba/2); //左
      fill(0);
      ellipse(eyeLX, eyeLY, haba/4, haba/4);
      fill(255);
      ellipse(eyeRX, eyeRY, haba/2, haba/2); //右
      fill(0);
      ellipse(eyeRX, eyeRY, haba/4, haba/4);
    }
  }
}
