#!/usr/bin/perl

read(STDIN,$data,$ENV{"CONTENT_LENGTH"});
print "Content-type: text/plain\n\n";
print "$data";
@parts=split('&',$data);
$i=0;foreach(@parts){
  ($name[$i],$value[$i])=split("=");
  $value[$i] =~ tr/+/ /;
  $value[$i] =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
  $value[$i] =~ s/~!/ ~!/g; 
  $value[$i] =~ tr/[\r\n]//d;
  $i++;
}

$taiju=$value[0];
$shintyo=$value[1];
print "体重は$taiju Kg, 身長は$shintyo cmと入力されました。\n";
$hyojun=($shintyo/100)*($shintyo/100)*22;
print "標準体重は$hyojun Kgです。\n";

$himando=$taiju / (($shintyo/100)*($shintyo/100));
print "あなたの肥満度は$himandoで、";

if (15>=$himando) {print "やせすぎ\n";}
elsif (($himando>15) and ($himando<=20)) {print "やせぎみ\n";}
elsif ((20<$himando) and (25>=$himando)) {print "正常\n";}
elsif ((25<$himando) and (30>=$himando)) {print "太りぎみ\n";}
elsif ($himando>30){print "太りすぎ\n";}
exit 0;
