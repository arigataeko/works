let highlightedIndex = -1;
let highlightChangeFrame = 0;
const highlightInterval = 180;

function setup() {
  createCanvas(700, 700);
  Datamate.make("Languages.csv");
  Datamate.makeAreas(0, 0, width, height, 1, 1);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  background(225);
  
  if (frameCount - highlightChangeFrame > highlightInterval) {
    highlightedIndex = int(random(Datamate.columnCount()));
    highlightChangeFrame = frameCount;
  }

  // 1. 画面上部に挨拶を大きく表示
  if (highlightedIndex >= 0 && highlightedIndex < Datamate.columnCount()) {
    const greeting = Datamate.value(2, highlightedIndex);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(50);
    text(greeting, width/2, 60);
  }

  // 2. パイチャートを描画（位置を調整）
  const chartArea = Datamate.area(0);

  const centerX = chartArea.centerX;
  const centerY = chartArea.centerY - 20;

  push();
  translate(centerX, centerY);
  rotate(-90);

  const pieDiameter = chartArea.width/1.65;
  const pieRadius = pieDiameter / 2;

  fill(0, 0, 80);
  circle(0, 0, pieDiameter);

  let currentPieStartAngle = 0;
  const totalWorldPopulation = 804500;

  for (let i = 0; i < Datamate.columnCount(); i++) {
    const languageName = Datamate.columnName(i);
    const languagePopulation = Datamate.value(0, i);
    const languageRegion = Datamate.value(1, i);

    const percentage = (languagePopulation / totalWorldPopulation) * 100;
    const angleSpan = 360 * (percentage / 100);

    const pieSegmentStartAngle = currentPieStartAngle;
    const pieSegmentEndAngle = currentPieStartAngle + angleSpan;

    let segmentColor;
    const isHighlighted = (i === highlightedIndex);

    if (isHighlighted) {
      segmentColor = color(60, 100, 100);
    } else {
      const hueValue = map(i, 0, Datamate.columnCount(), 0, 360);
      segmentColor = color(hueValue, 80, 90);
    }

    const segmentDiameter = isHighlighted ? pieDiameter * 1.05 : pieDiameter;

    drawPieSegment(
      pieSegmentStartAngle,
      pieSegmentEndAngle,
      segmentColor,
      segmentDiameter
    );

    currentPieStartAngle += angleSpan;
  }

  pop();

  // 3. 情報ボックスの描画（位置を下に調整）
  const infoBoxX = chartArea.centerX;
  const infoBoxY = height - 80;
  const infoBoxWidth = width - 15;
  const infoBoxHeight = 100;

  fill(240);
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
  rect(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight, 10);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);

  if (highlightedIndex >= 0 && highlightedIndex < Datamate.columnCount()) {
    const name = Datamate.columnName(highlightedIndex);
    const population = Datamate.value(0, highlightedIndex);
    const region = Datamate.value(1, highlightedIndex);
    const greeting = Datamate.value(2, highlightedIndex);
    const percentage = (population / totalWorldPopulation) * 100;

    text(name + "\n" + percentage.toFixed(1) + "%" + "\n" + population + "(万人)\n" + region, infoBoxX, infoBoxY);
  } else {
    text("全体\n100%\n" + totalWorldPopulation + "(万人)", infoBoxX, infoBoxY);
  }
}

function drawPieSegment(startAngle, endAngle, segmentColor, pieDiameter) {
  fill(segmentColor);
  arc(0, 0, pieDiameter, pieDiameter, startAngle, endAngle);
}
