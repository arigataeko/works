// Trail1 練習問題3-4
const x = 35;
const y = 50;
const max = 20;
let d = 20;
let henka = 1;
const data =  ["大学生男女比", 1294320, 1621285];
let diameter = [];
let ratio = 0;
let k = 0;  //今どの円の大きさを変えているか
let move = true;

function setup() {
  createCanvas(250, 250);
  noStroke();
  //frameRate(10);
  ratio = round(data[1] / (data[1] + data[2]) * 100);  //比率を計算しておく
  for (let i = 0; i < 100; i++) {
    diameter[i] = 0;  // 0 で初期化
  }
}

function draw() {
  background(230);
  fill(0);
  text(data[0], 10, 20);
  
  if (k>=100) {  //全部の円の大きさがmaxになったら、0に戻す
    k = 0;
    for (var i = 0; i < 100; i++) {
      diameter[i] = 0;  // 0 で初期化
    }
  }
  if (diameter[k]>=max) {  //k番目の直径がmax以上になったら
    k++;  //次の円に移る
  }else{
    diameter[k] = diameter[k] + henka;  //k番目の円の大きさを増やす
  }

  let n = 0;  //何個目の円を描いているか
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if (n <= ratio) {
        fill(200, 0, 0);
        ellipse(x+i*20, y+j*20, diameter[n-1]);
      } else {
        fill(0);
        ellipse(x+i*20, y+j*20, diameter[n-1]);
      }
    }
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
