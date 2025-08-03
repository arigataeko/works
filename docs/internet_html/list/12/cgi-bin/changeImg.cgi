#!/usr/bin/perl
$dir = "pict"; #画像ファイルを置くフォルダ。$は変数名につける記号。
               #プログラムを/cgi-bin/に置くとすると，そこからの相対パス，/cgi-bin/pictを意味する
$jikan = (localtime)[2]; #現在時刻のうちの，時間情報を得る

if ($jikan >= 19 || $jikan <= 5){  #19時以降，5時以前の場合
  $img ="yoru.jpg";                #夜の画像を設定
}elsif($jikan >= 16 && $jikan < 19){  #←16時以降19より前の場合
  $img ="yugata.jpg";              #夕方の画像を設定
}else{                             #それ以外の場合
  $img ="hiru.jpg";                #昼の画像を設定
}

open(GAZO, "./$dir/$img");  #設定した画像ファイルを開く

print "Content-type: image/jpeg\n\n";  #MIMEタイプの設定
print <GAZO>;       #画像ファイルの中身を出力
close(GAZO);        #画像ファイルを閉じる
