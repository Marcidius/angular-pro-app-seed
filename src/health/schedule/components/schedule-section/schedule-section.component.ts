import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ScheduleItem } from '../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule-section',
  styleUrls: ['schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="schedule-section">
      <div class="schedule-section__bar">
        {{ name }}
      </div>

      <div class="schedule-secttion__item food"
        *ngIf="section.meals; else addMeal"
        (click)="onSelect('meals', section.meals)">
        <span>{{ section.meals | join }}</span>
      </div>
      <ng-template #addMeal>
        <div
          class="schedule-section__item"
          (click)="onSelect('meals')">
          Assign Meal
        </div>
      </ng-template>

      <div class="schedule-secttion__item workout"
        *ngIf="section.workouts; else addWorkout"
        (click)="onSelect('workouts', section.workouts)">
        <span>{{ section.meals | join }}</span>
      </div>
      <ng-template #addWorkout>
        <div
          class="schedule-section__item"
          (click)="onSelect('workouts')">
          Assign Workout
        </div>
      </ng-template>

    </div>
  `
})
export class ScheduleSectionComponent {
  @Input() name: string;
  @Input() section: ScheduleItem

  @Output() select = new EventEmitter<any>();

  // @Output()
  constructor() {}

  onSelect(type: string, assigned: string[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    })
  }
}
