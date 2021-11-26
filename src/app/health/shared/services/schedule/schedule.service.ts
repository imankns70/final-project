import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from 'src/app/store';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());
  schedule$: Observable<any[]> = this.date$.pipe(
    map((next: any) => next),
 
  )
  constructor(private store: Store) { }

}
