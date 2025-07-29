class ButtonCircle {
  float x, y;      // Position of circle button
  float diameter;  // Diameter of circle button
  color circleColor, lineColor; // color for fill and stroke
  color circleHighlight;       // color when mouse is over
  PFont font;                  // Font for label
  String label;                // String for label of button

  ButtonCircle(float posx, float posy, float d, String label, int fontsize) {
    circleColor = color(255);
    lineColor = color(0);
    circleHighlight = color(204);
    x = posx;
    y = posy;
    diameter = d;
    this.label = label;
    font = createFont("Helvetica", fontsize);
  }

  void setFillColor(color c) {
    circleColor = c;
  }
  void setStrokeColor(color c) {
    lineColor = c;
  }
  void display() {
    if (over()) {
      fill(circleHighlight, 100);
    } else {
      fill(circleColor);
    }
    stroke(lineColor);
    ellipse(x, y, diameter, diameter);
    fill(0);
    textAlign(CENTER, CENTER);
    textFont(font);
    text(label, x, y);
  }

  boolean over() {
    float disX = x - mouseX;
    float disY = y - mouseY;
    if (sqrt(sq(disX) + sq(disY)) < diameter/2 ) {
      return true;
    } else {
      return false;
    }
  }
}
