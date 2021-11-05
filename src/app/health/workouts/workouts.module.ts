
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutsComponent } from './containers/workouts/workouts.component';

import { Store } from '../../store';
const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent }
]

@NgModule({
  imports: [

    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),


  ],
  declarations: [
    WorkoutsComponent
  ],
  
  providers: [
    Store


  ]

})


export class WoroutsModule {

}