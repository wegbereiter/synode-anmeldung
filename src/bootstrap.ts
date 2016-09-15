import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

import {resolveEnvironment} from './environment';

const env = resolveEnvironment(ENV);

env.preInit();

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((modRef: any) => {
        env.postInit(modRef);
        return modRef;
    });
