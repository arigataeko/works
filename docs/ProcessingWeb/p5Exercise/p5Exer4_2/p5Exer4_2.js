function setup() {
  createCanvas(250, 250);  
  background(200);  
  noFill();
}
function draw(){
   if(mouseIsPressed){ 
     drawDoshinRatio(mouseX, mouseY, 8, 10, 1.25);
   }
}
// (x, y)の位置にnの円から成る同心円を描く、間隔はratioずつ大きくなる
function drawDoshinRatio(x, y, d, n, ratio) {
  var w = d;
  for (var i=1; i<=n; i=i+1) {
    w = w * ratio;
    ellipse(x, y, w, w);
  }
}
