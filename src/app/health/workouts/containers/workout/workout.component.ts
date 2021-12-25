import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { ApiResult } from 'src/app/api-result';
import { Workout } from 'src/app/models/workout';
import { Store } from 'store';
import { WorkoutsService } from '../../../shared/services/workouts/workouts.service'
@Component({
  selector: 'Workout',
  templateUrl: './Workout.component.html',
  styleUrls: ['./Workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  counter: number;
  workout$: Observable<Workout>;
  subscription = new Subscription();
  constructor(
    private store: Store,
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    //method one
    this.workout$ = this.workoutsService.getWorkout(this.store.select<Workout[]>('workout'), this.route.params)
 
    //method two
    // if (this.route.snapshot.params.id) {
    //   const mealId = this.route.snapshot.params.id;
    //   this.meal$ = this.store.select<Meal[]>('meals').pipe(
    //     map((meals: Meal[]) => {
    //       debugger
    //       if (meals) {
    //         return meals.find(meal => meal.id = mealId)
    //       }
    //     })
    //   )
    // }
    //this.meal$ = this.mealsService.getMeal(this.store.select<Meal[]>('meals'), this.route.params)
    // .pipe(
    //   filter(Boolean),
    //   map((meal: Meal) => meal)

    // );

    this.subscription.add(this.route.params.pipe(
      takeWhile((param: Params) => !!param.id),
      switchMap(() => {
        return this.workoutsService.getWorkouts()
      }
      )
    ).subscribe((workouts: Workout[]) => {

      this.store.set('workouts', workouts)
    }));


  }

  ngOnDestroy() {
    this.subscription.unsubscribe()

  }

  addWorkout(workout: Workout) {


    this.subscription.add(
      this.workoutsService.addWorkout(workout).subscribe((apiResult: ApiResult) => {
        if (apiResult.isSuccess) {
          this.backToWorkouts();
        }
      })

    )


  }
  updateWorkout(workout: Workout) {

    this.subscription.add(
      this.workoutsService.updateWorkout(workout).subscribe((apiResult: ApiResult) => {
        if (apiResult.isSuccess) {
          this.backToWorkouts();
        }
      })

    )


  }
  removeWorkout(workout: Workout) {
    console.log('remove::', workout);
    this.subscription.add(
      this.workoutsService.removeWorkout(workout).subscribe((apiResult: ApiResult) => {
        if (apiResult.isSuccess) {
          this.backToWorkouts();
        }
      })

    )


  }
  backToWorkouts() {
    this.router.navigate(['workouts'])
  }
}
