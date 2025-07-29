const title = "飲料のエネルギー量を角砂糖で表すと";
//const d = 35;   //円の直径
let sugerImg;
const startX = 200;  //左端のx座標
let currentX = [];//イメージの数
let s = 0;

function preload() {
    sugerImg = loadImage("./images/suger2.png");
  }
function setup() {
  createCanvas(800, 700);
  Datamate.make("sugerin.csv"); 
  Datamate.makeAreas(0, 55, width, height-70, 1, 12);
  imageMode(CENTER);
  // Datamate.bindAreas([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for(let i=0; i<Datamate.columnCount(); i++){
  currentX[i] = 0;
}


  //Datamate.plot();// データを表示
}

function draw() {
  background(220);
  //タイトル部分
  noStroke();
  textAlign(LEFT, CENTER);  //text()の引数、x座標は文字列の左端, y座標は中央 
  textSize(15);
  fill(0);
  text(title, 30, 30);  //データタイトルの表示
  
  for (let i=0; i<Datamate.columnCount(); i++) {
    drawData(i);    // データiを描画
  }
}

function drawData(index){
  const area = Datamate.area(index);   // 割り当てられたエリアをとりだす
  const suger = Datamate.value(Datamate.rowName(0), index);
  const kcal = Datamate.value(Datamate.rowName(1), index);
  print(Datamate.columnName(index) + "  " +  open + "  "+ suger);  //コンソールで確認するため

  
  //何個絵を描くか
  fill(0);
   for(let i=0; i<suger-1; i++){
    image(sugerImg, i*35+startX-15,area.centerY-5,s,s);
  }
   if(s<35){
      s = s + 0.05;
   }
  textAlign(CENTER, CENTER);
  fill(255);
  


//種類をかく
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(12);
  text(Datamate.columnName(index), area.left+10, area.centerY);
  fill(200,0,0);
  if(mouseX>area.left+10 && mouseX<area.left+130 && mouseY>area.centerY-5 && mouseY<area.centerY+5){
    text(kcal,area.left+100,area.centerY+15);
  }else{
  text("",area.left+100,area.centerY+15);
  
  if(mouseIsPressed){
  s = 0;
  }
}

}
