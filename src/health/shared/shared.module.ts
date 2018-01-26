import { WorkoutPipe } from './pipes/workout.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ListItemComponent } from './components/list-item/list-item.component';

import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  exports: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  declarations: [
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
        WorkoutsService
      ]
    }
  }
 }
