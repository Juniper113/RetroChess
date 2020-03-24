class Piece {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side; //'black' or 'white'
  }
  move(to) {
    const newX = Number(to[0]);
    const newY = Number(to[1]);

    //clearing previous place
    document.getElementById(`${this.x},${this.y}`).innerHTML = '';

    //setting new
    this.x = newX;
    this.y = newY;
    document.getElementById(to).innerHTML = this.display;
  }

  findLegalMoves() {}
}

export default Piece;
