/* ===
 ml5 Example
 BodyPose example using p5.js
 検知したポジションの鼻と目のポジションに円を描く
 === */
let bodyPose;
let video;   //キャプチャするカメラ映像
let poses = [];  //検知したポーズ

function preload() {
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);  //キャプチャした画像を表示するキャンバス
  video = createCapture(VIDEO);
  video.size(width, height);  //キャプチャする画像の大きさをキャンバスと同じにする
    video.hide();  //元のビデオ画像を表示しない
  // BodyPosenに入力元とコールバック関数を指定
  bodyPose.detectStart(video, gotPoses);
}

function gotPoses(results) { //ポーズを検出したときに呼び出され、検知結果をグローバル変数posesに代入
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
    let pose = poses[i];
    //print("confidence " + pose.confidence);
    if (pose.confidence > 0.1) {  //ポーズの精度の平均が0.2以上の時だけ
      let noseX = pose.keypoints[0].x;  //鼻x
      let noseY = pose.keypoints[0].y;  //鼻y
      let eyeLX = pose.keypoints[1].x;  //左目x
      let eyeLY = pose.keypoints[1].y;  //左目y
      let eyeRX = pose.keypoints[2].x;  //右目x
      let eyeRY = pose.keypoints[2].y;  //右目x
      //目の間の距離habaに合わせて、描く円の大きさを変える
      let haba = dist(eyeLX, eyeLY, eyeRX, eyeRY);
      noStroke();
      fill(200, 0, 0);
      ellipse(noseX, noseY+haba/4, haba/2, haba);
      //print("nose " + pose.keypoints[0].x  + "  "  + pose.keypoints[0].y);

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
