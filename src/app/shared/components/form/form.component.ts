import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { FormData } from '../../data';

@Component({
    selector: 'wb-register-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent {
    @Input() public data: FormData = {};
    @Output() public post = new EventEmitter<FormData>();

    public fields = [
        {name: 'name', required: true, label: 'Vor- und Nachname'},
        {name: 'email', required: true, label: 'E-Mail', type: 'email'},
        {name: 'street', required: true, label: 'Straße'},
        {name: 'zip', required: true, label: 'PLZ'},
        {name: 'city', required: true, label: 'Ort'},
        {name: 'country', required: true, label: 'Land'},
        {name: 'mobile', label: 'Handy-Nummer'},
        {name: 'allergies', label: 'Allergien / Unverträglichkeiten', type: 'textarea'},
        {name: 'birthday', required: true, label: 'Geburtstag (DD.MM.YYYY)', type: 'date', min: moment('1900-01-01'), max: moment()},
        {name: 'npc', label: 'NPC', type: 'checkbox', help: 'Bitte nur nach vorheriger Rücksprache!'},
        {name: 'itName', required: true, label: 'IT-Name'},
        {
            name: 'sigil',
            required: true,
            label: 'Siegel',
            type: 'select',
            options: ['Keines', 'Osten', 'Norden', 'Westen', 'Süden', 'Reich der Rosen'],
        },
        {
            name: 'room',
            label: 'Ich möchte ein Zimmer mit...',
            help: 'Wir versuchen allen Wünschen nachzugehen, können aber nichts versprechen.',
        },
    ];

    public sendForm() {
        const normalized = {};
        Object.keys(this.data).forEach((key) => {
            const field = <any> this.fields.filter(field => field.name === key).pop();
            if (field && field.type === 'checkbox') {
                normalized[key] = !!this.data[key];
            }
            else normalized[key] = this.data[key];
        });
        this.post.emit(normalized);
    }
}