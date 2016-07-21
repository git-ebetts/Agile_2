var img;
var xPos = 0;
var m;

var songElement;

//PRELOAD BUBBLE IMAGE
function preload() {
  img = loadImage('assets/bubble.png');
}


function setup() {

  //SET UP CANVAS
  var canvas = createCanvas(1280, 720);
  canvas.parent('container');

  //SET UP VIDEO
  video = createVideo('assets/newSky.mov');
  video.loop();
  video.hide();

  //SET UP MIC
  mic = new p5.AudioIn();
  mic.start();

  //EASING VARIABLE FOR ANIMATION       
  easing = 0.025;

  //SET UP LYRIC TIMER & TICKER

  //Make the element
  songElement = createElement('songBox', words[0]);
  songElement.parent('songWords')

}


function draw() {

  var vol = mic.getLevel();
  
  //SET SIZE OF BUBBLE BASED ON INPUT VOLUME
  var s = map(vol, 0, .2, 300, 225);
  var y = s;
  var targetY = s - 50;
  var dy = targetY - y;
  y += dy * easing;

  //SET Y POSITION OF BUBBLE BASED ON INPUT VOLUME
  var h = map(vol, 0, .2, height, 0);
  var y2 = h - 400;
  var targetY2 = vol;
  var dy2 = targetY2 - y2;
  y += dy2 * easing;

  //DRAW VIDO AND BUBBLE
  image(video, 0, 0);
  image(img, xPos, y, s, s);
  xPos = xPos + .75;

  //CONTROL BUBBLE AT END OF PAGE
  if (xPos > (defaultCanvas0.width / 2)) {
    xPos = 0 - s;
}

  if (millis() > 6000) {
    songElement.html(words[2]);
  } else if (millis() > 3000) {
    songElement.html(words[1]);
  }
}

