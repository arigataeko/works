function setup() {
  createCanvas(250, 250);  
  background(200);  
  noFill();

  drawDoshinN(50, 50, 30, 5); 
  drawDoshin(150, 50, 10);   
  drawDoshinN(50, 150, 10, 3);
  drawDoshinN(150, 150, 5, 30);
}
// 10の同心円を描く関数の定義
function drawDoshin(x, y, d) {
  for (var i=1; i<=10; i=i+1) {
    ellipse(x, y, d*i, d*i);
  }
}
// 任意個の同心円を描く関数の定義
function drawDoshinN(x, y, d, n) {
  for (var i=1; i<=n; i=i+1) {
    ellipse(x, y, d*i, d*i);
  }
}
