import Card from "./Card";

class Board {
  readonly cards: Card[][];

  constructor(rows: number, cols: number) {
    this.cards = [];

    for (let r = 0; r < rows; r++) {
      const row: Card[] = [];
      for (let c = 0; c < cols; c) {
        const left = Math.round(10 * Math.random());
        const right = Math.round(10 * Math.random());
        row.push(new Card(left + " " + right, left + right));
      }
      this.cards.push(row);
    }
  }

}