
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { Store } from '../../store';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const ROUTES: Routes = [
    {path:'', component:ScheduleComponent},
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES), 


    ],
    declarations: [
        ScheduleComponent
    ],
    
    providers: [
        Store


    ]

})
 

export class ScheduleModule {

}