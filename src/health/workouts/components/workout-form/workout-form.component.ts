import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-form.component.scss'],
  template: `
    <div class="workout-form">

      <form [formGroup]="form">

        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input
              type="text"
              placeholder="e.g. English Breakfast"
              formControlName="name">
            <div
              *ngIf="required"
              class="error">
              Workout name is required
            </div>
          </label>
        </div>

        <div class="workout-form__submit">
          <div>
            <button
              *ngIf="!exists"
              type="button"
              class="button"
              (click)="createWorkout()">
              Create workout
            </button>
            <button
              *ngIf="exists"
              type="button"
              class="button"
              (click)="updateWorkout()">
              Save
            </button>
            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div *ngIf="exists" class="workout-form__delete">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button
                class="confirm"
                type="button"
                (click)="removeWorkout()">
                Yes
              </button>
              <button
                class="cancel"
                type="button"
                (click)="toggle()">
                No
              </button>
            </div>

            <button
              class="button button--delete"
              type="button"
              (click)="toggle()">
              Delete
            </button>
          </div>

        </div>
      </form>
    </div>
  `
})

export class WorkoutFormComponent implements OnInit, OnChanges {

  toggled = false;
  exists = false;

  @Input()
  workout: Workout;

  @Output()
  create = new EventEmitter<Workout>();

  @Output()
  update = new EventEmitter<Workout>();

  @Output()
  remove = new EventEmitter<Workout>();

  form = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return (
      this.form.get('name').hasError('required') && this.form.get('name').touched
    );
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // if (this.workout && this.workout.name) {
    //   this.exists = true;
    //   this.emptyIngredients();

    //   const value = this.workout;
    //   this.form.patchValue(value);  // this does not repopulate the form array - this might change in the future


    //   if (value.ingredients) {
    //     for (const item of value.ingredients ) {
    //       this.ingredients.push(new FormControl(item));
    //     }
    //   }
    // }
  }


  // addIngredient() {
  //   this.ingredients.push(new FormControl(''));
  // }

  // removeIngredient(index: number) {
  //   this.ingredients.removeAt(index);
  // }

  // emptyIngredients() {
  //   while(this.ingredients.controls.length) {
  //     this.ingredients.removeAt(0);
  //   }
  // }

  createWorkout() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.emit(this.form.value);
  }
}
