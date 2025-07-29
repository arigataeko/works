var x = 0;
var y = 0;
var easing = 0.05; //マウスにゆっくり近づく度合
function setup() {
  createCanvas(250, 125);
  background(200);
  fill(0);            //最初は黒
  noStroke();         //枠線なし
}

function draw() {
  var targetX = mouseX;
  var targetY = mouseY;
  x = x + (targetX - x) * easing;
  y = y + (targetY - y) * easing;
  ellipse(x, y, 10, 10);
}

function keyPressed(){
  if(key == 'r'){  //キー入力がrなら
    fill(255,0,0);
  }else if(key == 'y'){  //キー入力がyなら
    fill(255,255,0);
  }else if(key == 'g'){  //キー入力がgなら
    fill(0,255,0);
  }
}
