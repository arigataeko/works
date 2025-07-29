var x = 0;

function setup() {
  createCanvas(250, 125);
}


function draw() {
  background(255);
  x = x + 1;
  ellipse(x, height/2, 10, 10);
  if (x >= width) { x = 0; }
}

// 以下はWeb上で開始停止をするため
var f = false;
function mouseClicked() {  //mousePressedでも同じ動作
  print(f);
  if (f) {
    noLoop();
    f = false;
  } else {
    loop();
    f = true;
  }
}
