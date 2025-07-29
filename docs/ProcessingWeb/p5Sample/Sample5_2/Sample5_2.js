var x = 0;
var y = 0;
function setup() {
  createCanvas(250, 250);
  background(200);
  fill(255,0,0);      //赤で塗る
  noStroke();         //枠線なし
  rectMode(CORNERS);  //rect()関数の引数の意味の指定
}

function draw() {    }

function mousePressed(){
    x = mouseX;
    y = mouseY;
}
function mouseDragged(){
    background(200);
    rect(x, y, mouseX, mouseY); //引数は対角線上で向かい合う2つ角の座標
}
