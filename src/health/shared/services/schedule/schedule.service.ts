import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { BehaviorSubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchmap';

import { Store } from '../../../../store';

import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<ScheduleItem[]> = this.date$
    .do((next: any) => this.store.set('date', next))
    .map((day: any) => {

      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();

      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() - 1;

      return { startAt, endAt };
    })
    .switchMap(({ startAt, endAt }: any) => {
      return this.getSchedule(startAt, endAt);
    }).map((data: any) => {

      const mapped: ScheduleList = {};

      // format the data from firebase so we can use it in an ngFor
      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;

    })
    .do((next: any) => this.store.set('schedule', next));

  constructor(
    private store: Store,
    private _authService: AuthService,
    private _db: AngularFireDatabase
  ) {}

  get uid() {
    return this._authService.user.uid;
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  private getSchedule(startAt: number, endAt: number) {
    // firebase request
    return this._db.list(`schedule/${this.uid}`, {
      query: {
        orderByChild: 'timestamp',
        startAt,
        endAt
      }
    });
  }
}
