import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthService } from './services/auth/auth.service';
import {  HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
 
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    SharedComponent,
    AuthFormComponent], 
  exports: [AuthFormComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {

    return {
      ngModule: SharedModule,
      providers: [
        AuthService
      ]
    };
  }
}
