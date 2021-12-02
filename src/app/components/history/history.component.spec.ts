import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HistoryService } from 'src/app/services/history.service';
import { Calculation } from 'src/app/types/Calculation';

import { HistoryComponent } from './history.component';

const returnValue: Calculation[] = [
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
];

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  const historyService = jasmine.createSpyObj('historyService', {
    'getHistoryObs': of(returnValue),
    'retrieveHistory': '',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ HistoryComponent ],
      providers: [{
        provide: HistoryService,
        useValue: historyService,
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should retrieve history items', () => {
    expect(historyService.retrieveHistory).toHaveBeenCalled();
    expect(component.history).toEqual(returnValue)
  });

  it('Should render the history list', () => {
    fixture.detectChanges();

    const historyElements = fixture.debugElement.queryAll(By.css('.history__item'));
    expect(historyElements.length).toEqual(2);
    expect(historyElements[0].nativeElement.innerHTML).toContain('5 + 5')
  })
});
