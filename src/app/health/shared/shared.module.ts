
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Store } from 'src/app/store';
import { MealsService } from './services/meals/meals.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({

    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
    ],
    declarations: []

})


export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService

            ]
        }
    }
}