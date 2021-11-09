import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from 'src/app/store';
import { Observable, Subscription } from 'rxjs';
import { MealsService } from '../../../shared/services/meals/meals.service';
import { Meal } from 'src/app/models/Meal';
@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  subscription = new Subscription();
  errorMessage: string;
  constructor(
    private store: Store,
    private mealsService: MealsService
  ) { }

  ngOnInit() {
   
    this.meals$ = this.store.select<Meal[]>('meals');

    this.subscription = this.mealsService.getMeals().subscribe((meals: Meal[]) => {

      this.store.set('meals', meals)

    })
  
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  removeMeal(meal: Meal) {
    
   this.subscription.add(this.mealsService.removeMeal(meal).subscribe(val=>{
     if (val.isSuccess) {
    
     this.mealsService.getMeals().subscribe((meals: Meal[]) => {

      this.store.set('meals', meals)

    })
     }
   }))
  }

}
