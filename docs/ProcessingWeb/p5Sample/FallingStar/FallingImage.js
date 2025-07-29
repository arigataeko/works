class FallingImage {
  constructor(xPos, yPos, speed) {
    this.x = xPos;
    this.y = yPos;
    this.speed = speed;
    this.isColor = false; // 色付きかどうか
    this.rising = false;  // 上昇中かどうか
    this.soundPlayed = false; // 音が再生されたかどうか
  }

  update(lipX, lipY) {
    if (this.rising) {
      // 上昇
      this.y -= this.speed;
      if (this.rising && this.y < 0) {
        this.rising = false; // 画面外に出たら下降に戻す
        this.y = random(-200, 0); // 再度ランダムな高さに設定
        this.isColor = false; // 色付き状態をリセット
        this.soundPlayed = false; // 音の再生フラグをリセット
      }
    } else {
      // 通常の降下
      this.y += this.speed;

      // 当たり判定
      let d = dist(this.x, this.y, lipX, lipY);
      if (d < 40) { // 判定の範囲を調整
        this.rising = true; // 上昇に切り替え
        this.isColor = true; // 色付き状態に変更
        
        // 色付きに変わるタイミングで音を再生
        if (!this.soundPlayed) {
          starSound.play(); // 音を再生
          this.soundPlayed = true; // 再生フラグを立てる
        }
      }
    }

    // 画面外に落ちたら上部に戻す
    if (this.y > height || this.y < 0) {
      this.y = random(-200, 0); // 上部にリセット
      this.x = random(width); // 横位置もリセット
      this.isColor = false; // 色付き状態をリセット
      this.soundPlayed = false; // 音の再生フラグをリセット
    }

    // 描画
    if (this.isColor) {
      image(colorStar, this.x, this.y, 40, 40); // 色付き星
    } else {
      image(star, this.x, this.y, 40, 40); // 通常の星
    }
  }
}
