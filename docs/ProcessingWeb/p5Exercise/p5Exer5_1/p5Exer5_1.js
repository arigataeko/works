//ドラッグで図形を描く
// r: 四角、e: 円、s:線
let RECT = 1;  
let ELLIPSE = 2; 
let LINE=3;
var type = RECT; // 1: rect, 2: circle, 3: line
var x = 0;
var y = 0;
function setup() {
  createCanvas(250, 250);
  background(200);
  fill(255,0,0);      //赤で塗る
  stroke(255, 0, 0);
}

function draw() {    }

function mousePressed(){
    x = mouseX;
    y = mouseY;
}
function mouseDragged(){
    background(200);
    if (type == RECT) {
      rectMode(CORNERS);
      rect(x, y, mouseX, mouseY);
    } else if (type == ELLIPSE) {
      ellipseMode(CORNERS);
      ellipse(x, y, mouseX, mouseY);
    }else if (type==LINE) {
      line(x, y, mouseX, mouseY);
    }
}

function keyPressed() {
  if (key == 'r') {  //キー入力がrなら
    type = RECT;
  } else if (key == 'e') {  //キー入力がeなら
    type = ELLIPSE;
  } else if (key == 'l') {  //キー入力がlなら
    type = LINE;
  } 
}
