import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { Observable, Subscription } from 'rxjs/Rx';

import { ScheduleService } from '../../../shared/services/schedule/schedule.service';

import { Store } from '../../../../store';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async">
      </schedule-calendar>



    </div>
  `
})

export class ScheduleComponent implements OnInit, OnDestroy {

  date$: Observable<Date>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private _scheduleService: ScheduleService
  ) {

   }

  ngOnInit() {
    this.date$ = this.store.select('date');


    this.subscriptions = [
      this._scheduleService.schedule$.subscribe(),
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
