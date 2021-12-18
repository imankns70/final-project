import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MealsService } from 'src/app/health/shared/services/meals/meals.service';
import { ScheduleService } from 'src/app/health/shared/services/schedule/schedule.service';
import { WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';
import { Meal } from 'src/app/models/meal';
import { ScheduelItem } from 'src/app/models/schedule-item';
import { Workout } from 'src/app/models/workout';
import { Store } from 'store';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;
  date$: Observable<Date>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  schedule$: Observable<ScheduelItem[]>;
  subscriptions: Subscription[] = [];
  constructor(
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(items => {

        this.store.set('schedule', items)
      }),

      this.scheduleService.selected$.subscribe(
        (next: any) => this.store.set('selected', next)
      ),

      this.mealsService.getMeals().subscribe((meals: Meal[]) => {

        this.store.set('meals', meals)

      }),
      this.workoutsService.getWorkouts().subscribe((workouts: Workout[]) => {

        this.store.set('workouts', workouts)

      }),
      this.scheduleService.list$.subscribe((selected: any) => {

        const list = this.store.value[selected.type]
        this.store.set('list', list)
      }),
      this.scheduleService.items$.subscribe((items: ScheduelItem[]) => {
        this.store.set('shcedule', items);
      })
    ]



  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }
  changeDate(date: Date) {
    this.store.set('date', date)
    this.scheduleService.updateDate(date);
  }
  assignItem(items: string[]) {
    this.scheduleService.updateItems(items)
    this.store.set('schedule', items)
    this.closeAssign()
  }
  closeAssign() {
    this.open = false
  }
}
