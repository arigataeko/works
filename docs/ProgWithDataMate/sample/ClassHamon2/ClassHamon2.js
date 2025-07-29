let hamon = [];
let move = true;
let h = 0;   //いくつめの波紋か
const N=50;   //作り出す波紋の数

function setup() {
  createCanvas(250, 250);
  for (let i=0; i<N; i++) {
    hamon[i] = new AHamon(200);  //AHamonオブジェクトを生成、配列に代入
  }
  frameRate(10);
  fill(255, 30);  //色は白、透明度を指定
}

function draw() {
  background(255, 30);
  if (!hamon[h].move) {//波紋が動いていないとき
    hamon[h].prepare(random(width), random(height));  //新しい位置で、波紋を開始
    h = (h+1)%hamon.length; //hに1加える。0－49の間の数にする
  }
  for (let i=0; i<hamon.length; i++) {
    hamon[i].display();
  }
}

function mousePressed() {
  if (move) {
    move = false;
    noLoop();
  } else {
    move = true;
    loop();
  }
}

class AHamon {
  constructor(limit) {  //コンストラクタ
    this.max = limit;
    this.d = 0;   //直径
    this.x = 0;  //円の中央
    this.y = 0;
    this.dr = 5; //円の直径の変化量
    this.move = false; //動いているか否か
  }

  prepare(xx, yy) { //波紋を準備
    this.move=true;
    this.x = xx;
    this.y = yy;
    this.d = 0;  //大きさをはじめに戻す。
  }

  display() {
    strokeWeight(2); //線の太さを指定
    if (this.move) {   //波紋広がり中の処理
      this.d=this.d+this.dr;   // 大きさを増加
      ellipse(this.x, this.y, this.d, this.d);  // 円を描く
      if (this.d>this.max) { //最大値を越えたので止める。
        this.move = false;
      }
    }
  }  // display()の終わり
}  // class定義の終わり
