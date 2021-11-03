
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiResult } from 'src/app/api-result';
import { User } from 'src/app/models/user';

import { Store } from 'src/app/store';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }
  baseUrl: string = environment.apiUrl + 'User';

  getUsers(): Observable<User> {
    return this.http.get(this.baseUrl).pipe(
      map((apiresult: ApiResult) => apiresult.data),
      map((user: User) => user),
      catchError((err: HttpErrorResponse) => {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          //client side error

          errorMessage = `Error: ${err.error.message}`;

        } else {
          //server side error
          errorMessage = `Error Status: ${err.status}\nMessage: ${err.message}`;

        }
        return throwError(errorMessage)
      }
      )
    )
  }


  createUser(email: string, password: string): Observable<ApiResult> {

    return this.http.post<ApiResult>(this.baseUrl + '/Register', { email, password })
      .pipe(

        catchError((err: HttpErrorResponse) => {

          let errorMessage = '';
          if (err.error instanceof ErrorEvent) {
            //client side error

            errorMessage = `Error: ${err.error.message}`;

          } else {
            //server side error
            errorMessage = `Error Status: ${err.status}\nMessage: ${err.message}`;

          }
          return throwError(errorMessage)
        }
        )
      )
  }

  loginUser(email: string, password: string): Observable<ApiResult> {

    return this.http.post<ApiResult>(this.baseUrl + '/Login', { email, password })
      .pipe(
        tap((apiResult: ApiResult) => {
          if (apiResult.isSuccess) {
            this.store.set('user', { ...apiResult.data, authenticated: true })
          }
          else {
            this.store.set('user', null);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          debugger;
          let errorMessage = '';
          if (err.error instanceof ErrorEvent) {
            //client side error

            errorMessage = `Error: ${err.error.message}`;

          } else {
            //server side error
            errorMessage = `Error Status: ${err.status}\nMessage: ${err.message}`;

          }
          return throwError(errorMessage)
        }
        )
      )
  }
}
