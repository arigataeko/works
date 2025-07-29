let facemesh;
let video;
let predictions = [];
let num = 0;
let fallObj = [];
let threshold =150; // 白黒判定の閾値
const message =  "*･゜ﾟ･*:.｡..｡.:*･･*:.｡. .｡.:*･゜ﾟ･**･゜ﾟ･*:.｡..｡.:*･･*:.｡. .｡.:*･゜ﾟ･**･゜ﾟ･*:.｡..｡.:*･･*:.｡. .｡.:*･゜ﾟ･**･゜ﾟ･*:.｡..｡.:*･･*:.｡. .｡.:*･゜ﾟ･*";
const message2 =  "怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒怒";

function preload() {  //createCaptureの処理終了後にsizeを指定
  facemesh = ml5.faceMesh();
  video = createCapture(VIDEO, () => { video.size(640, 480); } );
}


function setup() {
  createCanvas(640, 480);
  video.hide();  //元のビデオ画像を表示しない
  pixelDensity(1);
  let x = 0;
  facemesh.detectStart(video, gotResult);
  
  //文字オブジェクトの準備
  num = width/14;
  colorMode(HSB,100);
  for(let i=0; i<num; i++){
    x = 14 * i;
    //100/num*i
    fallObj[i] = new Letter(message.charAt(i),message2.charAt(i), x, threshold, round(random(1,4)), color(16,random(100,0),100) ,color(0,100,random(100,0)),round(random(30,50)));
  }
}

function gotResult(results) { // 新しい検知(予測)がされるごとに実行される関数を定義
  predictions = results;    // 検知結果をグローバル変数facesに代入
}

function draw() {
  image(video, 0, 0, width, height);
  background(255);
  image(video, 0, 0, 640, 480);
  video.loadPixels();
  loadPixels();
  
  updatePixels();
  for(let i=0; i<num; i++){
    fallObj[i].update();
  }
}
