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
  private subscription = new Subscription();
  meals$: Observable<Meal[]>;
  constructor(
    private store: Store,
    private mealsService: MealsService
  ) { }

  ngOnInit() {

    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.getMeals().subscribe()

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
