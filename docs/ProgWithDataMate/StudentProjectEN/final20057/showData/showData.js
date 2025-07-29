const title = "International Comparison of Mask Wear Rates";
const titleX = 250;  //表題を表示するx座標
let kaoImg;
let jpImg;
let krImg;
let crImg;
let caImg;
let auImg;
let esImg;
let frImg;
let ukImg;
let nlImg;
let dkImg;
//イラスト引用元：いらすとや https://www.irasutoya.com

//マスク着用率引用元　https://www.oecd-ilibrary.org/sites/c259e79a-en/1/3/3/index.html?itemId=/content/publication/c259e79a-en&_csp_=e30c250b05052d4713703488884a9ef6&itemIGO=oecd&itemContentType=book#section-d1e8490

function preload() {
  kaoImg = loadImage("./images/kao.png");
  jpImg = loadImage("./images/Japan.png");
  krImg = loadImage("./images/South-Korea.png");
  crImg = loadImage("./images/Costa-Rica.png");
  caImg = loadImage("./images/Canada.png");
  auImg = loadImage("./images/Australia.png");
  esImg = loadImage("./images/Spain.png");
  frImg = loadImage("./images/France.png");
  ukImg = loadImage("./images/United-Kingdom.png");
  nlImg = loadImage("./images/Netherlands.png");
  dkImg = loadImage("./images/Denmark.png");
}


function setup() {
  createCanvas(800, 400);
  Datamate.make("mask.csv");
  Datamate.makeArea(0, 30, width, height, 5, 2);
  Datamate.bindAreas([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  Datamate.play(0.3);
  //Datamate.plot();// データを表示
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
}

function draw() {
  background(240);
  for (let i=1; i<=10; i++) {
    drawData(i);    // データiを描画
  }
}

  function drawData(index) {
    textSize(12);
  const area = Datamate.area(index);
  const month = Datamate.current('年月');
  const value = Datamate.current(area.name);
  const mvalue = Datamate.current(area.name, true);  //結びついたデータセットからデータを取り出す
  const w = map(mvalue, 0.0, 230, 0.0, area.width);  //データを円の直径に換算 200はarea.widthでも良い
  let img = [null, jpImg, krImg, crImg,caImg, auImg, esImg, frImg, ukImg, nlImg, dkImg];
  if(dist(mouseX, mouseY, area.centerX, area.centerY) < (area.width-10)/2) {
    image(img[index], area.centerX+50, area.centerY-40, 50, 38);
  }
  image(kaoImg, area.centerX, area.centerY-20, 100, 100);
  fill(0, 102, 204);
  rect(area.left+45, area.bottom-130, w, 40);
  strokeWeight(4);  //線を太く
  noFill();
  stroke(0, 102, 204);
  arc(area.left+45, area.bottom-110, 30, 30, HALF_PI, PI+HALF_PI);
  arc(area.left+115, area.bottom-110, 30, 30, PI+HALF_PI, HALF_PI);
  noStroke();
  fill(0);
  textSize(16);
  text(title+"("+month+")", titleX, 30);  //表題と年の表示
  text(area.name + "\n" + value+ "％", area.centerX, area.bottom-40);
    
}
