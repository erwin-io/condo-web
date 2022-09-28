import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';
import { Room } from '../model/room.model';
import { AppConfigService } from './app-config.service';
import { IServices } from './interface/iservices';

@Injectable({
  providedIn: 'root'
})
export class RoomService implements IServices {

  constructor(private http: HttpClient, private appconfig: AppConfigService) { }

  get(): Observable<ApiResponse<Room[]>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.room)
    .pipe(
      tap(_ => this.log('room')),
      catchError(this.handleError('room', []))
    );
  }

  getById(roomId: string): Observable<ApiResponse<Room>> {
    return this.http.get<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.room + roomId)
    .pipe(
      tap(_ => this.log('room')),
      catchError(this.handleError('room', []))
    );
  }

  add(data: any): Observable<ApiResponse<Room>> {
    return this.http.post<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.room, data)
    .pipe(
      tap(_ => this.log('room')),
      catchError(this.handleError('room', []))
    );
  }

  udpdate(data: any): Observable<ApiResponse<Room>> {
    return this.http.put<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.room, data)
    .pipe(
      tap(_ => this.log('room')),
      catchError(this.handleError('room', []))
    );
  }

  delete(roomId: string): Observable<ApiResponse<Room>> {
    return this.http.delete<any>(environment.apiBaseUrl + this.appconfig.config.apiEndPoints.room + roomId)
    .pipe(
      tap(_ => this.log('room')),
      catchError(this.handleError('room', []))
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
