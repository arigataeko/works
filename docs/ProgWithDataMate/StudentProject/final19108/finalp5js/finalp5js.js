const title = "月別の使用水量(万t)";
const keisu = 0.07;
let d = 40;  
let currentX = []; 
let suiImg;
function preload() {
  suiImg = loadImage("./images/suidou.jpg");
}

function setup() {
  createCanvas(900, 500);
  Datamate.make("月", ["使用量", "気温"]);
  Datamate.make("1", [7150, 7]);
  Datamate.make("2", [6570, 8]);
  Datamate.make("3", [6690, 11]);
  Datamate.make("4", [7060, 14]);
  Datamate.make("5", [7180, 20]);
  Datamate.make("6", [7150, 22]);
  Datamate.make("7", [7160, 25]);
  Datamate.make("8", [7250, 30]);
  Datamate.make("9", [7150, 26]);
  Datamate.make("10", [7050, 19]);
  Datamate.make("11", [7130, 14]);
  Datamate.make("12", [7270, 8]);

  Datamate.makeArea(0, 50, width, height, 12, 1);
  Datamate.bindAreas([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  
  for (let i=0; i<12; i++) {
    currentX[i] = 400; 
  }
}


function draw() {
  background(255);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(15);
  text(title, 30, 30); 
  fill(51,153,204);   
  rect(200, 30, d-10,d-10); 
  fill(254,70,71);
  circle(230, 30, d*0.7); 
  textAlign(CENTER, CENTER);
  textSize(8); 
  fill(255);
  text("気温", 230, 30);
  text("使用量", 200, 30);
  for (let i=1; i<=12; i++) {
    drawData(i); 
  }
}

function drawData(index) {
  const area = Datamate.area(index);  
  const water = Datamate.value(area.name, 0);
  const hot = Datamate.value(area.name, 1);
  strokeWeight(0.5); 
  noFill();
  stroke(2);
   line(area.centerX-20, area.bottom-100, area.centerX+20, area.bottom-100); 
   line(area.centerX-20, area.bottom-100, area.centerX-20, area.top+30); 
   line(area.centerX+20, area.bottom-100, area.centerX+20, area.top+30); 

     strokeWeight(0.4); 
  stroke(51,153,204);
  line(area.centerX, area.bottom-101, area.centerX, area.top+30);

   
  noStroke();
  textSize(8);

rectMode(CENTER);
imageMode(CENTER);
image(suiImg,area.centerX+10,area.top+15,d*0.8,d*0.8);


  const waterPos = map(water, 6200, 7500 ,area.bottom-70, area.top);
  fill(51,153,204);
   currentX[index-1] = currentX[index-1] + (waterPos - currentX[index-1]) * keisu; 
  rect(area.centerX,currentX[index-1], d,d*1.5);
  textAlign(CENTER, CENTER);
  fill(255);
  text(water,area.centerX,currentX[index-1]); 


  const hotPos = map(hot, 5, 40, area.bottom-100, area.top+20);
  fill(254,70,71);
  circle(area.centerX,hotPos, d*0.5);
  textAlign(CENTER, CENTER);
  fill(255);
  text(hot,area.centerX,hotPos); 

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(12);
  text(area.name+"月", area.centerX, area.bottom-90);
 
  
}
function mousePressed() {
  for (let i=0; i<12; i++) {
    currentX[i] = 400;  

  }
}
