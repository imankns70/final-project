import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';
import { Workout } from 'src/app/models/workout';
import { Store } from 'src/app/store';

@Component({
  selector: 'workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  workouts$: Observable<Workout[]>;
  subscription = new Subscription();
  errorMessage: string;
  constructor(
    private store: Store,
    private workoutsService: WorkoutsService
  ) { }

  ngOnInit() {

    this.workouts$ = this.store.select<Workout[]>('workouts');

    this.subscription = this.workoutsService.getWorkouts().subscribe((workouts: Workout[]) => {
   
      this.store.set('workouts', workouts)

    })

  }

  removeWorkout(workout: Workout) {
 
    this.subscription = this.workoutsService.removeWorkout(workout).subscribe(val => {
      if (val.isSuccess) {

        this.workoutsService.getWorkouts().subscribe((workouts: Workout[]) => {

          this.store.set('workouts', workouts)

        })
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
