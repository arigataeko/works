let faceMesh;
let video;
let faces = [];
let memory = {}; 

let wordList = ["元気ですかー！", "わあああ！",
                "こんにちはー！", "おつかれさま｜！",
                "酒だー！", "やったあああ！",
                "もうすぐ休みだー！","最高だーッ！"
];

function preload() {
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  faceMesh = ml5.faceMesh({ maxFaces: 5, flipped: true });
}

function setup() {
  createCanvas(640, 480);
  faceMesh.detectStart(video, (results) => {
    faces = results;
  });
}

function draw() {
  image(video, 0, 0, width, height);

  if (faces && faces.length > 0) {
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i];
      let id = face.id !== undefined ? face.id : i;

      if (!memory[id]) {
        memory[id] = { msg: "", isOpened: false };
      }

      let faceLeft = face.keypoints[234];
      let faceRight = face.keypoints[454];
      let faceWidth = dist(faceLeft.x, faceLeft.y, faceRight.x, faceRight.y);

      let mouthTop = face.keypoints[13];
      let mouthBottom = face.keypoints[14];
      let forehead = face.keypoints[10]; 

      if (mouthTop && mouthBottom && faceWidth > 0) {
        let currentMouthD = dist(mouthTop.x, mouthTop.y, mouthBottom.x, mouthBottom.y);
        let mouthRatio = currentMouthD / faceWidth; 

        if (mouthRatio > 0.1) {
          if (!memory[id].isOpened) {
            memory[id].msg = random(wordList);
            memory[id].isOpened = true; 
          }
          
          let focusSize = faceWidth * 0.2; 
          let offsetY = faceWidth * 0.1;
          
          // 均等な長さの集中線を描画
          drawEqualFocusLines(mouthTop.x, mouthTop.y + offsetY, focusSize, faceWidth);
          drawSpeechBubbleAt(memory[id].msg, forehead.x, forehead.y - 60);
        } else {
          memory[id].isOpened = false;
        }
      }
    }
  }
  
  if (frameCount % 300 === 0) { memory = {}; }
}

// 線の長さを均等にする関数
function drawEqualFocusLines(cx, cy, r, fWidth) {
  push();
  stroke(255, 255, 0); 
  strokeWeight(3);
  
  let numLines = 30; // 線の本数
  let lineLen = fWidth; 
  
  for (let i = 0; i < numLines; i++) {
    let angle = TWO_PI / numLines * i;
    
    // 開始点（円の縁）
    let x1 = cx + cos(angle) * r;
    let y1 = cy + sin(angle) * r;
    
    // 終了点（開始点から一定の距離）
    let x2 = cx + cos(angle) * (r + lineLen);
    let y2 = cy + sin(angle) * (r + lineLen);
    
    line(x1, y1, x2, y2);
  }
  pop();
}

function drawSpeechBubbleAt(msg, x, y) {
  push();
  textSize(24);
  let txtW = textWidth(msg);
  let bubbleW = txtW + 40; 
  let bubbleH = 50;
  translate(x, y - bubbleH); 
  fill(255, 255, 255, 230);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(0, 0, bubbleW, bubbleH, 25);
  triangle(-10, bubbleH/2, 10, bubbleH/2, 0, bubbleH/2 + 15);
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();
  text(msg, 0, 0); 
  pop();
}
