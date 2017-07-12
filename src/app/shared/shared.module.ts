import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    MdProgressSpinnerModule, MdDatepickerModule, MdDialogModule, MdInputModule,
    MdButtonModule, MdSelectModule, MdCheckboxModule, MdCardModule,
} from '@angular/material';
import { FormComponent } from './components/form/form.component';

@NgModule({
    declarations: [
        FormComponent,
        // DateInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MdProgressSpinnerModule,
        MdDatepickerModule,
        MdDialogModule,
        MdInputModule,
        MdButtonModule,
        MdSelectModule,
        MdCheckboxModule,
        MdCardModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MdProgressSpinnerModule,

        FormComponent,
        // DateInputComponent,
    ],
})
export class SharedModule {
}
