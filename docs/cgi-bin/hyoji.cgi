#!/bin/perl

print"Content-type:text/html;charset=x-sjis\n\n";
print <<EOF;
<html>
<head>
<title> hyouji dirctory</title>
<meta http-equiv="Content-Type" content="text/html; charset=x-sjis">

</head>
<body>
EOF

open(TEMPFILE, "./tempfile.txt");
while(<TEMPFILE>){
    $_=~ s/\n//;
    print "<img src='";
    print $_;
    print "' weight=160 height=160 vspace=10 hspace=10>";
}
close(TEMPFILE);

print <<EOF;
</body>
</html>
EOF










