import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  get<T>(url: string, errorMessage: string) {
    const endpoint = `${this.baseUrl}/${url}`; 
    return this.httpClient.get<T>(endpoint)
      .pipe(
        catchError(error => {
          return throwError(() => new Error(errorMessage))
        })
      )
  }

  getById<T>(url: string, id: string, errorMessage: string) {
    const endpoint = `${this.baseUrl}/${url}/${id}`;
    return this.httpClient.get<T>(endpoint)
      .pipe(
        catchError(error => {
          return throwError(() => new Error(errorMessage));
        })
      )
  } 

  post<T>(url: string, data: any, errorMessage: string) {
    const endpoint = `${this.baseUrl}/${url}`;
    return this.httpClient.post(endpoint, data)
      .pipe(
        catchError(error => {
          return throwError(() => new Error(errorMessage));
        })
      )
  }

  put<T>(url: string, id: string, data: any, errorMessage: string) {
    const endpoint = `${this.baseUrl}/${url}/${id}`;
    return this.httpClient.put(endpoint, data)
      .pipe(
        catchError(error => {
          return throwError(() => new Error(errorMessage));
        })
      )
  }

  delete(url: string, id: string, errorMessage: string) {
    const endpoint = `${this.baseUrl}/${url}`;
    return this.httpClient.delete(endpoint)
      .pipe(
        catchError(error => {
          return throwError(() => new Error(errorMessage));
        })
      )
  }
}
