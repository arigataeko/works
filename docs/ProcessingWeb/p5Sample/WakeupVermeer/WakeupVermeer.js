let mic;  //マイクからの音声を取得するAudioInオブジェクト用変数
let adjV = 0; //イージングで調整した値
let num  = 6;
let gakuImg;
let images = [];
let flag = false;
let startUp = 0;

function preload(){
    gakuImg = loadImage("./data/gaku.png");
    for (var i=0; i<num; i++) {
    let imageName = "data/girl" + (i+1) + ".png";
    images[i] = loadImage(imageName);
  }
}
function setup() {
  let cnv =createCanvas(600, 600);
  cnv.mousePressed(userStartAudio); //マウス押下で、音声開始
  mic = new p5.AudioIn();//AudioInオブジェクトの生成
  mic.start(); //AudioInオブジェクトの機能を開始
  imageMode(CENTER);
  textAlign(CENTER);
  textFont('Courier New', 16);
}

function draw() {
  let vol = mic.getLevel(); // 音量を取得 (0から1.0の間の値)←(4)
  adjV = lerp(adjV, vol, 0.1);
  text("Please click once, and talk to me gently.", width/2, height-20);
  showFace();
}

function showFace() {
  let disp= 0;
  if (adjV>=0.08) {
    disp = 5;
    flag = true;
    startUp = millis();
  } else if (adjV >= 0.06) {
    disp = 4;
  } else if (adjV >= 0.04) {
    disp = 3;
  } else if (adjV >= 0.02) {
    disp = 2;
  } else if (adjV >= 0.01) {
    disp = 1;
  } else  {
    disp = 0;  
  }
  
    if(flag == true){
    let now = millis();
    if((now - startUp) < 2000){
    disp = 5;
  }else{
    flag = false;
  }
  }
 
  image(images[disp], width/2, height/2);
  image(gakuImg, 300, 300);
}
