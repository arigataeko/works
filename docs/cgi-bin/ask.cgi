#!/usr/bin/perl

#----------#
# �ݒ�     #
#----------#

# sendmail�ւ̃p�X
$sendmail = '/usr/sbin/sendmail';

# jcode.pl�ւ̃p�X
$jcode = './jcode.pl';

# ���[���̑��M��
$to = 'gws133@dwc.doshisha.ac.jp';

# ���[���̑薼
$subject = 'Web�y�[�W����̖₢���킹';

# ���M�����̃y�[�W����u�߂�v�Ń����N�����URL���w��
$back = 'http://';

require $jcode;

if($ENV{REQUEST_METHOD} eq "POST"){
read(STDIN,$input,$ENV{CONTENT_LENGTH});
} else {
$input = $ENV{QUERY_STRING};
}

@inputdata = split(/&/, $input);

foreach $i (@inputdata) {
($name, $value) = split(/=/, $i);
$value =~ s/\+/ /g;
$value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C",hex($1))/eg;
$name =~ s/\+/ /g;
$name =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C",hex($1))/eg;
$query{$name} = $value;
$mail_body .= "$name : $value\n";
}

$mail_body =~ s/\x0D\x0A|\x0D|\x0A/\n/g;
$mail_body =~ s/(\n)\.(\n)/\1\.\.\2/g;

&jcode'convert(*mail_body,'jis');
&jcode'convert(*subject,'jis');

open(MAIL,"| $sendmail -t") || &error("sendmail�̋N���Ɏ��s���܂����B");

print MAIL "To: $to\n";
print MAIL "From: $query{mail}\n";
print MAIL "Subject: $subject\n\n";
print MAIL "$mail_body\n";

close(MAIL) || &error("���[���̑��M�Ɏ��s���܂����B");

# ���̕����͑��M�{�^������������ɕ\�������html�^�O���w�肷��
# ���b�Z�[�W�͓K���ɕς���
print "Content-type: text/html\n\n";
print "<HTML><HEAD>\n";
print "<TITLE>���M����</TITLE>\n";
print "</HEAD><BODY>\n";
print "<P align=\"center\">���₢���킹���肪�Ƃ��������܂������B�A�������Ă��������܂��B</P>\n";
print "<P align=\"center\"><A HREF=\"$back\">�߂�</A></P>\n";
print "</BODY></HTML>\n";
exit;

sub error {
print "Content-type: text/html\n\n";
print "<HTML><HEAD>\n";
print "<TITLE>Error</TITLE>\n";
print "</HEAD><BODY>\n";
print "<P align=\"center\">$_[0]</P>\n";
print "<P align=\"center\"><A HREF=\"javascript:history.back()\">�߂�</A></P>";
print "</BODY></HTML>\n";
exit;
}
