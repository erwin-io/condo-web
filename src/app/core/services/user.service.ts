import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Staff } from '../model/staff.model';
import { ApiResponse } from '../model/api-response.model';
import { Tenant } from '../model/tenant.model';
import { environment } from '../../../environments/environment';
import { IServices } from './interface/iservices';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  getStaffByAdvanceSearch(params:{
    isAdvance: boolean,
    keyword: string,
    userId: string,
    roles: string,
    email: string,
    mobileNumber: number,
    name: string,
  }): Observable<ApiResponse<Staff[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.getStaffByAdvanceSearch,
      {params})
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  getTenantByAdvanceSearch(params:{
    isAdvance: boolean,
    keyword: string,
    userId: string,
    email: string,
    mobileNumber: number,
    name: string,
  }): Observable<ApiResponse<Tenant[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.getTenantByAdvanceSearch,
      {params})
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  getStaff(): Observable<ApiResponse<Staff[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.get + 1)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  getTenants(): Observable<ApiResponse<Tenant[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.get + 2)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  getById(userId: string): Observable<any> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.getById + userId)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  createTenant(data: any): Observable<ApiResponse<Staff>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.createTenant, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  createStaff(data: any): Observable<ApiResponse<Staff>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.createStaff, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  udpdateTenant(data: any): Observable<ApiResponse<Tenant>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.udpdateTenant, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  udpdateStaff(data: any): Observable<ApiResponse<Staff>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.udpdateStaff, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
    );
  }

  toggleEnable(data: any): Observable<ApiResponse<Staff>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.user.toggleEnable, data)
    .pipe(
      tap(_ => this.log('user')),
      catchError(this.handleError('user', []))
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
