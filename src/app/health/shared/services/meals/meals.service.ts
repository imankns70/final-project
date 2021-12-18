import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Store } from 'store';
import { combineLatest, empty, Observable, of } from 'rxjs';
import { ApiResult } from 'src/app/api-result';
import { environment } from 'src/environments/environment';
import { Meal } from 'src/app/models/meal';
import { map, takeWhile, tap } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  baseUrl: string = environment.apiUrl + 'Meal';
  constructor(
    private store: Store,
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getMeal(meals: Observable<Meal[]>, params: Observable<Params>): Observable<Meal> {

    return combineLatest([meals, params]).pipe(

      takeWhile(([meals, params]) => !!params.id),
      map(([meals, param]) => {
        if (meals) {
          return meals.find(meal => meal.id === parseInt(param.id, 10))
        }
      }
      ))

  }

  getMeals(): Observable<Meal[]> {

    return this.http.get<ApiResult>(`${this.baseUrl}/${this.userId}`).pipe(
      map((apiResult: ApiResult) => apiResult.data),
      map((meals: Meal[]) => meals),
   

    )
  }
  get userId() {
    return this.authService.getUserLoggein().id
  }
  addMeal(meal: Meal): Observable<ApiResult> {
    const viewModel = { ...meal, userId: this.userId };
    return this.http.post<ApiResult>(`${this.baseUrl}`, viewModel)

  }
  updateMeal(meal: Meal): Observable < ApiResult > {
    const viewModel = { ...meal, userId: this.userId };
    return this.http.put<ApiResult>(`${this.baseUrl}`, viewModel)
  
  }
  removeMeal(meal: Meal) {
    return this.http.delete<ApiResult>(`${this.baseUrl}/${meal.id}`)
  }
}
