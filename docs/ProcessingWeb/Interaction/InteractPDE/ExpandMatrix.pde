// 格子状に配置した円の大きさが増加、減少
//直径がマウス位置に応じて変化
int x, y;
int sa = 20; //円の中心の間隔

void setup(){
  size(150,150);
  noFill();
  stroke(200, 0, 0);
}

void draw(){
   background(255);
   for(x=5; x<width;  x=x+sa){
     for(y=5; y<height; y=y+sa){
       ellipse(x, y, mouseX, mouseX);
     }
   }
}


