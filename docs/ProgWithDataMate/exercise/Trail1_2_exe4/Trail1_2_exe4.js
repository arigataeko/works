// Trail1 List2_4
// 学部ごとの学生数比 男女の違い　 理学　工学　農学を理工農学としてまとめる
const x = 35;
const y = 50;
const indexX = 35;
const indexY = 280;
const totalS = 2632216;
const totalM = 1431224;
const totalF = 1200992;
const total = [2632216, 1200992, 1431224];  //[全学生数, 女子学生数, 男子学生数]
const  data = [
  //人文科学　社会科学　理工農学   保健　  家政　  教育   　芸術 　その他+商船
  ["大学生の分野別比率", 359027, 838095, 540814, 348927, 69885, 186274, 77855, 211339],
  ["女子学生の分野別比率", 231898, 302972, 118247, 221364, 62985, 110274, 52907, 100345],
  ["男子学生の分野別比率", 127129, 535123, 422567, 127563, 6900, 76000, 24948, 110994]
];
let num = [[], [], []];
let drawColor = [];

const area = ["人文科学", "社会科学", "理工農学", "保健", "家政", "教育", "芸術", "商船+その他"];

function setup() {
  createCanvas(750, 300);
  noStroke();
  textAlign(LEFT, CENTER);

  drawColor = [color(0, 0, 128), color(30,144,255), color(135,206,235), color(50,205,50), color(255,140,0), color(255, 255, 0),
    color(255,0,0), color(138,43,226)];

  //円の個数を計算しておく
  for (let i=0; i<data.length; i++) {
    for (let j=1; j<data[i].length; j++) {
      num[i][j-1] = round(data[i][j] / total[i] * 100);
    }
  }
  // [14, 32, 21, 13, 3, 7, 3, 8] 四捨五入すると合計が100にならない可能性がある　その他で調整して100の円とする
  // [19, 25, 10, 18, 5, 9, 4, 8]
  // [9, 37, 30, 9, 0, 5, 2, 8]
  //print(num);
}

function draw() {
    background(230);

  　//100の円を描く間で色を変えるやり方
    for (let m=0; m<data.length; m++) {
    fill(0);
    text(data[m][0], m*250+10, 20);
    let n = 0;
    for (let j=0; j<10; j++) {
      for (let i=0; i<10; i++) {
        n++;
        setAreaColor(m, n);
        ellipse(x+m*250+i*20, y+j*20, 20);
      }  // i
    }  // j
  }  //m
  drawIndex();
}

// shurui:全学生か女子か、男子か(0,1,2)  total: ここまでに描いた円の個数
function setAreaColor(shurui, total) {
  for (let k=0; k<num[shurui].length; k++) {
    let sum = 0; //次に何個まで描くか
    for (let l=0; l<=k; l++) {
      sum = sum + num[shurui][l];
    }
    if (total <= sum) {
      fill(drawColor[k]);
      return;
    }
  }
}

function drawIndex(){
  for(let i=0; i<area.length; i++){
    fill(drawColor[i]);
    ellipse(indexX+70*i, indexY, 10);
    fill(0);
    text(area[i], indexX+70*i+10, indexY); 
  }
}
