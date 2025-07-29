#!/usr/bin/perl
print "Content-type: image/jpeg\n\n";
open (GAZO, "hana.jpg");
print <GAZO>;
