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
 <H2>���Υǡ���</H2>
 <HR>
   $data<BR>
 <HR>
EOF

&decode();


print <<EOF;
 <H2>�ǥ����ɤ����ǡ���</H2>
 <HR>
  ��̾��:$cgi{'name'}<BR>
  ���ո�:$cgi{'opinion'}<BR>
 <HR>
 <A HREF="../iken.html">���</A><BR>
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
