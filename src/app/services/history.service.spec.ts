import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Calculation } from '../types/Calculation';

import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;
  let httpMock: HttpTestingController;
  const backend_url = environment.backend_url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(HistoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve history', fakeAsync(() => {
    const expectedResult: Calculation[] = [
      {
        id: 1,
        numberA: 5,
        numberB: 5,
        operator: '+',
        answer: 10.0,
      },
      {
        id: 2,
        numberA: 10,
        numberB: 8,
        operator: '*',
        answer: 80.0,
      },
      {
        id: 3,
        numberA: 80,
        numberB: 5,
        operator: '-',
        answer: 75.0,
      },
    ];

    service.getHistoryObs().subscribe(history => {
      if (history.length > 0) {
        expect(history).toEqual(expectedResult)
      }
    })
    service.retrieveHistory();

    tick();

    const req = httpMock.expectOne({ url: `${backend_url}/history`, method: 'GET'});
    req.flush(expectedResult);

    httpMock.verify();
  }));
});
