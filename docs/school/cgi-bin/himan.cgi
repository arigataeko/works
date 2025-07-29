#!/usr/bin/perl

print"content-type:text/html\n\n";
print <<EOF;
<HTML>
<HEAD>
<TITLE>Himando Hantei</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS">
</HEAD>
<BODY>
<H2>肥満度判定結果</H2>
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
print"標準体重は$hyojun Kgです。<BR>\n";
$himando=($taiju-$hyojun)/$hyojun*100;
print"あなたの肥満度は$himando%で、\n";

if (-20>=$himando) {print "やせすぎ";}
elsif (($himando>-20) and ($himando<-10)) {print "やせぎみ";}
elsif ((-10<=$himando) and (10>=$himando)) {print "正常";}
elsif ((10<$himando) and (20>$himando)) {print "太りぎみ";}
elsif ($himando>=20){print "太りすぎ";}

print "です。\n";
print"</BODY>\n";
print"</HTML>\n";
