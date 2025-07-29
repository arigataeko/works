//const title = "世界の平均睡眠時間と睡眠満足度";
const satisfaction = [46, 40, 40, 45, 67, 55,
  45, 41, 57, 47, 29, 35];
let imgw = [];  //画像の幅
let currentY = [];  //項目ごとの途中のy座標
let speed = 1; //スピード
const d = 16.1;

let neruImg; 
let neru2Img;   //暗い
let okiruImg;  //すっきり
let okiru2Img;  //眠そう
let dispImg; 

function preload() {
  neruImg = loadImage("./images/neru.png");
  neru2Img = loadImage("./images/neru2.png");
  okiruImg = loadImage("./images/okiru.png");
  okiru2Img = loadImage("./images/okiru2.png");
}

function setup() {
  createCanvas(1000, 300);
  noStroke();
  textAlign(CENTER, CENTER);
  Datamate.make('国名', '睡眠時間');
  Datamate.make('平均',[506]);
  Datamate.make('アメリカ',[531]);
  Datamate.make('イギリス',[508]);
  Datamate.make('イタリア',[513]);
  Datamate.make('インド',[528]);
  Datamate.make('オランダ',[503]);
  Datamate.make('オーストラリア',[512]);
  Datamate.make('韓国',[471]);
  Datamate.make('中国',[542]);
  Datamate.make('ドイツ',[498]);
  Datamate.make('日本',[442]);
  Datamate.make('フランス',[513]);
  
  Datamate.makeArea(0, 0, width, height, 12, 1);
  Datamate.bindAreas([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  
  //Detamate.plot();
  for(let i=0; i<12; i++){
    currentY[i] = 0;
  }
  imageMode(CENTER);
}
function draw() {
  background(240);
  for(let i=1; i<=12; i++){
    drawData(i);    // データiを描画
  }
}

function drawData(index) {
  const area = Datamate.area(index);   // 割り当てられたエリアをとりだす
  const value = Datamate.current(area.name);
  const targetH = map(value, 420, 550, area.top+30, area.bottom-40);  //データを高さに換算
  imgw[index-1] = map(satisfaction[index-1], 20, 70, area.width-70, area.width); //画像の幅を計算
  if (index == 2 || index == 3 || index == 8 || index == 11 ||index == 12) {
    fill(220, 210, 235);    //暗めの薄紫にする
  }else{
    fill(230, 220, 255);    //薄紫にする
  }
  rect(area.centerX-imgw[index-1]/2, area.height-(currentY[index-1]+imgw[index-1]/2), imgw[index-1], currentY[index-1]+imgw[index-1]/2);
  
  if (currentY[index-1]+imgw[index-1] >= targetH) {  //最終x座標になったら
     speed = 0;  //スピードを0にし
     fill(155, 100, 205);    //紫にする
     text(value + "分", area.centerX, area.height-currentY[index-1]-imgw[index-1]-8);  //平均睡眠時間を表示
     fill(140, 200, 100);    //黄緑で描く
     text(satisfaction[index-1] + "%" , area.centerX, area.height-currentY[index-1]+8);  //睡眠満足度を表示
     //text("--------------" , area.centerX, area.height-targetH);
     if (index == 2 || index == 3 || index == 8 || index == 11 ||index == 12) {
        dispImg = okiru2Img;  //起きる2画像
     }
     else{
       dispImg = okiruImg;  //起きる画像
     }
   } else {
      speed = 1;  //スピードを1にし
      if (index == 2 || index == 3 || index == 8 || index == 11 ||index == 12) {
        dispImg = neru2Img;  //寝る2画像
     }
     else{
       dispImg = neruImg;  //寝る画像
     }
   }
   currentY[index-1] = currentY[index-1] + speed;
   image(dispImg, area.centerX, area.height-currentY[index-1]-imgw[index-1]/2, imgw[index-1], imgw[index-1]);
   
  textAlign(LEFT, CENTER);
  textSize(16);
  fill(155, 100, 205);    //紫にする
  //text(title, 120, 15);  //表題と年の表示
  text("睡眠時間", 50+d*5, 15);  //表題の表示
  fill(140, 200, 100);    //黄緑で描く
  text("睡眠満足度", 50+d*10, 15);  //表題の表示
  fill(0);
  text("世界各国の", 50, 15);  //表題の表示
  text("・", 50+d*9, 15);  //表題の表示
  text("(2021)", 50+d*15, 15);  //表題の表示
  textSize(12);
  textAlign(CENTER, CENTER);
  text(area.name, area.centerX, area.bottom-10);
}
function mousePressed(){
    for(let i=0; i<12; i++){
       currentY[i] = 0;
  }
}
