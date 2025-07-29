var d = 10;

function setup() {
  createCanvas(250, 250);
  noFill();
  frameRate(30);
  noLoop(); // Web上で最初停止しておく
}

function draw() {
  background(255);
  var x = 30;   //変数xは、左上端の円のx座標の値
  var y = 30;   //変数yは、左上端の円のy座標の値
  d = d + 1;
  for (var j=0; j<10; j=j+1) {
    for (var i=0; i<10; i=i+1) {
      ellipse(x+i*20, y+j*20, d, d);
    }
    if (d >= width*2) { 
      d = 10;
    }
  }
}

// 以下はWeb上で開始停止をするため
var f = false;
function mouseClicked() {  //mousePressedでも同じ動作
  if (f) {
    noLoop();
    f = false;
  } else {
    loop();
    f = true;
  }
}
