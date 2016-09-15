import {disableDebugTools} from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';
import {AbstractEnvironment} from './abstract.environment';

export class ProductionEnvironment extends AbstractEnvironment {
    public preInit() {
        disableDebugTools();
        enableProdMode();
    }
}
