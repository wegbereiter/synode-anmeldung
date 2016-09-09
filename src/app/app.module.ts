import {NgModule} from '@angular/core';

import {ANGULAR_MODULES} from '../vendor/angular';
import {MATERIAL_MODULES} from '../vendor/material';

import {AppComponent} from './components/app.component';

@NgModule({
    imports: [
        ...ANGULAR_MODULES,
        ...MATERIAL_MODULES,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
