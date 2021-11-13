import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Store } from 'src/app/store';
import { combineLatest, empty, Observable, of } from 'rxjs';
import { ApiResult } from 'src/app/api-result';
import { environment } from 'src/environments/environment';
import { Workout } from 'src/app/models/workout';
import { map, takeWhile } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  baseUrl: string = environment.apiUrl + 'workouts';
  constructor(
    private store: Store,
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getworkout(workouts: Observable<Workout[]>, params: Observable<Params>): Observable<Workout> {

    return combineLatest([workouts, params]).pipe(

      takeWhile(([workouts, params]) => !!params.id),
      map(([workouts, param]) => {
        if (workouts) {
          return workouts.find(workouts => workouts.id === parseInt(param.id, 10))
        }
      }
      ))

  }

 
  get userId() {
    return this.authService.getUserLoggein().id
  }
  addWorkout(workout: Workout): Observable<ApiResult> {
    const viewModel = { ...workout, userId: this.userId };
    return this.http.post<ApiResult>(`${this.baseUrl}`, viewModel)

  }
  updateWorkout(workout: Workout): Observable < ApiResult > {
    const viewModel = { ...workout, userId: this.userId };
    return this.http.put<ApiResult>(`${this.baseUrl}`, viewModel)
  
  }
  removeWorkout(workout: Workout) {
    return this.http.delete<ApiResult>(`${this.baseUrl}/${workout.id}`)
  }
}
