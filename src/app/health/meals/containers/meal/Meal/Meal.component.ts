import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
    this.subscription= this.mealsService.getMeals().subscribe((meals: Meal[]) => {

      this.store.set('meals', meals)

    });
   
    this.route.params.pipe(
      switchMap((param: Params) => {
        return this.mealsService.getMeal(param.id)
     })
    )
  }

  ngOnDestroy() {

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
