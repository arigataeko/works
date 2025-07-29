// 四角形の分割を繰り返す。 マウスクリックで開始

int W = 250, H = 200; //ウィンドウの幅と高さ
int LEFT = 20, TOP = 20; //外側の四角形の位置
int nn = 8; //分割回数

void setup(){
  size(W,H);
  frameRate(5);
  background(255);
  rect(LEFT, TOP,W-LEFT*2, H-TOP*2);
  devideRect(LEFT, TOP, W-LEFT*2, H-TOP*2, nn);
}

void draw(){}

void devideRect(int x, int y, int w, int h, int n){
   if(n <= 0){  return; }
   if(w>=h){
        int m = (int)(random(w));
        line(x+m, y, x+m, y+h);     
        devideRect(x, y, m, h, n-1);
        devideRect(x+m, y, w-m, h, n-1);
     }else{
        int m = (int)(random(h));
        line(x, y+m, x+w, y+m);
        devideRect(x, y, w, m, n-1);
        devideRect(x, y+m, w, h-m, n-1);
     }
   }

void mouseReleased(){
    background(255);
    rect(LEFT, TOP,W-LEFT*2, H-TOP*2);
    devideRect(LEFT, TOP, W-LEFT*2, H-TOP*2, nn);
}


