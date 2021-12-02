import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HistoryService } from 'src/app/services/history.service';
import { Calculation } from 'src/app/types/Calculation';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  @ViewChild('historyElement') private historyElement!: ElementRef;

  unsubscribe$: Subject<boolean> = new Subject();
  history: Calculation[] = [];

  constructor(
    private historyService: HistoryService,
  ) { }

  ngOnInit(): void {
    this.historyService.retrieveHistory();
    this.historyService.getHistoryObs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(history => {
        this.history = history;
        try {
          setTimeout(() => {
            this.historyElement.nativeElement.scrollTop = this.historyElement.nativeElement.scrollHeight;
          })
        } catch (error) {}
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
