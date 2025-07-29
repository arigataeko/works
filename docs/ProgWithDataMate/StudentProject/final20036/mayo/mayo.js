const title = "2017年 都道府県庁所在地別、二人以上の世帯当たり年間のマヨネーズ購入数量(g)";
let speed = 1;
let currentY = [];  //項目ごとの途中のy座標
let lastY = [];  //項目ごとの最終y座標
let mayoImg;
let mayo2Img;
function preload() {
  mayoImg = loadImage("./images/mayo.png");
  mayo2Img = loadImage("./images/mayo2.png");
}


function setup() {
  createCanvas(1000, 1000);
  fill(200, 0, 0);
  Datamate.make("mayomayo.csv");
  Datamate.makeArea(0, 40, width, height, 10, 5);  //Datamate.makeArea(x座標, y座標, 横幅, 高さ, 列(横)の分割数, 行の分割数);
  Datamate.bindAreas([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]);  //Datamate.bindAreas([データセット番号, データセット番号,..]);
  Datamate.play(0.3);  //約3.3秒に1回データが動く。Datamate.play(１秒間にデータを動かす回数); 引数に2を指定すると0.5秒ごとに、引数に0.4を指定すると2.5秒ごとに、Datamate.current()関数で取り出されるデータが順番に進みます。
noStroke();
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
 //Datamate.plot();  //データcsvが読めているか確認するためのもの
  
for (let i=0; i<48; i++) {
    currentY[i] = 0;  //最初の位置
  }
}

function draw() {
  background(243,253,258);
  
  for(let i=1; i<=47; i++){
    drawData(i); 
  }
}

function drawData(index){
  const area = Datamate.area(index);
  const value = Datamate.current(area.name);
  const lastY = map(value, 1400, 3400, 0,100);
  image(mayoImg, area.centerX, area.centerY-25);
  
  strokeWeight(4);  //線を太く
 if (lastY <= currentY[index]) {  //最終y座標になったら
    speed = 0;          //止める
    noStroke();
    text(value+"g",area.centerX,area.top+85+currentY[index]);
  } else {
  speed = 1;          //そうでないなら1ずつ増やす
  stroke(255, 245, 173);
}
  currentY[index] = currentY[index] + speed;
  stroke(253, 243, 148);
  line(area.centerX, area.top+75, area.centerX, area.top+75+currentY[index]);
  if(dist(mouseX, mouseY, area.centerX, area.centerY-40) < (area.width)/2){ 
  //dist(mouseX, mouseY, その位置のx座標, その位置のy座標)キャンバス上の特定の範囲に、
  //マウスが移動した時に、なんらかの応答をさせる場合、マウスとその位置との距離を計算する必要があります。
  //それには、dist()を使います。
  //マウスが円内に入ったら、
  noStroke();
  fill(243,253,258);
  rect(area.centerX-50,area.top+60,100,170);
  image(mayo2Img, area.centerX, area.centerY-25);
  }
  
  stroke(0);  //黒色
  strokeWeight(1);  //太さ１px
  noFill();  //塗りなし
  rect(area.left, area.top, area.width, area.height-8);
  rect(area.left, area.top, area.width, area.height-175);

  
  noStroke();
  fill(0);
  text(area.name, area.centerX, area.top + 15);
  text(title, 240,23);
  
}
function mousePressed() {
  for (let i=0; i<48; i++) {
    currentY[i] = 0;  //最初の位置
  }
}
