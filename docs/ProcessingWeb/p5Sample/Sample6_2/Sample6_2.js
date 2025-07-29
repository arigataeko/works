let mic;  //マイクからの音声を取得するAudioInオブジェクト用変数←(1)
let easing = 0.15; //イージングの係数、大きい数値は大きく変化
let adjD = 0; //イージングで調整した円の直径
function setup() {
  createCanvas(250, 250);
  mic = new p5.AudioIn();//AudioInオブジェクトの生成←(2)
  mic.start(); //AudioInオブジェクトの機能を開始←(3)
  fill(200, 0, 0);
}

function draw() {
  background(0);
  let vol = mic.getLevel(); // 音量を取得 (0から1.0の間の値)←(4)
  let d = map(vol, 0, 1, 0, width*2); //入力値(0から1)を0から500に換算←(5)
  adjD = lerp(adjD, d, easing);
 // print(vol + "   "+ adjD);
  ellipse(width/2, width/2, adjD, adjD); //描画
}

function mousePressed(){
  userStartAudio();
}
