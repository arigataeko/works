//ドラッグで図形を描く
// r: 四角、e: 円、s:線
let RECT = 1;  
let ELLIPSE = 2; 
let LINE=3;
var type = RECT; // 1: rect, 2: circle, 3: line
var x = 0;
var y = 0;
var pg;
function setup() {
  createCanvas(250, 250);
  background(200);
  noFill();
  stroke(255, 0, 0);  //ドラッグ中は赤
  pg = createGraphics(width, height);
  pg.noFill();
  pg.background(200);
}

function draw() {
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function mouseReleased() { //確定図形は保存用描画域に描く
  if (type == RECT) {
    pg.rectMode(CORNERS);
    pg.rect(x, y, mouseX, mouseY);
  } else if (type == ELLIPSE) {
    pg.ellipseMode(CORNERS);
    pg.ellipse(x, y, mouseX, mouseY);
  } else if (type==LINE) {
    pg.line(x, y, mouseX, mouseY);
  }
  image(pg, 0, 0);  //画面上に表示
}
function mouseDragged() {  //ドラッグ中の図形を描く
  background(200);
  image(pg, 0, 0);
  if (type == RECT) {
    rectMode(CORNERS);
    rect(x, y, mouseX, mouseY);
  } else if (type == ELLIPSE) {
    ellipseMode(CORNERS);
    ellipse(x, y, mouseX, mouseY);
  } else if (type==LINE) {
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
  } else if (key == 'c') {  //キー入力がcなら保存している図形をなくす
    pg.background(200);
    image(pg, 0, 0);
  }
}
