class ButtonRect {
  float x, y;      // Position of square button
  float h;         // Height of rect
  float w;         // Width of rect
  color rectColor, lineColor; // color for fill and stroke
  color rectHighlight;  // color when mouse is over
  PFont font;           // Font for lable
  String label;         // String for label of button
 
  ButtonRect(float posx, float posy, float rW, float rH, String label, int fontsize) {
    rectColor = color(255);
    lineColor = color(255);
    rectHighlight = color(204);
     
    x = posx;
    y = posy;
    w = rW;
    h = rH;
    this.label = label;
    font = createFont("Helvetica", fontsize);
  }

  void setFillColor(color c){
     rectColor = c;
  }
    void setStrokeColor(color c){
     lineColor = c;
  }
  void display() {
    if (over()) {
      fill(rectHighlight, 100);
    } else {
      fill(rectColor);
    }
    stroke(lineColor);
    rect(x, y, w, h);
    fill(0);
    textAlign(CENTER, CENTER);
    textFont(font);
    text(label, x+w/2, y+h/2);
  }

  boolean over() {  //when mouse is over, return true.
    if (mouseX >= x && mouseX <= x+w && 
      mouseY >= y && mouseY <= y+h) {
      return true;
    } else {
      return false;
    }
  }
}
