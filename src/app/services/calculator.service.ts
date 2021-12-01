import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Calculation } from '../types/Calculation';
import { CalculatorRequest } from '../types/CalculatorRequest';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(
    protected http: HttpClient,
    protected historyService: HistoryService,
  ) { }

  calculate(request: CalculatorRequest): Observable<Calculation> {
    return this.http.post<Calculation>(`${environment.backend_url}/`, request)
      .pipe(
        map(res => {
          this.historyService.appendToHistory(res);
          return res;
        })
      );
  }
}
