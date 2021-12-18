import { Component, OnInit, ChangeDetectionStrategy, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import {
  FormGroup, FormArray,
  FormBuilder, FormControl,
  Validators
} from '@angular/forms';
import { Meal } from 'src/app/models/meal';
@Component({
  selector: 'meal-form',
  templateUrl: './meal-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit, OnChanges {
  toggled = false;
  exists = false;

  @Input()
  meal: Meal;

  @Output()
  create: EventEmitter<Meal> = new EventEmitter<Meal>();

  @Output()
  update: EventEmitter<Meal> = new EventEmitter<Meal>();

  @Output()
  remove: EventEmitter<Meal> = new EventEmitter<Meal>();


  form = this.fb.group({
    section: [''],
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  })
  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges) {

    // if (changes.meal.currentValue) {
    //   this.exists = true
    // }

    // OR
    if (this.meal && this.meal.name) {
      this.exists = true;
      const formValue: Meal = this.meal;

      // delet the FormArray
      this.emptyIngredients();

      this.form.patchValue(formValue);


      // if the meal has many ingredients, so we rebuild the FormArray again
      if (formValue.ingredients) {
        for (const item of formValue.ingredients) {
          this.ingredients.push(new FormControl(item))
        }
      }
    }
  }
  emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0)
    }
  }
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
  updateMeal() {
    if (this.form.valid) {

      this.update.emit(this.form.value)
    }
  }
  removeMeal() {
    this.remove.emit(this.form.value)
  }
  toggle() {
    this.toggled = !this.toggled
  }

}
