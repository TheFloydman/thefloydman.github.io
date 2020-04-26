class Circle {
  constructor(x, y, r, fill, type) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.fill = fill;
    this.type = type;
  }
}

class Digit {
  constructor(place) {
    this.place = place;
    this.up = this.right = this.down = this.left = false;
  }
}

class GridPos {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}