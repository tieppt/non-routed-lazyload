import { NgModule } from "@angular/core";
import { LAZY_MODULES_MAP, lazyModulesMap } from './load-module-map';
import { LoadModuleDirective } from "./load-module.directive";

export function factory() {
  return lazyModulesMap;
}

@NgModule({
  declarations: [LoadModuleDirective],
  exports: [LoadModuleDirective],
  providers: [
    {
      provide: LAZY_MODULES_MAP,
      useFactory: factory
    }
  ]
})
export class LoadModuleModule {}
