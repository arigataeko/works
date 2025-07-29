
let cw = 20;      //アイスのコーンの幅
let move = true;
let colors = ["#002B5B","#2B4865", "#256D85", "#8FE3CF"];
let snowImg, cornImg, iceImg;

function preload(){
  snowImg = loadImage("./images/snow.png");
  cornImg = loadImage("./images/corn.png");
  iceImg = loadImage("./images/ice.png");
}

function setup(){
  createCanvas(800, 950);
  Datamate.make("yuki_ice.csv");
  Datamate.makeAreas(0, 0, width, height, 8, 6);
  imageMode(CENTER);
}

function draw(){
  background(250, 253, 255);

  for (let index=0; index<47; index++) {

    let area = Datamate.area(index);
    let date = Datamate.columnName(index);
    let yuki_value = Datamate.value(0, index);
    //let size = Datamate.value('京都の降水量', index, 5, 20);
    let yuki_count = Datamate.value(0, index, 0, 750);
    
    let ice_value = Datamate.value(1, index);
    let ice_count = Datamate.value(1, index, 7000, 14000);
    
    // 枠枠
    noFill();
    stroke(220);
    rect(area.left, area.top, area.width, area.height);  //左上座標、幅、高さ
    noStroke();
    
    // Color and Alpha //
    let colorValue = color(random(colors));
    colorValue.setAlpha(alpha);

    // 雪
    fill(colorValue);
    for (let i=0; i<yuki_count; i++) {
      let x = random(area.left, area.right);
      let y = random(area.top, area.bottom);
      image(snowImg, x, y, 7, 7);
    }
    // アイスのコーン
    image(cornImg, area.centerX, area.bottom-20, cw, cw*2);
    
    // アイス 8000から15000まで、1000ごとにアイスを増やす
    let h = 15;
    for (let i = 0; i < 6; i++) {
      if (ice_count < 9000 + (i * 1000)) {
        for (let j = 0; j <= i; j++) {
            image(iceImg, area.centerX, area.bottom - 45 - (j*h), 20, 20);
        }
        break;
      }
    }

    fill(0);
    text(date, area.left + 5, area.top + 15);
    
    if (mouseX>area.left && mouseX<area.right && mouseY<area.bottom && mouseY>area.top) {
      fill(0);
      text('__ ' + yuki_value + 'h', area.centerX, area.top + 15);
    }
  }
}

function mousePressed() {
  if (move) {
    move = false;
    noLoop();
  } else {
    move = true;
    loop();
  }
}
