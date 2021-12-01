import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CalculatorService } from './calculator.service';
import { environment } from 'src/environments/environment';
import { CalculatorRequest } from '../types/CalculatorRequest';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;
  const backend_url = environment.backend_url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid calculation from the backend', fakeAsync(() => {
    const request: CalculatorRequest = {
      numberA: 8,
      numberB: 2,
      operator: "+"
    }

    const expectedResult: number = 10;
    service.calculate(request).subscribe(res => {
      if (res.answer) {
        expect(res.answer).toEqual(expectedResult);
      }
    });
    tick();

    const req = httpMock.expectOne({ url: `${backend_url}/`, method: 'POST'});
    req.flush(expectedResult);
  }));
});
