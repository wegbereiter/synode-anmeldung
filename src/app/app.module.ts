import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {MATERIAL_MODULES} from '../vendor/material';

import {AppComponent} from './components/app/app.component';
import {FormComponent} from './components/form/form.component';
import {appRoutes} from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        // RouterModule.forRoot(appRoutes),
        ...MATERIAL_MODULES,

    ],
    declarations: [
        AppComponent,
        FormComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
