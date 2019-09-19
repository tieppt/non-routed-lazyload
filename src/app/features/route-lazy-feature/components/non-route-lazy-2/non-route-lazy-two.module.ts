import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { NonRouteLazyTwoComponent } from './non-route-lazy-two.component';

@NgModule({
  imports: [ButtonModule, CalendarModule],
  declarations: [NonRouteLazyTwoComponent],
  entryComponents: [NonRouteLazyTwoComponent]
})
export class NonRouteLazyTwoModule {
  static rootComponent = NonRouteLazyTwoComponent;
}