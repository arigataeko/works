#!/usr/bin/perl
require 'jcode.cgi';

print"Content-type:text/html;charset=x-sjis\n\n";
print <<EOF;
<html>
<head>
<title>The touch of texts for Ecourte</title>
<meta http-equiv="Content-Type" content="text/html; charset=x-sjis">
<style>
body {
        background-image:url(paint1.gif);
        background-repeat:repeat-y;
        background-color:#ffffff
}
.spanstyle {
	position:absolute;
	font-size:10pt;
	font-family:osaka,serif;
        font-weight:bold
}
</style>
</head>
<body>

<SCRIPT type="text/javascript">
<!--

EOF

read(STDIN,$data,$ENV{"CONTENT_LENGTH"});
&decode();

@bun = split('\n', $ttt{'texts'});

$i=0;
print "var word = new Array(\n";
foreach (@bun){
  s/[\n\r]//;
  print "\"";
  print $_;
  print "\"";
  if($i != $#bun) {print ", "};
  $i = $i+1;
}
print ");\n";

print <<EOF;
/* 1文字ずつを切り出して、配列に入れる*/
for (i=0;i<=word.length-1;i++) { 
   if(word[i].length == 0){ //空行だったら
     word[i] = new Array(" ");
   }else{
     word[i]=word[i].split("");
   }
}

//styleオブジェクト用配列
var moji = new Array(word.length);
for (i=0; i<word.length; i++) {
   moji[i] = new Array(word[i].length);
}
EOF

if($ttt{'select'} eq "kiku") {&tate(); }
elsif ($ttt{'select'} eq "drift") {&yoko(); }
elsif ($ttt{'select'} eq "iso") {&yoko(); }


print <<EOF;
//styleオブジェクトの取り出し
  for (i=0; i<word.length; i++) {
     for (j=0; j<word[i].length; j++) {
       if (document.all) {  /* IE */
            moji[i][j] = eval("span" + i + "_" + j + ".style");  
                                               //ex. span11.style
       }else if (document.layers) {  /* NN4 */
    	    moji[i][j] = eval("document.span"+i+"_"+j);
       } else if (document.getElementById) {  /* NN6 */
  	    moji[i][j] = 
              eval("document.getElementById('span" + i + "_" + j + "').style");
       }
     } // for j	
  } //for i

  var x,y;  //マウスの位置
  var selecti=0; //マウスのある文字
  var selectj=0;
  var onM = false;//マウスのある文字をみつけたフラグ
  var onC = false;//クリックオンフラグ
  var oldi = selecti; //前にマウスのあった行
  var oldj = selectj; //前にマウスのあった列
  var xpos=new Array();
  var ypos=new Array();
EOF

if($ttt{'select'} eq "kiku") {&kiku(); }
elsif ($ttt{'select'} eq "drift") {&drift(); }
elsif ($ttt{'select'} eq "iso") {&iso(); }


print <<EOF;
  function checkPos(){
    if(!onC){ //クリック中でない時、マウスがどの文字の上にあるか調べる
        foundit:  //マウスのある文字を見つけた時、もどるためのラベル
        for (i=0; i<word.length; i++) {
          for (j=0; j<word[i].length; j++) {
	   if(x>=xpos[i][j] && x<xpos[i][j]+stepx &&
             y>=ypos[i][j] && y<ypos[i][j]+stepy){ 
                  oldi = selecti;
                  oldj = selectj;
                  selecti = i;
                  selectj = j;
                  onM = true;
                  break foundit;
           } //end if
          } // for j
        } //for i
        if(i >= word.length) { onM = false;}  //マウスは文字上にない

	if(oldi != selecti || !onM){ //マウスが外れた行は色を黒にする
           for (j=0; j<word[oldi].length; j++) {
              moji[oldi][j].color = "#000000";
          }
           moji[oldi][oldj].color = "#3300ff"; //マウスが通った文字だけ青
        }else{ //マウスのある行は色を赤にする
         for (j=0; j<word[selecti].length; j++) {
              moji[selecti][j].color = "#cc0033";
          }
       } 
    }
  }

//NN：MOUSEMOVEイベントが起きたら、documentオブジェクトに伝える
  if(document.layers){
    document.captureEvents(Event.MOUSEMOVE | Event.MOUSEDOWN);
  }
  document.onmousemove=mouseHandleMove;
  document.onmousedown=mouseHandleDown;

//-->
</script>

</body>
</html>
EOF

sub yoko{
print <<EOF;
  for(i=0; i<word.length; i++){
    for(j=0; j<word[i].length; j++){
      document.write("<span id='span"+ i + "_" + j + "' class='spanstyle'>");
      document.write(word[i][j]);
      document.write("</span>");
    } 
  }
EOF
}

sub tate{
print <<EOF;
  for(i=0; i<word.length; i++){
    for(j=0; j<word[i].length; j++){
      document.write("<span id='span"+ i + "_" + j + 
                 "' class='spanstyle' style='writing-mode:tb-rl'>");
      document.write(word[i][j]);
      document.write("</span>");
    } 
  }
EOF
}

sub kiku{
  print <<EOF;
  var stepx=35;
  var stepy=15;
  var startx= word.length*45+50;
  for(i=0;i<word.length;i++){  //位置情報の初期化
    xpos[i] = new Array(word[i].length);
    ypos[i] = new Array(word[i].length);
    for(j=0; j<xpos[i].length; j++){
        xpos[i][j] = startx - stepx*i;
	ypos[i][j] = 50 + (stepy)*j;
        moji[i][j].left = xpos[i][j];
        moji[i][j].top = ypos[i][j];
    }
  }

  var K=10; // フックの法則の係数
  var R=20; // 減衰抵抗の係数
  var G=30; // 重力
  var D=0.01; // 
  var springx = 0;  // ばねx方向の力
  var springy = 0;  // ばねy方向の力
  var lim=0.1; //停めるため閾値
  var max=0; //1行中の最大文字数

  xdif=new Array();
  ydif=new Array();
  for (i=0;i<word.length;i++) {  //1行中の最大文字数を探す
   if(max <= word[i].length){
     max = word[i].length;
   }
  }
  for (i=0;i<max;i++) { 
   xdif[i]=0;
   ydif[i]=0;
  }

  function calcRubber(m, n) {
   var dx = xpos[selecti][m]-xpos[selecti][n];
   var dy = ypos[selecti][m]-ypos[selecti][n];

   var heni = Math.sqrt(dx*dx + dy*dy);

   if(heni > 10){
     var force = K * (heni-10);
     springx += force * dx / heni;  // x方向の力
     springy += force * dy / heni;  // y方向の力
   }
  }

  function calcYure(n) {
   springx = 0;  // x方向の力
   springy = 0;  // y方向の力
   if (i == word[selecti].length-1) {
      calcRubber(n-1, n);
   } else {
      calcRubber(n-1, n);
      calcRubber(n+1, n);
   }

   var teikox = -xdif[n] * R;
   var teikoy = -ydif[n] * R;

   var avx = springx + teikox;       // F = ma
   var avy = springy + teikoy + G;

   xdif[n] += (avx * D);
   ydif[n] += (avy * D);

   if(Math.abs(xdif[n])<lim && Math.abs(ydif[n])<lim
      && Math.abs(avx)<lim && Math.abs(avy)<lim){
     xdif[n] = 0;
     ydif[n] = 0;
   }
   xstep = xdif[n];   
   ystep = ydif[n];   
  }


  function calcPos() { //クリック後、文字位置がマウスに追随
   if(onC){ //選択した行の位置
     for(j=0; j<word[selecti].length; j++) {
       if(j==0){
          xpos[selecti][0]=x;
	  ypos[selecti][0]=y;
       }else{
          calcYure(j);
	  xpos[selecti][j]=xpos[selecti][j]+xstep;
	  ypos[selecti][j]=ypos[selecti][j]+ystep;
       }
       moji[selecti][j].left = xpos[selecti][j];
       moji[selecti][j].top = ypos[selecti][j];
     }
   }
   var timer=setTimeout("calcPos()", 30);
  }

  function mouseHandleMove(e){
    x = (document.all) ? document.body.scrollLeft+event.clientX: e.pageX
    y = (document.all) ? document.body.scrollTop+event.clientY: e.pageY

    if(!onC){ //クリック中でない時、マウスがどの文字の上にあるか調べる
        checkPos();
    }
  }

  function mouseHandleDown(e){
	x = (document.all) ? document.body.scrollLeft+event.clientX: e.pageX
	y = (document.all) ? document.body.scrollTop+event.clientY: e.pageY
	if(onC){ onC=false;} 
        else if(!onC && onM){
           onC=true;
           moji[selecti][selectj].color = "#3300ff";
       } 
  } 

  calcPos();

EOF
}

sub drift{
  print <<EOF;
  var stepx=15;
  var stepy=40;
  for(i=0;i<word.length;i++){  //位置情報の初期化
    xpos[i] = new Array(word[i].length);
    ypos[i] = new Array(word[i].length);
    for(j=0; j<xpos[i].length; j++){
        xpos[i][j] = 130 + stepx*j;
	ypos[i][j] = 50 + (stepy)*i;
        moji[i][j].left = xpos[i][j];
        moji[i][j].top = ypos[i][j];
    }
  }

  function calcPos() { //クリック後、文字位置がマウスに追随
   if(onC){ //選択した文字の右側の動き
     for (j=word[selecti].length-1; j>selectj; j--) {
	xpos[selecti][j]=xpos[selecti][j-1]+stepx;
	ypos[selecti][j]=ypos[selecti][j-1];
        moji[selecti][j].left = xpos[selecti][j];
        moji[selecti][j].top = ypos[selecti][j];
     }
     for (j=0; j<selectj; j++) {//選択した文字の左側の動き
	xpos[selecti][j]=xpos[selecti][j+1]-stepx;
	ypos[selecti][j]=ypos[selecti][j+1];
        moji[selecti][j].left = xpos[selecti][j];
        moji[selecti][j].top = ypos[selecti][j];
     } 
     //選択した文字の位置
     xpos[selecti][selectj] = x; 
     ypos[selecti][selectj] = y;
     moji[selecti][selectj].left = xpos[selecti][selectj];
     moji[selecti][selectj].top = ypos[selecti][selectj];
   }
   var timer=setTimeout("calcPos()", 50);
  }

  function moveDown() { //文字列全体が下へ動く
    for (i=0; i<word.length; i++) {
      if(onC && i == selecti) continue; //マウスにつかまっている行は動かさない
      for (j=0; j<word[i].length; j++) {
	moji[i][j].left = xpos[i][j];
	ypos[i][j]= ypos[i][j] +10;
	moji[i][j].top = ypos[i][j];

        if(ypos[i][j] > 500){
          ypos[i][j]= ypos[i][j] - 550;
        }
      }
    }
   var timer=setTimeout("moveDown()", 1000);
  }

  function mouseHandleMove(e){
    x = (document.all) ? document.body.scrollLeft+event.clientX: e.pageX
    y = (document.all) ? document.body.scrollTop+event.clientY: e.pageY

    if(!onC){ //クリック中でない時、マウスがどの文字の上にあるか調べる
        checkPos();
    }
  }

  function mouseHandleDown(e){
	x = (document.all) ? document.body.scrollLeft+event.clientX: e.pageX
	y = (document.all) ? document.body.scrollTop+event.clientY: e.pageY
	if(onC){ onC=false;} 
        else if(!onC && onM){
           onC=true;
           moji[selecti][selectj].color = "#3300ff";
       } 
  } 
  calcPos();
EOF
}

sub iso{
  print <<EOF;
  var cx=0; // 円の中央
  var cy=0;
  var dr = Math.PI/45; //移動角度
  var dm = 20; //円弧上の文字間距離
  var angle=new Array();
  var r=new Array();
  var stop=new Array();
  var stepx=15; //1文字の範囲
  var stepy=15;

  for(i=0;i<word.length;i++){  //位置情報配列の生成
       xpos[i] = new Array(word[i].length);
       ypos[i] = new Array(word[i].length);
  }

  for(i=0;i<word.length;i++){  // 最初は動いている
       stop[i] = false;
   }

  //一番内側の円の半径
  r[0] = (word[0].length * dm) / (2*Math.PI); 
  //各円の半径の設定
  for(i=1;i<word.length;i++){  
        r[i] = r[i-1] + 20;
        dis = dm / r[i]; //文字間の中心角
        if((dis*word[i].length) > (2*Math.PI)) { //デフォルトの円周が足らない
            r[i] = (word[i].length * dm) / (2*Math.PI); //半径大きくする
                for(k=i;k<word.length;k++){  
                    r[k+1] = r[k] + 20;
                }
        }  // end of if
  }

  //中央の位置
  cx = r[word.length-1] + 150;
  cy = r[word.length-1] + 50;

  for(i=0;i<word.length;i++){  //円周上の位置
         angle[i] = new Array(word[i].length);
         angle[i][0] = 0;
         var dis = dm / r[i]; //文字間の中心角
         for(j=1; j<word[i].length; j++){
           angle[i][j] = parseFloat(angle[i][j-1]+ dis);
         }
     rotateObj(i);
  }
  function rotateObj(i){
      for(j=0; j<angle[i].length; j++){
          angle[i][j] = angle[i][j] - dr;
          xpos[i][j] = r[i]*Math.cos(angle[i][j]) + cx;
          ypos[i][j] = r[i]*Math.sin(angle[i][j]) + cy;
          moji[i][j].left = xpos[i][j];
          moji[i][j].top = ypos[i][j];
      }
      if(stop[i]) { return; }
      else { setTimeout("rotateObj(" + i + ")", 500); }
  }  // end of rotateObj

  function mouseHandleMove(e){
    x = (document.all) ? document.body.scrollLeft+event.clientX: e.pageX
    y = (document.all) ? document.body.scrollTop+event.clientY: e.pageY

    //マウスがどの文字の上にあるか調べる
    checkPos();
  }

  function mouseHandleDown(e){
	x = (document.all) ? document.body.scrollLeft+event.clientX: e.pageX
	y = (document.all) ? document.body.scrollTop+event.clientY: e.pageY

	if(onM && stop[selecti]){ //停まっている行の上でクリック
          stop[selecti]=false;
          rotateObj(selecti);
        } 
        else if(onM && !stop[selecti]){ //動いている行の上でクリック
          stop[selecti]=true;
          moji[selecti][selectj].color = "#3300ff";
       } 
  } 
EOF
}

sub decode{
 @parts=split('&',$data);
 foreach(@parts){
 ($name,$value)=split("=");
 $value=~ tr/+/ /;
 $value=~ s/%([0-9a-fA-F][0-9a-fA-F])/pack("C",hex($1))/eg;
 &jcode'convert(*value,'sjis');
 $ttt{$name}=$value;
 }
}



