import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { MonthlyDues } from '../model/monthly-dues.model';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class MonthlyDuesService {

  constructor(private http: HttpClient, private appconfig: AppConfigService) {}

  getByTenant(params: {tenantId: string }): Observable<ApiResponse<MonthlyDues[]>> {
    return this.http
      .get<any>(
        environment.apiBaseUrl + this.appconfig.config.apiEndPoints.monthlyDues.getByTenant,
        {params}
      )
      .pipe(
        tap((_) => this.log('monthlyDues')),
        catchError(this.handleError('monthlyDues', []))
      );
  }

  getByYear(params: {tenantId: string; year: number}): Observable<ApiResponse<MonthlyDues[]>> {
    return this.http
      .get<any>(
        environment.apiBaseUrl + this.appconfig.config.apiEndPoints.monthlyDues.getByYear,
        {params}
      )
      .pipe(
        tap((_) => this.log('monthlyDues')),
        catchError(this.handleError('monthlyDues', []))
      );
  }


  getById(monthlyDueId: string): Observable<ApiResponse<MonthlyDues>> {
    return this.http
      .get<any>(
        environment.apiBaseUrl +
          this.appconfig.config.apiEndPoints.monthlyDues.getById +
          monthlyDueId
      )
      .pipe(
        tap((_) => this.log('monthlyDues')),
        catchError(this.handleError('monthlyDues', []))
      );
  }

  add(data: any): Observable<ApiResponse<MonthlyDues>> {
    return this.http
      .post<any>(
        environment.apiBaseUrl + this.appconfig.config.apiEndPoints.monthlyDues.create,
        data
      )
      .pipe(
        tap((_) => this.log('monthlyDues')),
        catchError(this.handleError('monthlyDues', []))
      );
  }

  udpdate(data: any): Observable<ApiResponse<MonthlyDues>> {
    return this.http
      .put<any>(
        environment.apiBaseUrl + this.appconfig.config.apiEndPoints.monthlyDues.updatePayment,
        data
      )
      .pipe(
        tap((_) => this.log('monthlyDues')),
        catchError(this.handleError('monthlyDues', []))
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(
        `${operation} failed: ${
          Array.isArray(error.error.message)
            ? error.error.message[0]
            : error.error.message
        }`
      );
      return of(error.error as T);
    };
  }

  log(message: string) {
    console.log(message);
  }
}
