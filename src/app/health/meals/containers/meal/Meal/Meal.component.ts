 import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/Meal';

@Component({
  selector: 'app-Meal',
  templateUrl: './Meal.component.html',
  styleUrls: ['./Meal.component.scss']
})
export class MealComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addMeal(event: Meal) {
    console.log(event); 
 
  }
}
