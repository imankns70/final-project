import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
 
import { AuthModule } from './auth/auth.module';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error-interceptor';

import { Store } from './store';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';

export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
  
  ],
 providers:[
  Store,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
   
],
  bootstrap: [AppComponent]
})
export class AppModule { }
