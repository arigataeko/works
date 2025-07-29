#!/usr/bin/perl
require 'jcode.cgi';
print "Content-type: text/plain\n\n";

read(STDIN,$data,$ENV{"CONTENT_LENGTH"});
print "$data";

&decode();

print "$cgi{'string'} reversed is: ";
$kekka=reverse($cgi{'string'});
print "$kekka\n";
exit 0;


sub decode{
 @parts=split('&',$data);
 foreach(@parts){
 ($name,$value)=split("=");
 $value=~ tr/+/ /;
 $value=~ s/%([0-9a-fA-F][0-9a-fA-F])/pack("C",hex($1))/eg;
 $value =~ s/~!/ ~!/g; 
 &jcode'convert(*value,'euc');
 $cgi{$name}=$value;
 }
}
