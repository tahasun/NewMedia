/* jshint esversion: 6 */

function Bubble(x, y, radius){
  this.x = x;
  this.y = y;
  this.r = radius;
  this.col = color(255, 204, 0);

  this.display = function(){
    // stroke(255);
    noStroke();
    fill(this.col);
    ellipse(x, y, this.r*2, this.r*2);
  };

  this.clicked = function(){
    var d = dist(mouseX, mouseY, this.x, this.y);
    if  (d < this.r){
      this.col = color(255, 0, 200);
    }
  };

  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  };
}
