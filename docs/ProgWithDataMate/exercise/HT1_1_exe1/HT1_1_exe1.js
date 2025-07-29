// Trail1 Exe.1
let x = 35;
let y1 = 30;
let y2 = 220;
function setup() {
  createCanvas(250, 250);
  strokeWeight(2);  //線の太さを2pxに
}
function draw() {
  background(220);
  for(let i=0; i<10; i++){
    line(x+i*20, y1, x+i*20, y2);
  }

}
