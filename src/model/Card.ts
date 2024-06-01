export default class Card {

  private value: number;
  private expression: string;
  private flipped = false;
  private vanished = false;

  constructor(expression: string, value: number) {
    this.value = value;
    this.expression = expression;
  }

  isFlipped(): boolean {
    return this.flipped;
  }

  flip() {
    this.flipped = !this.flipped;
  }

  getExpression(): string {
    return this.expression;
  }

  hasSameValue(card: Card) {
    return Math.abs(this.value - card.value) < 0.00001;
  }

  clone() {
    const result = new Card(this.expression, this.value);
    result.flipped = this.flipped;
    result.vanished = this.vanished;
    return result;
  }

  isVanished(): boolean {
    return this.vanished;
  }

  vanish(): boolean {
    return this.vanished = true;
  }
}