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

$str=$ENV{QUERY_STRING};
&decode();

$docroot = $ENV{"DOCUMENT_ROOT"};
$serveradd = $ENV{"SERVER_ADDR"}; 
$fullpath = $docroot.$str;

print $fullpath;
print "<br>";

open(TEMPFILE, ">./tempfile.txt");
opendir(DIR, $fullpath);
while($file=readdir(DIR)){
    $a = substr($file, 0, 1);
    if($a eq "."){}
    else {
       print TEMPFILE "http://";
       print TEMPFILE $serveradd;
       print TEMPFILE $str;
       print TEMPFILE $file;
       print TEMPFILE "\n";
    }
}
close(TEMPFILE);
closedir(DIR);
print <<EOF;
<script type="text/javascript">
<!--
    location.replace("./hyoji.cgi"); 
//-->
</script>
</body></html>
EOF


sub decode{
$str=~ tr/+/ /;
$str=~ s/%([0-9a-fA-F][0-9a-fA-F])/pack("C",hex($1))/eg;
&jcode'convert(*str,'euc');
}










