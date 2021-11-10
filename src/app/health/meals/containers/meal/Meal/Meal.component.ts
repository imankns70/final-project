import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest, empty, observable, Observable, of, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { ApiResult } from 'src/app/api-result';
import { Meal } from 'src/app/models/Meal';
import { Store } from 'src/app/store';
import { MealsService } from '../../../../shared/services/meals/meals.service'
@Component({
  selector: 'app-Meal',
  templateUrl: './Meal.component.html',
  styleUrls: ['./Meal.component.scss']
})
export class MealComponent implements OnInit, OnDestroy {
  counter: number;
  meal$: Observable<Meal>;
  subscription = new Subscription();
  constructor(
    private store: Store,
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.meal$ = this.mealsService.getMeal(this.store.select<Meal[]>('meals'), this.route.params)
      .pipe(
        //filter(Boolean),
        map((meal: Meal) => meal)

      );

    this.subscription.add(this.route.params.pipe(
      takeWhile((param: Params) => !!param.id),
      switchMap(() => {
        return this.mealsService.getMeals()
      }
      )
    ).subscribe((meals: Meal[]) => {

      this.store.set('meals', meals)
    }));




  }

  ngOnDestroy() {
    this.subscription.unsubscribe()

  }
  addMeal(meal: Meal) {
    this.subscription.add(
      this.mealsService.addMeal(meal).subscribe((apiResult: ApiResult) => {
        if (apiResult.isSuccess) {
          this.backToMeals();
        }
      })

    )


  }
  backToMeals() {
    this.router.navigate(['meals'])
  }
}
