import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MATERIAL_MODULES} from '../vendor/material';

import {AppComponent} from './components/app/app.component';
import {FormComponent} from './components/form/form.component';
import {DateInputComponent} from './components/dateInput/dateInput.component';
import {DateInputValidatorDirective} from './directives/dateInputValidator/dateInputValidator.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ...MATERIAL_MODULES,

    ],
    declarations: [
        AppComponent,
        FormComponent,
        DateInputComponent,
        DateInputValidatorDirective,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
