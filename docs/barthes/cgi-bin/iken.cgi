#!/usr/bin/perl
require 'jcode.cgi';

print"Content-type:text/html;charset=EUC-JP\n\n";
print <<EOF;
 <HTML>
 <HEAD>
 <TITLE>Thank you for your opinion</TITLE>
 </HEAD>
 <BODY>
EOF

read(STDIN,$data,$ENV{"CONTENT_LENGTH"});


print <<EOF;
 <H2>生のデータ</H2>
 <HR>
   $data<BR>
 <HR>
EOF

&decode();


print <<EOF;
 <H2>デコードしたデータ</H2>
 <HR>
  お名前:$cgi{'name'}<BR>
  ご意見:$cgi{'opinion'}<BR>
 <HR>
 <A HREF="../iken.html">戻る</A><BR>
EOF


print"</BODY>\n";
print"</HTML>\n";

sub decode{
 @parts=split('&',$data);
 foreach(@parts){
 ($name,$value)=split("=");
 $value=~ tr/+/ /;
 $value=~ s/%([0-9a-fA-F][0-9a-fA-F])/pack("C",hex($1))/eg;
 &jcode'convert(*value,'euc');
 $cgi{$name}=$value;
 }
}
