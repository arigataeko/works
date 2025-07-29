class AHamon {
  constructor(limit) {  //コンストラクタ
    this.max = limit;
    this.d = 0;   //直径
    this.x = 0;  //円の中央
    this.y = 0;
    this.dr = 5; //円の直径の変化量
    this.move = false; //動いているか否か
  }

  prepare(xx, yy) { //波紋を準備
    this.move=true;
    this.x = xx;
    this.y = yy;
    this.d = 0;  //大きさをはじめに戻す。
  }

  display() {
    strokeWeight(2); //線の太さを指定
    if (this.move) {   //波紋広がり中の処理
      this.d=this.d+this.dr;   // 大きさを増加
      ellipse(this.x, this.y, this.d, this.d);  // 円を描く
      if (this.d>this.max) { //最大値を越えたので止める。
        this.move = false;
      }
    }
  }  // display()の終わり
}  // class定義の終わり
