// Trail1 exe2_2

let x = 35;
let y = 50;

let  data = [
  ["小学生男女比", 2957229, 3092456], //https://www.e-stat.go.jp/stat-search/files?page=1&toukei=00400001&tstat=000001011528
  ["大学生男女比", 1294320, 1621285], //https://www.mext.go.jp/content/20230823-mxt_chousa01-000031377_001.pdf
  ["東証一部上場企業役員男女比", 983, 20043]  //https://www.gender.go.jp/policy/mieruka/company/pdf/tyousa2023.pdf
];

function setup() {
  createCanvas(750, 250);
  noStroke();
}

function draw() {
  background(230);
  for (let i=0; i<data.length; i++) {  //３種のデータごとに100の円を描く
    let ratio =  round(data[i][1] / (data[i][1] + data[i][2]) * 100);  //比率を計算してratioに入れる
    drawDataCircles(data[i][0], ratio, i*250+10, 20, x+i*250, y);
  }
}

function drawDataCircles(title, r, titleX, titleY, startX, startY) {
  fill(0);
  text(title, titleX, titleY);
  let n = 0;
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if (n <= r) {
        fill(102, 0, 153);   // 塗りを紫にする
      } else {
        fill(51, 153, 0);     // 塗りを緑にする
      }
      circle(startX+i*20, startY+j*20, 20);
    }
  }
}
