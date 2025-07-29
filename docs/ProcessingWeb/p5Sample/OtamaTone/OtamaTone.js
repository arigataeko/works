//let mic;
let song, analyzer;
let songVoice, analyzerVoice;
let lerpD = 0;
let faceC = 2; //0: red, 1; blue

function preload() { //音声ファイルをロードしておく←(2)
  song = loadSound('Otama_Sound.mp3');
  songVoice = loadSound('Otama_Voice.mp3');
} 

function setup() {
  let cnv = createCanvas(500, 500);
  cnv.mousePressed(userStartAudio);
  analyzer = new p5.Amplitude();//Amplitudeの生成←(3)
  analyzer.setInput(song);//Amplitudeからの入力開始←(4)
  analyzerVoice = new p5.Amplitude();//Amplitudeの生成←(3)
  analyzerVoice.setInput(songVoice);//Amplitudeからの入力開始←(4)

  noStroke(); //線なし
  
}

function draw() {
  background(255);
    
  fill(240, 50, 0);
  textSize(20);
  textAlign(CENTER);
  text("Press Mouse", 250, 250);
    
    let vol = analyzerVoice.getLevel();
    if(faceC ==0){
      background(0,68,204);
      fill(240, 50, 0);
  textSize(20);
  textAlign(CENTER);
  text("Press to Change", 250, 450);
      
  let a = map(vol, 0, 0.8, 0, 20); 
  let b = map(vol, 0, 0.6, 0, 50); 
  let c = map(vol, 0, 0.8, 0, 20);
  let e = map(vol, 0, 0.3, 0, 50);
  let f = map(vol, 0, 0.3, 0, 60*2.5);
  let g = map(vol, 0, 0.3, 0, 200);
  drawOtama(width/2, height/2, 150, 150, a, b, c, e, f, g);
}else if(faceC == 1){
  background(230,115,0);
  
        fill(240, 50, 0);
  textSize(20);
  textAlign(CENTER);
  text("Press to Change", 250, 450);
  
  let h = map(vol, 0, 0.5, 0, 40); 
  //lerpD = lerp(lerpD, d, 0.1);
  let m = map(vol, 0, 0.8, 0, 30); 
  let l = map(vol, 0, 0.3, 0, 100); 
drawOpera(width/2, height/2, 110, 110, h, m, l);
}
}

//       顔の中心,顔半分の幅と高さ,目の直径,嘴の長さ
function drawOtama(x, y, w, h, faceW, faceH, eye, mouth1, mouth2, hand) {
  
  fill(252, 226, 196);//肌色
  quad(x-30, y-300+hand, x+100, y+40-300+hand, x+100, y+90-300+hand, x-30, y+60-300+hand)//右手親指
  ellipse(x-30, y+30-300+hand, 45, 60);
  
   fill(237,216,19);//黄色
  ellipse(x, y+30, w-faceW, h+faceH);//顔
  rect(x-15, y+30, 30, -280);//枝
  fill(179, 179, 179);//灰色
  rect(x-5, 0, 10, 180);//枝2
  ellipse(x, 180, 10, 10);
  fill(50);//黒
  ellipse(x-30, y-10-eye, 10, 10);  //左目
  ellipse(x+30, y-10-eye, 10, 10);  //右目
  fill(220, 200, 17); //黄色2
  arc(x, y+30, w-faceW, mouth1, radians(180), radians(360));
  arc(x, y+30, w-faceW, 0-mouth2, radians(0), radians(180));
  
  push();//左手
  noFill();//塗りつぶしなし
  stroke(252, 226, 196);//肌色
  strokeWeight(50);
  arc(x, y+30, w+50-faceW, 200+faceH, radians(0), radians(180));//指
  strokeWeight(65);
   arc(x, y+30, w+65-faceW, 200+faceH, radians(160), radians(200));//親指
  pop();
  
  fill(252, 226, 196);//肌色
  quad(0, y+50, x-80, y+50, x-25, y+130, 0, y+130)
  
  
  quad(x-20, y-300+hand, x+90, y-45-300+hand, x+90, y-300+hand, x-20, y+45-300+hand)//右手人差し
  ellipse(x-20, y+22.5-300+hand, 43.5, 43.5);
  quad(x+90, y-45-300+hand, x+200, y-40-300+hand, x+200, y+5-300+hand, x+90, y-300+hand)//右手人差し2
  quad(x+85, y+15-300+hand, x+200, y-300+hand, x+200, y+45-300+hand, x+85, y+60-300+hand)//右手中指
  ellipse(x+85, y+37.5-300+hand, 30, 45);
  quad(x+95, y+58-300+hand, x+200, y+43-300+hand, x+200, y+83-300+hand, x+95, y+98-300+hand)//右手薬
  ellipse(x+95, y+78-300+hand, 30, 40);
  quad(x+125, y+90-300+hand, x+200, y+93-300+hand, x+200, y+128-300+hand, x+125, y+125-300+hand)//右小指
  ellipse(x+125, y+107.5-300+hand, 30, 35);
  
  arc(x+200, y+40-300+hand, 300, 180, radians(220), radians(140)); //右手こう
}

function drawOpera(x, y, w, h, mouth, eye, hand){

  fill(100);//グレー
quad(x-45, 330, x+45, 330, x+35, 410, x-35, 410);//脚

push();
stroke(50);//黒
line(x, 330, x, 410);
pop();
  
fill(50);//黒
ellipse(x, y+10, 200, 180);//体
ellipse(x-18, 410, 40, 20);//右靴
ellipse(x+18, 410, 40, 20);//左靴
  
  fill(252, 226, 196);//肌色
ellipse(x, y-120, w, h);//顔
  
  fill(252, 185, 126);
rect(x-10, y-20-70, 20, 20);//口
  
  fill(252, 226, 196);//肌色
rect(x-10, y-20-70+mouth, 20, 20);//あご
push();
stroke(70);
arc(x, y-71+mouth, 20, 10, radians(0), radians(180));//顎下
pop();

fill(300);//白ネクタイ
 triangle(x, y-50, x-10, y-55, x-10, y-45);
  triangle(x, y-50, x+10, y-55, x+10, y-45);

fill(50);//黒
ellipse(x+18, y-130, 10, 10-eye);//左黒目
ellipse(x-18, y-130, 10, 10-eye);//右黒目

arc(x, y-90, 30, 20, radians(180), radians(0));//ひげ
arc(x, y-155, 35, 25, radians(180), radians(0));//髪の毛

push();//左手
translate(x-65-18, y-40);
rotate(radians(-20+hand));
fill(252, 226, 196);
circle(+15, 80, 30, 20);
fill(50);
rect(0, 0, 30, 80);
pop();

push();//右手
translate(x+65+18, y-40);
rotate(radians(20-hand));
fill(252, 226, 196);
circle(+15-30, 81, 30, 20);
fill(50);
rect(0, 1, -30, 80);
pop();

}



function mousePressed(){
  
  if(faceC == 2){faceC = 1;
 song.loop();
  songVoice.loop();
}
  if(faceC == 0){
  faceC = 1;
}else if(faceC == 1){
  faceC = 0;
  }
  
}
