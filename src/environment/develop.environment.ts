import {enableDebugTools} from '@angular/platform-browser';
import {ApplicationRef} from '@angular/core';
import {AbstractEnvironment} from './abstract.environment';

export class DevelopEnvironment extends AbstractEnvironment {
    public postInit(modRef: any) {
        const appRef = modRef.injector.get(ApplicationRef);
        const cmpRef = appRef.components[0];

        let ng = (<any> window).ng;
        enableDebugTools(cmpRef);
        (<any> window).ng.probe = ng.probe;
        (<any> window).ng.coreTokens = ng.coreTokens;
    }
}
