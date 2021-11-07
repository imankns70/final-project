
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { Store } from '../../store';
import { MealsComponent } from './containers/meals/meals.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MealComponent } from './containers/meal/Meal/Meal.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';
const ROUTES: Routes = [
    { path: '', component: MealsComponent },
    { path: 'new', component: MealComponent },
    { path: ':id', component: MealComponent },
]

@NgModule({
    declarations: [
        MealsComponent,
        MealComponent,
        MealFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule


    ],
    providers: [
        Store


    ]

})


export class MealsModule {

}