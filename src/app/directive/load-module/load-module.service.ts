import { Injectable, NgModuleRef, NgModuleFactory } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LazyNonRoutableModules } from './load-module-map';

export type SetStateArgs<T> = T | ((prev: T) => T);

type LazyModuleRefsMap = {
  [key in keyof LazyNonRoutableModules]?: {
    moduleRef: NgModuleRef<any>;
    moduleFactory: NgModuleFactory<any>;
  };
};

@Injectable({ providedIn: 'root' })
export class LoadModuleService {
  private _moduleRefsSub: BehaviorSubject<
    LazyModuleRefsMap
  > = new BehaviorSubject<LazyModuleRefsMap>({});

  get moduleRefs(): LazyModuleRefsMap {
    return this._moduleRefsSub.value;
  }

  updateModuleRefs(arg: SetStateArgs<LazyModuleRefsMap>) {
    if (typeof arg === 'function') {
      this._moduleRefsSub.next(arg(this.moduleRefs));
    } else {
      this._moduleRefsSub.next(arg);
    }
  }

  destroy(moduleName: keyof LazyNonRoutableModules): void {
    this.moduleRefs[moduleName] &&
      this.moduleRefs[moduleName].moduleRef.destroy();
    this.updateModuleRefs(prev => ({ ...prev, [moduleName]: null }));
  }

  destroyBulk(...moduleNames: Array<keyof LazyNonRoutableModules>): void {
    for (let i = 0; i < moduleNames.length; i++) {
      const moduleName = moduleNames[i];
      this.destroy(moduleName);
    }
  }
}
