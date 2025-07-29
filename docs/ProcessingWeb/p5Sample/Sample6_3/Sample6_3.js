var song, analyzer;  //p5.SoundFileとp5.Amplitude用の変数を定義←(1)

function preload() {   //音声ファイルを用意、前もってロードしておく←(2)
  song = loadSound('data/funaJingle.mp3');
} 

function setup() {
  createCanvas(250, 250);
  fill(200, 0, 0);
  analyzer = new p5.Amplitude();//Amplitudeオブジェクトの生成←(3)
  analyzer.setInput(song); //Amplitudeオブジェクトからの入力開始←(4)
}

function draw() {
  background(0);
  var rms = analyzer.getLevel();// 振幅の平均値を取得 (0から1.0の間の値)←(5)
  var d = map(rms, 0, 1, 0, width*2); //入力値(0から1)を0から500に換算←(6)
  ellipse(width/2, width/2, d, d); //描画
}

function mousePressed() {  //マウスクリックで音声を再生、停止←(7)
  if (song.isPlaying()){
    song.stop();
  } else {
    song.loop();
  }
}
