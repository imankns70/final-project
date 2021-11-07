import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResult } from 'src/app/api-result';
import { Meal } from 'src/app/models/Meal';
import { MealsService } from '../../../../shared/services/meals/meals.service'
@Component({
  selector: 'app-Meal',
  templateUrl: './Meal.component.html',
  styleUrls: ['./Meal.component.scss']
})
export class MealComponent implements OnInit {

  subscription = new Subscription();
  constructor(
    private mailService: MealsService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  addMeal(meal: Meal) {
    this.subscription.add(
      this.mailService.addMeal(meal).subscribe((apiResult: ApiResult) => {
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
