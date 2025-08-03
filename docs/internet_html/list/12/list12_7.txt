#!/usr/bin/perl

print"content-type:text/html;\n\n";
print <<EOF;
<html> <head> <title>Himando Hantei</title>
<meta charset="UTF-8"> </head>
<body>
<h3>肥満度判定結果</h3> <hr>
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

$hyojun=($shintyo/100)*($shintyo/100)*22;
print"標準体重は$hyojun Kgです。<br>\n";
$himando=$taiju/(($shintyo/100)*($shintyo/100));
print"あなたの肥満度は$himandoで、\n";

if ($himando<=15) {print "やせすぎ";}
elsif (($himando>15) and ($himando<=20)) {print "やせぎみ";}
elsif (($himando>20) and ($himando<=25)) {print "正常";}
elsif (($himando<25) and ($himando<30)) {print "太りぎみ";}
elsif ($himando>=30){print "太りすぎ";}

print "です。\n";
print"</body></html>\n";
