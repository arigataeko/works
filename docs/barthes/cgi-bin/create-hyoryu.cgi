#!/usr/bin/perl
require 'jcode.cgi';

print"Content-type:text/html;charset=x-sjis\n\n";
print <<EOF;
<html>
<head>
<title>balto test</title>
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
        font-weight:bold;
}
</style>
</head>
<body  onload="calcPos()" >

<SCRIPT type="text/javascript">
<!--

EOF

read(STDIN,$data,$ENV{"CONTENT_LENGTH"});
&decode();

@bun = split('\n', $ttt{'texts'});

$i=0;
print "var word = new Array(\n";
foreach (@bun){
  s/\n$//;
  print "\"";
  print $_ ;
  print "\"";
  print $i;
  if($i != $#bun) {print ","};
  $i = $i+1;
}
print ");\n";

print <<EOF;
var x,y;
var stepx=15;
var stepy=40;


/* 1文字ずつを切り出して、配列に入れる*/
for (i=0;i<=word.length-1;i++) { 
   word[i]=word[i].split("");
}

var xpos=new Array();
var ypos=new Array();
for(i=0;i<word.length;i++){  //位置情報の初期化
    xpos[i] = new Array(word[i].length);
    ypos[i] = new Array(word[i].length);
    for(j=0; j<xpos[i].length; j++){
        xpos[i][j] = 150 + stepx*j;
	ypos[i][j] = 50 + (stepy)*i;
    }
}

//styleオブジェクト用配列
var moji = new Array(word.length);
for (i=0; i<word.length; i++) {
   moji[i] = new Array(word[i].length);
}

//文字要素の書き出し
for(i=0; i<word.length; i++){
  for(j=0; j<word[i].length; j++){
    document.write("<span id='span"+ i + "_" + j + "' class='spanstyle'>");
    document.write(word[i][j]);
    document.write("</span>");
  } 
 }
//styleオブジェクトの取り出し
for (i=0; i<word.length; i++) {
   for (j=0; j<word[i].length; j++) {
       if (document.all) {  /* IE */
            moji[i][j] = eval("span" + i + "_" + j + ".style");  //ex. span11.style
       }else if (document.layers) {  /* NN4 */
    	    moji[i][j] = eval("document.span"+i+"_"+j);
       } else if (document.getElementById) {  /* NN6 */
  	    moji[i][j] = 
               eval("document.getElementById('span" + i + "_" + j + "').style");
       }
   } // for j	
} //for i

for (i=0; i<word.length; i++) {//位置の初期化
   for (j=0; j<word[i].length; j++) {
     moji[i][j].left = xpos[i][j];
     moji[i][j].top = ypos[i][j];
   }
}

var selecti=0; //マウスのある文字
var selectj=0;
var oldi = selecti; //前にマウスのあった行
var oldj = selectj; //前にマウスのあった列
var onM = false;//マウスのある文字をみつけたフラグ
var onC = false;//クリックオンフラグ

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
// NNは、ページ内のマウス位置の座標をpageX,pageYで参照
// IEは、可視ページ内のマウスの座標をclientX,clientYで参照
//       scrollLeft, scrollTopはスクロール後可視ページオフセット位置
// IEは、Eventオブジェクトを引数eで受け取れない
    x = (document.all) ? document.body.scrollLeft+event.clientX: e.pageX
    y = (document.all) ? document.body.scrollTop+event.clientY: e.pageY

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

//alert(selecti + " " + selectj + "  " + onM );

function mouseHandleDown(e){
	x = (document.all) ? document.body.scrollLeft+event.clientX: e.pageX
	y = (document.all) ? document.body.scrollTop+event.clientY: e.pageY
	if(onC){ onC=false;} 
        else if(!onC && onM){
           onC=true;
           moji[selecti][selectj].color = "#3300ff";
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



