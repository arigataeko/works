var mic;  //マイクからの音声を取得するAudioInオブジェクト用変数←(1)
var easing = 0.15; //イージングの係数、大きい数値は大きく変化
var adjV = 0; //イージングで調整した値
var num  = 9;
var images = new Array();
var limit = false;
function setup() {
  createCanvas(250, 250);
  mic = new p5.AudioIn();//AudioInオブジェクトの生成←(2)
  mic.start(); //AudioInオブジェクトの機能を開始←(3)

  for (var i=0; i<num; i++) {
    var imageName = "data/sara" + (i+1) + ".jpg";
    images[i] = loadImage(imageName);
  }
}

function draw() {
  background(0);
  var vol = mic.getLevel(); // 音量を取得 (0から1.0の間の値)←(4)
  var sa = vol - adjV; //入力値から直接計算した値と今の直径との差
  if (abs(sa) > 0.01) {
    adjV = adjV + sa * easing;
  }
  showFace();
}

function showFace() {
  var disp=0;
  if (adjV>=0.2) {
    if (limit) {
      disp = 8;
      limit = false;
    } else {
      disp = 7;
      limit = true;
    }
  } else if (adjV >= 0.15) {
    disp = 7;
  } else if (adjV >= 0.12) {
    disp = 6;
  } else if (adjV >= 0.10) {
    disp = 5;
  } else if (adjV >= 0.08) {
    disp = 4;
  } else if (adjV >= 0.06) {
    disp = 3;
  } else if (adjV >= 0.04) {
    disp = 2;
  } else if (adjV >= 0.02) {
    disp = 1;
  } else {
    disp = 0;
  }
  image(images[disp], -40, -25);
   // print('The value of adjV is ' + adjV + ', disp is ' + disp);
}

function mousePressed(){
  userStartAudio();
}
