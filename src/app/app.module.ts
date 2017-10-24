import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules
import { AuthModule } from '../auth/auth.module';

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

// var config = {
//     apiKey: "AIzaSyDrw3TbFfO7MxT78bwsaCewgnDjdbCFPFY",
//     authDomain: "angular-pro-fitness-app.firebaseapp.com",
//     databaseURL: "https://angular-pro-fitness-app.firebaseio.com",
//     projectId: "angular-pro-fitness-app",
//     storageBucket: "angular-pro-fitness-app.appspot.com",
//     messagingSenderId: "331692872288"
//   };
