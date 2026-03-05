let video;      // Webカメラの映像データ
let faceMesh;
let faces = []; // 認識された「全員分」の顔データが入るリスト
let mic;        // マイク入力
let fft;        // 音の高さ分析用
let isAudioStarted = false; // 音声機能がスタートしたかどうか
let isModelLoaded = false;  // faceMeshの準備ができたかどうか
let paper;  // 絵を描くための透明な「画用紙」

function preload() {
  // maxFaces: 5 にして、最大5人まで同時に認識できるように設定
  faceMesh = ml5.faceMesh({ maxFaces: 5 }, function() {
    console.log("読み込み完了！");
    isModelLoaded = true; // faceMeshの準備完了
  });
}

function setup() {
  // 画面の大きさをブラウザ全体に合わせる
  createCanvas(windowWidth, windowHeight);
  // 「画用紙」も画面と同じサイズで作る
  paper = createGraphics(windowWidth, windowHeight);
  paper.colorMode(HSB, 360, 100, 100, 100);
  paper.noStroke();

  // Webカメラの準備
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // 映像そのものは隠して、「画用紙」に描画する

  // faceMeshの開始
  faceMesh.detectStart(video, gotFaces);

  // 音声入力の準備（まだ開始はしない）
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  fft.setInput(mic);

  // 色のモードをHSB（色相, 彩度, 明度）に設定
  // 0〜360の色相環で色を指定しやすくするため
  colorMode(HSB, 360, 100, 100, 100);
  
  // 背景を黒く塗りつぶす
  background(0);
}

function draw() {
  // 座標系を左右反転させる処理
  push(); // 設定を保存
  translate(width, 0); // 原点を右端に移動
  scale(-1, 1);        // X軸をひっくり返す
  
  // 縦横比を崩さないために、画面サイズに合わせて映像の配置場所を計算する
  // カメラ(640x480) と 画面(width x height) の比率を比べる
  let scaleF = max(width / video.width, height / video.height);
  
  // 画面を埋め尽くすための新しいサイズを計算
  let newW = video.width * scaleF;
  let newH = video.height * scaleF;
  
  // 画面の真ん中に来るように位置を計算
  // (画面幅 - 映像幅) / 2 で、余った分を左右（または上下）均等にずらす
  let offsetX = (width - newW) / 2;
  let offsetY = (height - newH) / 2;

  // カメラ映像の表示
  tint(255, 70); // 70は透明度
  image(video, offsetX, offsetY, newW, newH);
  
  // これまで描いた絵がここに表示される
  image(paper, 0, 0); // 透明な「画用紙」を重ねて表示

  // 音声がスタートしていて、かつ誰かの顔が見つかっている場合のみ処理する
  if (isAudioStarted && faces.length > 0) {
    
    // 音のデータを取得（全員共通）
    let vol = mic.getLevel();           // 音の大きさ (0.0 〜 1.0)
    let spectrum = fft.analyze();       // 周波数分析の実行
    let centroid = fft.getCentroid();   // 音の高さの目安

    // 見つかった「全員分」の顔を順番に処理するループ
    for (let i = 0; i < faces.length; i++) {
      let face = faces[i]; // i番目の人の顔データを取り出す

      // 唇の座標を取得（FaceMeshの点番号: 13=上唇中央, 14=下唇中央）
      let upperLip = face.keypoints[13];
      let lowerLip = face.keypoints[14];

      // 座標をキャンバスのサイズに合わせて変換
      let x = map((upperLip.x + lowerLip.x) / 2, 0, video.width, offsetX, offsetX + newW);
      let y = map((upperLip.y + lowerLip.y) / 2, 0, video.height, offsetY, offsetY + newH);
      
      // 映像を映し出していないとき用
      // 唇の位置に白い点を表示（声を出してなくても場所がわかるように）
      noStroke();
      //fill(255);
      //circle(x, y, 5);

      // 音がある程度大きいときだけ、色を描く
      if (vol > 0.01) {
        
        // 音の高さを色（0〜360）に変換
        let hueVal = map(centroid, 500, 4000, 0, 360);
        hueVal = constrain(hueVal, 0, 360); // 値が範囲外に出ないように制限
        
        // 音の大きさを円のサイズに変換
        let size = map(vol, 0, 0.3, 20, 400);

        // 画面ではなく透明な「画用紙」に円を描く
        paper.fill(hueVal, 80, 100, 30); // 色を設定 // 最後の30は透明度(重ね塗りした時に綺麗に見えるように)
        paper.circle(x, y, size);
      }
    }
  }
  
  pop(); // 左右反転の設定を終了（元の座標系に戻す）

  // 画面上の案内テキスト（反転させないためpopの後に書く）
  if (!isModelLoaded) {
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text("読み込み中...", width/2, height/2);
  } else if (!isAudioStarted) {
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("画面をクリックしてスタート！", width/2, height/2);
  } else {
    // 操作説明を右下に小さく出す
    fill(255,150);  // 色相,透明度
    textAlign(RIGHT);
    textSize(16);
    text("spaceキーでリセット", width-20, height-20);
  }
}

// クリック時の処理
function mousePressed() {
  // モデルの準備ができていて、まだ音声が始まっていないなら
  if (isModelLoaded && !isAudioStarted) {
    userStartAudio(); // ブラウザの音声機能をオンにする
    mic.start();      // マイク入力を開始
    isAudioStarted = true;
  }
}

// spaceキーが押された時の処理
function keyPressed() {
  // spaceキーが押されたら
  if (key === ' ' ) {
    paper.clear(); // 「画用紙」を綺麗にする
    // ブラウザのデフォルト動作（スクロール）を防ぐ
    return false;
  }
}

// 顔が見つかった時に呼ばれる関数
function gotFaces(results) {
  faces = results; // 見つかった顔データを変数に保存
}

// 画面サイズが変わった時の処理
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  paper = createGraphics(windowWidth, windowHeight);
  paper.colorMode(HSB, 360, 100, 100, 100);
  paper.noStroke();
  background(0);
}
