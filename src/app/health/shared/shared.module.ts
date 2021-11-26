
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';
import { ScheduleService } from './services/schedule/schedule.service';
import { HttpClientModule } from '@angular/common/http';
import { ListItemComponent } from './components/list-item/list-item/list-item.component';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

@NgModule({

    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
    ],
    declarations: [
        ListItemComponent,
        JoinPipe,
        WorkoutPipe
    ],
    
    exports: [
        ListItemComponent,
        JoinPipe,
        WorkoutPipe
    ]
})


export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutsService,
                ScheduleService

            ]
        }
    }
}