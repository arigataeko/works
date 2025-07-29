// Trail1 練習問題3-3

const x = 35;
const y = 50;
const max = 22;
let d = 20;
let henka = 1;
const data =  ["大学生男女比", 1294320, 1621285];
let ratio = 0;

let move = true;

function setup() {
  createCanvas(250, 250);
  noStroke();
  frameRate(10);
  ratio = round(data[1] / (data[1] + data[2]) * 100);  //比率を計算しておく
}

function draw() {
  background(230);
  fill(0);
  text(data[0], 10, 20);
  if (d>=max || d<=0) {  //直径がmax以上になった時、または負になった時
    henka = -henka;     //変化量の正負を入れ替える
  }
  d = d + henka;
  let n = 0;
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if(n <= ratio){
        fill(200, 0, 0);
        ellipse(x+i*20, y+j*20, d);
      }else {
        fill(0);
        ellipse(x+i*20, y+j*20, d-20);
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
