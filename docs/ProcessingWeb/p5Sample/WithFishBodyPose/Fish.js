class Fish{
  constructor(bara, yPos, fish, s , muki){
    this.bara = bara;
    this.muki = muki;
    if(muki == 0){ //左向き
      this.x = width + 10 + bara; //魚のx座標
      this.y = yPos; //魚のy座標
      this.fImg = loadImage("dataL/fish" + fish + ".png");
    }
    if(muki == 1){ //右向き
      this.x = -80 - bara;
      this.y = yPos;
      this.fImg = loadImage("dataR/fish" + fish + ".png");
    }
    this.speed = s; //スピード
  }
  
  update(){
    if(this.muki == 0){ //左向き
      this.x -= this.speed; //移動
      if(this.x < -100) this.x = width + 10 + this.bara; //端に行ったら戻る
    }
    if(this.muki == 1){ //右向き
      this.x += this.speed;
      if(this.x > 650) this.x = -10 - this.bara;
    }
    image(this.fImg, this.x, this.y); //指定した座標を中心として魚を描画
  }
}
