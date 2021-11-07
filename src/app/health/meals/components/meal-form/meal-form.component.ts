import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import {
  FormGroup, FormArray,
  FormBuilder, FormControl,
  Validators
} from '@angular/forms';
import { Meal } from 'src/app/models/Meal';
@Component({
  selector: 'meal-form',
  templateUrl: './meal-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit {

  @Output()
  create: EventEmitter<any> = new EventEmitter<any>()
  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  addIngrediants() {
    this.ingredients.push(new FormControl(''))

  }
  removeIngrediants(index: number) {
    // removeAt method is enable, because ingrediants property below is as a FormArray
    this.ingredients.removeAt(index)

  }
  createMeal() {

    if (this.form.valid) {
      this.create.emit(this.form.value)
 
    }
  }
  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }
  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );

  }
}
