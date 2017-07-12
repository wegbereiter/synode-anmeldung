import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DateAdapter, MD_DATE_FORMATS, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentDateAdapter, MOMENT_DATE_FORMATS } from './momentDateAdapter.service';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        SharedModule,
        MdNativeDateModule,
        HttpModule,
    ],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter},
        {provide: MD_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
