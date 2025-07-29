/* ===
 ml5 Example
 BodyPose example using p5.js
 === */
let bodyPose;
let video;   //キャプチャするカメラ映像
let poses = [];  //検知したポーズ
let connections;  //キーポイントの繋がり

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
  connections = bodyPose.getSkeleton();
  //[[0,1]、[0,2]、...]は、キーポイント0（鼻）と1（左目）が接続され、
  //キーポイント0（鼻）と2（右目）が接続されていることを意味する
}

function gotPoses(results) { //ポーズを検出したときに呼び出され、検知結果をグローバル変数posesに代入
  poses = results;
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();    // 検知されたキーポイントを描く
  drawSkeleton();     // 検知された骨格skeletonを描く
}

//検知されたキーポイントの位置に円を描く
function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {  // 検知されたポーズごとにループ
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {  //体の部位(キーポイント)のループ
      let keypoint = pose.keypoints[j];
      if (keypoint.confidence > 0.1) {  // ポーズの信頼度が0.2以上の時に円を描く
        fill(255, 0, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}
// 検出されたポーズのキーポイントを線で結ぶことで、骨格skeletonを描く
function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) { // 検知されたポーズごとにループ
    let pose = poses[i];
    // poseごとに、全てのbody connectionsのループ
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];    //繋がっているポイントのインデックス
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];  //繋がっているポイントの位置情報
      let pointB = pose.keypoints[pointBIndex];
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) { //どちらの信頼度も0.2以上の時だけ描く
        stroke(255, 0, 0);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }
}
