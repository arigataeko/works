function setup() {
  createCanvas(400, 125);  
  background(200);  
  noFill();

  drawDoshin(50, height/2, 10);//左から1つ目の同心円を描く関数の呼出し
  drawDoshin(150, height/2, 10);//左から2つ目の同心円を描く関数の呼出し
  drawDoshin(250, height/2, 10);//左から3つ目の同心円を描く関数の呼出し
  drawDoshin(350, height/2, 10);//左から4つ目の同心円を描く関数の呼出し
}
// 同心円を描く関数の定義
function drawDoshin(x, y, d) {
  for (var i=1; i<=10; i=i+1) {
    ellipse(x, y, d*i, d*i);
  }
}
