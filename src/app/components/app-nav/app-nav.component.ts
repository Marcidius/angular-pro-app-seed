import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,  // Always add this to our STATELESS dumb components
  styleUrls: ['app-nav.component.scss'],
  template: `
  <div class="app-nav">
    <div class="wrapper">
      <a routerLink="schedule" routerLinkActive="acive">Schedule</a>
      <a routerLink="meals" routerLinkActive="acive">Meals</a>
      <a routerLink="workouts" routerLinkActive="acive">Workouts</a>

    </div>
  </div>`
})

export class AppNavComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
