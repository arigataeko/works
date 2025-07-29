function setup() {
  createCanvas(250, 250);  
  background(200);  
  noFill();
}
function draw(){
   if(mouseIsPressed){ 
     drawDoshin(mouseX, mouseY, 10);
   }
}
// (x, y)の位置にdの間隔で10の円から成る同心円を描く
function drawDoshin(x, y, d) {
  for (var i=1; i<=10; i=i+1) {
    ellipse(x, y, d*i, d*i);
  }
}
