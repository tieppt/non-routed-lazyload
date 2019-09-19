import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lazy-feature',
    pathMatch: 'full'
  },
  {
    path: 'lazy-feature',
    loadChildren: () => import('./features/route-lazy-feature/route-lazy-feature.module').then(m => m.RouteLazyFeatureModule)
  }
];

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, ButtonModule, FormsModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
