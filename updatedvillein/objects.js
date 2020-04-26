function Circle(x, y, r, fill, type) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.fill = fill;
  this.type = type;
}

function Digit(place) {
  this.place = place;
  this.up = this.right = this.down = this.left = false;
}

function GridPos(x, y) {
  this.x = x;
  this.y = y;
}
