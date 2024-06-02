import { randomInt } from "../utils/RandomUtils";

export interface ExpressionGenerator {
  generateExpression(): [string, number];

  generateExpressionForValue(value: number): string;
}

export class NullExpressionGenerator {
  generateExpression(): [string, number] {
    return ["", 0];
  }

  generateExpressionForValue(_value: number): string {
    return "";
  }
}

export class LimitExpressionGenerator implements ExpressionGenerator {
  private readonly limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  generateExpression(): [string, number] {
    const opIdx = randomInt(4);
    switch (opIdx) {
      case 0:
        return this.generateAddition();
      case 1:
        return this.generateSubtraction();
      case 2:
        return this.generateMultiplication();
      case 3:
        return this.generateDivision();
      default: // Shouldn't happen, but cover for typos
        throw Error("Unsupported operation");
    }
  }

  generateExpressionForValue(value: number): string {
    const opIdx = randomInt(4);
    switch (opIdx) {
      case 0:
        return this.generateAdditionForValue(value);
      case 1:
        return this.generateSubtractionForValue(value);
      case 2:
        return this.generateMultiplicationForValue(value);
      case 3:
        return this.generateDivisionForValue(value);
      default: // Shouldn't happen, but cover for typos
        throw Error("Unsupported operation");
    }
  }

  private generateAddition(): [string, number] {
    const left = randomInt(this.limit + 1);
    const right = randomInt(this.limit - left + 1);
    return [left + " + " + right, left + right];
  }

  private generateSubtraction(): [string, number] {
    const left = randomInt(this.limit + 1);
    const right = randomInt(left + 1);
    return [left + " - " + right, left - right];
  }

  private generateMultiplication(): [string, number] {
    const left = randomInt(Math.floor(Math.sqrt(this.limit)) + 1);
    const rightLimit = left != 0 ? Math.floor(this.limit / left) : this.limit;
    const right = randomInt(rightLimit);
    return [left + " × " + right, left * right];
  }

  private generateDivision(): [string, number] {
    const right = randomInt(Math.floor(Math.sqrt(this.limit))) + 1;
    const quotient = randomInt(Math.floor(this.limit / right));
    const left = right * quotient;
    return [left + " ÷ " + right, quotient];
  }

  private generateAdditionForValue(value: number): string {
    const left = randomInt(value + 1);
    const right = value - left;
    return left + " + " + right;
  }

  private generateSubtractionForValue(value: number): string {
    const left = randomInt(this.limit - value + 1) + value;
    const right = left - value;
    return left + " - " + right;
  }

  private generateMultiplicationForValue(value: number): string {
    const sqrtValue = Math.floor(Math.sqrt(value));
    let left = 0;
    let right = randomInt(this.limit + 1);
    while (left * right != value) {
      left = randomInt(sqrtValue + 1);
      right = Math.floor(value / left);
    }
    return left + " × " + right;
  }

  private generateDivisionForValue(value: number): string {
    if (value == 0) {
      return "0 ÷ " + (randomInt(this.limit) + 1);
    }
    const right = randomInt(Math.floor(this.limit / value)) + 1;
    const left = right * value;
    return left + " ÷ " + right;
  }
}
