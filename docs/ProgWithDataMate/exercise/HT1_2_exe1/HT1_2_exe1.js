let x = 35;  //最初の円のx座標
let y = 35;  //最初の円のy座標
function setup() {
  createCanvas(250, 250);
  noStroke();
  fill(0);
}

function draw() {
  background(220);
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      if ( (j%2 == 0 && i%2 == 0) ||(j%2 != 0 && i%2 != 0)) {
        fill(102, 0, 153);   // 塗りを紫にする
      } else {
        fill(51, 153, 0);     // 塗りを緑にする
      }
      ellipse(x+i*20, y+j*20, 20);
    }
  }
}
