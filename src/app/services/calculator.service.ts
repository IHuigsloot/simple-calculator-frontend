import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CalculatorRequest } from '../types/CalculatorRequest';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(
    protected http: HttpClient,
  ) { }

  calculate(request: CalculatorRequest): Observable<number> {
    return this.http.post<number>(`${environment.backend_url}/`, request);
  }
}
