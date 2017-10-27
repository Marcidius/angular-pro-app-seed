import { LoadChildren, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const ROUTES: Routes = [
  { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'meals', loadChildren: './meals/meals.module#MealsModule' },
  { path: 'workouts', loadChildren: './workouts/workouts.module#WorkoutsModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class HealthModule { }
