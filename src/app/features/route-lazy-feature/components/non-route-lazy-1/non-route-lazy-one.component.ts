import { Component } from '@angular/core';

@Component({
  selector: 'non-route-lazy-one',
  template: `
    <span>One</span>
    <br/>
    <p-button label="Click Non Lazy One"></p-button>
    <br/>
    <p-calendar id="fromDate"
            [touchUI]="true"
            [monthNavigator]="true"
            [yearNavigator]="true"
            yearRange="1999:2099"
            [hideOnDateTimeSelect]="true"
            [readonlyInput]="true"
            [placeholder]="'From Date'">
    </p-calendar>
  `
})
export class NonRouteLazyOneComponent {}