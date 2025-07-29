let x = 35;
let y = 35;
function setup() {
  createCanvas(250, 250);
  noStroke();
}

function draw() {
  background(230);
  for (let j=0; j<10; j++) {
    if (j%2 == 0) { 
      fill(102, 0, 153);   // 塗りを紫にする
    } else {
     // fill( , 205, 50);
     fill(51, 153, 0);     // 塗りを緑にする
    }
    for (let i=0; i<10; i++) {
      circle(x+i*20, y+j*20, 20);
    }
  }
}
