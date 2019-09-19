import { Component } from '@angular/core';

@Component({
  selector: "route-lazy-feature",
  template: `
    <p-steps [model]="steps" [(activeIndex)]="activeIndex" [readonly]="false"></p-steps>
    <ng-container [ngSwitch]="activeIndex">
      <ng-container *ngSwitchCase="0" loadModule="nonRouteOne">
      </ng-container>
      <ng-container *ngSwitchCase="1" loadModule="nonRouteTwo">
      </ng-container>
    </ng-container>
  `
})
export class RouteLazyFeatureComponent {
  activeIndex = 0;
  steps = [
    {label: "NonRoute 1"},
    {label: "NonRoute 2"},
  ];
}