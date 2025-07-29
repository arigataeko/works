var d = 0;

function setup() {
  createCanvas(250, 250);
}


function draw() {
  background(255);
  d = d + 1;
  ellipse(width/2, height/2, d, d);
  if (d >= width) { d = 10; }
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
