#!/usr/bin/perl

print"content-type:text/html\n\n";
print <<EOF;
<HTML>
<HEAD>
<TITLE>Himando Hantei</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS">
</HEAD>
<BODY>
<H2>�얞�x���茋��</H2>
<HR>
EOF


$m=$ENV{"REQUEST_METHOD"};
if($m eq "GET"){ $str=$ENV{QUERY_STRING};
}else{
 read(stdin,$str,$ENV{"CONTENT_LENGTH"});
}

@parts=split('&',$str);
$i=0;foreach(@parts){
($name[$i],$value[$i])=split("=");
 $i++;
}

$taiju=$value[0];
$shintyo=$value[1];

$hyojun=($shintyo-100)*0.9;
print"�W���̏d��$hyojun Kg�ł��B<BR>\n";
$himando=($taiju-$hyojun)/$hyojun*100;
print"���Ȃ��̔얞�x��$himando%�ŁA\n";

if (-20>=$himando) {print "�₹����";}
elsif (($himando>-20) and ($himando<-10)) {print "�₹����";}
elsif ((-10<=$himando) and (10>=$himando)) {print "����";}
elsif ((10<$himando) and (20>$himando)) {print "���肬��";}
elsif ($himando>=20){print "���肷��";}

print "�ł��B\n";
print"</BODY>\n";
print"</HTML>\n";
