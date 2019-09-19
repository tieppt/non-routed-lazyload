import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { NonRouteLazyOneComponent } from './non-route-lazy-one.component';

@NgModule({
  imports: [ButtonModule, CalendarModule],
  declarations: [NonRouteLazyOneComponent],
  entryComponents: [NonRouteLazyOneComponent]
})
export class NonRouteLazyOneModule {
  static rootComponent = NonRouteLazyOneComponent;
}