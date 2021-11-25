import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Workout } from 'src/app/models/workout';

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent {

  toggled = false;
  exists = false;

  @Input()
  workout: Workout;

  @Output()
  create = new EventEmitter<Workout>();

  @Output()
  update = new EventEmitter<Workout>();

  @Output()
  remove = new EventEmitter<Workout>();

  form = this.fb.group({
    name: ['', Validators.required],
    type:'strength'
  });
  
  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // if (this.meal && this.meal.name) {
    //   this.exists = true;
    //   this.emptyIngredients();

    //   const value = this.meal;
    //   this.form.patchValue(value);

    //   if (value.ingredients) {
    //     for (const item of value.ingredients) {
    //       this.ingredients.push(new FormControl(item));
    //     }
    //   }

    // }
  }

  // emptyIngredients() {
  //   while(this.ingredients.controls.length) {
  //     this.ingredients.removeAt(0);
  //   }
  // }

  get required() {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  // get ingredients() {
  //   return this.form.get('ingredients') as FormArray;
  // }

  // addIngredient() {
  //   this.ingredients.push(new FormControl(''));
  // }

  // removeIngredient(index: number) {
  //   this.ingredients.removeAt(index);
  // }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}
