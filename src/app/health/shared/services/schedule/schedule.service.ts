import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiResult } from 'src/app/api-result';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { ScheduelItem } from 'src/app/models/schedule-item';
import { Store } from 'store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  baseUrl: string = environment.apiUrl + 'Schedule';
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      // make an http Request
      debugger
      return {
        userId: this.userId,
        type: section.type,
        day: section.day,
        assigned: section.type === "workouts" ? items.workouts : items.meals,
        section: section.sectionKey

      }

    }),
    switchMap(obj => this.setSchedule(obj))
  )

  selected$ = this.section$
  // .pipe(
  //   tap((next: any) => this.store.set('selected', next))
  // )

  list$ = this.section$


  //tap((next: any) => this.store.set('list', next))

  schedule$: Observable<ScheduelItem[]> = this.date$.pipe(
    switchMap((day: Date) => this.getSchedule(day))

  )
  constructor(
    private store: Store,
    private authService: AuthService,
    private http: HttpClient

  ) { }

  selectSection(data: Date) {
    this.section$.next(data)
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }
  private getSchedule(day: Date) {

    const selectedDay = day.toLocaleDateString();
    let params = new HttpParams();
    params = params.append('userId', this.userId.toString());
    params = params.append('selectedDay', selectedDay);
    return this.http.get<ApiResult>(`${this.baseUrl}/`, { params }).pipe(
      map((apiResult: ApiResult) => apiResult.data),
      map((items: ScheduelItem[]) => items),

    )
  }
  updateItems(items: string[]) {
    this.itemList$.next(items);
  }
  setSchedule(viewModel: any) {
    return this.http.post<ApiResult>(`${this.baseUrl}`, viewModel).pipe(
      map((apiResult: ApiResult) => apiResult.data),
      map((items: ScheduelItem[]) => items)
    )
  }
  get userId() {
    return this.authService.getUserLoggein().id
  }
}
