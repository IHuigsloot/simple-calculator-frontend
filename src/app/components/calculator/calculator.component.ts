import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  numberA: number | undefined = undefined;
  numberB: number | undefined = undefined;
  operator: string | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

  get calculatorOutput(): string {
    if (!this.numberA) {
      return "0";
    }

    return `${this.numberA} ${this.operator || ''} ${this.numberB || ''}`.trim();
  }

  pressNumber(number: number): void {
    if (!this.operator) {
      this.numberA = parseInt(`${this.numberA || 0}${number}`);
    } else {
      this.numberB = parseInt(`${this.numberB || 0}${number}`);
    }
  }

  pressOperator(operator: string): void {
    const VALID_OPERATORS: string[] = ["+", "-", "*", "/"];

    if (!VALID_OPERATORS.includes(operator)) {
      return;
    }

    if (this.operator) {
      this.calculate();
    }
    this.operator = operator;
  }

  clear(): void {
    this.numberA = undefined;
    this.numberB = undefined;
    this.operator = undefined;
  }

  calculate(): void {
    if (!this.numberA || !this.numberB || !this.operator) {
      return;
    }
    const answer = this.localCalculate(this.numberA, this.numberB, this.operator);
    this.numberA = answer;
    this.numberB = undefined;
    this.operator = undefined;
  }

  localCalculate(a: number, b: number, operator: string) {
    return new Function('return ' + `${a} ${operator} ${b}`)();
  }
}
