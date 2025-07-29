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
  drawKeypoints();  //すべてのkeypointを描く
}

function drawKeypoints() {  // 検知されたキーポイントに円を描く関数
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; //検知された顔から順に一つ取り出す    
    for (let j = 0; j < face.keypoints.length; j++) {   // 468のポイントに円を描く
      let keypoint = face.keypoints[j];
      fill(255, 0, 255);
      circle(keypoint.x, keypoint.y, 5);
    }
  }  
}
