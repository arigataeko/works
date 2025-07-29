// Trail3  リスト3-2-1
// Total early-stage Entrepreneurial Activity (TEA) 総合起業活動指数
// 10カ国のデータを上方向に動く円で表現
let countryNameY = 15;    //国名下辺からの距離
let lowY = 40;    //円が一番下にある時の下辺からの距離
let d = 30;      //円の直径
let henka = 1;
let currentY = [];  //項目ごとの途中の移動距離

function setup() {
  createCanvas(510, 300);
  Datamate.make("国", ["Italy", "Japan", "Germany", "Norway", "China", "Australia", "Korea", "India", "USA", "Brazil"]);
  Datamate.make("企業活動指数", [2.8, 5.4, 7.6, 8.4, 8.7, 10.5, 14.9, 15.0, 17.4, 23.3]);  
  Datamate.makeAreas(0, 0, width, height, 10, 1);

  noStroke();
  textAlign(CENTER, CENTER); //文字を表示する際、中心の座標を指定
  for (let i=0; i<Datamate.columnCount(); i++) {
    currentY[i] = 0;  //最初は0
  }
}

function draw() {
  background(240);
  
  for(let i=0; i<Datamate.columnCount(); i++){
    moveUpCircle(i);
  }
}

function moveUpCircle(number){
    let area = Datamate.area(number);  // エリアをとりだす
    let country = Datamate.columnName(number);//列のヘッダ
    let value = Datamate.value(0, number);  //データの取り出し
    let position = map(value, 0, 28, 0, height-lowY); // 円が止まるy座標
    
    if (currentY[number] >= position) {  //最終位置まで動いたら
      henka = 0;          //y座標を変えない
      fill(0, 0, 200);    //青にする
    } else {
      henka = 1;          //そうでないなら1ずつ増やす
      fill(200, 0, 0);    //赤で描く
    }
    currentY[number] = currentY[number] + henka;  //進める
    circle(area.centerX, area.bottom-currentY[number]-lowY, d, d);
    
    fill(0);
    text(country, area.centerX, area.bottom-countryNameY); //国名表示
    if (henka == 0) {  //数値表示
      text(value + "%", area.centerX, area.bottom-currentY[number]-lowY-20);
    }
}

function mousePressed() {
  for (let i=0; i<10; i++) {
    currentY[i] = 0;  //初期化
  }
}
