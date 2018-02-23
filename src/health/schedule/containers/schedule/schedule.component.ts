import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { Observable, Subscription } from 'rxjs/Rx';

import { ScheduleService, ScheduleItem } from '../../../shared/services/schedule/schedule.service';

import { Store } from '../../../../store';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)">
      </schedule-calendar>



    </div>
  `
})

export class ScheduleComponent implements OnInit, OnDestroy {

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private _scheduleService: ScheduleService
  ) {

   }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');

    this.subscriptions = [
      this._scheduleService.schedule$.subscribe(),
    ]
  }

  changeDate(date: Date) {
    this._scheduleService.updateDate(date);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
