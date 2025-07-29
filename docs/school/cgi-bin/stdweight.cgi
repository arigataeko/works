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
print "�̏d��$taiju Kg, �g����$shintyo cm�Ɠ��͂���܂����B\n";
$hyojun=($shintyo/100)*($shintyo/100)*22;
print "�W���̏d��$hyojun Kg�ł��B\n";

$himando=$taiju / (($shintyo/100)*($shintyo/100));
print "���Ȃ��̔얞�x��$himando�ŁA";

if (15>=$himando) {print "�₹����\n";}
elsif (($himando>15) and ($himando<=20)) {print "�₹����\n";}
elsif ((20<$himando) and (25>=$himando)) {print "����\n";}
elsif ((25<$himando) and (30>=$himando)) {print "���肬��\n";}
elsif ($himando>30){print "���肷��\n";}
exit 0;
