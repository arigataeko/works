//  複数の円が円上を移動 往復運動
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
float len = 60; // 軌跡の円の半径
float ver=270;  //往復位置の補正　角度 3時位置は0度、右回り

void setup() {
  size(150, 150);   //描画するための画面
  noStroke();
  da1[angle1.length-1]=3;  //右列の変化量(配列末尾の値を設定)
  da2[angle2.length-1]=-3; //左列の変化量(配列末尾の値を設定)
  for(int i=angle1.length-2;i>=0;i--){  //右列の配列初期化
    angle1[i]= angle1[i+1] + 10; // 配列末尾は0で、先頭に向かって10ずつ増える
    da1[i] = da1[i+1];           //後ろの要素と同じ値(全部3)
  }
  for(int i=angle2.length-2;i>=0;i--){  //左列の配列初期化
    angle2[i]= angle2[i+1] - 10;// 配列末尾は0で、先頭に向かって10ずつ減る
    da2[i] = da2[i+1];
  }
}

void draw() { 
     background(255);   //画面の背景を白でクリア
     for(int i=0; i<n; i++){
        angle1[i] = angle1[i] + da1[i];
        angle2[i] = angle2[i] + da2[i];
        x1 = len * cos(radians(angle1[i]+ver)) + width/2.0;
        y1 = len * sin(radians(angle1[i]+ver)) +  height/2.0;
        fill(200,0,0); //右は赤
        ellipse(x1, y1, d, d);
        x2 = len * cos(radians(angle2[i]+ver)) + width/2.0;
        y2 = len * sin(radians(angle2[i]+ver)) +  height/2.0;
        fill(0);
        ellipse(x2, y2, d, d);  
        if(angle1[i]>180){// 右の列 角度180度で衝突
           angle1[i] = 180 - (angle1[i]-180);  //衝突時180を越えた差分を折り返す
           da1[i] = -da1[i];
         }else if(angle1[i]<0){// 右の列 角度0度で衝突
           angle1[i] = - angle1[i];  //衝突時0を越えた差分を折り返す
           da1[i] = -da1[i];
        }
        if(angle2[i]<-180){// 左の列 角度180度で衝突
          angle2[i] = -180 - (angle2[i]+180);  //衝突時180を越えた差分を折り返す
          da2[i] = -da2[i];
        }else if(angle2[i]>0){// 左の列 角度0度で衝突
          angle2[i] = - angle2[i];  //衝突時0を越えた差分を折り返す
          da2[i] = -da2[i];
       }
     }
}


