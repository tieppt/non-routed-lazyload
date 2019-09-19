import { InjectionToken, NgModuleFactory } from '@angular/core';
import { NonRouteLazyOneModule } from '../../features/route-lazy-feature/components/non-route-lazy-1/non-route-lazy-one.module';
import { NonRouteLazyTwoModule } from '../../features/route-lazy-feature/components/non-route-lazy-2/non-route-lazy-two.module';

export type LoadChildrenCallback<T = any> = () => Promise<NgModuleFactory<T>> | T;

export interface LazyNonRoutableModules {
  nonRouteOne: LoadChildrenCallback<NonRouteLazyOneModule>;
  nonRouteTwo: LoadChildrenCallback<NonRouteLazyTwoModule>;
}

export const lazyModulesMap: LazyNonRoutableModules = {
  nonRouteOne: () => import('../../features/route-lazy-feature/components/non-route-lazy-1/non-route-lazy-one.module').then(m => m.NonRouteLazyOneModule),
  nonRouteTwo: () => import('../../features/route-lazy-feature/components/non-route-lazy-2/non-route-lazy-two.module').then(m => m.NonRouteLazyTwoModule),
};

export const LAZY_MODULES_MAP = new InjectionToken('LAZY_MODULES_MAP');
