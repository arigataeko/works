// ２つの円の列が波にのって移動。中央で衝突する。 往復運動
//マウスで停止、再開
boolean f = true;
void mouseClicked(){
  if(f) {
    noLoop();
    f = false;
  }else {
    loop();
    f = true;
  }
}

int n = 10; //円の数
float[] angle1  = new float[n]; // 位置(角度)
float[] angle2  = new float[n]; // 位置(角度)
float[] da1 =  new float[n]; //  角度の変化量
float[] da2 =  new float[n]; //  角度の変化量

float x1, y1, x2, y2;
float d = 10; // 円の直径
float h =60; // 振幅

void setup() {
  size(150, 150);   //描画するための画面
  noStroke();
  angle2[angle2.length-1]=720;
  da1[angle1.length-1] = 3;
  da2[angle2.length-1] = -3;
  for(int i=angle1.length-2;i>=0;i--){  
    angle1[i]= angle1[i+1] + 15;
    da1[i] = 3;
  }
   for(int i=angle2.length-2;i>=0;i--){  
    angle2[i]= angle2[i+1] - 15;
    da2[i] = -3;
  }
}

void draw() { 
     background(255);   //モニタ画面の背景を白でクリア
     for(int i=0; i<n; i++){
        angle1[i] = angle1[i] + da1[i];
        angle2[i] = angle2[i] + da2[i];
        x1 = map(angle1[i], 0, 720, 0, width);
        y1 = height/2.0 - sin(radians(angle1[i]))*h;
        fill(200,0,0); //左は赤
        ellipse(x1, y1, d, d);
        x2 = map(angle2[i], 0, 720, 0, width);
        y2 = height/2.0 - sin(radians(angle2[i]))*h;
        fill(0);
        ellipse(x2, y2, d, d);
        
        if(dist(x1,y1,x2,y2)<d){//衝突
           da1[i] = -da1[i];
           da2[i] = -da2[i];
        }else{
          if(angle1[i]<0 || angle1[i]>720){//左の列　壁
             da1[i] = -da1[i];
          }
          if(angle2[i]<0 || angle2[i]>720){//右の列　壁
             da2[i] = -da2[i];
          }
        }
     }
}


