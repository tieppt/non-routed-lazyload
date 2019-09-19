import {
  Compiler,
  Directive,
  Inject,
  Injector,
  Input,
  NgModuleRef,
  OnInit,
  Type,
  ViewContainerRef,
  NgModuleFactory
} from '@angular/core';
import { LAZY_MODULES_MAP, LazyNonRoutableModules } from './load-module-map';
import { LoadModuleService } from './load-module.service';

type ModuleWithRoot = Type<any> & { rootComponent: Type<any> };

@Directive({
  selector: '[loadModule]'
})
export class LoadModuleDirective implements OnInit {
  @Input('loadModule') moduleName: keyof LazyNonRoutableModules;

  constructor(
    private _vcr: ViewContainerRef,
    private _injector: Injector,
    private _compiler: Compiler,
    private _loadModuleService: LoadModuleService,
    @Inject(LAZY_MODULES_MAP) private modulesMap: LazyNonRoutableModules
  ) {}

  async ngOnInit() {
    let ref = this._loadModuleService.moduleRefs[this.moduleName];

    let refPromise = null;
    if (ref) {
      refPromise = Promise.resolve(ref);
    } else {
      const moduleFactory = await loadModuleFactory(
        this.modulesMap[this.moduleName] as () => Promise<any>,
        this._compiler
      );
      const moduleRef = moduleFactory.create(this._injector);

      ref = {
        moduleRef,
        moduleFactory
      };

      this._loadModuleService.updateModuleRefs(prev => ({
        ...prev,
        [this.moduleName]: ref
      }));
      refPromise = Promise.resolve(ref);
    }

    const { moduleFactory, moduleRef } = await refPromise;

    // TODO: make sure this works with AoT. This currentlt won't work
    const rootComponent = (moduleFactory.moduleType as ModuleWithRoot)
      .rootComponent;
    const factory = moduleRef.componentFactoryResolver.resolveComponentFactory(
      rootComponent
    );
    this._vcr.createComponent(factory);
  }
}

async function loadModuleFactory(
  loadChildren: () => Promise<any>,
  compiler: Compiler
): Promise<NgModuleFactory<any>> {
  const t = await loadChildren();
  if (t instanceof NgModuleFactory) {
    return t;
  } else {
    return compiler.compileModuleAsync(t);
  }
}
