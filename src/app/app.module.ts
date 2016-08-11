import {NgModule} from '@angular/core';
import {VENDOR_MODULES} from '../vendor';

import {AppComponent} from './app.component';

@NgModule({
    imports: VENDOR_MODULES,
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
