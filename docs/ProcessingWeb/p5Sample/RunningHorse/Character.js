class Character {
  constructor() {
    this.r = 200;  // キャラの表示サイズ
    this.x = 50;   // キャラのx座標（画面上は固定）
    this.y = height - this.r - 20;  // キャラのy座標
    this.imgs = [
      loadImage("data/uma1.png"), loadImage("data/uma2.png"), loadImage("data/uma3.png")];
    this.powerImg = loadImage("data/uma_bikkuri.png"); // 大声用
    
    this.frameIdx = 0; // アニメーションのコマ管理
  }
  
  

  // 音量に応じてスピードを計算して返す
  calculateSpeed(vol) {
    if (vol > 0.1) {
      return 0;                 // 大きすぎる声：停止
    } else if (vol > 0.08) {
      return random(10, 20);   // 大きな声：高速
    } else if (vol > 0.05) {
      return random(4, 8);   // 中くらいの声：中速
    } else if (vol > 0.01) {
      return random(1, 3);   // 小さい声：低速
    } else {
      return 0;              // 静か：停止
    }
  }


//画像をそれぞれ変える
  show(vol) {
    let currentImg;
    if (vol > 0.1) {
      currentImg = this.powerImg;
    }else if (vol > 0.01) {
      let idx = floor(frameCount / 10) % this.imgs.length;
      currentImg = this.imgs[idx];
    }else{
      currentImg = this.imgs[0];
    }
    
    
    image(currentImg, this.x, this.y, this.r, this.r);
  }
}
