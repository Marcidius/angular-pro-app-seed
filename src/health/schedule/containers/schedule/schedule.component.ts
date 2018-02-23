import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { Observable, Subscription } from 'rxjs/Rx';

import { ScheduleService, ScheduleItem } from '../../../shared/services/schedule/schedule.service';
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';

import { Store } from '../../../../store';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)">
      </schedule-calendar>

      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (cancel)="closeAssign()"
        (update)="assignItem($event)">
      </schedule-assign>


    </div>
  `
})

export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$: Observable<Date>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  schedule$: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private _scheduleService: ScheduleService,
    private _mealsService: MealsService,
    private _workoutsService: WorkoutsService
  ) {

   }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this._scheduleService.schedule$.subscribe(),
      this._scheduleService.selected$.subscribe(),
      this._scheduleService.list$.subscribe(),
      this._scheduleService.items$.subscribe(),
      this._mealsService.meals$.subscribe(),
      this._workoutsService.workouts$.subscribe(),

    ];
  }

  changeDate(date: Date) {
    this._scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this._scheduleService.selectSection(event);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  assignItem(items: string[]) {
    this._scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }
}
