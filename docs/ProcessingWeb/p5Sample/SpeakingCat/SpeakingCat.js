let mic;
let flag= 0;

function setup() {
  let cnv = createCanvas(500, 500);
  cnv.mousePressed(userStartAudio);
  mic = new p5.AudioIn();   //AudioInの生成←(2)
  mic.start();              //AudioIn機能を開始←(3)
  noStroke(); //線なし
}

function draw() {
  background(100);
  if (flag==0) {
    fill(240, 50, 0);
    textSize(20);
    textAlign(CENTER);
    text("Press Mouse", 250, 430);
  }
  let vol = mic.getLevel(); //音量を取得←(4)
  let a = map(vol, 0, 0.5, 0, 100);
  let b = map(vol, 0, 0.5, 0, 150);
  let c = map(vol, 0, 1, 0, 80);
  let d = map(vol, 0, 0.5, 0, 180);

  drawNeko(width/2, height/2, 250, 250, a, b, c, d);
}

//       全体の中心,幅と高さ,モーション1,モーション2, モーション3, モーション4
function drawNeko(x, y, w, h, motion1, motion2, motion3, motion4) {
  //レッド(下地)
  fill(240, 50, 0);//ベース赤
  //ellipse(x-100, y, w-60, 120);//
  ellipse(x-114.3, y-14, w-71, 145);//顔土台
  triangle(x-178+motion1, y-60, x-160-motion1, y-115-motion1, x-130-motion1, y-80);//右耳
  triangle(x-100+motion1, y-80, x-70, y-115-motion1, x-50-motion1, y-60);//左耳

  push();
  translate(x-114.3, y-15);
  rotate(radians(5));
  arc(0, 0, 530, 120, radians(290), radians(110));//胴体上
  pop();

  arc(x+50, y+23, 190, 50, radians(0), radians(180));//胴体上

  push();
  translate(x+125, y+10);
  rotate(radians(-30+motion1));
  rect(0, 0, 25, 80);//尻尾
  arc(12.5, 79, 25, 30, radians(0), radians(180));//尻尾先端
  pop();

  quad(x-70, y+48, x-10, y+48, x-23, y+90+motion1, x-50, y+90+motion1);//前足
  ellipse(x-45, y+90+motion1, 10, 5);//前足爪1
  ellipse(x-36, y+90+motion1, 10, 5);//前足爪2
  ellipse(x-28, y+90+motion1, 10, 5);//前足爪3
  quad(x+40, y+40, x+110, y+40, x+80, y+90+motion1, x+50, y+90+motion1 );//後足
  ellipse(x+55, y+90+motion1, 10, 5);//後足爪1
  ellipse(x+65, y+90+motion1, 10, 5);//後足爪2
  ellipse(x+75, y+90+motion1, 10, 5);//後足爪3


  //ホワイト

  fill(255);//白
  ellipse(x-150, y-30, 25, 25-motion4);//白目右
  ellipse(x-90, y-30, 25, 25-motion4);//白目左


  //ブラック(ポイント)
  fill(0);//黒
  ellipse(x-150, 214+motion3, 6, 6);//黒目右←motion1から変更
  ellipse(x-90, 214+motion3, 6, 6);//黒目左

  triangle(x-128, y-5, x-113, y-4, x-123, y+10);//鼻
  quad(x-150, y-7+motion1, x-135, y-5, x-135, y-4, x-150, y-6+motion1);//ひげ右1
  quad(x-152, y-1+motion1, x-134, y, x-134, y+1, x-152, y+motion1);//ひげ右2
  quad(x-151, y+5.5+motion1, x-135, y+5, x-135, y+6, x-151, y+6.5+motion1);//ひげ右3

  quad(x-92, y-7+motion1, x-107, y-5, x-107, y-4, x-92, y-6+motion1);//ひげ左1
  quad(x-90, y-1+motion1, x-108, y, x-108, y+1, x-90, y+motion1);//ひげ左2
  quad(x-91, y+5.5+motion1, x-107, y+5, x-107, y+6, x-91, y+6.5+motion1);//ひげ左3

  //口の部分
  fill(100);
  arc(x-160, y+20, 120, motion2, radians(0), radians(180));
}

function mousePressed() {
  flag=1;
}
