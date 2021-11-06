import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Store } from 'src/app/store';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/api-result';
import { environment } from 'src/environments/environment';
import { Meal } from 'src/app/models/Meal';
import { map, tap } from 'rxjs/operators';

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

  getMeals(): Observable<Meal[]> {

    return this.http.get<ApiResult>(`${this.baseUrl}/${this.userId}`).pipe(
      map((apiResult: ApiResult) => apiResult.data),
      map((meals: Meal[]) => meals)
      
    )
  }
  get userId() {
    return this.authService.getUserLoggein().id
  }
}
