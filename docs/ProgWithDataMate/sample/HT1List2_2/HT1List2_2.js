// Trail1 List2_2

let x = 35;  //最初の円のx座標
let y = 50;  //最初の円のy座標
let dataTitle = "大学生男女比";  //データのタイトル
let femaleS = 1314354; //女子学生数
let maleS = 1631245;   //男子学生数
let ratio = 0;  //女性の比率
function setup() {
  createCanvas(250, 250);
  noStroke();
  ratio = round(femaleS / (femaleS + maleS) * 100);  //比率を計算してratioに入れる
  // print(ratio);  //計算した比率を確認
}
function draw() {
  background(230);
  fill(0);
  text(dataTitle, 10, 20);  //データタイトルの表示
  let n = 0;  //何個円を描いたか覚えておく変数
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) { 
      n++;  //描いた円の個数を１増やす
      if (n <= ratio) {   //描いた円の数がratioになるまでは紫
        fill(102, 0, 153);   // 塗りを紫にする
      } else {
        fill(51, 153, 0);     // 塗りを緑にする
      }
      circle(x+i*20, y+j*20, 20);
    }
  }
}
