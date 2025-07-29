#!/usr/bin/perl

#----------#
# 設定     #
#----------#

# sendmailへのパス
$sendmail = '/usr/sbin/sendmail';

# jcode.plへのパス
$jcode = './jcode.pl';

# メールの送信先
$to = 'gws133@dwc.doshisha.ac.jp';

# メールの題名
$subject = 'Webページからの問い合わせ';

# 送信完了のページから「戻る」でリンクされるURLを指定
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

open(MAIL,"| $sendmail -t") || &error("sendmailの起動に失敗しました。");

print MAIL "To: $to\n";
print MAIL "From: $query{mail}\n";
print MAIL "Subject: $subject\n\n";
print MAIL "$mail_body\n";

close(MAIL) || &error("メールの送信に失敗しました。");

# この部分は送信ボタンを押した後に表示されるhtmlタグを指定する
# メッセージは適当に変える
print "Content-type: text/html\n\n";
print "<HTML><HEAD>\n";
print "<TITLE>送信完了</TITLE>\n";
print "</HEAD><BODY>\n";
print "<P align=\"center\">お問い合わせありがとうございまいした。連絡させていただきます。</P>\n";
print "<P align=\"center\"><A HREF=\"$back\">戻る</A></P>\n";
print "</BODY></HTML>\n";
exit;

sub error {
print "Content-type: text/html\n\n";
print "<HTML><HEAD>\n";
print "<TITLE>Error</TITLE>\n";
print "</HEAD><BODY>\n";
print "<P align=\"center\">$_[0]</P>\n";
print "<P align=\"center\"><A HREF=\"javascript:history.back()\">戻る</A></P>";
print "</BODY></HTML>\n";
exit;
}
