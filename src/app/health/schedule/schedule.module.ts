
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { Store } from '../../store';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ScheduleCalenderComponent } from './components/schedule-calendar/schedule-calendar.component'
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component'
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component'

const ROUTES: Routes = [
    { path: '', component: ScheduleComponent },
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),


    ],
    declarations: [
        ScheduleComponent,
        ScheduleCalenderComponent,
        ScheduleDaysComponent,
        ScheduleControlsComponent

    ],

    providers: [
        Store


    ]

})


export class ScheduleModule {

}