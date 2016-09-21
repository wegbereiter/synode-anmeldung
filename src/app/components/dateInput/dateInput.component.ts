import {Component, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'date-input',
    template: require('./dateInput.html'),
    styles: [require('./dateInput.css')],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateInputComponent),
            multi: true
        }
    ],
})
export class DateInputComponent implements ControlValueAccessor {
    @Input() public date: Date = null;

    private focusCounter = 0;
    private days: Array<number> = [];
    private months: Array<string> = [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
    ];

    private currentDay = null;
    private currentMonth = null;
    private currentYear = null;

    private propagateChange = (_: any) => {};
    private propagateTouch = () => {};

    constructor() {
        for (let day = 1; day <= 31; day++) this.days.push(day);
    }

    private focus() {
        this.focusCounter++;
    }

    private blur() {
        this.focusCounter--;
        window.requestAnimationFrame(() => this.focusCounter === 0 && this.propagateTouch());
    }

    private updateDate() {
        if (this.currentDay !== null && this.currentMonth !== null  && this.currentYear !== null) {
            this.date = new Date(this.currentYear, this.currentMonth, this.currentDay);
        } else {
            this.date = null;
        }

        this.propagateChange(this.date);
        this.propagateTouch();
    }

    updateDay(day) {
        this.currentDay = day;
        this.updateDate();
    }

    updateMonth(month) {
        this.currentMonth = month;
        this.updateDate();
    }

    updateYear(year) {
        this.currentYear = year;
        this.updateDate();
    }

    public writeValue(value: any) {
        if (value instanceof Date) {
            this.date = value;
            this.currentDay = value.getDate();
            this.currentMonth = value.getMonth();
            this.currentYear = value.getFullYear();
        } else {
            this.date = null;
            this.currentDay = null;
            this.currentMonth = null;
            this.currentYear = null;
        }
    }

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn) {
        this.propagateTouch = fn;
    }
}