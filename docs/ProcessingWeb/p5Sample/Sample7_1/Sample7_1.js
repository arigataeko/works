let classifier;
let num = 0;  //何個円を描くか
let x = 50;   //最初の円のx座標
let label = "";
let conf = 0;

function preload() {
  let options = { probabilityThreshold: 0.9 };
  classifier = ml5.soundClassifier('SpeechCommands18w', options);
}

function setup() {
  createCanvas(300, 100);
  classifier.classifyStart(gotResult);
  noStroke();
}

function gotResult(results) {
  label = results[0].label;
  conf = results[0].confidence;
  if (results[0].label == "one") {
    num = 1;
  } else if (results[0].label == "two") {
    num = 2;
  } else if (results[0].label == "three") {
    num = 3;
  } else if (results[0].label == "four") {
    num = 4;
  } else if (results[0].label == "five") {
    num = 5;
  } else if (results[0].label == "six") {
    num = 6;
  } else if (results[0].label == "seven") {
    num = 7;
  } else if (results[0].label == "eight") {
    num = 8;
  } else if (results[0].label == "nine") {
    num = 9;
  } else {
    num = 0;
  }
}

function draw() {
  background(220);
  fill(200, 0, 0);
  for (let i=0; i<num; i++) {
    ellipse(x+i*20, height/2, 10, 10);
  }
  fill(0);
  text("label: " + label + ", confidence: " +  conf, 10, height-10);
}
