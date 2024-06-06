import { shuffle } from "../utils/RandomUtils";
import Card from "./Card";
import { ExpressionGenerator, NullExpressionGenerator } from "./ExpressionGenerator";

export default class Board {
  private readonly cards: Card[][];
  private readonly flippedCards: Card[] = [];
  private colCount: number;
  private rowCount: number;
  private vanishedCount: number;

  constructor(cols: number, rows: number, expressionGenerator: ExpressionGenerator) {
    this.cards = [];
    this.colCount = cols;
    this.rowCount = rows;
    this.vanishedCount = 0;

    const cards: Card[] = [];
    let prevValue: number = 0;
    for (let i = 0; i < cols * rows; i++) {
      if (i % 2 == 0) {
        const [expression, value] = expressionGenerator.generateExpression();
        cards.push(new Card(expression, value));
        prevValue = value;
      } else {
        const expression = expressionGenerator.generateExpressionForValue(prevValue);
        cards.push(new Card(expression, prevValue));
      }
    }

    shuffle(cards);

    for (let c = 0; c < cols; c++) {
      const col: Card[] = [];
      for (let r = 0; r < rows; r++) {
        col.push(cards[c * cols + r]);
      }
      this.cards.push(col);
    }
  }

  getColCount(): number {
    return this.colCount;
  }

  getRowCount(): number {
    return this.rowCount;
  }

  isSolved(): boolean {
    return this.vanishedCount == this.colCount * this.rowCount;
  }

  getExpression(col: number, row: number): string {
    return this.cards[col][row].getExpression();
  }

  isFlipped(col: number, row: number): boolean {
    return this.cards[col][row].isFlipped();
  }

  flip(col: number, row: number) {
    const card = this.cards[col][row];
    if (this.flippedCards.length == 2) {
      const wasFlipped = card.isFlipped();
      if (this.flippedCards[0].hasSameValue(this.flippedCards[1])) {
        this.flippedCards[0].vanish();
        this.flippedCards[1].vanish();
        this.vanishedCount += 2;
      } else {
        this.flippedCards[0].flip();
        this.flippedCards[1].flip();
      }

      this.flippedCards.pop();
      this.flippedCards.pop();

      if (!card.isVanished() && !wasFlipped) {
        card.flip();
        this.flippedCards.push(card);
      }
      return;
    }

    if (card.isFlipped()) {
      return;
    }

    card.flip();
    this.flippedCards.push(card);

    if (this.vanishedCount + this.flippedCards.length == this.colCount * this.rowCount) {
      this.flippedCards[0].vanish();
      this.flippedCards[1].vanish();
      this.vanishedCount += 2;
      this.flippedCards.pop();
      this.flippedCards.pop();
    }
  }

  isVanished(col: number, row: number) {
    return this.cards[col][row].isVanished();
  }

  clone(): Board {
    const result = new Board(0, 0, new NullExpressionGenerator());
    result.colCount = this.colCount;
    result.rowCount = this.rowCount;
    result.vanishedCount = this.vanishedCount;

    for (let c = 0; c < this.colCount; c++) {
      const col: Card[] = [];
      for (let r = 0; r < this.rowCount; r++) {
        const card = this.cards[c][r].clone();
        if (card.isFlipped() && !card.isVanished()) {
          result.flippedCards.push(card);
        }
        col.push(card);
      }
      result.cards.push(col);
    }

    return result;
  }
}
