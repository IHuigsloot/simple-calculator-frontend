import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '../../services/calculator.service';
import { of } from 'rxjs';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  const calculatorService = jasmine.createSpyObj('CalculatorService', ['calculate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      providers: [{provide: CalculatorService, useValue: calculatorService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render an initial output of 0', () => {
    const outputElement = fixture.debugElement.query(By.css('.calculator__output'))
    expect(outputElement.nativeElement.innerHTML).toEqual('0');
  });

  it('Should render a equation', () => {
    component.numberA = 5;
    component.numberB = 3;
    component.operator = "+";

    fixture.detectChanges();

    const outputElement = fixture.debugElement.query(By.css('.calculator__output'))
    expect(outputElement.nativeElement.innerHTML).toEqual('5 + 3');
  });

  it("should concatenate numbers", () => {
    component.pressNumber(5);
    component.pressNumber(2);

    expect(component.calculatorOutput).toEqual('52');
  });

  it('should show a operator in equation if pressed', () => {
    component.pressNumber(8);
    component.pressOperator("+");

    expect(component.calculatorOutput).toEqual('8 +');
  })

  it('Should not handle a invalid operator', () => {
    component.pressNumber(6);
    component.pressOperator("x");

    expect(component.calculatorOutput).toEqual('6');
    expect(component.operator).toBeUndefined();
  })

  it('should concatenate to seconds value if there is an operator', () => {
    component.pressNumber(6);
    component.pressNumber(4);
    component.pressOperator("+");
    component.pressNumber(5);

    expect(component.calculatorOutput).toEqual('64 + 5');
  });

  it('should automaticly calculate if operator is pressed for a second time', () => {
    calculatorService.calculate.and.returnValue(of(3));

    component.pressNumber(5);
    component.pressOperator("-");
    component.pressNumber(2);

    expect(component.calculatorOutput).toEqual('5 - 2');

    component.pressOperator('+');

    expect(component.calculatorOutput).toEqual('3 +');
    expect(component.numberB).toEqual(undefined);
    expect(component.operator).toEqual("+")
  });

  it('should clear all values if clear is pressed', () => {
    component.numberA = 4;
    component.numberB = 3;
    component.operator = "+";

    component.clear();

    component.numberA = undefined;
    component.numberB = undefined;
    component.operator = undefined;
  })
});
