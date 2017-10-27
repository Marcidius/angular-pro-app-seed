import { Component, OnInit } from '@angular/core';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal',
  styleUrls: ['./meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg">
          <span>Create meal</span>
        </h1>
      </div>
      <div>
        <meal-form
          (create)="addMeal($event)">
        </meal-form>
      </div>
    </div>
  `
})

export class MealComponent implements OnInit {
  constructor(
    private mealService: MealsService
  ) { }

  ngOnInit() { }

  addMeal(event: Meal) {
    console.log('meal: ', event);
  }
}
