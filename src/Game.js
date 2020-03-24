import Board from './Board';
import { parseId } from './utils';

class Game {
  constructor() {
    this.currentPlayer= "white";
    this.round = 0;
    this.board = new Board();
    this.gameArea = this.board.gameArea;
    this.gameAreaHandler = this.board.gameAreaHandler;
    this.possibleMoves = [];
    this.selectedPiece = null;
    this.gameAreaHandler.addEventListener('click', e => this.onClick(e));
    
  }


  onClick(e) {
    
    const element = e.target.classList.contains('square') ? e.target : e.target.parentElement;
    if (this.possibleMoves.length !== 0) {
      this.handleMove(element);
    } else {
      this.handleSelect(element);
    }
  }

  changeTurn() {
    if (this.round % 2 === 0) this.currentPlayer = 'black';
    if (this.round % 2 === 1) this.currentPlayer = 'white';
    this.round++;
  }

  handleSelect(element) {
    const [x, y] = parseId(element.id);
    if (!this.gameArea[x][y]) {
      return;
    }
    this.selectedPiece = this.gameArea[x][y];


    if (this.selectedPiece.side === this.currentPlayer) {
    this.possibleMoves = this.selectedPiece.findLegalMoves(this.gameArea);
    this.board.highlightPossibleMoves(this.possibleMoves);
    }

  }

  handleMove(element) {
    const { id } = element;
    if (!this.possibleMoves.includes(id)) return;
    this.board.movePiece(this.selectedPiece, parseId(id));
    this.board.removeHighlight();
    this.selectedPiece = null;
    this.possibleMoves = [];
    this.changeTurn();
  }
}

export default Game;
