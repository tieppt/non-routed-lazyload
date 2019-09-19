import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { LoadModuleModule } from '../../directive/load-module/load-module.module';
import { RouteLazyFeatureComponent } from './route-lazy-feature.component';

const routes: Routes = [
  {
    path: "",
    component: RouteLazyFeatureComponent
  }
]

@NgModule({
  declarations: [RouteLazyFeatureComponent],
  imports: [CommonModule, LoadModuleModule, StepsModule, RouterModule.forChild(routes)]
})
export class RouteLazyFeatureModule { }