function setup() {
  createCanvas(400, 125);  
  background(200);  
  noFill();

  drawDoshin(50, height/2, 10);
  drawDoshin(150, height/2, 10);
  drawDoshin(250, height/2, 10);
  drawDoshin(350, height/2, 10);
}
// 同心円を描く関数の定義
function drawDoshin(x, y, d) {
  for (var i=1; i<=10; i=i+1) {
    ellipse(x, y, d*i, d*i);
  }
}
