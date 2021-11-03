import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../auth/shared/shared.module';
 
export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(r => r.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(r => r.RegisterModule)
      }
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    SharedModule.forRoot(),
    

  ],
  declarations: [AuthComponent],
  providers: []
})
export class AuthModule { }
