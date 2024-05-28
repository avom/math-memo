export default class Card {
  private readonly value: number;
  readonly expression: string;

  constructor(expression: string, value: number) {
    this.value = value;
    this.expression = expression;
  }

  hasSameValue(card: Card) {
    return Math.abs(this.value - card.value) < 0.00001;
  }
}