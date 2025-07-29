//マイクで音声入力、音量に応じて画像が変わる
let mic;
let adjV = 0;
let num  = 8;
let images = [];
let moji1
let moji2
let startUp =0;
let fire =true;

function preload() {
  for (var i=0; i<num; i++) {
    images[i] = loadImage("data/cake" + i + ".jpg");
  }
  moji1 = loadImage("data/moji0.png");
  moji2 = loadImage("data/moji1.png");
}

function setup() {
  let cnv =createCanvas(700, 700);
  cnv.mousePressed(userStartAudio);
  mic = new p5.AudioIn();
  mic.start();
  imageMode(CENTER);
}

function draw() {
  let vol=mic.getLevel();
  adjV=lerp(adjV, vol, 0.2);
  showRousoku();
}

function showRousoku() {
  let disp=0; //表示している画像

  if(adjV >= 0.5){
    disp = 7;
    startUp=millis();
    fire = false;
  }else if(adjV >= 0.4){
    disp = 6;
  }else if(adjV >= 0.3){
    disp = 5;
  }else if(adjV >= 0.2){
    disp = 4; 
  }else if(adjV >= 0.1){
    disp = 3;
  }else if(adjV >= 0.05){
    disp = 2;
  }else if(adjV >= 0.03){
    disp = 1;
  }else{
     disp = second()%2;  
  }

  if(fire == false){ //火が消えたら
    let now = millis();
      if((now - startUp) < 2000){
      disp=7
      }else{
       fire = true;
      }
  }
  image(images[disp], width/2, height/2);
  
    if(disp == 7){
     if(millis() % 200 < 100) {//0.1秒ごと
    image(moji1, width/2, height/2);
    }else{
    image(moji2, width/2, height/2);
    }
  }

  //print(adjV);
}
