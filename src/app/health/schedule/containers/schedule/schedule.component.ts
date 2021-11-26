import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ScheduleService } from 'src/app/health/shared/services/schedule/schedule.service';
import { Store } from 'src/app/store';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  date$: Observable<Date>;
  subscription : Subscription;
  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
 
    this.date$ = this.store.select('date');

    this.subscription= this.scheduleService.schedule$.subscribe(next =>
      
      this.store.set('date', next));
    

    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
