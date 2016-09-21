import {Directive, forwardRef, Input} from '@angular/core';
import {NG_VALIDATORS, FormControl} from '@angular/forms';

@Directive({
    selector: 'date-input[ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => DateInputValidatorDirective), multi: true}
    ],
})
export class DateInputValidatorDirective {
    @Input() public onlyPast: boolean = false;
    @Input() public min: Date = null;
    @Input() public max: Date = null;

    validate(control: FormControl) {
        const value = control.value;
        let max = this.max;
        let min = this.min;

        if (this.onlyPast) {
            max = new Date();
        }

        if (value instanceof Date && max instanceof Date) {
            if (value.getFullYear() > max.getFullYear()) return this.invalid();
            if (value.getFullYear() === max.getFullYear() && value.getMonth() > max.getMonth()) return this.invalid();
            if (value.getFullYear() === max.getFullYear() && value.getMonth() === max.getMonth() && value.getDate() > max.getDate()) return this.invalid();
        }

        if (value instanceof Date && min instanceof Date) {
            if (value.getFullYear() < min.getFullYear()) return this.invalid();
            if (value.getFullYear() === min.getFullYear() && value.getMonth() < min.getMonth()) return this.invalid();
            if (value.getFullYear() === min.getFullYear() && value.getMonth() === min.getMonth() && value.getDate() < min.getDate()) return this.invalid();
        }

        return null;
    }

    private invalid() {
        return {
            validateDate: {
                valid: false,
            }
        };
    }
}