import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormGroup, FormArray,
  FormBuilder, FormControl,
  Validators
} from '@angular/forms';
@Component({
  selector: 'meal-form',
  templateUrl: './meal-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    ingrediants: this.fb.array([''])
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  addIngrediants() {
    this.ingrediants.push(new FormControl(''))

  }
  removeIngrediants(index: number) {
    // removeAt method is enable, because ingrediants property below is as a FormArray
    this.ingrediants.removeAt(index)

  }
  createMeal() {

    console.log(this.form.value)
  }
  get ingrediants() {
    return this.form.get('ingrediants') as FormArray;
  }
}
