let title = "1日のインターネット利用時間";
let sub = "クリックで停止・再生";
let titleX = 120;
let phoneImg;
let max = 1050;
let min = 0;
let Imgx = 100;
let Imgy = 240;
let move = true;

function preload() {
  phoneImg = loadImage("./image/smartphone.png");
}

function setup() {
  createCanvas(800, 1200);
  Datamate.make("screentime.csv");
  Datamate.makeAreas(0, 0, width, height, 8, 5);  
  Datamate.play(0, 0.3); 
  Datamate.loop(false, true);  //ループする
  noStroke();
  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  
}

function draw() {
  //background(230);
  background(255);
  for (let i = 0; i < Datamate.columnCount(); i++) {
    drawData(Datamate.columnName(i), i);
  }

  for (let j = 0; j < 8; j++) {
    for (let n = 0; n < 5; n++) {
      image(phoneImg, 45 + (Imgx * j), 135 + (Imgy * n));
    }
  }
}

function drawData(country, time) {
  let area = Datamate.area(time);
  let dataIndex = Datamate.focusY();
  let indexHokan = Datamate.focusY(0, true);
  let year = Datamate.rowName(dataIndex);
  let value = Datamate.value(indexHokan, country);
  let view = Datamate.value(dataIndex, country);
  let h = map(value, 0, 100, min, max);

 
  
  fill(137, 189, 222);
  rect(area.left + 15, area.bottom - 45 - h, area.width / 1.6, h);

  fill(0);
  text(title + " (" + year + ")", titleX, 30);  //タイトル
  text(sub, 700,25);  //サブの案内
  
  text(country, area.centerX-2, area.centerY-65);  //国名の表示
  fill(0,0,255);
  text(view + "時間", area.centerX-2, area.centerY + 100); //時間の表示
  
}


function mousePressed() {  //クリックで再生・停止
  if (move) {
    move = false;
    noLoop();
  } else {
    move = true;
    loop();
  }
}

/*function mousePressed(){
    for(let i=0; i<4; i++){
       currentY[i] = 0;
  }
}*/
