#!/bin/perl
print"Content-type:text/html;charset=euc-jp\n\n";
print <<EOF;
<html>
<head>
<title>Book Shelf</title>
<meta http-equiv="Content-Type" content="text/html; charset=x-sjis">
<style>
   hr {
     margin: 0px 0 5px 10px; 
   }
   h2 {
     margin: 0;
     font-weight:bold;
     padding: 5px 0 5px 10px;
     font-size: 20px; 
   }
   a:link{
     color:#00f;
   }
   a:visited {
     color:#f0f;
   }
   .item {
    font-size:12 pt;
    font-weight:bold;
    color:#333;
    margin: 15px 0 10px 150px;
   }
   .state-top {
    font-size:12pt;
    margin: 5px 0 5px 110px;
    border-left-style: solid;
    border-left-width: 10px;
    border-left-color: #f0f;
    padding-left: 5px;
   }
   .state {
    font-size:10pt;
    margin: 20px 0 5px 110px;
   }
   .copy{
    font-size:8pt;
    color:#333;
    font-family:"Arial";
    text-align:center; 
   }
</style>
</head><body>
<H2>本棚を覗く</H2>
<div class="state"> 
本棚からその人が見えてくる。
その人の興味と記録と記憶を触る。
</div>
<hr noshade>
<div class="state-top"> 本棚を選ぶ：</div>
EOF
open(TEMP, "./shelflist.txt");
while(<TEMP>){
    ($place, $comm)=split(',');
    print "<a href='./nakami.cgi?";
    print $place;
    print "'><div class='item'>";
    print $comm;
    print "</div></a>"
}

print <<EOF;
<hr noshade>
<div class="copy"> 
arigat at-sign acm.org / copyright &copy; 2004 ariga taeko 
</div>
</body></html>
EOF






