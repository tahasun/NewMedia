/* jshint esversion: 6 */
var bubbles = [];

function setup() {
  createCanvas(800, 500);
  // stroke('purple'); // Change the color
  // strokeWeight(10); // Make the points 10 pixels in size\
  // point(0,0);
  // point(800,0);
  // point(0,500);
  // point(800,500);
  let numberBubbles = random(7, 14).toFixed(0);

  while (bubbles.length < numberBubbles) {
    var x = random(width);
    var y = random(height);
    var radius = random(18, 36);
    var newBubble = new Bubble(x, y, radius);

    var overlapping = false;
    var within = true;

    for (var j = 0; j < bubbles.length; j++) {
      var other = bubbles[j];
      var d = dist(newBubble.x, newBubble.y, other.x, other.y);

      // Check for within canvas
      if(!((newBubble.x >= newBubble.r) && ((newBubble.x + newBubble.r) < 800) && (newBubble.y >= newBubble.r) && ((newBubble.y+newBubble.r) < 500))) {
        within = false;
      }

      // Check for overlap
      if (d < newBubble.r + other.r) {
        overlapping = true;
      }

    }

    // Push new bubble if it does not overlap and is within the canvas
    if (!overlapping && within) {
      bubbles.push(newBubble);
    }

  }
  // refresh();
}

function mousePressed() {
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}

function draw() {
  // background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}
