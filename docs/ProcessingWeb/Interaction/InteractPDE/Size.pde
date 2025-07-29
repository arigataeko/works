// マウスのｘ位置に応じて円の大きさを変える
void setup() {
  size(150, 150);   // 描画するための画面
}

void draw() { 
     fill(255,50);  //塗りつぶしの色を白、透明度を設定
     noStroke();   //枠線なし
     rect(0,0,width, height); //画面いっぱいの四角を描く(画面を白でクリア)
     noFill();       //円は塗りつぶさない
     strokeWeight(2);        //円の太さは2ピクセル
     stroke(200, 0, 0);      //円の線の色は赤
     ellipse(width/2, height/2, mouseX, mouseX);
}


