import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { IncidentReport } from '../model/incident-report.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class IncidentsReportsService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getAll(params: { keyword: string }): Observable<ApiResponse<IncidentReport[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.incidentReport.getAll,
      {params}
      )
    .pipe(
      tap(_ => this.log('incidentReport')),
      catchError(this.handleError('incidentReport', []))
    );
  }

  getByTenant(params: { keyword: string; tenantId: string }): Observable<ApiResponse<IncidentReport[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.incidentReport.getByTenant,
      {params}
      )
    .pipe(
      tap(_ => this.log('incidentReport')),
      catchError(this.handleError('incidentReport', []))
    );
  }


  getById(incidentReportId: string): Observable<ApiResponse<IncidentReport>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.incidentReport.getById + incidentReportId)
    .pipe(
      tap(_ => this.log('incidentReport')),
      catchError(this.handleError('incidentReport', []))
    );
  }

  add(data: any): Observable<ApiResponse<IncidentReport>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.incidentReport.create, data)
    .pipe(
      tap(_ => this.log('incidentReport')),
      catchError(this.handleError('incidentReport', []))
    );
  }

  udpdate(data: any): Observable<ApiResponse<IncidentReport>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.incidentReport.update, data)
    .pipe(
      tap(_ => this.log('incidentReport')),
      catchError(this.handleError('incidentReport', []))
    );
  }

  updateStatus(data: {incidentsReportId: string; incidentStatusId: string }): Observable<ApiResponse<IncidentReport>> {
    console.log(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.incidentReport.updateStatus);
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.incidentReport.updateStatus, data)
    .pipe(
      tap(_ => this.log('incidentReport')),
      catchError(this.handleError('incidentReport', []))
    );
  }

   handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${Array.isArray(error.error.message) ? error.error.message[0] : error.error.message}`);
      return of(error.error as T);
    };
  }

  log(message: string) {
    console.log(message);
  }
}
