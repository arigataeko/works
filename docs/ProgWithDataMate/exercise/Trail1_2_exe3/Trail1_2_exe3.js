// Trail1 List2_3
// 学部ごとの学生数比　 理学　工学　農学を理工農学としてまとめる
//["大学生の分野別比率", 359027, 838095, 79520, 382801, 78493, 348927, 69885, 186274, 77855, 211339];
//                    人文科学　社会科学　理学　工学　   農学   保健　  家政　  教育   　芸術 　その他+商船


const x = 35; //最初の円のx座標
const y = 50; //最初の円のy座標

const totalS = 2632216;

const  data = ["大学生の分野別比率", 359027, 838095, 540814, 348927, 69885, 186274, 77855, 211339];
//人文科学　社会科学　理工農学   保健　  家政　  教育   　芸術 　その他+商船
let num = [];
let drawColor = [];

function setup() {
  createCanvas(250, 250);
  noStroke();

  drawColor = [color(0, 0, 128), color(30,144,255), color(135,206,235), color(50,205,50), color(255,140,0), color(255, 255, 0),
    color(255,0,0), color(138,43,226)];

  //円の個数を計算しておく  
  for (let i=1; i<data.length; i++) {
    num[i-1] = round(data[i] / totalS * 100);
  }
  // [14, 32, 21, 13, 3, 7, 3, 8] 四捨五入すると合計が100にならない可能性がある　その他で調整して100の円とする
  //print(num);
}

function draw() {
  background(230);
  fill(0);
  text(data[0], 10, 20);
  let n = 0;   //何個目の円を描いているか
  
  
  /*
  // データを順に見て、その個数の円を描くやり方
  let xx = 0;
   let yy = 0;
   for (let k=1; k<data.length; k++) {
     fill(drawColor[k-1]);
     for (let l=0; l<num[k-1]; l++) {
       xx = x+n%10*20;   //n%10は何列目かを表す
       yy = y+floor(n/10)*20 ;  //floor(n/10)は何行目かを表す
       n++;
       if (n<=100) { //トータルで101になるので減らす
         ellipse(xx, yy, 20);
       }
       print("n:" + n + "xx:" + xx +" yy:" + yy);
     }
   }
   */
　//100の円を描く間で色を変えるやり方
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      for (let k=0; k<num.length; k++) {
        let sum = 0; //次に何個まで描くか
        for (let l=0; l<=k; l++) {
          sum = sum + num[l];
        }
        if (n <= sum) {
          fill(drawColor[k]);
          break;
        }
      }
      ellipse(x+i*20, y+j*20, 20);
    }  // i
  }  // j
}
