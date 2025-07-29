function setup() {
  createCanvas(250, 250);
  background(200);  
  var x = 30;   //変数xは、左上端の円のx座標の値
  var y = 30;   //変数yは、左上端の円のy座標の値
  for (var j=0; j<10; j=j+1) {
    for (var i=0; i<10; i=i+1) {
      ellipse(x+i*20, y+j*20, 10, 10);
    }
  }
}


function draw() {
}
