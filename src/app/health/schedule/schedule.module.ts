
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { Store } from '../../../store';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module'

import { ScheduleCalenderComponent } from './components/schedule-calendar/schedule-calendar.component'
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component'
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component'
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
 import {ScheduleAssignComponent} from './components/schedule-assign/schedule-assign.component';

const ROUTES: Routes = [
    { path: '', component: ScheduleComponent },
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule


    ],
    declarations: [
        ScheduleComponent,
        ScheduleCalenderComponent,
        ScheduleDaysComponent,
        ScheduleControlsComponent,
        ScheduleSectionComponent,
        ScheduleAssignComponent

    ],

    providers: [
        Store
  


    ]

})


export class ScheduleModule {

}