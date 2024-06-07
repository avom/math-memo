import { countDivisors } from "../utils/Math";
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
      case 0: {
        const value = randomInt(this.limit);
        return [this.generateAddition(value), value];
      }
      case 1: {
        const value = randomInt(this.limit);
        return [this.generateSubtraction(value), value];
      }
      case 2: {
        const left = randomInt(Math.sqrt(this.limit)) + 1;
        const right = randomInt(Math.floor(this.limit / left) + 1);
        if (Math.random() < 0.5) {
          return [left + " × " + right, left * right];
        } else {
          return [right + " × " + left, left * right];
        }
      }
      case 3: {
        const right = randomInt(Math.sqrt(this.limit)) + 1;
        const value = randomInt(Math.floor(this.limit / right) + 1);
        return [right * value + " / " + right, value];
      }
      default:
        throw new Error("Unexpected operation");
    }
  }

  generateExpressionForValue(value: number): string {
    const additionsThreshold = value + 1;
    const subtractionsThreshold = this.limit - value + 1 + additionsThreshold;
    const multiplicationsThreshold = countDivisors(value) + subtractionsThreshold;
    const divisionsThreshold =
      Math.floor(this.limit / (value || this.limit)) + multiplicationsThreshold;

    const r = randomInt(divisionsThreshold);

    if (r < additionsThreshold) return this.generateAddition(value);
    if (r < subtractionsThreshold) return this.generateSubtraction(value);
    if (r < multiplicationsThreshold) return this.generateMultiplication(value);
    return this.generateDivision(value);
  }

  private generateAddition(value: number): string {
    const left = randomInt(value + 1);
    const right = value - left;
    return left + " + " + right;
  }

  private generateSubtraction(value: number): string {
    const left = randomInt(this.limit - value + 1) + value;
    const right = left - value;
    return left + " - " + right;
  }

  private generateMultiplication(value: number): string {
    const sqrtValue = Math.floor(Math.sqrt(value));
    let left = 0;
    let right = randomInt(this.limit + 1);
    while (left * right != value) {
      if (Math.random() < 0.5) {
        left = randomInt(sqrtValue + 1);
        right = Math.floor(value / left);
      } else {
        right = randomInt(sqrtValue + 1);
        left = Math.floor(value / right);
      }
    }
    return left + " × " + right;
  }

  private generateDivision(value: number): string {
    if (value == 0) {
      return "0 ÷ " + (randomInt(this.limit) + 1);
    }
    const right = randomInt(Math.floor(this.limit / value)) + 1;
    const left = right * value;
    return left + " ÷ " + right;
  }
}
