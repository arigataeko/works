let hamon = [];
let move = true;
let h = 0;   //いくつめの波紋か
const N=50;   //作り出す波紋の数

function setup() {
  createCanvas(250, 250);
  for (let i=0; i<N; i++) {
    if (i %10  == 0) {
      hamon[i] = new AColorHamon(random(100, 200), 200, 0, 0);  //AHamonオブジェクトを生成、配列に代入
    } else {
      hamon[i] = new AColorHamon(random(100, 200), 0, 0, random(7, 200));
    }
    frameRate(10);
    fill(255, 30);  //色は白、透明度を指定
  }
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
