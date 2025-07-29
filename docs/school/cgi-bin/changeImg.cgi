#!/usr/bin/perl
$dir = "image";
$jikan = (localtime)[2];

if ($jikan >= 19 || $jikan < 5){
  $img ="yoru.jpg";
}elsif($jikan >= 16 && $jikan < 19){
  $img ="yugata.jpg";
}else{
  $img ="hiru.jpg";
}

open(GAZO,  "$dir/$img");

print "Content-type:image/jpg\n\n";
print <GAZO>;
close(GAZO);
