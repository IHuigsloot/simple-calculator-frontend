import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Calculation } from '../types/Calculation';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historyObs$: BehaviorSubject<Calculation[]> = new BehaviorSubject<Calculation[]>([]);

  constructor(
    protected http: HttpClient,
  ) { }

  getHistoryObs(): Observable<Calculation[]> {
    return this.historyObs$.asObservable();
  }

  appendToHistory(newItem: Calculation) {
    const newHistory = this.historyObs$.value;
    newHistory.push(newItem);
    this.historyObs$.next(newHistory);
  }

  retrieveHistory() {
    return this.http.get<Calculation[]>(`${environment.backend_url}/history`).subscribe(res => {
      this.historyObs$.next(res);
    });
  }
}
