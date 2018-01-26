import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform {
  transform(value: any) {
    if (value.type === 'endurance') {
      return `
        Distance: ${value.endurance.distance + 'mi'}, 
        Duration: ${value.endurance.duration + 'mins'},
      `;
    } else {
      return `
        Reps: ${value.strength.reps},
        Sets: ${value.strength.sets},
        Weight: ${value.strength.weight + 'lbs'}
      `;
    }
  }
}