import { ControlValueAccessor } from '@angular/forms/src/directives';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

@Component({
  selector: 'workout-type',
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-type.component.scss'],
  template: `
  <div class="workout-type">
    <div
      class="workout-type__pane"
      *ngFor="let selector of selectors"
      [class.active]="selector === value"
      (click)="setSelected(selector)">
      <img src="/img/{{ selector}}.svg">
      <p>{{ selector }}</p>
    </div>
  </div> `
})

export class WorkoutTypeComponent implements ControlValueAccessor {

  selectors = ['strength', 'endurance'];

  value: string;

  private onTouch: Function;
  private onModelChange: Function;

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  // called by Angular using the ControlValueAccessor and sets the default value
  writeValue(value: string) {
    this.value = value;
  }

  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}