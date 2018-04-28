import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
} from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        FormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatCardModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,

        FormComponent,
    ],
})
export class SharedModule {
}
