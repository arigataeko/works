/*function drawKeypoints() {
 for (let i = 0; i < predictions.length; i++) {
 const keypoints = predictions[i].scaledMesh;
 }
 }
 */
class Letter {
  constructor(ch, ch2, xPos, threshold, s, c, c2, sc) {
    this.y = 0;
    this.x = xPos;
    this.moji = ch;
    this.moji2 = ch2;
    this.thresh = threshold;
    this.speed = s;
    this.color = c;
    this.color2 = c2;
    this.size = sc;
  }


  update() {
    rectMode(CENTER);
    for (let i = 0; i < predictions.length; i++) {
      const keypoints = predictions[0].keypoints;

      if (keypoints[76].y<keypoints[13].y) {
        this.y = this.y + this.speed;
        fill(this.color);
        text(this.moji, this.x, this.y);
      } else if (keypoints[76].y>keypoints[13].y) {
        this.y = this.y - this.speed;
        fill(this.color2);
        text(this.moji2, this.x, this.y);
      }
      if (this.y >= height || this.y < 0) {
        this.y= 0;
        textSize(this.size);
      } else if (this.y <= 0 || this.y < 0) {
        this.y= height;
      }
      textSize(this.size);
    }
  }
}
