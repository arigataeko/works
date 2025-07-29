// Trail1 List2_3

const x = 35; //最初の円のx座標
const y = 50; //最初の円のy座標

const totalS = 2632216;
const  data = ["大学生の分野別比率", 359027, 838095, 79520, 382801, 78493, 348927, 69885, 186274, 77855, 211339]
                                 //人文科学　社会科学　理学　工学　   農学   保険　  家政　  教育   　芸術 　その他+商船
let drawColor = [];

  function setup() {
  createCanvas(250, 250);
  noStroke();
 // colorMode(HSB, 100);
 
 drawColor = [color(200, 0, 0), color(0, 128, 0),  color(200, 0, 200),  color(0, 0, 128),  color(128, 128, 0),
              color(0, 200, 200), color(128, 0, 0),  color(0, 128, 128),  color(128, 0, 128),  color(0, 200, 0)];
}

function draw() {
  background(230);
  fill(0);
  text(data[0], 10, 20);
  let n = 0;   //何個目の円を描いているか
  let xx = 0;
  let yy = 0;
  for(let k=1; k<data.length; k++){
    fill(drawColor[k-1]);
    for(let l=0; l<round(data[k] / totalS * 100); l++){
      xx = x+n%10*20;   //n%10は何列目か
      yy = y+floor(n/10)*20 ;  //floor(n/10)は何行目か
      n++;
      if(n<=100){
        ellipse(xx, yy, 20);
      }
    print("n:" + n + "xx:" + xx +" yy:" + yy);
    }
  }
  
/*
  for (let j=0; j<10; j++) {
    for (let i=0; i<10; i++) {
      n++;
      if(n < round(data[1] / totalS * 100)){
         fill(drawColor[0]);
      } else if ( n <= round(data[1] / totalS * 100)+round(data[2] / totalS * 100)){
         fill(drawColor[1]);
      } else if ( n <= round(data[1] / totalS * 100)+round(data[2] / totalS * 100) + round(data[3] / totalS * 100)){
          fill(drawColor[2]);
      } else if ( n <= round(data[1] / totalS * 100)+round(data[2] / totalS * 100) + round(data[3] / totalS * 100) + round(data[4] / totalS * 100)){
          fill(drawColor[3]);
      }
          }  // i
  }  // j
*/
 

}
