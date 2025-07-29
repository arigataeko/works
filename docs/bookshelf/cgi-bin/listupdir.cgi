#!/bin/perl
require 'jcode.cgi';

print"Content-type:text/html;charset=x-sjis\n\n";
print <<EOF;
<html>
<head>
<title> listup dirctory</title>
<meta http-equiv="Content-Type" content="text/html; charset=x-sjis">

</head>
<body>
EOF

read(STDIN,$data,$ENV{"CONTENT_LENGTH"});
&decode();
print $cgi{'dirname'};
print "<br>";
open(TEMPFILE, ">./tempfile.txt");
opendir(DIR, $cgi{'dirname'});
while($file=readdir(DIR)){
    print $file;
    print "<br>";

    print TEMPFILE $file;
    print TEMPFILE "\n";
}
close(TEMPFILE);
print <<EOF;
</body>
</html>
EOF


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
