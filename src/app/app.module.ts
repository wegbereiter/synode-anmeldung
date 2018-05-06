import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatButtonModule, MatDialogModule } from '@angular/material';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ImprintDialog } from './imprint/imprintDialog.component';
import { SharedModule } from './shared/shared.module';
import localeFr from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'de');

const MY_FORMATS = {
    parse: {
        dateInput: 'DD.MM.YYYY',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    declarations: [
        AppComponent,
        ImprintDialog,
    ],
    entryComponents: [
        ImprintDialog,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        SharedModule,
        HttpClientModule,
        MatMomentDateModule,
        MatDialogModule,
        MatButtonModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
