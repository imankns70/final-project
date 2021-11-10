
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/shared/guards/auth.guard';
import { SharedModule } from './shared/shared.module';
const ROUTES: Routes = [

    {
        path: 'meals',
        canLoad:[AuthGuard], 
               
        loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule)
    },

    {
        path: 'schedule',
        canLoad:[AuthGuard], 
        loadChildren: () => import('../health/schedule/schedule.module').then(s => s.ScheduleModule)
    },

    {
        path: 'workouts',
        canLoad:[AuthGuard], 
        loadChildren: () => import('../health/workouts/workouts.module').then(m => m.WoroutsModule)
    }

]

@NgModule({

    imports: [

        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ],


})


export class HealthModule {

}