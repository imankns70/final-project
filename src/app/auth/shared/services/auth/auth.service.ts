
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiResult } from 'src/app/api-result';
import { User } from 'src/app/models/user';

import { Store } from 'store';

const userKey: string = 'userLoggedin';
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

            const userSignined = { ...apiResult.data, authenticated: true };
            this.store.set('user', userSignined);

            const userJson = JSON.stringify(userSignined);
            sessionStorage.removeItem(userKey);
            sessionStorage.setItem(userKey, userJson)

          }
          else {
            this.store.set('user', null)

          }
        }),
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
  getUserLoggein(): User {
    const userJson = sessionStorage.getItem(userKey);
    if (userJson) {
      return JSON.parse(userJson) as User
    }
    return null;
  }
  logOut() {
    sessionStorage.removeItem(userKey);
  }
  get isLoggin() {
    return this.getUserLoggein() ? of(true) : of(false)
  }

}
