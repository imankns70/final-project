import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest, empty, Observable, of, Subscription } from 'rxjs';
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
  meal$: Observable<Meal>;
  subscription = new Subscription();
  constructor(
    private store: Store,
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.meal$ =
      combineLatest([this.store.select<Meal[]>('meals'), this.route.params]).pipe(
        takeWhile(([meals, params]) => !!params.id),
        map(([meals, param]) => meals.find(meal => meal.id === parseInt(param.id, 10))
        ));


    this.subscription.add(this.route.params.pipe(
      takeWhile((param: Params) => !!param.id),
      switchMap((param: Params) => {
        return this.mealsService.getMeals()
      }
      )
    ).subscribe((meals: Meal[]) => {
      this.store.set('meals', meals)
    }))

    // this.meal$ = this.route.params.pipe(

    //   switchMap((param: Params) => {
    //     debugger
    //     return this.mealsService.getMeal(parseInt(param.id, 10))
    //   }

    //   )
    // );

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
