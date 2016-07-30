import {bootstrap} from '@angular/platform-browser-dynamic';

import {appRouterProviders} from './app/app.routes';
import {VENDOR_PROVIDERS} from './vendor';

import {AppComponent} from './app/app.component';

bootstrap(AppComponent, [
    VENDOR_PROVIDERS,
    appRouterProviders,
]);
