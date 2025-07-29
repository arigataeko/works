const title = "各国の教育、健康、経済、政治分野のスコア";
const expla = "凡例をクリックするとその分野のスコアのみが見れます";
const d = 35;   //円の直径
const startX = 100;  //線の左端のx座標
let currentEd = [];  //国ごとの教育円の途中x座標
let currentH = [];   //国ごとの健康円の途中x座標
let currentEc = [];  //国ごとの経済円の途中x座標
let currentP = [];   //国ごとの政治円の途中x座標

function setup() {
  createCanvas(600, 600);
  Datamate.make("FourScore.csv"); 
  Datamate.makeAreas(10, 80, width-10, height-80, 1, 7);
  
  for(let i=0; i<Datamate.columnCount(); i++){
    currentEd[i] = startX;　//最初の円の位置は線の左端
    currentH[i] = startX;
    currentEc[i] = startX;
    currentP[i] = startX;
  }
  
  // Datamate.plot();// データを表示
}

function draw() {
  background(245);
  //タイトル部分
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(15);
  text(title, 30, 30);  //データタイトル
  textSize(12);
  text(expla, 30, 60);
  
  fill(225, 65, 105);
  circle(380, 30, d);  //教育円
  fill(65, 224, 185);
  circle(420, 30, d);  //健康円
  fill(65, 105, 225);
  circle(460, 30, d);  //経済円
  fill(224, 185, 65);
  circle(500, 30, d);  //政治円

  //円の文字
  textAlign(CENTER, CENTER);
  textSize(10);
  fill(255);
  text("教育", 380, 30);
  text("健康", 420, 30);
  text("経済", 460, 30);
  text("政治", 500, 30);
  
  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);    // データiを描画
  }
}

function drawData(index) {
  const area = Datamate.area(index);
  const edu = Datamate.value(Datamate.rowName(0), index);
  const health = Datamate.value(Datamate.rowName(1), index);
  const eco = Datamate.value(Datamate.rowName(2), index);
  const poli = Datamate.value(Datamate.rowName(3), index);

  //線
  strokeWeight(5);
  noFill();
  stroke(80);
  line(area.left+startX, area.centerY, area.right-10, area.centerY); //横線を描く

  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  
  //教育円
  const eduPos = map(edu, 0.05, 1, area.left+startX, area.right-20);
  currentEd[index] = lerp(currentEd[index], eduPos, 0.02);
  if(mouseX>420-d/2 && mouseX<420+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>460-d/2 && mouseX<460+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>500-d/2 && mouseX<500+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed){
    fill(0, 0);
  } else {
    fill(225, 65, 105);
  }
  circle(currentEd[index], area.centerY, d);
  if(mouseX>420-d/2 && mouseX<420+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>460-d/2 && mouseX<460+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>500-d/2 && mouseX<500+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed){
    fill(0, 0);
  } else {
    fill(255);
  }
  text(edu, currentEd[index], area.centerY); //円の上に文字を描く
  
  //健康円
  const healthPos = map(health, 0.05, 1, area.left+startX, area.right-20);
  currentH[index] = lerp(currentH[index], healthPos, 0.02);
  if(mouseX>380-d/2 && mouseX<380+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>460-d/2 && mouseX<460+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>500-d/2 && mouseX<500+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed){
    fill(0, 0);
  } else {
    fill(65, 224, 185);
  }
  circle(currentH[index], area.centerY, d);
  if(mouseX>380-d/2 && mouseX<380+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>460-d/2 && mouseX<460+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>500-d/2 && mouseX<500+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed){
    fill(0, 0);
  } else {
    fill(255);
  }
  text(health, currentH[index], area.centerY); //円の上に文字を描く

  //経済円
  const ecoPos = map(eco, 0.05, 1, area.left+startX, area.right-20);
  currentEc[index] = lerp(currentEc[index], ecoPos, 0.02);
  if(mouseX>380-d/2 && mouseX<380+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>420-d/2 && mouseX<420+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>500-d/2 && mouseX<500+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed){
    fill(0, 0);
  } else {
    fill(65, 105, 225);
  }
  circle(currentEc[index], area.centerY, d); 
  if(mouseX>380-d/2 && mouseX<380+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>420-d/2 && mouseX<420+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>500-d/2 && mouseX<500+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed){
    fill(0, 0);
  } else {
     fill(255);
  }
  text(eco, currentEc[index], area.centerY); //円の上に文字を描く

  //政治円
  const poliPos = map(poli, 0.05, 1, area.left+startX, area.right-20);
  currentP[index] = lerp(currentP[index], poliPos, 0.02);
  if(mouseX>380-d/2 && mouseX<380+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>420-d/2 && mouseX<420+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>460-d/2 && mouseX<460+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed){
    fill(0, 0);
  } else {
    fill(224, 185, 65);
  }
  circle(currentP[index], area.centerY, d);
  if(mouseX>380-d/2 && mouseX<380+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>420-d/2 && mouseX<420+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed || mouseX>460-d/2 && mouseX<460+d/2 && mouseY>30-d/2 && mouseY<30+d/2 && mouseIsPressed){
    fill(0, 0);
  } else {
    fill(255);
  }
  text(poli, currentP[index], area.centerY); //円の上に文字を描く

  //国名
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(12);
  text(Datamate.columnName(index), area.left+10, area.centerY);
}
