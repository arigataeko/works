#!/usr/bin/perl
require 'jcode.cgi';
print "Content-type:text/plain;charset=Shift_JIS\n\n";

read(STDIN,$data,$ENV{"CONTENT_LENGTH"});
&decode();
print "ê^éó: ";
print "$cgi{'string'}";
exit 0;


sub decode{
 @parts=split('&',$data);
 foreach(@parts){
 ($name,$value)=split("=");
 $value=~ tr/+/ /;
 $value=~ s/%([0-9a-fA-F][0-9a-fA-F])/pack("C",hex($1))/eg;
 $value =~ s/~!/ ~!/g; 
 &jcode'convert(*value,'sjis');
 $cgi{$name}=$value;
 }
}
