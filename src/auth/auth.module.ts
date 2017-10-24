import { FirebaseAppConfig } from 'angularfire2/interfaces';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// shared module
import { SharedModule } from './shared/shared.module';

// third-party modules
export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyDrw3TbFfO7MxT78bwsaCewgnDjdbCFPFY",
    authDomain: "angular-pro-fitness-app.firebaseapp.com",
    databaseURL: "https://angular-pro-fitness-app.firebaseio.com",
    projectId: "angular-pro-fitness-app",
    storageBucket: "angular-pro-fitness-app.appspot.com",
    messagingSenderId: "331692872288"
  };

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}
