#!/usr/bin/perl

$m=$ENV{"REQUEST_METHOD"};
if($m eq "GET"){
   $data=$ENV{'QUERY_STRING'};
}else{
 read(STDIN,$data,$ENV{"CONTENT_LENGTH"});
}

&decode();
&check_count();
&browse();

sub check_count{
  $count = 2;
  foreach $i(1..$count){
    $tmp = $tmp + $cgi{'check'.$i};
  }
  $total = sprintf("%.1f", $tmp/$count*100);
}

sub browse{
print "Content-type:text/html\n\n";
print <<EOF;
 <HTML>
 <HEAD>
 <TITLE> Determine Your Internet DO</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=Shift_JIS">
 </HEAD>
 <BODY>
 <H2>����! ���Ȃ��̃C���^�[�l�b�gDO</H2>
 <HR>
  ���Ȃ��̃C���^�[�l�b�gDO�́C$total %�ł��B<BR>
 <HR>
 <A HREF="../check.html">�`�F�b�N�ɖ߂�</A><BR>

 </BODY>
 </HTML>
EOF
}

sub decode{
 @parts=split('&',$data);
 foreach(@parts){
 ($name,$value)=split("=");
 $cgi{$name}=$value;
 }
}
